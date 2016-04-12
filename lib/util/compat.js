'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _version = _react2.default.version.split('.').map(parseFloat);

module.exports = {
  version: function version() {
    return _version;
  },
  findDOMNode: function findDOMNode(component) {
    return ReactDOM.findDOMNode(component);
  },
  batchedUpdates: function batchedUpdates(cb) {
    ReactDOM.unstable_batchedUpdates(cb);
  }
};