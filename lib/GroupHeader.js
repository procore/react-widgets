'use strict';

var babelHelpers = require('./util/babelHelpers.js');

exports.__esModule = true;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

var _utilPropTypes = require('./util/propTypes');

var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

function GroupHeader(props) {
  var GroupComponent = props.groupComponent;
  var label = props.label;

  return _react2['default'].createElement(
    'li',
    {
      className: props.className,
      id: props.id,
      role: 'separator',
      tabIndex: '-1'
    },
    GroupComponent ? _react2['default'].createElement(GroupComponent, { item: label }) : label
  );
}

GroupHeader.propTypes = {
  className: _propTypes2['default'].string,
  groupComponent: _utilPropTypes2['default'].elementType,
  id: _propTypes2['default'].string,
  key: _propTypes2['default'].string,
  label: _propTypes2['default'].string
};

exports['default'] = GroupHeader;
module.exports = exports['default'];