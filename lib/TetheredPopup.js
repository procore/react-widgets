'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('dom-helpers/style');

var _style2 = _interopRequireDefault(_style);

var _height = require('dom-helpers/query/height');

var _height2 = _interopRequireDefault(_height);

var _configuration = require('./util/configuration');

var _configuration2 = _interopRequireDefault(_configuration);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _compat = require('./util/compat');

var _compat2 = _interopRequireDefault(_compat);

var _TetherTarget = require('./TetherTarget');

var _TetherTarget2 = _interopRequireDefault(_TetherTarget);

var _ = require('./util/_');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var transform = _configuration2.default.animate.transform;

function properties(prop, value) {
  var _ref, _ref2;

  var TRANSLATION_MAP = _configuration2.default.animate.TRANSLATION_MAP;

  if (TRANSLATION_MAP && TRANSLATION_MAP[prop]) return _ref = {}, _ref[transform] = TRANSLATION_MAP[prop] + '(' + value + ')', _ref;

  return _ref2 = {}, _ref2[prop] = value, _ref2;
}

var PopupContent = _react2.default.createClass({
  displayName: 'PopupContent',

  render: function render() {
    var props = this.props;
    var child = props.children;

    if (!child) return _react2.default.createElement('span', { className: 'rw-popup rw-widget' });

    child = _react2.default.Children.only(props.children);

    return (0, _react.cloneElement)(child, _extends({}, props, {
      className: (0, _classnames2.default)(this.props.className, child.props.className, 'rw-popup rw-widget')
    }));
  }
});

module.exports = _react2.default.createClass({

  displayName: 'TetheredPopup',

  propTypes: {
    open: _react2.default.PropTypes.bool,
    dropUp: _react2.default.PropTypes.bool,
    duration: _react2.default.PropTypes.number,

    onRequestClose: _react2.default.PropTypes.func.isRequired,
    onClosing: _react2.default.PropTypes.func,
    onOpening: _react2.default.PropTypes.func,
    onClose: _react2.default.PropTypes.func,
    onOpen: _react2.default.PropTypes.func,
    onKeyDown: _react2.default.PropTypes.func,
    dropDownHeight: _react2.default.PropTypes.number,
    onClickScrim: _react2.default.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      duration: 200,
      open: false,
      onClosing: function onClosing() {},
      onOpening: function onOpening() {},
      onClose: function onClose() {},
      onOpen: function onOpen() {},
      onClickScrim: function onClickScrim() {}
    };
  },
  getInitialState: function getInitialState() {
    return {
      width: 'auto'
    };
  },


  // componentDidMount(){
  //   !this.props.open && this.close(0)
  // },
  componentWillMount: function componentWillMount() {
    !this.props.open && (this._initialPosition = true);
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState({
      contentChanged: childKey(nextProps.children) !== childKey(this.props.children)
    });
  },
  componentDidMount: function componentDidMount() {
    var placeholder = this.refs.placeholder;


    var placeholderEl = _compat2.default.findDOMNode(placeholder);
    if (!placeholder) return null;
    var width = placeholderEl.offsetWidth;

    this.setState({ width: width });
  },
  componentDidUpdate: function componentDidUpdate(pvProps) {
    var closing = pvProps.open && !this.props.open,
        opening = !pvProps.open && this.props.open;

    var placeholder = this.refs.placeholder;


    var placeholderEl = _compat2.default.findDOMNode(placeholder);

    if (!placeholderEl) return null;

    var width = placeholderEl.offsetWidth;

    if (width !== this.state.width) this.setState({ width: width });else if (opening) this.open();else if (closing) this.close();
  },
  _onClickScrim: function _onClickScrim(e) {
    var _props = this.props;
    var onBlur = _props.onBlur;
    var onClickScrim = _props.onClickScrim;

    onBlur(e);
    onClickScrim && onClickScrim();
  },
  render: function render() {
    var _props2 = this.props;
    var className = _props2.className;
    var open = _props2.open;
    var dropUp = _props2.dropUp;
    var propStyle = _props2.style;
    var onBlur = _props2.onBlur;

    var props = _objectWithoutProperties(_props2, ['className', 'open', 'dropUp', 'style', 'onBlur']);

    var opacity = open ? 1 : 0;
    var width = this.state.width;


    if (!open) return null;

    return _react2.default.createElement(
      'div',
      _extends({}, props, {
        style: _extends({}, propStyle),
        className: (0, _classnames2.default)(className, 'rw-popup-container', 'rw-tether', { 'rw-dropup': dropUp })
      }),
      _react2.default.createElement(
        _TetherTarget2.default,
        {
          tether: _react2.default.createElement(
            PopupContent,
            { className: className, tabIndex: 1, ref: 'content', style: { width: width, opacity: opacity } },
            this.props.children
          ),
          options: {
            attachment: 'bottom right',
            classes: {
              element: 'rw-popup-tether-element'
            }
          }
        },
        open && _react2.default.createElement('div', { onClick: this._onClickScrim, className: 'rw-tether-scrim' }),
        _react2.default.createElement('div', { ref: 'placeholder', style: { width: '100%' } })
      )
    );
  },
  onResize: function onResize() {
    var placeholder = this.refs.placeholder;


    if (!placeholder) return false;

    var el = _compat2.default.findDOMNode(placeholder);
    var width = el.offsetWidth;

    if (width !== this.state.width) this.setState({ width: width });
  },
  reset: function reset() {
    var container = _compat2.default.findDOMNode(this),
        content = _compat2.default.findDOMNode(this.refs.content),
        style = { display: 'block', overflow: 'hidden' };

    (0, _style2.default)(container, style);
    (0, _style2.default)(content, properties('opacity', 0));
  },
  open: function open() {
    var content = this.refs.content;

    var self = this,
        anim = _compat2.default.findDOMNode(this),
        contentEl = _compat2.default.findDOMNode(content);

    var _props3 = this.props;
    var onOpen = _props3.onOpen;
    var onKeyDown = _props3.onKeyDown;
    var getTetherFocus = _props3.getTetherFocus;


    var focusComponent = content;
    var focusEl = void 0;

    if ((0, _.isFunction)(getTetherFocus)) focusComponent = getTetherFocus();
    if (focusComponent) focusEl = _compat2.default.findDOMNode(focusComponent);

    this._isOpening = true;

    if (this._initialPosition) {
      this._initialPosition = false;
      this.reset();
    }

    this.props.onOpening();

    anim.className += ' rw-popup-animating';

    _configuration2.default.animate(contentEl, { opacity: 1 }, self.props.duration, 'ease', function () {
      if (!self._isOpening) return;

      anim.className = anim.className.replace(/ ?rw-popup-animating/g, '');
      anim.style.overflofw = 'visible';

      if (onOpen) onOpen();

      if (!focusEl) return false;

      focusEl.addEventListener('keydown', onKeyDown);
      focusEl.focus();
    });
  },
  close: function close(dur) {
    var self = this,
        el = _compat2.default.findDOMNode(this.refs.content),
        anim = _compat2.default.findDOMNode(this);

    this._isOpening = false;
    this.props.onClosing();

    anim.style.overflow = 'hidden';
    anim.className += ' rw-popup-animating';

    _configuration2.default.animate(el, { opacity: 0 }, dur === undefined ? this.props.duration : dur, 'ease', function () {
      if (self._isOpening) return;
      anim.className = anim.className.replace(/ ?rw-popup-animating/g, '');
      self.props.onClose();
    });
  }
});

function childKey(children) {
  var nextChildMapping = _react2.default.Children.map(children, function (c) {
    return c;
  });
  for (var key in nextChildMapping) {
    return key;
  }
}