'use strict';

var babelHelpers = require('./util/babelHelpers.js');

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

var _domHelpersStyle = require('dom-helpers/style');

var _domHelpersStyle2 = babelHelpers.interopRequireDefault(_domHelpersStyle);

var _domHelpersQueryHeight = require('dom-helpers/query/height');

var _domHelpersQueryHeight2 = babelHelpers.interopRequireDefault(_domHelpersQueryHeight);

var _createReactClass = require('create-react-class');

var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

var _utilConfiguration = require('./util/configuration');

var _utilConfiguration2 = babelHelpers.interopRequireDefault(_utilConfiguration);

var _classnames = require('classnames');

var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

var _utilCompat = require('./util/compat');

var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

var _TetherTarget = require('./TetherTarget');

var _TetherTarget2 = babelHelpers.interopRequireDefault(_TetherTarget);

var _util_ = require('./util/_');

var transform = _utilConfiguration2['default'].animate.transform;

function properties(prop, value) {
  var _ref, _ref2;

  var TRANSLATION_MAP = _utilConfiguration2['default'].animate.TRANSLATION_MAP;

  if (TRANSLATION_MAP && TRANSLATION_MAP[prop]) return _ref = {}, _ref[transform] = TRANSLATION_MAP[prop] + '(' + value + ')', _ref;

  return _ref2 = {}, _ref2[prop] = value, _ref2;
}

var PopupContent = _createReactClass2['default']({
  render: function render() {
    var props = this.props;
    var child = props.children;

    if (!child) return _react2['default'].createElement('span', { className: 'rw-popup rw-widget' });

    child = _react2['default'].Children.only(props.children);

    return _react.cloneElement(child, babelHelpers._extends({}, props, {
      className: _classnames2['default'](this.props.className, child.props.className, 'rw-popup rw-widget')
    }));
  }
});

module.exports = _createReactClass2['default']({

  displayName: 'TetheredPopup',

  propTypes: {
    open: _propTypes2['default'].bool,
    dropUp: _propTypes2['default'].bool,
    duration: _propTypes2['default'].number,

    onRequestClose: _propTypes2['default'].func.isRequired,
    onClosing: _propTypes2['default'].func,
    onOpening: _propTypes2['default'].func,
    onClose: _propTypes2['default'].func,
    onOpen: _propTypes2['default'].func,
    onKeyDown: _propTypes2['default'].func,
    dropDownHeight: _propTypes2['default'].number,
    onClickScrim: _propTypes2['default'].func
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

  componentWillMount: function componentWillMount() {
    !this.props.open && (this._initialPosition = true);
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState({
      contentChanged: childKey(nextProps.children) !== childKey(this.props.children)
    });
  },

  componentDidMount: function componentDidMount() {
    var placeholder = this.placeholderRef;
    var placeholderEl = _utilCompat2['default'].findDOMNode(placeholder);
    if (!placeholder) return null;
    var width = placeholderEl.offsetWidth;

    this.setState({ width: width });
  },

  componentDidUpdate: function componentDidUpdate(pvProps) {
    var closing = pvProps.open && !this.props.open,
        opening = !pvProps.open && this.props.open;

    var placeholder = this.placeholderRef;

    var placeholderEl = _utilCompat2['default'].findDOMNode(placeholder);

    var width = placeholderEl && placeholderEl.offsetWidth;

    if (width !== this.state.width) this.setState({ width: width });

    if (opening) this.open();else if (closing) this.close();
  },

  _onClickScrim: function _onClickScrim(e) {
    var _props = this.props;
    var onBlur = _props.onBlur;
    var onClickScrim = _props.onClickScrim;

    onBlur(e);
    onClickScrim && onClickScrim();
  },

  render: function render() {
    var _this = this;

    var _props2 = this.props;
    var className = _props2.className;
    var open = _props2.open;
    var dropUp = _props2.dropUp;
    var propStyle = _props2.style;
    var popupStyle = _props2.popupStyle;
    var onBlur = _props2.onBlur;
    var props = babelHelpers.objectWithoutProperties(_props2, ['className', 'open', 'dropUp', 'style', 'popupStyle', 'onBlur']);

    var opacity = open ? 1 : 0;
    var width = this.state.width;

    return _react2['default'].createElement(
      'div',
      babelHelpers._extends({}, props, {
        style: babelHelpers._extends({}, propStyle),
        className: _classnames2['default'](className, 'rw-popup-container', 'rw-tether', { 'rw-dropup': dropUp })
      }),
      _react2['default'].createElement(
        _TetherTarget2['default'],
        {
          tether: _react2['default'].createElement(
            PopupContent,
            { className: className, tabIndex: 1, ref: function (ref) {
                return _this.contentRef = ref;
              }, style: babelHelpers._extends({ width: width, opacity: opacity }, popupStyle) },
            this.props.children
          ),
          options: {
            attachment: 'bottom right',
            classes: {
              element: 'rw-popup-tether-element'
            }
          }
        },
        open && _react2['default'].createElement('div', { onClick: this._onClickScrim, className: 'rw-tether-scrim' }),
        _react2['default'].createElement('div', { ref: function (ref) {
            return _this.placeholderRef = ref;
          }, style: { width: '100%' } })
      )
    );
  },

  onResize: function onResize() {

    var placeholder = this.placeholderRef;

    if (!placeholder) return false;

    var el = _utilCompat2['default'].findDOMNode(placeholder);
    var width = el.offsetWidth;

    if (width !== this.state.width) this.setState({ width: width });
  },

  reset: function reset() {
    var container = _utilCompat2['default'].findDOMNode(this),
        content = _utilCompat2['default'].findDOMNode(this.contentRef),
        style = { display: 'block', overflow: 'hidden' };

    _domHelpersStyle2['default'](container, style);
    _domHelpersStyle2['default'](content, properties('opacity', 0));
  },

  open: function open() {
    var self = this,
        anim = _utilCompat2['default'].findDOMNode(this),
        contentEl = _utilCompat2['default'].findDOMNode(this.contentRef);

    var _props3 = this.props;
    var onOpen = _props3.onOpen;
    var onKeyDown = _props3.onKeyDown;
    var getTetherFocus = _props3.getTetherFocus;

    var focusComponent = _utilCompat2['default'].findDOMNode(getTetherFocus());

    if (focusComponent) {
      focusComponent.addEventListener('keydown', onKeyDown);
      focusComponent.focus();
    }

    this._isOpening = true;

    if (this._initialPosition) {
      this._initialPosition = false;
      this.reset();
    }

    this.props.onOpening();

    anim.className += ' rw-popup-animating';

    _utilConfiguration2['default'].animate(contentEl, { opacity: 1 }, self.props.duration, 'ease', function () {
      if (!self._isOpening) return;

      anim.className = anim.className.replace(/ ?rw-popup-animating/g, '');
      anim.style.overflofw = 'visible';

      if (onOpen) onOpen();
    });
  },

  close: function close(dur) {
    var self = this,
        el = _utilCompat2['default'].findDOMNode(this.contentRef),
        anim = _utilCompat2['default'].findDOMNode(this);

    this._isOpening = false;
    this.props.onClosing();

    if (anim) {
      anim.style.overflow = 'hidden';
      anim.className += ' rw-popup-animating';
      _utilConfiguration2['default'].animate(el, { opacity: 0 }, dur === undefined ? this.props.duration : dur, 'ease', function () {
        if (self._isOpening) return;
        anim.className = anim.className.replace(/ ?rw-popup-animating/g, '');
      });
    }
    self.props.onClose();
  }

});

function childKey(children) {
  var nextChildMapping = _react2['default'].Children.map(children, function (c) {
    return c;
  });
  for (var key in nextChildMapping) return key;
}