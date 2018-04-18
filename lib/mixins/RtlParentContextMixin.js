'use strict';

var babelHelpers = require('../util/babelHelpers.js');

var _propTypes = require('prop-types');

var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

var React = require('react');

module.exports = {

  propTypes: {
    isRtl: _propTypes2['default'].bool
  },

  contextTypes: {
    isRtl: _propTypes2['default'].bool
  },

  childContextTypes: {
    isRtl: _propTypes2['default'].bool
  },

  getChildContext: function getChildContext() {
    return {
      isRtl: this.props.isRtl || this.context && this.context.isRtl
    };
  },

  isRtl: function isRtl() {
    return !!(this.props.isRtl || this.context && this.context.isRtl);
  }

};