'use strict';

var babelHelpers = require('./babelHelpers.js');

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

var _localizers = require('./localizers');

var _localizers2 = babelHelpers.interopRequireDefault(_localizers);

var _filter = require('./filter');

var _filter2 = babelHelpers.interopRequireDefault(_filter);

var filterTypes = Object.keys(_filter2['default']).filter(function (i) {
  return i !== 'filter';
});

function getInteractionPropType(key) {
  var types = [_propTypes2['default'].bool, _propTypes2['default'].oneOf([key])],
      propType = _propTypes2['default'].oneOfType(types);

  propType.acceptsArray = _propTypes2['default'].oneOfType(types.concat(_propTypes2['default'].array));

  return propType;
}

module.exports = {

  elementType: createChainableTypeChecker(function (props, propName, componentName) {

    if (typeof props[propName] !== 'function') {
      if (_react2['default'].isValidElement(props[propName])) return new Error('Invalid prop `' + propName + '` specified in  `' + componentName + '`.' + ' Expected an Element `type`, not an actual Element');

      if (typeof props[propName] !== 'string') return new Error('Invalid prop `' + propName + '` specified in  `' + componentName + '`.' + ' Expected an Element `type` such as a tag name or return value of createReactClass(...)');
    }
    return null;
  }),

  numberFormat: createChainableTypeChecker(function () {
    var _localizers$number;

    return (_localizers$number = _localizers2['default'].number).propType.apply(_localizers$number, arguments);
  }),

  dateFormat: createChainableTypeChecker(function () {
    var _localizers$date;

    return (_localizers$date = _localizers2['default'].date).propType.apply(_localizers$date, arguments);
  }),

  disabled: getInteractionPropType('disabled'),
  readOnly: getInteractionPropType('readOnly'),

  accessor: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].func]),

  multiAccessor: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].func, _propTypes2['default'].array]),

  message: _propTypes2['default'].oneOfType([_propTypes2['default'].func, _propTypes2['default'].string]),

  filter: _propTypes2['default'].oneOfType([_propTypes2['default'].func, _propTypes2['default'].bool, _propTypes2['default'].oneOf(filterTypes)])
};

function createChainableTypeChecker(validate) {

  function checkType(isRequired, props, propName, componentName, location) {
    componentName = componentName || '<<anonymous>>';
    if (props[propName] == null) {
      if (isRequired) {
        return new Error('Required prop `' + propName + '` was not specified in  `' + componentName + '`.');
      }
    } else return validate(props, propName, componentName, location);
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}