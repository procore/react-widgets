'use strict';

var babelHelpers = require('./util/babelHelpers.js');

exports.__esModule = true;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

var _domHelpersActiveElement = require('dom-helpers/activeElement');

var _domHelpersActiveElement2 = babelHelpers.interopRequireDefault(_domHelpersActiveElement);

var _domHelpersQueryContains = require('dom-helpers/query/contains');

var _domHelpersQueryContains2 = babelHelpers.interopRequireDefault(_domHelpersQueryContains);

var _classnames = require('classnames');

var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

var _createReactClass = require('create-react-class');

var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

var _util_ = require('./util/_');

var _util_2 = babelHelpers.interopRequireDefault(_util_);

var _utilConstants = require('./util/constants');

var _Popup = require('./Popup');

var _Popup2 = babelHelpers.interopRequireDefault(_Popup);

var _utilCompat = require('./util/compat');

var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

var _utilPropTypes = require('./util/propTypes');

var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

var _List = require('./List');

var _List2 = babelHelpers.interopRequireDefault(_List);

var _ListGroupable = require('./ListGroupable');

var _ListGroupable2 = babelHelpers.interopRequireDefault(_ListGroupable);

var _utilValidateListInterface = require('./util/validateListInterface');

var _utilValidateListInterface2 = babelHelpers.interopRequireDefault(_utilValidateListInterface);

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = babelHelpers.interopRequireDefault(_uncontrollable);

var _TetheredPopup = require('./TetheredPopup');

var _TetheredPopup2 = babelHelpers.interopRequireDefault(_TetheredPopup);

var _utilDataHelpers = require('./util/dataHelpers');

var _utilInteraction = require('./util/interaction');

var _utilWidgetHelpers = require('./util/widgetHelpers');

var omit = _util_2['default'].omit;
var pick = _util_2['default'].pick;
var result = _util_2['default'].result;

var propTypes = {
  //-- controlled props -----------
  value: _propTypes2['default'].any,
  onChange: _propTypes2['default'].func,
  open: _propTypes2['default'].bool,
  onToggle: _propTypes2['default'].func,
  //------------------------------------

  data: _propTypes2['default'].array,
  valueField: _propTypes2['default'].string,
  textField: _utilPropTypes2['default'].accessor,

  valueComponent: _utilPropTypes2['default'].elementType,
  itemComponent: _utilPropTypes2['default'].elementType,
  listComponent: _utilPropTypes2['default'].elementType,
  beforeListComponent: _propTypes2['default'].any,
  afterListComponent: _propTypes2['default'].any,

  groupComponent: _utilPropTypes2['default'].elementType,
  groupBy: _utilPropTypes2['default'].accessor,

  onSelect: _propTypes2['default'].func,

  searchTerm: _propTypes2['default'].string,
  onSearch: _propTypes2['default'].func,

  busy: _propTypes2['default'].bool,

  delay: _propTypes2['default'].number,

  tetherPopup: _propTypes2['default'].bool,

  multi: _propTypes2['default'].bool,

  dropUp: _propTypes2['default'].bool,
  duration: _propTypes2['default'].number, //popup

  disabled: _utilPropTypes2['default'].disabled,

  readOnly: _utilPropTypes2['default'].readOnly,

  messages: _propTypes2['default'].shape({
    open: _utilPropTypes2['default'].message,
    emptyList: _utilPropTypes2['default'].message,
    emptyFilter: _utilPropTypes2['default'].message,
    filterPlaceholder: _utilPropTypes2['default'].message
  }),

  popupClassName: _propTypes2['default'].string

};

var DropdownList = _createReactClass2['default'](babelHelpers.createDecoratedObject([{
  key: 'displayName',
  initializer: function initializer() {
    return 'DropdownList';
  }
}, {
  key: 'mixins',
  initializer: function initializer() {
    return [require('./mixins/TimeoutMixin'), require('./mixins/PureRenderMixin'), require('./mixins/DataFilterMixin'), require('./mixins/PopupScrollToMixin'), require('./mixins/RtlParentContextMixin'), require('./mixins/AriaDescendantMixin')(), require('./mixins/FocusMixin')({
      didHandle: function didHandle(focused) {
        if (!focused) this.close();
      }
    })];
  }
}, {
  key: 'propTypes',
  initializer: function initializer() {
    return propTypes;
  }
}, {
  key: 'getDefaultProps',
  value: function getDefaultProps() {
    return {
      delay: 500,
      value: '',
      open: false,
      data: [],
      searchTerm: '',
      messages: msgs(),
      ariaActiveDescendantKey: 'dropdownlist',
      tetherPopup: false,
      multi: false,
      beforeListComponent: null,
      afterListComponent: null,
      popupStyle: {}
    };
  }
}, {
  key: 'getInitialState',
  value: function getInitialState() {
    var _props = this.props;
    var open = _props.open;
    var filter = _props.filter;
    var value = _props.value;
    var data = _props.data;
    var searchTerm = _props.searchTerm;
    var valueField = _props.valueField;

    var processed = filter ? this.filter(data, searchTerm) : data,
        initialIdx = _utilDataHelpers.dataIndexOf(data, value, valueField);

    return {
      filteredData: open && filter ? processed : null,
      selectedItem: processed[initialIdx],
      focusedItem: processed[initialIdx] || data[0]
    };
  }
}, {
  key: 'componentDidUpdate',
  value: function componentDidUpdate() {
    this.listRef && _utilValidateListInterface2['default'](this.listRef);
  }
}, {
  key: 'componentWillReceiveProps',
  value: function componentWillReceiveProps(props) {
    var open = props.open;
    var filter = props.filter;
    var value = props.value;
    var data = props.data;
    var searchTerm = props.searchTerm;
    var valueField = props.valueField;

    var processed = filter ? this.filter(data, searchTerm) : data,
        idx = _utilDataHelpers.dataIndexOf(data, value, valueField);

    this.setState({
      filteredData: open && filter ? processed : null,
      selectedItem: processed[idx],
      focusedItem: processed[! ~idx ? 0 : idx]
    });
  }
}, {
  key: 'render',
  value: function render() {
    var _cx,
        _this = this;

    var _props2 = this.props;
    var className = _props2.className;
    var tabIndex = _props2.tabIndex;
    var filter = _props2.filter;
    var valueField = _props2.valueField;
    var textField = _props2.textField;
    var groupBy = _props2.groupBy;
    var messages = _props2.messages;
    var data = _props2.data;
    var busy = _props2.busy;
    var dropUp = _props2.dropUp;
    var searchTerm = _props2.searchTerm;
    var onChange = _props2.onChange;
    var placeholder = _props2.placeholder;
    var value = _props2.value;
    var open = _props2.open;
    var disabled = _props2.disabled;
    var readOnly = _props2.readOnly;
    var ValueComponent = _props2.valueComponent;
    var multi = _props2.multi;
    var tetherPopup = _props2.tetherPopup;
    var popupClassName = _props2.popupClassName;
    var beforeListComponent = _props2.beforeListComponent;
    var afterListComponent = _props2.afterListComponent;
    var List = _props2.listComponent;
    var popupStyle = _props2.popupStyle;

    List = List || groupBy && _ListGroupable2['default'] || _List2['default'];

    var elementProps = omit(this.props, Object.keys(propTypes));
    var listProps = pick(this.props, Object.keys(List.propTypes));
    var PopupComponent = tetherPopup ? _TetheredPopup2['default'] : _Popup2['default'];

    var popupProps = pick(this.props, Object.keys(PopupComponent.propTypes));
    var _state = this.state;
    var focusedItem = _state.focusedItem;
    var selectedItem = _state.selectedItem;
    var focused = _state.focused;

    var items = this._data(),
        valueItem = false,
        listID = _utilWidgetHelpers.instanceId(this, '__listbox');

    if (value !== null) {
      valueItem = _utilDataHelpers.dataItem(data, value, valueField); // take value from the raw data
    }

    messages = msgs(messages);

    return _react2['default'].createElement(
      'div',
      babelHelpers._extends({}, elementProps, {
        ref: function (ref) {
          return _this.inputRef = ref;
        },
        role: 'combobox',
        tabIndex: tabIndex || '0',
        'aria-expanded': open,
        'aria-haspopup': true,
        'aria-owns': listID,
        'aria-busy': !!busy,
        'aria-live': !open && 'polite',
        //aria-activedescendant={activeID}
        'aria-autocomplete': 'list',
        'aria-disabled': disabled,
        'aria-readonly': readOnly,
        onKeyDown: tetherPopup ? null : this._keyDown,
        onClick: this._click,
        onFocus: tetherPopup ? function () {
          return _this.setState({ focused: true });
        } : this.handleFocus,
        onBlur: tetherPopup ? function () {
          return _this.setState({ focused: false });
        } : this.handleBlur,
        className: _classnames2['default'](className, 'rw-dropdownlist', 'rw-widget', (_cx = {
          'rw-state-disabled': disabled,
          'rw-state-readonly': readOnly,
          'rw-state-focus': focused,
          'rw-rtl': this.isRtl()

        }, _cx['rw-open' + (dropUp ? '-up' : '')] = open, _cx)) }),
      _react2['default'].createElement(
        'span',
        { className: 'rw-dropdownlist-picker rw-select rw-btn' },
        _react2['default'].createElement(
          'i',
          { className: 'rw-i rw-i-caret-down' + (busy ? ' rw-loading' : '') },
          _react2['default'].createElement(
            'span',
            { className: 'rw-sr' },
            result(messages.open, this.props)
          )
        )
      ),
      _react2['default'].createElement(
        'div',
        {
          className: 'rw-input'
        },
        !valueItem && placeholder ? _react2['default'].createElement(
          'span',
          { className: 'rw-placeholder' },
          placeholder
        ) : this.props.valueComponent ? _react2['default'].createElement(ValueComponent, { item: valueItem }) : _utilDataHelpers.dataText(valueItem, textField)
      ),
      open && _react2['default'].createElement(
        PopupComponent,
        babelHelpers._extends({}, popupProps, {
          className: popupClassName,
          getTetherFocus: filter ? function () {
            return _this.filterRef;
          } : function () {
            return _this.listRef.ulRef;
          },
          onOpen: tetherPopup ? this.handleFocus : this.focus,
          onKeyDown: this._keyDown,
          onBlur: this._focus.bind(null, false),
          onOpening: function () {
            return _this.listRef.forceUpdate();
          },
          onRequestClose: this.close,
          popupStyle: popupStyle
        }),
        _react2['default'].createElement(
          'div',
          null,
          filter && this._renderFilter(messages),
          beforeListComponent && _react2['default'].cloneElement(beforeListComponent, { value: value, searchTerm: searchTerm, data: data, onChange: onChange }),
          _react2['default'].createElement(List, babelHelpers._extends({ ref: function (ref) {
              return _this.listRef = ref;
            }
          }, listProps, {
            data: items,
            id: listID,
            'aria-live': open && 'polite',
            'aria-labelledby': _utilWidgetHelpers.instanceId(this),
            'aria-hidden': !this.props.open,
            selected: selectedItem,
            focused: open && focusedItem,
            onSelect: this._onSelect,
            onMove: multi ? function () {} : this._scrollTo,
            messages: {
              emptyList: data.length ? messages.emptyFilter : messages.emptyList
            }
          })),
          afterListComponent && _react2['default'].cloneElement(afterListComponent, { value: value, searchTerm: searchTerm, data: data, onChange: onChange })
        )
      )
    );
  }
}, {
  key: '_renderFilter',
  value: function _renderFilter(messages) {
    var _this2 = this;

    return _react2['default'].createElement(
      'div',
      { ref: function (ref) {
          return _this2.filterWrapperRef = ref;
        }, className: 'rw-filter-input' },
      _react2['default'].createElement(
        'span',
        { className: 'rw-select rw-btn' },
        _react2['default'].createElement('i', { className: 'rw-i rw-i-search' })
      ),
      _react2['default'].createElement('input', { ref: function (ref) {
          return _this2.filterRef = ref;
        }, className: 'rw-input',
        placeholder: _util_2['default'].result(messages.filterPlaceholder, this.props),
        value: this.props.searchTerm,
        onChange: function (e) {
          return _utilWidgetHelpers.notify(_this2.props.onSearch, e.target.value);
        } })
    );
  }
}, {
  key: '_focus',
  decorators: [_utilInteraction.widgetEnabled],
  value: function _focus(focused, e) {
    var _this3 = this;

    this.setTimeout('focus', function () {
      if (!focused) _this3.close();

      if (focused !== _this3.state.focused) {
        _utilWidgetHelpers.notify(_this3.props[focused ? 'onFocus' : 'onBlur'], e);
        _this3.setState({ focused: focused });
      }
    });
  }
}, {
  key: '_onSelect',
  decorators: [_utilInteraction.widgetEditable],
  value: function _onSelect(data) {
    var _props3 = this.props;
    var onSelect = _props3.onSelect;
    var tetherPopup = _props3.tetherPopup;

    _utilWidgetHelpers.notify(onSelect, data);
    this.change(data);
    this.close();
    if (tetherPopup) this._focus(false);
    this.focus(this);
  }
}, {
  key: '_click',
  decorators: [_utilInteraction.widgetEditable],
  value: function _click(e) {
    var wrapper = this.filterWrapperRef;
    if (!this.props.filter || !this.props.open) this.toggle();else if (!_domHelpersQueryContains2['default'](_utilCompat2['default'].findDOMNode(wrapper), e.target)) this.close();

    _utilWidgetHelpers.notify(this.props.onClick, e);
  }
}, {
  key: '_keyDown',
  decorators: [_utilInteraction.widgetEditable],
  value: function _keyDown(e) {
    var _this4 = this;

    var self = this,
        key = e.keyCode,
        alt = e.altKey,
        list = this.listRef,
        filtering = this.props.filter,
        focusedItem = this.state.focusedItem,
        selectedItem = this.state.selectedItem,
        isOpen = this.props.open,
        closeWithFocus = function closeWithFocus() {
      _this4.close(), _utilCompat2['default'].findDOMNode(_this4).focus();
    };
    _utilWidgetHelpers.notify(this.props.onKeyDown, [e]);

    if (e.defaultPrevented) return;

    if (key === _utilConstants.keyCodes.END) {
      if (isOpen) this.setState({ focusedItem: list.last() });else change(list.last());
      e.preventDefault();
    } else if (key === _utilConstants.keyCodes.HOME) {
      if (isOpen) this.setState({ focusedItem: list.first() });else change(list.first());
      e.preventDefault();
    } else if (key === _utilConstants.keyCodes.ESCAPE && isOpen) {
      closeWithFocus();
    } else if ((key === _utilConstants.keyCodes.ENTER || key === ' ' && !filtering) && isOpen) {
      change(this.state.focusedItem, true);
    } else if (key === _utilConstants.keyCodes.DOWN_ARROW) {
      if (alt) this.open();else if (isOpen) this.setState({ focusedItem: list.next(focusedItem) });else change(list.next(selectedItem));
      e.preventDefault();
    } else if (key === _utilConstants.keyCodes.UP_ARROW) {
      if (alt) closeWithFocus();else if (isOpen) this.setState({ focusedItem: list.prev(focusedItem) });else change(list.prev(selectedItem));
      e.preventDefault();
    } else if (!(this.props.filter && isOpen)) this.search(String.fromCharCode(e.keyCode), function (item) {
      isOpen ? _this4.setState({ focusedItem: item }) : change(item);
    });

    function change(item, fromList) {
      if (!item) return;
      fromList ? self._onSelect(item) : self.change(item);
    }
  }
}, {
  key: 'change',
  value: function change(data) {
    if (!_util_2['default'].isShallowEqual(data, this.props.value)) {
      _utilWidgetHelpers.notify(this.props.onChange, data);
      if (!this.props.multi) {
        _utilWidgetHelpers.notify(this.props.onSearch, '');
      }
      this.close();
    }
  }
}, {
  key: 'focus',
  value: function focus(target) {
    var inst = target || (this.props.filter && this.props.open ? this.filterRef : this.inputRef);

    if (_domHelpersActiveElement2['default']() !== _utilCompat2['default'].findDOMNode(inst)) _utilCompat2['default'].findDOMNode(inst).focus();
  }
}, {
  key: '_data',
  value: function _data() {
    return this.state.filteredData || this.props.data.concat();
  }
}, {
  key: 'search',
  value: function search(character, cb) {
    var _this5 = this;

    var word = ((this._searchTerm || '') + character).toLowerCase();

    this._searchTerm = word;

    this.setTimeout('search', function () {
      var list = _this5.listRef,
          key = _this5.props.open ? 'focusedItem' : 'selectedItem',
          item = list.next(_this5.state[key], word);

      _this5._searchTerm = '';
      if (item) cb(item);
    }, this.props.delay);
  }
}, {
  key: 'open',
  value: function open() {
    _utilWidgetHelpers.notify(this.props.onToggle, true);
  }
}, {
  key: 'close',
  value: function close() {

    _utilWidgetHelpers.notify(this.props.onToggle, false);
  }
}, {
  key: 'toggle',
  value: function toggle() {
    this.props.open ? this.close() : this.open();
  }
}]));

function msgs(msgs) {
  return babelHelpers._extends({
    open: 'open dropdown',
    filterPlaceholder: '',
    emptyList: 'There are no items in this list',
    emptyFilter: 'The filter returned no results'
  }, msgs);
}

exports['default'] = _uncontrollable2['default'](DropdownList, { open: 'onToggle', value: 'onChange', searchTerm: 'onSearch' }, ['focus']);
module.exports = exports['default'];