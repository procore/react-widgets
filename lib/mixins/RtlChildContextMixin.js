'use strict';

var babelHelpers = require('../util/babelHelpers.js');

exports.__esModule = true;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

exports['default'] = {

  contextTypes: {
    isRtl: _propTypes2['default'].bool
  },

  isRtl: function isRtl() {
    return !!this.context.isRtl;
  }

};
module.exports = exports['default'];