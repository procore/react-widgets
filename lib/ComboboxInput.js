'use strict';

var babelHelpers = require('./util/babelHelpers.js');

exports.__esModule = true;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

var _createReactClass = require('create-react-class');

var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

var _utilCaret = require('./util/caret');

var _utilCaret2 = babelHelpers.interopRequireDefault(_utilCaret);

var _utilCompat = require('./util/compat');

var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

exports['default'] = _createReactClass2['default']({

  displayName: 'ComboboxInput',

  propTypes: {
    value: _propTypes2['default'].string,
    onChange: _propTypes2['default'].func.isRequired
  },

  componentDidUpdate: function componentDidUpdate() {
    var input = _utilCompat2['default'].findDOMNode(this),
        val = this.props.value;

    if (this.isSuggesting()) {
      var start = val.toLowerCase().indexOf(this._last.toLowerCase()) + this._last.length,
          end = val.length - start;

      if (start >= 0) {
        _utilCaret2['default'](input, start, start + end);
      }
    }
  },

  getDefaultProps: function getDefaultProps() {
    return {
      value: ''
    };
  },

  render: function render() {
    return _react2['default'].createElement('input', babelHelpers._extends({}, this.props, {
      type: 'text',
      'aria-disabled': this.props.disabled,
      'aria-readonly': this.props.readOnly,
      'aria-autocomplete': 'none',
      autoComplete: 'off',
      className: this.props.className + ' rw-input',
      onKeyDown: this.props.onKeyDown,
      onChange: this._change,
      value: this.props.value == null ? '' : this.props.value
    }));
  },

  isSuggesting: function isSuggesting() {
    var val = this.props.value,
        isSuggestion = this._last != null && val.toLowerCase().indexOf(this._last.toLowerCase()) !== -1;

    return this.props.suggest && isSuggestion;
  },

  accept: function accept(removeCaret) {
    var val = _utilCompat2['default'].findDOMNode(this).value || '',
        end = val.length;

    this._last = null;
    removeCaret && _utilCaret2['default'](_utilCompat2['default'].findDOMNode(this), end, end);
  },

  _change: function _change(e) {
    var val = e.target.value,
        pl = !!this.props.placeholder;

    // IE fires input events when setting/unsetting placeholders.
    // issue #112
    if (pl && !val && val === (this.props.value || '')) return;

    this._last = val;
    this.props.onChange(e, val);
  },

  focus: function focus() {
    _utilCompat2['default'].findDOMNode(this).focus();
  }
});
module.exports = exports['default'];