'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _tether = require('tether');

var _tether2 = _interopRequireDefault(_tether);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TetherElement = function () {
	function TetherElement(component, options) {
		_classCallCheck(this, TetherElement);

		this.component = component;
		this.node = document.createElement('div');
		this.node.style.position = 'absolute';
		document.body.appendChild(this.node);
		this.tether = new _tether2.default(_extends({}, options, { element: this.node }));
		this.update(component);
	}

	TetherElement.prototype.update = function update() {
		var _this = this;

		var component = arguments.length <= 0 || arguments[0] === undefined ? this.component : arguments[0];


		(0, _reactDom.render)(component, this.node, function () {
			return _this.tether.position();
		});

		this.component = component;
	};

	TetherElement.prototype.destroy = function destroy() {
		(0, _reactDom.unmountComponentAtNode)(this.node);
		this.node.parentNode.removeChild(this.node);
		this.tether.destroy();
	};

	return TetherElement;
}();

exports.default = TetherElement;
module.exports = exports['default'];