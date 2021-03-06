'use strict';

var babelHelpers = require('./util/babelHelpers.js');

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

var _createReactClass = require('create-react-class');

var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

var _domHelpersStyle = require('dom-helpers/style');

var _domHelpersStyle2 = babelHelpers.interopRequireDefault(_domHelpersStyle);

var _domHelpersQueryHeight = require('dom-helpers/query/height');

var _domHelpersQueryHeight2 = babelHelpers.interopRequireDefault(_domHelpersQueryHeight);

var _utilConfiguration = require('./util/configuration');

var _utilConfiguration2 = babelHelpers.interopRequireDefault(_utilConfiguration);

var _classnames = require('classnames');

var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

var _utilCompat = require('./util/compat');

var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

var transform = _utilConfiguration2['default'].animate.transform;

function properties(prop, value) {
  var _ref, _ref2;

  var TRANSLATION_MAP = _utilConfiguration2['default'].animate.TRANSLATION_MAP;

  if (TRANSLATION_MAP && TRANSLATION_MAP[prop]) return _ref = {}, _ref[transform] = TRANSLATION_MAP[prop] + '(' + value + ')', _ref;

  return _ref2 = {}, _ref2[prop] = value, _ref2;
}

var PopupContent = _createReactClass2['default']({
  render: function render() {
    var child = this.props.children;

    if (!child) return _react2['default'].createElement('span', { className: 'rw-popup rw-widget' });

    child = _react2['default'].Children.only(this.props.children);

    return _react.cloneElement(child, {
      className: _classnames2['default'](child.props.className, 'rw-popup rw-widget')
    });
  }
});

module.exports = _createReactClass2['default']({

  displayName: 'Popup',

  propTypes: {
    open: _propTypes2['default'].bool,
    dropUp: _propTypes2['default'].bool,
    duration: _propTypes2['default'].number,

    onRequestClose: _propTypes2['default'].func.isRequired,
    onClosing: _propTypes2['default'].func,
    onOpening: _propTypes2['default'].func,
    onClose: _propTypes2['default'].func,
    onOpen: _propTypes2['default'].func
  },

  getInitialState: function getInitialState() {
    return {};
  },

  getDefaultProps: function getDefaultProps() {
    return {
      duration: 200,
      open: false,
      onClosing: function onClosing() {},
      onOpening: function onOpening() {},
      onClose: function onClose() {},
      onOpen: function onOpen() {}
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

  componentDidUpdate: function componentDidUpdate(pvProps) {
    var closing = pvProps.open && !this.props.open,
        opening = !pvProps.open && this.props.open,
        open = this.props.open;

    if (opening) this.open();else if (closing) this.close();else if (open) this.height();
  },

  render: function render() {
    var _this = this;

    var _props = this.props;
    var className = _props.className;
    var open = _props.open;
    var dropUp = _props.dropUp;
    var props = babelHelpers.objectWithoutProperties(_props, ['className', 'open', 'dropUp']);
    var display = open ? 'block' : void 0;

    if (this._initialPosition) {
      display = 'none';
    }

    return _react2['default'].createElement(
      'div',
      babelHelpers._extends({}, props, {
        style: babelHelpers._extends({
          display: display,
          height: this.state.height
        }, props.style),
        className: _classnames2['default'](className, 'rw-popup-container', { 'rw-dropup': dropUp })
      }),
      _react2['default'].createElement(
        PopupContent,
        { ref: function (ref) {
            return _this.contentRef = ref;
          } },
        this.props.children
      )
    );
  },

  reset: function reset() {
    var container = _utilCompat2['default'].findDOMNode(this),
        content = _utilCompat2['default'].findDOMNode(this.contentRef),
        style = { display: 'block', overflow: 'hidden' };

    _domHelpersStyle2['default'](container, style);
    this.height();
    _domHelpersStyle2['default'](content, properties('top', this.props.dropUp ? '100%' : '-100%'));
  },

  height: function height() {
    var el = _utilCompat2['default'].findDOMNode(this),
        content = _utilCompat2['default'].findDOMNode(this.contentRef),
        margin = parseInt(_domHelpersStyle2['default'](content, 'margin-top'), 10) + parseInt(_domHelpersStyle2['default'](content, 'margin-bottom'), 10);

    var height = _domHelpersQueryHeight2['default'](content) + (isNaN(margin) ? 0 : margin);

    if (this.state.height !== height) {
      el.style.height = height + 'px';
      this.setState({ height: height });
    }
  },

  open: function open() {
    var self = this,
        anim = _utilCompat2['default'].findDOMNode(this),
        el = _utilCompat2['default'].findDOMNode(this.contentRef);

    this.ORGINAL_POSITION = _domHelpersStyle2['default'](el, 'position');
    this._isOpening = true;

    if (this._initialPosition) {
      this._initialPosition = false;
      this.reset();
    } else this.height();

    this.props.onOpening();

    anim.className += ' rw-popup-animating';
    el.style.position = 'absolute';

    _utilConfiguration2['default'].animate(el, { top: 0 }, self.props.duration, 'ease', function () {
      if (!self._isOpening) return;

      anim.className = anim.className.replace(/ ?rw-popup-animating/g, '');

      el.style.position = self.ORGINAL_POSITION;
      anim.style.overflow = 'visible';
      self.ORGINAL_POSITION = null;

      self.props.onOpen();
    });
  },

  close: function close(dur) {
    var self = this,
        el = _utilCompat2['default'].findDOMNode(this.contentRef),
        anim = _utilCompat2['default'].findDOMNode(this);

    this.ORGINAL_POSITION = _domHelpersStyle2['default'](el, 'position');

    this._isOpening = false;
    this.height();
    this.props.onClosing();

    anim.style.overflow = 'hidden';
    anim.className += ' rw-popup-animating';
    el.style.position = 'absolute';

    _utilConfiguration2['default'].animate(el, { top: this.props.dropUp ? '100%' : '-100%' }, dur === undefined ? this.props.duration : dur, 'ease', function () {
      if (self._isOpening) return;

      el.style.position = self.ORGINAL_POSITION;
      anim.className = anim.className.replace(/ ?rw-popup-animating/g, '');

      anim.style.display = 'none';
      self.ORGINAL_POSITION = null;
      self.props.onClose();
    });
  }

});

function childKey(children) {
  var nextChildMapping = _react2['default'].Children.map(children, function (c) {
    return c;
  });
  for (var key in nextChildMapping) return key;
}