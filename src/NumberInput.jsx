import React from 'react';
import PropTypes from 'prop-types';
import CustomPropTypes from './util/propTypes';
import { number as numberLocalizer }  from './util/localizers';

var format = props => numberLocalizer.getFormat('default', props.format)

export default React.createClass({

  displayName: 'NumberPickerInput',

  propTypes: {
    value:        PropTypes.number,
    placeholder: PropTypes.string,

    format:       CustomPropTypes.numberFormat,
    parse:        PropTypes.func.isRequired,
    culture:      PropTypes.string,

    min:          PropTypes.number,

    onChange:     PropTypes.func.isRequired,
    onKeyDown:    PropTypes.func
  },

  getDefaultProps(){
    return {
      value: null,
      editing: false,
      parse: (number, culture) => numberLocalizer.parse(number, culture)
    }
  },

  getDefaultState(props){
    var value = props.editing
          ? props.value
          : formatNumber(props.value, format(props), props.culture)

    if ( value == null || isNaN(props.value) )
      value = ''

    return {
      stringValue: '' + value
    }
  },

  getInitialState() {
    return this.getDefaultState(this.props)
  },

  componentWillReceiveProps(nextProps) {
    this.setState(
      this.getDefaultState(nextProps))
  },

  render(){
    var value = this.state.stringValue;

    return (
      <input {...this.props}
        type='text'
        className='rw-input'
        onChange={this._change}
        onBlur={this._finish}
        aria-disabled={this.props.disabled}
        aria-readonly={this.props.readOnly}
        disabled={this.props.disabled}
        readOnly={this.props.readOnly}
        placeholder={this.props.placeholder}
        value={value}/>
    )
  },

  _change(e){
    var val = e.target.value
      , number = this.props.parse(e.target.value, this.props.culture)
      , valid = this.isValid(number);

    if( val == null || val.trim() === '' || val.trim() === '-')
      return this.props.onChange(null)

    if( valid && number !== this.props.value && !this.isAtDelimiter(number, val))
      return this.props.onChange(number)

    //console.log(val !== 0 && !val)
    if ( !isNaN(number) || this.isAtDelimiter(number, val))
      this.current(e.target.value)
  },

  _finish() {
    var str = this.state.stringValue
      , number = this.props.parse(str, this.props.culture);

    // if number is below the min
    // we need to flush low values and decimal stops, onBlur means i'm done inputing
    if(!isNaN(number) && (number < this.props.min || this.isAtDelimiter(number, str)) ) {
      this.props.onChange(number)
    }
  },

  isAtDelimiter(num, str){
    var next;

    if ( str.length <= 1) return false

    next = this.props.parse(
      str.substr(0, str.length - 1), this.props.culture)

    return typeof next === 'number'
        && !isNaN(next)
        && next === num
  },

  isValid(num) {
    if (typeof num !== 'number' || isNaN(num))
      return false
    return num >= this.props.min
  },

  //this intermediate state is for when one runs into the decimal or are typing the number
  current(val){
    this.setState({ stringValue: val })
  }

});


// function parseLocaleFloat(number, parser, culture) {
//   if ( typeof format === 'function')
//     return format(number, culture)

//   return config.globalize.parseFloat(number, 10, culture)
// }

function formatNumber(number, format, culture){
  return numberLocalizer.format(number, format, culture)
}
