import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import createReactClass from 'create-react-class';
import _  from './util/_';
import filter from './util/filter';
import Popup           from './Popup';
import TetheredPopup   from './TetheredPopup';
import Btn             from './WidgetButton';
import Input           from './ComboboxInput';
import compat          from './util/compat';
import CustomPropTypes from './util/propTypes';
import PlainList       from './List';
import GroupableList   from './ListGroupable';
import validateList    from './util/validateListInterface';
import createUncontrolledWidget from 'uncontrollable';
import { dataItem, dataText, dataIndexOf } from './util/dataHelpers';
import { widgetEditable, widgetEnabled } from './util/interaction';
import { instanceId, notify, isFirstFocusedRender } from './util/widgetHelpers';

let defaultSuggest = f => f === true ? 'startsWith' : f ? f : 'eq'

let { omit, pick } = _;

let propTypes = {
      //-- controlled props -----------
      value:          PropTypes.any,
      onChange:       PropTypes.func,
      open:           PropTypes.bool,
      onToggle:       PropTypes.func,
      //------------------------------------

      itemComponent:  CustomPropTypes.elementType,
      listComponent:  CustomPropTypes.elementType,
      afterListComponent: PropTypes.any,
      groupComponent: CustomPropTypes.elementType,
      groupBy:        CustomPropTypes.multiAccessor,

      data:           PropTypes.array,
      valueField:     PropTypes.string,
      textField:      CustomPropTypes.accessor,
      name:           PropTypes.string,

      onSelect:       PropTypes.func,

      autoFocus:      PropTypes.bool,
      disabled:       CustomPropTypes.disabled,
      readOnly:       CustomPropTypes.readOnly,

      suggest:        CustomPropTypes.filter,
      filter:         CustomPropTypes.filter,

      busy:           PropTypes.bool,

      tetherPopup:    PropTypes.bool,

      dropUp:         PropTypes.bool,
      duration:       PropTypes.number, //popup

      placeholder:    PropTypes.string,

      messages:       PropTypes.shape({
        open:         CustomPropTypes.message,
        emptyList:    CustomPropTypes.message,
        emptyFilter:  CustomPropTypes.message
      })
    };

var ComboBox = createReactClass({

  displayName: 'ComboBox',

  mixins: [
    require('./mixins/TimeoutMixin'),
    require('./mixins/DataFilterMixin'),
    require('./mixins/PopupScrollToMixin'),
    require('./mixins/RtlParentContextMixin'),
    require('./mixins/AriaDescendantMixin')('input')
  ],

  propTypes: propTypes,

  getInitialState(){
    var { value, data, valueField } = this.props
      , items = this.process(data, value)
      , idx   = dataIndexOf(items, value, valueField);

    return {
      selectedItem:  items[idx],
      focusedItem:   items[!~idx ? 0 : idx],
      processedData: items,
      open:          false
    }
  },

  getDefaultProps(){
    return {
      data: [],
      value: '',
      open: false,
      suggest: false,
      filter: false,
      delay: 500,
      tetherPopup: false,
      popupStyle: {},

      messages: msgs(),
      ariaActiveDescendantKey: 'combobox'
    }
  },

  componentDidUpdate() {
    this.listRef && validateList(this.listRef)
  },

  shouldComponentUpdate(nextProps, nextState){
    var isSuggesting = this.inputRef && this.inputRef.isSuggesting()
      , stateChanged = !_.isShallowEqual(nextState, this.state)
      , valueChanged = !_.isShallowEqual(nextProps, this.props)

    return isSuggesting || stateChanged || valueChanged
  },

  componentWillReceiveProps(nextProps) {
    let { value, data, valueField, textField } = nextProps

    var rawIdx = dataIndexOf(data, value, valueField)
      , valueItem = rawIdx === -1 ? nextProps.value : nextProps.data[rawIdx]
      , isSuggesting = this.inputRef.isSuggesting()
      , items = this.process(
          nextProps.data
        , nextProps.value
        , (rawIdx === -1 || isSuggesting) && dataText(valueItem, textField) )

      , idx = dataIndexOf(items, value, valueField)
      , focused = this.filterIndexOf(items, dataText(valueItem, textField));

    this._searchTerm = '';

    this.setState({
      processedData:  items,
      selectedItem:   items[idx],
      focusedItem:    items[idx === -1
        ? focused !== -1 ? focused : 0 // focus the closest match
        : idx]
    })
  },

  render(){
    let {
        className, tabIndex, filter, suggest
      , valueField, textField, groupBy, tetherPopup, popupStyle
      , messages, data, busy, dropUp, name, autoFocus
      , placeholder, value, open, disabled, readOnly
      , afterListComponent, searchTerm, onChange
      , listComponent: List } = this.props;

    List = List || (groupBy && GroupableList) || PlainList
    const PopupComponent = tetherPopup ? TetheredPopup : Popup;

    let elementProps = omit(this.props, Object.keys(propTypes));
    let listProps    = pick(this.props, Object.keys(List.propTypes));
    let popupProps   = pick(this.props, Object.keys(PopupComponent.propTypes));

    let { focusedItem, selectedItem, focused } = this.state;

    let items = this._data()
      , valueItem = dataItem(data, value, valueField) // take value from the raw data
      , inputID = instanceId(this, '_input')
      , listID = instanceId(this, '_listbox')
      , completeType = suggest
          ? filter ? 'both' : 'inline'
          : filter ? 'list' : '';

    messages = msgs(messages)

    return (
      <div
        {...elementProps}
        ref={(ref) => this.elementRef = ref}
        onKeyDown={this._keyDown}
        onFocus={this._focus.bind(null, true)}
        onBlur ={tetherPopup ? () => this.setState({focused: false}) : this._focus.bind(null, false)}
        tabIndex={'-1'}
        className={cx(className, 'rw-combobox', 'rw-widget', {
          'rw-state-focus':     focused,
          'rw-state-disabled':  disabled,
          'rw-state-readonly':  readOnly,
          'rw-rtl':             this.isRtl(),

          ['rw-open' + (dropUp ? '-up' : '')]: open
         })}
      >
        <Btn
          tabIndex='-1'
          className='rw-select'
          onClick={this.toggle}
          disabled={!!(disabled || readOnly)}
        >
          <i className={cx('rw-i rw-i-caret-down', {'rw-loading': busy})}>
            <span className="rw-sr">
              { _.result(messages.open, this.props) }
            </span>
          </i>
        </Btn>
        <Input
          ref={(ref) => this.inputRef = ref}
          id={inputID}
          autoFocus={autoFocus}
          tabIndex={tabIndex}
          suggest={suggest}
          name={name}
          role='combobox'
          aria-owns={listID}
          aria-busy={!!busy}
          aria-autocomplete={completeType}
          aria-expanded={open}
          aria-haspopup={true}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          className='rw-input'
          value={dataText(valueItem, textField) }
          onChange={this._inputTyping}
          onKeyDown={this._inputKeyDown}
        />
        {open && <PopupComponent
          {...popupProps}
          onOpening={() => this.listRef.forceUpdate()}
          getTetherFocus={() => this.listRef.ulRef}
          onBlur={this._focus.bind(null, false)}
          onOpen={this.focus}
          onRequestClose={this.close}
          popupStyle={popupStyle}
        >
          <div>
            <List
              ref={(ref) => this.listRef = ref}
              {...listProps}
              id={listID}
              data={items}
              selected={selectedItem}
              focused ={focusedItem}
              aria-hidden={!open}
              aria-labelledby={inputID}
              aria-live={open && 'polite'}
              onSelect={this._onSelect}
              onMove={this._scrollTo}
              messages={{
                emptyList: data.length
                  ? messages.emptyFilter
                  : messages.emptyList
              }}/>
            {afterListComponent && (
              React.cloneElement(
                afterListComponent,
                {value, searchTerm, data, onChange, }
              )
            )}
          </div>
        </PopupComponent>}
      </div>
    )
  },

  @widgetEditable
  _onSelect(data){
    const { onSelect, tetherPopup } = this.props;
    this.close()
    notify(onSelect, data)
    this.change(data)
    this.focus();
    if (tetherPopup) this._focus(false);
  },

  _inputKeyDown(e){
    this._deleting = e.key === 'Backspace' || e.key === 'Delete'
    this._isTyping = true
  },

  _inputTyping(e){
    let { data, textField } = this.props

    var shouldSuggest = !!this.props.suggest
      , strVal  = e.target.value
      , suggestion;

    suggestion = this._deleting || !shouldSuggest
      ? strVal : this.suggest(this._data(), strVal)

    suggestion = suggestion || strVal

    data = _.find(data,
      item => dataText(item, textField).toLowerCase() === suggestion.toLowerCase())

    this.change(!this._deleting && data
      ? data
      : strVal, true)

    this.open()
  },

  focus() {
    this.inputRef.focus()
  },

  @widgetEnabled
  _focus(focused, e){

    !focused && this.inputRef.accept() //not suggesting anymore

    this.setTimeout('focus', () => {

      if( !focused) this.close()

      if( focused !== this.state.focused) {
        notify(this.props[focused ? 'onFocus' : 'onBlur'], e)
        this.setState({ focused: focused })
      }
    })
  },

  @widgetEditable
  _keyDown(e){
    var self = this
      , key  = e.key
      , alt  = e.altKey
      , list = this.listRef
      , focusedItem = this.state.focusedItem
      , selectedItem = this.state.selectedItem
      , isOpen = this.props.open;

    notify(this.props.onKeyDown, [e])

    if (e.defaultPrevented)
      return

    if ( key === 'End' )
      if ( isOpen ) this.setState({ focusedItem: list.last() })
      else          select(list.last(), true)

    else if ( key === 'Home' )
      if ( isOpen ) this.setState({ focusedItem: list.first() })
      else          select(list.first(), true)

    else if ( key === 'Escape' && isOpen )
      this.close()

    else if ( key === 'Enter' && isOpen ) {
      select(this.state.focusedItem, true)
    }

    else if ( key === 'ArrowDown' ) {
      if ( alt )
        this.open()
      else {
        if ( isOpen ) this.setState({ focusedItem: list.next(focusedItem) })
        else          select(list.next(selectedItem), true)
      }
    }
    else if ( key === 'ArrowUp' ) {
      if ( alt )
        this.close()
      else {
        if ( isOpen ) this.setState({ focusedItem: list.prev(focusedItem) })
        else          select(list.prev(selectedItem), true)
      }
    }

    function select(item, fromList) {
      if(!item)
        return self.change(compat.findDOMNode(self.inputRef).value, false)

      self.inputRef.accept(true); //removes caret

      if(fromList)
        return self._onSelect(item)

      self.change(item, false)
    }
  },

  change(data, typing){
    this._typedChange = !!typing
    notify(this.props.onChange, data)
  },

  open(){
    if ( !this.props.open )
      notify(this.props.onToggle, true)
  },

  close(){
    if ( this.props.open )
      notify(this.props.onToggle, false)
  },

  @widgetEditable
  toggle(){
    this.focus()

    this.props.open
      ? this.close()
      : this.open()
  },

  suggest(data, value) {
    let { textField, suggest, minLength } = this.props

    var word = dataText(value, textField)
      , suggestion;

    suggest = defaultSuggest(suggest)

    if (!(word || '').trim() || word.length < (minLength || 1))
      return ''

    suggestion = typeof value === 'string'
        ? _.find(data, getFilter(suggest, word, textField))
        : value

    if ( suggestion && (!this.state || !this.state.deleting))
      return dataText(suggestion, textField)

    return ''
  },

  _data() {
    return this.state.processedData
  },

  process(data, values, searchTerm) {
    if (this.props.filter && searchTerm)
      data = this.filter(data, searchTerm)

    return data
  }
})



export default createUncontrolledWidget(
      ComboBox, { open: 'onToggle', value: 'onChange' });



function msgs(msgs){
  return {
    open: 'open combobox',
    emptyList:   'There are no items in this list',
    emptyFilter: 'The filter returned no results',
    ...msgs
  }
}

function getFilter(suggest, word, textField){
  return typeof suggest === 'string'
      ? item => filter[suggest](dataText(item, textField).toLowerCase(), word.toLowerCase())
      : item => suggest(item, word)
}
