'use strict';

var babelHelpers = require('./util/babelHelpers.js');

exports.__esModule = true;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

var _createReactClass = require('create-react-class');

var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

var _WidgetButton = require('./WidgetButton');

var _WidgetButton2 = babelHelpers.interopRequireDefault(_WidgetButton);

exports['default'] = _createReactClass2['default']({
  displayName: 'Header',
  propTypes: {
    label: _propTypes2['default'].string.isRequired,
    labelId: _propTypes2['default'].string,

    upDisabled: _propTypes2['default'].bool.isRequired,
    prevDisabled: _propTypes2['default'].bool.isRequired,
    nextDisabled: _propTypes2['default'].bool.isRequired,
    onViewChange: _propTypes2['default'].func.isRequired,
    onMoveLeft: _propTypes2['default'].func.isRequired,
    onMoveRight: _propTypes2['default'].func.isRequired,

    messages: _propTypes2['default'].shape({
      moveBack: _propTypes2['default'].string,
      moveForward: _propTypes2['default'].string
    })
  },

  mixins: [require('./mixins/PureRenderMixin'), require('./mixins/RtlChildContextMixin')],

  getDefaultProps: function getDefaultProps() {
    return {
      messages: {
        moveBack: 'navigate back',
        moveForward: 'navigate forward'
      }
    };
  },

  render: function render() {
    var _props = this.props;
    var messages = _props.messages;
    var label = _props.label;
    var labelId = _props.labelId;
    var onMoveRight = _props.onMoveRight;
    var onMoveLeft = _props.onMoveLeft;
    var onViewChange = _props.onViewChange;
    var prevDisabled = _props.prevDisabled;
    var upDisabled = _props.upDisabled;
    var nextDisabled = _props.nextDisabled;

    var rtl = this.isRtl();

    return _react2['default'].createElement(
      'div',
      { className: 'rw-header' },
      _react2['default'].createElement(
        _WidgetButton2['default'],
        { className: 'rw-btn-left',
          tabIndex: '-1',
          onClick: onMoveLeft,
          disabled: prevDisabled,
          'aria-disabled': prevDisabled,
          'aria-label': messages.moveBack,
          title: messages.moveBack
        },
        _react2['default'].createElement('i', { 'aria-hidden': 'false',
          className: 'rw-i rw-i-caret-' + (rtl ? 'right' : 'left')
        })
      ),
      _react2['default'].createElement(
        _WidgetButton2['default'],
        {
          id: labelId,
          tabIndex: '-1',
          className: 'rw-btn-view',
          disabled: upDisabled,
          'aria-disabled': upDisabled,
          'aria-live': 'polite',
          'aria-atomic': 'true',
          onClick: onViewChange
        },
        label
      ),
      _react2['default'].createElement(
        _WidgetButton2['default'],
        { className: 'rw-btn-right',
          tabIndex: '-1',
          onClick: onMoveRight,
          disabled: nextDisabled,
          title: messages.moveForward,
          'aria-label': messages.moveForward,
          'aria-disabled': nextDisabled
        },
        _react2['default'].createElement('i', { 'aria-hidden': 'false',
          className: 'rw-i rw-i-caret-' + (rtl ? 'left' : 'right')
        })
      )
    );
  }
});
module.exports = exports['default'];