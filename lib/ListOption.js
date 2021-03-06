'use strict';

var babelHelpers = require('./util/babelHelpers.js');

exports.__esModule = true;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

var _createReactClass = require('create-react-class');

var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

var ListOption = _createReactClass2['default']({
  propTypes: {
    dataItem: _propTypes2['default'].any,
    focused: _propTypes2['default'].bool,
    selected: _propTypes2['default'].bool
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var children = _props.children;
    var focused = _props.focused;
    var selected = _props.selected;
    var props = babelHelpers.objectWithoutProperties(_props, ['className', 'children', 'focused', 'selected']);

    var classes = {
      'rw-state-focus': focused,
      'rw-state-selected': selected
    };

    return _react2['default'].createElement(
      'li',
      babelHelpers._extends({
        role: 'option',
        tabIndex: '-1',
        'aria-selected': !!selected,
        className: _classnames2['default']('rw-list-option', className, classes)
      }, props),
      children
    );
  }
});

exports['default'] = ListOption;
module.exports = exports['default'];