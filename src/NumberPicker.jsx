import React from 'react';
import PropTypes from 'prop-types';
import cx    from 'classnames';
import createReactClass from 'create-react-class';
import _     from './util/_';
import compat from './util/compat';
import CustomPropTypes from './util/propTypes';
import createUncontrolledWidget from 'uncontrollable';
import constants from './util/constants';
import repeater from './util/repeater';
import { number as numberLocalizer } from './util/localizers';
import Input from './NumberInput';
import Btn from './WidgetButton';

import { widgetEditable, widgetEnabled } from './util/interaction';
import { notify } from './util/widgetHelpers';

let { directions } = constants;

var format = props => numberLocalizer.getFormat('default', props.format)

let propTypes = {

      // -- controlled props -----------
      value:          PropTypes.number,
      onChange:       PropTypes.func,
      //------------------------------------

      min:            PropTypes.number,
      max:            PropTypes.number,
      step:           PropTypes.number,

      precision:      PropTypes.number,

      culture:        PropTypes.string,

      format:         CustomPropTypes.numberFormat,

      name:           PropTypes.string,

      parse:          PropTypes.func,

      autoFocus:      PropTypes.bool,
      disabled:       CustomPropTypes.disabled,
      readOnly:       CustomPropTypes.readOnly,

      messages:       PropTypes.shape({
        increment:    PropTypes.string,
        decrement:    PropTypes.string
      }),

      placeholder: PropTypes.string
    };

let NumberPicker = createReactClass({

  displayName: 'NumberPicker',

  mixins: [
    require('./mixins/TimeoutMixin'),
    require('./mixins/PureRenderMixin'),
    require('./mixins/RtlParentContextMixin')
  ],

  propTypes: propTypes,

  getDefaultProps(){
    return {
      value: null,
      open: false,

      min: -Infinity,
      max:  Infinity,
      step: 1,

      messages: {
        increment: 'increment value',
        decrement:  'decrement value'
      }
    }
  },

  getInitialState(){
    return {
      focused: false,
      active: false
    }
  },


  render(){
    var {
        className
      , onKeyPress
      , onKeyUp
      , autoFocus
      , ...props } = _.omit(this.props, Object.keys(propTypes))
      , val = this.constrainValue(this.props.value)

    return (
      <div {...props }
        ref="element"
        onKeyDown={this._keyDown}
        onFocus={this._focus.bind(null, true)}
        onBlur ={this._focus.bind(null, false)}
        tabIndex={'-1'}
        className={cx(className, 'rw-numberpicker', 'rw-widget', {
          'rw-state-focus':     this.state.focused,
          'rw-state-disabled':  this.props.disabled,
          'rw-state-readonly':  this.props.readOnly,
          'rw-rtl':             this.isRtl()
        })}>

        <span className='rw-select'>
          <Btn
            tabIndex='-1'
            className={cx({ 'rw-state-active': this.state.active === directions.UP})}
            onMouseDown={this._mouseDown.bind(null, directions.UP)}
            onMouseUp={this._mouseUp.bind(null, directions.UP)}
            onMouseOut={this._mouseUp.bind(null, directions.UP)}
            onClick={this._focus.bind(null, true)}
            disabled={val === this.props.max || this.props.disabled}
            aria-disabled={val === this.props.max || this.props.disabled}>

            <i className="rw-i rw-i-caret-up">
              <span className="rw-sr">{ this.props.messages.increment }</span>
            </i>
          </Btn>
          <Btn
            tabIndex='-1'
            className={cx({ 'rw-state-active': this.state.active === directions.DOWN})}
            onMouseDown={this._mouseDown.bind(null, directions.DOWN)}
            onMouseUp={this._mouseUp.bind(null, directions.DOWN)}
            onMouseOut={this._mouseUp.bind(null, directions.DOWN)}
            onClick={this._focus.bind(null, true)}
            disabled={val === this.props.min || this.props.disabled}
            aria-disabled={val === this.props.min || this.props.disabled}>

            <i className="rw-i rw-i-caret-down">
              <span className="rw-sr">{ this.props.messages.decrement }</span>
            </i>
          </Btn>
        </span>
        <Input
          ref='input'
          tabIndex={props.tabIndex}
          placeholder={this.props.placeholder}
          value={val}
          autoFocus={autoFocus}
          editing={this.state.focused}
          format={this.props.format}
          parse={this.props.parse}
          name={this.props.name}
          role='spinbutton'
          min={this.props.min}
          aria-valuenow={val}
          aria-valuemin={isFinite(this.props.min) ? this.props.min : null }
          aria-valuemax={isFinite(this.props.max) ? this.props.max : null }
          aria-disabled={ this.props.disabled }
          aria-readonly={ this.props.readonly }
          disabled={this.props.disabled}
          readOnly={this.props.readOnly}
          onChange={this.change}
          onKeyPress={onKeyPress}
          onKeyUp={onKeyUp}/>
      </div>
    )
  },

  //allow for styling, focus stealing keeping me from the normal what have you
  @widgetEditable
  _mouseDown(dir) {
    var method = dir === directions.UP
      ? this.increment
      : this.decrement


    this.setState({ active: dir })

    var val = method.call(this)

    if( !((dir === directions.UP && val === this.props.max)
      || (dir === directions.DOWN && val === this.props.min)))
    {
      if(!this._cancelRepeater)
        this._cancelRepeater = repeater(this._mouseDown.bind(null, dir))
    }
    else
      this._mouseUp()
  },

  @widgetEditable
  _mouseUp() {
    this.setState({ active: false })
    this._cancelRepeater && this._cancelRepeater()
    this._cancelRepeater = null;
  },

  @widgetEnabled
  _focus(focused, e){

    focused && compat.findDOMNode(this.refs.input).focus()

    this.setTimeout('focus', () => {
      if( focused !== this.state.focused){
        notify(this.props[focused ? 'onFocus' : 'onBlur'], e)
        this.setState({ focused: focused })
      }

    }, 0)
  },

  @widgetEditable
  _keyDown(e) {
    var key = e.key;

    console.log('hiii')
    notify(this.props.onKeyDown, [e])

    if (e.defaultPrevented)
      return

    if ( key === 'End'  && isFinite(this.props.max))
      this.change(this.props.max)

    else if ( key === 'Home' && isFinite(this.props.min))
      this.change(this.props.min)

    else if ( key === 'ArrowDown' ){
      e.preventDefault()
      this.decrement()
    }
    else if ( key === 'ArrowUp' ){
      e.preventDefault()
      this.increment()
    }
  },

  increment() {
    return this.step(this.props.step)
  },

  decrement() {
    return this.step(-this.props.step)
  },

  step(amount) {
    var value = (this.props.value || 0) + amount

    var decimals = this.props.precision != null
      ? this.props.precision
      : numberLocalizer.precision(format(this.props))

    this.change(
      decimals != null ? round(value, decimals) : value)

    return value
  },

  change(val) {
    val = this.constrainValue(val)

    if ( this.props.value !== val )
      notify(this.props.onChange, val)
  },

  constrainValue(value){
    var max = this.props.max == null ? Infinity : this.props.max
      , min = this.props.min == null ? -Infinity : this.props.min;

    if( value == null || value === '' )
      return null

    return Math.max(Math.min(value, max), min)
  }

})


export default createUncontrolledWidget(
    NumberPicker, { value: 'onChange' });



// thank you kendo ui core
// https://github.com/telerik/kendo-ui-core/blob/master/src/kendo.core.js#L1036
function round(value, precision) {
  precision = precision || 0;

  value = ('' + value).split('e');
  value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + precision) : precision)));

  value = ('' + value).split('e');
  value = +(value[0] + 'e' + (value[1] ? (+value[1] - precision) : -precision));

  return value.toFixed(precision);
}
