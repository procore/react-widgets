import React   from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import ListOption from './ListOption';
import CustomPropTypes from './util/propTypes';
import compat from './util/compat';
import cn from 'classnames';
import _  from './util/_';
import warning from 'warning';
import { dataText, dataValue } from './util/dataHelpers';
import { instanceId, notify } from './util/widgetHelpers';
import GroupHeader from './GroupHeader';
import { depthFirst } from './util/objectTraversal';

let optionId = (id, idx)=> `${id}__option__${idx}`;
const PATH_DELIMITER = '::';

function _stringifyPath(path) {
  return path.join(PATH_DELIMITER);
}

function _getDepthString(depth) {
  return `rw-list-depth-${depth || 0}`;
}

function _getIn(obj, path) {
  return path.reduce((seed, current) => {
    return seed && typeof seed === 'object' && seed[current];
  }, obj);
}

function _ensureOrderedKeysExists(obj) {
  if (obj && !obj._orderedKeys) { obj._orderedKeys = []; }
}

function _pushNewOrderedKey(obj, key) {
  const shouldPushKey = obj
    && obj._orderedKeys
    && obj._orderedKeys.indexOf(key) === -1;

  shouldPushKey && obj._orderedKeys.push(key);
}

function _setIn(obj, path, val) {
  const cloned = Object.assign({}, obj);

  path.reduce(
    (seed, current, idx) => {
      if (idx == path.length - 1) {
        seed[current] = val;
      } else if (!seed[current]) {
        seed[current] = {};
      }

      _ensureOrderedKeysExists(seed);
      _pushNewOrderedKey(seed, current);

      return seed[current];
    },
    cloned
  );

  return cloned;
}

function _validateOrderedKeyObject(obj) {
  if (!(obj && obj._orderedKeys)) {
    throw new Error(
      "currentNode is null/undefined/falsy, or is missing `_orderedKeys`"
    );
  }
}

function _pushPathStep(path, nextStep) {
  if (!path || path.trim() === '') {
    return nextStep;
  }

  return _stringifyPath([path, nextStep]);
}

function _flattenGroups(groups, array, sortKeys) {
  if (!(groups && groups._orderedKeys)) { return; }

  const identity = (x => x);
  const sort = sortKeys[0] || identity;
  const keys = sort(groups._orderedKeys.slice());

  keys.forEach(key => {
    const value = groups[key];

    if (Array.isArray(value)) {
      value.forEach(item => array.push(item));
    } else {
      _flattenGroups(value, array, sortKeys.slice(1));
    }
  });
}

function _renderHeadersAndItems(groupedObj, renderGroupHeader, renderSingleItem, keySorts) {
  const outputArray = [];
  const getChildren = keySorts.map(fn => {
    const identity = x => x;
    const sortKeys = fn || identity;

    return obj => sortKeys(obj._orderedKeys.slice());
  });
  const onInternal = (key, state) => {
    outputArray.push(renderGroupHeader(key, state));
  };
  const onLeaf = (array, state) => {
    array.forEach((item, idx) => {
      outputArray.push(renderSingleItem(item, state, idx));
    });
  };

  depthFirst(
    groupedObj,
    getChildren,
    onInternal,
    onLeaf
  );

  return outputArray;
}

function _setFoundIndex(state, foundIndex) {
  return Object.assign({}, state, {
    foundIndex,
  });
}

function _setOffset(state, offset) {
  return Object.assign({}, state, {
    offset,
  });
}

/*
 state:
 {
   foundIndex: boolean,
   offset:     number
 }
 */
function _getOrderedIndexHelper(item, currentNode, state) {
  _validateOrderedKeyObject(currentNode);

  return currentNode._orderedKeys.slice().reduce(
    (_state, key) => {
      if (_state.foundIndex) { return _state; }

      const value = currentNode[key];
      if (!Array.isArray(value)) {
        return _getOrderedIndexHelper(
          item,
          value,
          _setOffset(_state, _state.offset + 1)
        );
      } else {
        const index = value.indexOf(item);

        // NOTE: We're kind of looking ahead one level in the heirarchy,
        // so the index/offset actually needs to be incremented once extra.
        //
        // This could probably be done slightly differently to alleviate that,
        // but that isn't worth doing just yet...
        if (index !== -1) {
          const foundIndex = _state.offset + index + 1;

          return _setFoundIndex(_state, foundIndex);
        } else {
          const offset = _state.offset + value.length + 1;

          return _setOffset(_state, offset);
        }
      }
    },
    state
  );
}

function _getOrderedIndex(item, object) {
  const result = _getOrderedIndexHelper(item, object, {
    foundIndex: undefined,
    offset: 0,
  });

  return result.foundIndex || -1;
}

export default createReactClass({
  displayName: 'List',

  mixins: [
    require('./mixins/ListMovementMixin'),
    require('./mixins/AriaDescendantMixin')()
  ],

  propTypes: {
    data:           PropTypes.array,
    onSelect:       PropTypes.func,
    onMove:         PropTypes.func,

    optionComponent: CustomPropTypes.elementType,
    itemComponent:   CustomPropTypes.elementType,
    groupComponent:  CustomPropTypes.elementType,

    selected:       PropTypes.any,
    focused:        PropTypes.any,

    valueField:     PropTypes.string,
    textField:      CustomPropTypes.accessor,

    optID:          PropTypes.string,

    groupBy:        CustomPropTypes.multiAccessor,

    messages:       PropTypes.shape({
      emptyList:    CustomPropTypes.message
    })
  },

  getDefaultProps(){
    return {
      optID:         '',
      onSelect:      function(){},
      data:          [],
      optionComponent: ListOption,
      ariaActiveDescendantKey: 'groupedList',
      messages: {
        emptyList:   'There are no items in this list'
      }
    }
  },

  getInitialState() {
    return {
      groups: this._group(this.props.groupBy, this.props.data),
    };
  },

  componentWillReceiveProps(nextProps) {
    const shouldSetState = nextProps.data !== this.props.data
      || nextProps.groupBy !== this.props.groupBy;

    if (shouldSetState) {
      const groups = this._group(nextProps.groupBy, nextProps.data);

      this.setState({
        groups,
      });
    }
  },

  componentDidMount(){
    this.move()
  },

  componentDidUpdate() {
    this.ariaActiveDescendant(this._currentActiveID)
    this.move()
  },

  render(){
    var {
      className,
      role,
      data,
      messages,
      onSelect,
      selectedIndex,
      ...props
    } = this.props;
    var id = instanceId(this);
    let { groups } = this.state;
    let items = [];
    let idx = -1;
    let group;

    this._currentActiveID = null;

    if (data.length) {
      items = _renderHeadersAndItems(
        groups,
        this._renderGroupHeader,
        this._renderItem,
        this.props.groupBy.map(x => x.sortKeys)
      );
    }
    else {
      items = (
        <li className='rw-list-empty'>
          { _.result(messages.emptyList, this.props) }
        </li>
      );
    }

    return (
      <ul
        ref={(ref) => this.scrollableRef = ref}
        id={id}
        tabIndex='-1'
        className={cn(className, 'rw-list', 'rw-list-grouped')}
        role={role === undefined ? 'listbox' : role }
        { ...props }
      >
        { items }
      </ul>
    )
  },

  _renderGroupHeader(label, state) {
    const depth = state.path.length;
    const pathString = _stringifyPath(state.path);

    const className = `rw-list-optgroup ${_getDepthString(depth)}`;
    const id = instanceId(this);
    const key = `item_${pathString}_${label}`;

    return (
      <GroupHeader
        className={className}
        groupComponent={this.props.groupComponent}
        id={id}
        key={key}
        label={label}
      />
    );
  },

  _renderItem(item, state, idx) {
    let {
      focused,
      selected,
      onSelect,
      textField,
      valueField,
      itemComponent: ItemComponent,
      optionComponent: Option
    } = this.props
    const currentId = optionId(instanceId(this), state.offset + idx);
    const onClick = onSelect.bind(null, item);

    if (focused === item) {
      this._currentActiveID = currentId;
    }

    const depth = state.path.length;
    const pathString = _stringifyPath(state.path);
    const key = `item_${pathString}_${idx}`;

    return (
      <Option
        key={key}
        id={currentId}
        dataItem={item}
        focused={focused === item}
        selected={selected === item}
        onClick={onClick}
        className={_getDepthString(depth)}
      >
        {
          ItemComponent
            ? <ItemComponent
                item={item}
                value={dataValue(item, valueField)}
                text={dataText(item, textField)}
              />
            : dataText(item, textField)
        }
      </Option>
    )
  },

  _isIndexOf(idx, item){
    return this.props.data[idx] === item;
  },

  _group(groupBy, data) {
    return data.reduce(
      (seed, current) => {
        const path = groupBy.map(x => x.getHeaders(current));
        const existingLeaf = _getIn(seed, path) || [];
        const newLeaf = existingLeaf.concat(current);

        return _setIn(seed, path, newLeaf);
      },
      {}
    );
  },

  _data() {
    const groups = this.state.groups;
    const items = [];

    _flattenGroups(
      groups,
      items,
      this.props.groupBy.map(x => x.sortKeys)
    );

    return items;
  },

  move() {
    const selected = this.getItemDOMNode(this.props.focused);

    if (!selected) { return; }

    notify(
      this.props.onMove,
      [selected, compat.findDOMNode(this), this.props.focused]
    );
  },

  getItemDOMNode(item) {
    if (!item) { return undefined; }

    const list = compat.findDOMNode(this);
    const index = _getOrderedIndex(item, this.state.groups);

    // Conveniently, array[-1] gives undefined, which is just what we want
    return list[index];
  }
});
