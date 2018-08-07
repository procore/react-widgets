/*! (c) 2018 Jason Quense | https://github.com/jquense/react-widgets/blob/master/License.txt */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define([, ], factory);
	else if(typeof exports === 'object')
		exports["ReactWidgets"] = factory(require("react"), require("react-dom"));
	else
		root["ReactWidgets"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_21__, __WEBPACK_EXTERNAL_MODULE_48__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var babelHelpers = __webpack_require__(2);

	var configure = __webpack_require__(3);

	if (process.env.NODE_ENV !== 'production') {
	  [Array.prototype.some, Array.prototype.filter, Array.prototype.reduce].forEach(function (method) {
	    if (!method) throw new Error('One or more ES5 features is not available to ReactWidgets: http://jquense.github.io/react-widgets/docs/#/getting-started/browser');
	  });
	}

	module.exports = babelHelpers._extends({}, configure, {
	  DropdownList: __webpack_require__(31),
	  Combobox: __webpack_require__(78),
	  Calendar: __webpack_require__(82),
	  DateTimePicker: __webpack_require__(95),
	  NumberPicker: __webpack_require__(98),
	  Multiselect: __webpack_require__(101),
	  SelectList: __webpack_require__(104),
	  ListMultiGroupable: __webpack_require__(105),

	  utils: {
	    ReplaceTransitionGroup: __webpack_require__(93),
	    SlideTransition: __webpack_require__(92)
	  }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === "object") {
	    factory(exports);
	  } else {
	    factory(root.babelHelpers = {});
	  }
	})(this, function (global) {
	  var babelHelpers = global;

	  babelHelpers.inherits = function (subClass, superClass) {
	    if (typeof superClass !== "function" && superClass !== null) {
	      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	    }

	    subClass.prototype = Object.create(superClass && superClass.prototype, {
	      constructor: {
	        value: subClass,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	  };

	  babelHelpers.createClass = (function () {
	    function defineProperties(target, props) {
	      for (var i = 0; i < props.length; i++) {
	        var descriptor = props[i];
	        descriptor.enumerable = descriptor.enumerable || false;
	        descriptor.configurable = true;
	        if ("value" in descriptor) descriptor.writable = true;
	        Object.defineProperty(target, descriptor.key, descriptor);
	      }
	    }

	    return function (Constructor, protoProps, staticProps) {
	      if (protoProps) defineProperties(Constructor.prototype, protoProps);
	      if (staticProps) defineProperties(Constructor, staticProps);
	      return Constructor;
	    };
	  })();

	  babelHelpers.createDecoratedObject = function (descriptors) {
	    var target = {};

	    for (var i = 0; i < descriptors.length; i++) {
	      var descriptor = descriptors[i];
	      var decorators = descriptor.decorators;
	      var key = descriptor.key;
	      delete descriptor.key;
	      delete descriptor.decorators;
	      descriptor.enumerable = true;
	      descriptor.configurable = true;
	      if ("value" in descriptor || descriptor.initializer) descriptor.writable = true;

	      if (decorators) {
	        for (var f = 0; f < decorators.length; f++) {
	          var decorator = decorators[f];

	          if (typeof decorator === "function") {
	            descriptor = decorator(target, key, descriptor) || descriptor;
	          } else {
	            throw new TypeError("The decorator for method " + descriptor.key + " is of the invalid type " + typeof decorator);
	          }
	        }
	      }

	      if (descriptor.initializer) {
	        descriptor.value = descriptor.initializer.call(target);
	      }

	      Object.defineProperty(target, key, descriptor);
	    }

	    return target;
	  };

	  babelHelpers.objectWithoutProperties = function (obj, keys) {
	    var target = {};

	    for (var i in obj) {
	      if (keys.indexOf(i) >= 0) continue;
	      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	      target[i] = obj[i];
	    }

	    return target;
	  };

	  babelHelpers.interopRequireWildcard = function (obj) {
	    if (obj && obj.__esModule) {
	      return obj;
	    } else {
	      var newObj = {};

	      if (obj != null) {
	        for (var key in obj) {
	          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	        }
	      }

	      newObj["default"] = obj;
	      return newObj;
	    }
	  };

	  babelHelpers.interopRequireDefault = function (obj) {
	    return obj && obj.__esModule ? obj : {
	      "default": obj
	    };
	  };

	  babelHelpers._extends = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];

	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }

	    return target;
	  };

	  babelHelpers.classCallCheck = function (instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	    }
	  };
	})

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _utilConfiguration = __webpack_require__(4);

	var _utilConfiguration2 = babelHelpers.interopRequireDefault(_utilConfiguration);

	var _utilLocalizers = __webpack_require__(18);

	var localizers = babelHelpers.interopRequireWildcard(_utilLocalizers);
	exports['default'] = {

	  setAnimate: function setAnimate(animatefn) {
	    _utilConfiguration2['default'].animate = animatefn;
	  },

	  setLocalizers: function setLocalizers(_ref) {
	    var date = _ref.date;
	    var number = _ref.number;

	    date && this.setDateLocalizer(date);
	    number && this.setNumberLocalizer(number);
	  },

	  setDateLocalizer: localizers.setDate,

	  setNumberLocalizer: localizers.setNumber
	};
	module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _domAnimate = __webpack_require__(5);

	var _domAnimate2 = babelHelpers.interopRequireDefault(_domAnimate);

	exports['default'] = { animate: _domAnimate2['default'] };
	module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;
	exports['default'] = animate;

	var _domHelpersUtilHyphenate = __webpack_require__(6);

	var _domHelpersUtilHyphenate2 = babelHelpers.interopRequireDefault(_domHelpersUtilHyphenate);

	var _domHelpersStyle = __webpack_require__(7);

	var _domHelpersStyle2 = babelHelpers.interopRequireDefault(_domHelpersStyle);

	var _domHelpersEventsOn = __webpack_require__(14);

	var _domHelpersEventsOn2 = babelHelpers.interopRequireDefault(_domHelpersEventsOn);

	var _domHelpersEventsOff = __webpack_require__(16);

	var _domHelpersEventsOff2 = babelHelpers.interopRequireDefault(_domHelpersEventsOff);

	var _domHelpersTransitionProperties = __webpack_require__(17);

	var _domHelpersTransitionProperties2 = babelHelpers.interopRequireDefault(_domHelpersTransitionProperties);

	var has = Object.prototype.hasOwnProperty,
	    reset = {},
	    TRANSLATION_MAP = {
	  left: 'translateX',
	  right: 'translateX',
	  top: 'translateY',
	  bottom: 'translateY'
	};

	reset[_domHelpersTransitionProperties2['default'].property] = reset[_domHelpersTransitionProperties2['default'].duration] = reset[_domHelpersTransitionProperties2['default'].delay] = reset[_domHelpersTransitionProperties2['default'].timing] = '';

	animate.endEvent = _domHelpersTransitionProperties2['default'].end;
	animate.transform = _domHelpersTransitionProperties2['default'].transform;
	animate.TRANSLATION_MAP = TRANSLATION_MAP;

	// super lean animate function for transitions
	// doesn't support all translations to keep it matching the jquery API
	/**
	 * code in part from: Zepto 1.1.4 | zeptojs.com/license
	 */

	function animate(node, properties, duration, easing, callback) {
	  var cssProperties = [],
	      fakeEvent = { target: node, currentTarget: node },
	      cssValues = {},
	      transforms = '',
	      fired;

	  if (typeof easing === 'function') callback = easing, easing = null;

	  if (!_domHelpersTransitionProperties2['default'].end) duration = 0;
	  if (duration === undefined) duration = 200;

	  for (var key in properties) if (has.call(properties, key)) {
	    if (/(top|bottom)/.test(key)) transforms += TRANSLATION_MAP[key] + '(' + properties[key] + ') ';else {
	      cssValues[key] = properties[key];
	      cssProperties.push(_domHelpersUtilHyphenate2['default'](key));
	    }
	  }

	  if (transforms) {
	    cssValues[_domHelpersTransitionProperties2['default'].transform] = transforms;
	    cssProperties.push(_domHelpersTransitionProperties2['default'].transform);
	  }

	  if (duration > 0) {
	    cssValues[_domHelpersTransitionProperties2['default'].property] = cssProperties.join(', ');
	    cssValues[_domHelpersTransitionProperties2['default'].duration] = duration / 1000 + 's';
	    cssValues[_domHelpersTransitionProperties2['default'].delay] = 0 + 's';
	    cssValues[_domHelpersTransitionProperties2['default'].timing] = easing || 'linear';

	    _domHelpersEventsOn2['default'](node, _domHelpersTransitionProperties2['default'].end, done);

	    setTimeout(function () {
	      if (!fired) done(fakeEvent);
	    }, duration + 500);
	  }

	  node.clientLeft; // trigger page reflow
	  _domHelpersStyle2['default'](node, cssValues);

	  if (duration <= 0) setTimeout(done.bind(null, fakeEvent), 0);

	  function done(event) {
	    if (event.target !== event.currentTarget) return;

	    fired = true;
	    _domHelpersEventsOff2['default'](event.target, _domHelpersTransitionProperties2['default'].end, done);
	    _domHelpersStyle2['default'](node, reset);
	    callback && callback.call(this);
	  }
	}

	module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';

	var rUpper = /([A-Z])/g;

	module.exports = function hyphenate(string) {
	  return string.replace(rUpper, '-$1').toLowerCase();
	};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var camelize = __webpack_require__(8),
	    hyphenate = __webpack_require__(10),
	    _getComputedStyle = __webpack_require__(11),
	    removeStyle = __webpack_require__(13);

	var has = Object.prototype.hasOwnProperty;

	module.exports = function style(node, property, value) {
	  var css = '',
	      props = property;

	  if (typeof property === 'string') {

	    if (value === undefined) return node.style[camelize(property)] || _getComputedStyle(node).getPropertyValue(hyphenate(property));else (props = {})[property] = value;
	  }

	  for (var key in props) if (has.call(props, key)) {
	    !props[key] && props[key] !== 0 ? removeStyle(node, hyphenate(key)) : css += hyphenate(key) + ':' + props[key] + ';';
	  }

	  node.style.cssText += ';' + css;
	};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/camelizeStyleName.js
	 */

	'use strict';
	var camelize = __webpack_require__(9);
	var msPattern = /^-ms-/;

	module.exports = function camelizeStyleName(string) {
	  return camelize(string.replace(msPattern, 'ms-'));
	};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	"use strict";

	var rHyphen = /-(.)/g;

	module.exports = function camelize(string) {
	  return string.replace(rHyphen, function (_, chr) {
	    return chr.toUpperCase();
	  });
	};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/hyphenateStyleName.js
	 */

	"use strict";

	var hyphenate = __webpack_require__(6);
	var msPattern = /^ms-/;

	module.exports = function hyphenateStyleName(string) {
	  return hyphenate(string).replace(msPattern, "-ms-");
	};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(12);

	var _utilCamelizeStyle = __webpack_require__(8);

	var _utilCamelizeStyle2 = babelHelpers.interopRequireDefault(_utilCamelizeStyle);

	var rposition = /^(top|right|bottom|left)$/;
	var rnumnonpx = /^([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/i;

	module.exports = function _getComputedStyle(node) {
	  if (!node) throw new TypeError('No Element passed to `getComputedStyle()`');
	  var doc = node.ownerDocument;

	  return 'defaultView' in doc ? doc.defaultView.opener ? node.ownerDocument.defaultView.getComputedStyle(node, null) : window.getComputedStyle(node, null) : { //ie 8 "magic" from: https://github.com/jquery/jquery/blob/1.11-stable/src/css/curCSS.js#L72
	    getPropertyValue: function getPropertyValue(prop) {
	      var style = node.style;

	      prop = (0, _utilCamelizeStyle2['default'])(prop);

	      if (prop == 'float') prop = 'styleFloat';

	      var current = node.currentStyle[prop] || null;

	      if (current == null && style && style[prop]) current = style[prop];

	      if (rnumnonpx.test(current) && !rposition.test(prop)) {
	        // Remember the original values
	        var left = style.left;
	        var runStyle = node.runtimeStyle;
	        var rsLeft = runStyle && runStyle.left;

	        // Put in the new values to get a computed value out
	        if (rsLeft) runStyle.left = node.currentStyle.left;

	        style.left = prop === 'fontSize' ? '1em' : current;
	        current = style.pixelLeft + 'px';

	        // Revert the changed values
	        style.left = left;
	        if (rsLeft) runStyle.left = rsLeft;
	      }

	      return current;
	    }
	  };
	};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === "object") {
	    factory(exports);
	  } else {
	    factory(root.babelHelpers = {});
	  }
	})(this, function (global) {
	  var babelHelpers = global;

	  babelHelpers.interopRequireDefault = function (obj) {
	    return obj && obj.__esModule ? obj : {
	      "default": obj
	    };
	  };

	  babelHelpers._extends = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];

	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }

	    return target;
	  };
	})

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function removeStyle(node, key) {
	  return 'removeProperty' in node.style ? node.style.removeProperty(key) : node.style.removeAttribute(key);
	};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var canUseDOM = __webpack_require__(15);
	var on = function on() {};

	if (canUseDOM) {
	  on = (function () {

	    if (document.addEventListener) return function (node, eventName, handler, capture) {
	      return node.addEventListener(eventName, handler, capture || false);
	    };else if (document.attachEvent) return function (node, eventName, handler) {
	      return node.attachEvent('on' + eventName, handler);
	    };
	  })();
	}

	module.exports = on;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	'use strict';
	module.exports = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var canUseDOM = __webpack_require__(15);
	var off = function off() {};

	if (canUseDOM) {

	  off = (function () {

	    if (document.addEventListener) return function (node, eventName, handler, capture) {
	      return node.removeEventListener(eventName, handler, capture || false);
	    };else if (document.attachEvent) return function (node, eventName, handler) {
	      return node.detachEvent('on' + eventName, handler);
	    };
	  })();
	}

	module.exports = off;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var canUseDOM = __webpack_require__(15);

	var has = Object.prototype.hasOwnProperty,
	    transform = 'transform',
	    transition = {},
	    transitionTiming,
	    transitionDuration,
	    transitionProperty,
	    transitionDelay;

	if (canUseDOM) {
	  transition = getTransitionProperties();

	  transform = transition.prefix + transform;

	  transitionProperty = transition.prefix + 'transition-property';
	  transitionDuration = transition.prefix + 'transition-duration';
	  transitionDelay = transition.prefix + 'transition-delay';
	  transitionTiming = transition.prefix + 'transition-timing-function';
	}

	module.exports = {
	  transform: transform,
	  end: transition.end,
	  property: transitionProperty,
	  timing: transitionTiming,
	  delay: transitionDelay,
	  duration: transitionDuration
	};

	function getTransitionProperties() {
	  var endEvent,
	      prefix = '',
	      transitions = {
	    O: 'otransitionend',
	    Moz: 'transitionend',
	    Webkit: 'webkitTransitionEnd',
	    ms: 'MSTransitionEnd'
	  };

	  var element = document.createElement('div');

	  for (var vendor in transitions) if (has.call(transitions, vendor)) {
	    if (element.style[vendor + 'TransitionProperty'] !== undefined) {
	      prefix = '-' + vendor.toLowerCase() + '-';
	      endEvent = transitions[vendor];
	      break;
	    }
	  }

	  if (!endEvent && element.style.transitionProperty !== undefined) endEvent = 'transitionend';

	  return { end: endEvent, prefix: prefix };
	}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;
	exports.setNumber = setNumber;
	exports.setDate = setDate;

	var _invariant = __webpack_require__(19);

	var _invariant2 = babelHelpers.interopRequireDefault(_invariant);

	var _ = __webpack_require__(20);

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _propTypes = __webpack_require__(22);

	var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

	var localePropType = _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].func]);

	var REQUIRED_NUMBER_FORMATS = ['default'];

	var REQUIRED_DATE_FORMATS = ['default', 'date', 'time', 'header', 'footer', 'dayOfMonth', 'month', 'year', 'decade', 'century'];

	function _format(localizer, formatter, value, format, culture) {
	  var result = typeof format === 'function' ? format(value, culture, localizer) : formatter.call(localizer, value, format, culture);

	  _invariant2['default'](result == null || typeof result === 'string', '`localizer format(..)` must return a string, null, or undefined');

	  return result;
	}

	function checkFormats(requiredFormats, formats) {
	  if (process.env.NODE_ENV !== 'production') requiredFormats.forEach(function (f) {
	    return _invariant2['default'](_.has(formats, f), 'localizer missing required format: `%s`', f);
	  });
	}

	var _numberLocalizer = createWrapper('NumberPicker');

	function setNumber(_ref) {
	  var _format2 = _ref.format;
	  var _parse = _ref.parse;
	  var _ref$precision = _ref.precision;
	  var precision = _ref$precision === undefined ? function () {
	    return null;
	  } : _ref$precision;
	  var formats = _ref.formats;
	  var propType = _ref.propType;

	  _invariant2['default'](typeof _format2 === 'function', 'number localizer `format(..)` must be a function');
	  _invariant2['default'](typeof _parse === 'function', 'number localizer `parse(..)` must be a function');

	  checkFormats(REQUIRED_NUMBER_FORMATS, formats);

	  _numberLocalizer = {
	    formats: formats,
	    precision: precision,
	    propType: propType || localePropType,

	    format: function format(value, str, culture) {
	      return _format(this, _format2, value, str, culture);
	    },

	    parse: function parse(value, culture) {
	      var result = _parse.call(this, value, culture);
	      _invariant2['default'](result == null || typeof result === 'number', 'number localizer `parse(..)` must return a number, null, or undefined');
	      return result;
	    }
	  };
	}

	var _dateLocalizer = createWrapper('DateTimePicker');

	function setDate(spec) {
	  _invariant2['default'](typeof spec.format === 'function', 'date localizer `format(..)` must be a function');
	  _invariant2['default'](typeof spec.parse === 'function', 'date localizer `parse(..)` must be a function');
	  _invariant2['default'](typeof spec.firstOfWeek === 'function', 'date localizer `firstOfWeek(..)` must be a function');
	  checkFormats(REQUIRED_DATE_FORMATS, spec.formats);

	  _dateLocalizer = {
	    formats: spec.formats,
	    propType: spec.propType || localePropType,
	    startOfWeek: spec.firstOfWeek,
	    format: function format(value, str, culture) {
	      return _format(this, spec.format, value, str, culture);
	    },
	    parse: function parse(value, culture) {
	      var result = spec.parse.call(this, value, culture);
	      _invariant2['default'](result == null || result instanceof Date && !isNaN(result.getTime()), 'date localizer `parse(..)` must return a valid Date, null, or undefined');
	      return result;
	    }
	  };
	}

	var number = {
	  propType: function propType() {
	    var _numberLocalizer2;

	    return (_numberLocalizer2 = _numberLocalizer).propType.apply(_numberLocalizer2, arguments);
	  },
	  getFormat: function getFormat(key, format) {
	    return format || _numberLocalizer.formats[key];
	  },
	  parse: function parse() {
	    var _numberLocalizer3;

	    return (_numberLocalizer3 = _numberLocalizer).parse.apply(_numberLocalizer3, arguments);
	  },
	  format: function format() {
	    var _numberLocalizer4;

	    return (_numberLocalizer4 = _numberLocalizer).format.apply(_numberLocalizer4, arguments);
	  },
	  precision: function precision() {
	    var _numberLocalizer5;

	    return (_numberLocalizer5 = _numberLocalizer).precision.apply(_numberLocalizer5, arguments);
	  }
	};

	exports.number = number;
	var date = {
	  propType: function propType() {
	    var _dateLocalizer2;

	    return (_dateLocalizer2 = _dateLocalizer).propType.apply(_dateLocalizer2, arguments);
	  },
	  getFormat: function getFormat(key, format) {
	    return format || _dateLocalizer.formats[key];
	  },
	  parse: function parse() {
	    var _dateLocalizer3;

	    return (_dateLocalizer3 = _dateLocalizer).parse.apply(_dateLocalizer3, arguments);
	  },
	  format: function format() {
	    var _dateLocalizer4;

	    return (_dateLocalizer4 = _dateLocalizer).format.apply(_dateLocalizer4, arguments);
	  },
	  startOfWeek: function startOfWeek() {
	    var _dateLocalizer5;

	    return (_dateLocalizer5 = _dateLocalizer).startOfWeek.apply(_dateLocalizer5, arguments);
	  }
	};

	exports.date = date;
	exports['default'] = { number: number, date: date };

	function createWrapper() {
	  var dummy = {};

	  ['formats', 'parse', 'format', 'firstOfWeek', 'precision'].forEach(function (name) {
	    return Object.defineProperty(dummy, name, {
	      enumerable: true,
	      get: function get() {
	        throw new Error('[React Widgets] You are attempting to use a widget that requires localization ' + '(Calendar, DateTimePicker, NumberPicker). ' + 'However there is no localizer set. Please configure a localizer. \n\n' + 'see http://jquense.github.io/react-widgets/docs/#/i18n for more info.');
	      }
	    });
	  });
	  return dummy;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	'use strict';
	var idCount = 0;

	var _ = module.exports = {

	  has: has,

	  result: function result(value) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    return typeof value === 'function' ? value.apply(undefined, args) : value;
	  },

	  isFunction: function isFunction(check) {
	    return typeof check === 'function';
	  },

	  isShallowEqual: function isShallowEqual(a, b) {
	    if (a === b) return true;
	    if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();

	    if (typeof a !== 'object' && typeof b !== 'object') return a === b;

	    if (typeof a !== typeof b) return false;

	    return shallowEqual(a, b);
	  },

	  transform: function transform(obj, cb, seed) {
	    _.each(obj, cb.bind(null, seed = seed || (Array.isArray(obj) ? [] : {})));
	    return seed;
	  },

	  each: function each(obj, cb, thisArg) {
	    if (Array.isArray(obj)) return obj.forEach(cb, thisArg);

	    for (var key in obj) if (has(obj, key)) cb.call(thisArg, obj[key], key, obj);
	  },

	  pick: function pick(obj, keys) {
	    keys = [].concat(keys);
	    return _.transform(obj, function (mapped, val, key) {
	      if (keys.indexOf(key) !== -1) mapped[key] = val;
	    }, {});
	  },

	  omit: function omit(obj, keys) {
	    keys = [].concat(keys);
	    return _.transform(obj, function (mapped, val, key) {
	      if (keys.indexOf(key) === -1) mapped[key] = val;
	    }, {});
	  },

	  find: function find(arr, cb, thisArg) {
	    var result;
	    if (Array.isArray(arr)) {
	      arr.every(function (val, idx) {
	        if (cb.call(thisArg, val, idx, arr)) return result = val, false;
	        return true;
	      });
	      return result;
	    } else for (var key in arr) if (has(arr, key)) if (cb.call(thisArg, arr[key], key, arr)) return arr[key];
	  },

	  chunk: function chunk(array, chunkSize) {
	    var index = 0,
	        length = array ? array.length : 0,
	        result = [];

	    chunkSize = Math.max(+chunkSize || 1, 1);

	    while (index < length) result.push(array.slice(index, index += chunkSize));

	    return result;
	  },

	  splat: function splat(obj) {
	    return obj == null ? [] : [].concat(obj);
	  },

	  noop: function noop() {},

	  uniqueId: function uniqueId(prefix) {
	    return '' + ((prefix == null ? '' : prefix) + ++idCount);
	  }
	};

	function has(o, k) {
	  return o ? Object.prototype.hasOwnProperty.call(o, k) : false;
	}

	function eql(a, b) {
	  return a === b;
	}

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 */
	function shallowEqual(objA, objB) {

	  if (objA == null || objB == null) return false;

	  var keysA = Object.keys(objA),
	      keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) return false;

	  for (var i = 0; i < keysA.length; i++) if (!has(objB, keysA[i]) || !eql(objA[keysA[i]], objB[keysA[i]])) return false;

	  return true;
	}

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_21__;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	if (process.env.NODE_ENV !== 'production') {
	  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
	    Symbol.for &&
	    Symbol.for('react.element')) ||
	    0xeac7;

	  var isValidElement = function(object) {
	    return typeof object === 'object' &&
	      object !== null &&
	      object.$$typeof === REACT_ELEMENT_TYPE;
	  };

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = __webpack_require__(23)(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(30)();
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(24);
	var invariant = __webpack_require__(25);
	var warning = __webpack_require__(26);
	var assign = __webpack_require__(27);

	var ReactPropTypesSecret = __webpack_require__(28);
	var checkPropTypes = __webpack_require__(29);

	module.exports = function(isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */

	  var ANONYMOUS = '<<anonymous>>';

	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),

	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker,
	    exact: createStrictShapeTypeChecker,
	  };

	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/

	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message) {
	    this.message = message;
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;

	  function createChainableTypeChecker(validate) {
	    if (process.env.NODE_ENV !== 'production') {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;

	      if (secret !== ReactPropTypesSecret) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          invariant(
	            false,
	            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	            'Use `PropTypes.checkPropTypes()` to call them. ' +
	            'Read more at http://fb.me/use-check-prop-types'
	          );
	        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (
	            !manualPropTypeCallCache[cacheKey] &&
	            // Avoid spamming the console because they are often not actionable except for lib authors
	            manualPropTypeWarningCount < 3
	          ) {
	            warning(
	              false,
	              'You are manually calling a React.PropTypes validation ' +
	              'function for the `%s` prop on `%s`. This is deprecated ' +
	              'and will throw in the standalone `prop-types` package. ' +
	              'You may be seeing this warning due to a third-party PropTypes ' +
	              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
	              propFullName,
	              componentName
	            );
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }

	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);

	    return chainedCheckType;
	  }

	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);

	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
	  }

	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }

	      var valuesString = JSON.stringify(expectedValues);
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (propValue.hasOwnProperty(key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }

	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        warning(
	          false,
	          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
	          'received %s at index %s.',
	          getPostfixForTypeWarning(checker),
	          i
	        );
	        return emptyFunction.thatReturnsNull;
	      }
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
	          return null;
	        }
	      }

	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          continue;
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createStrictShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      // We need to check all keys in case some are required but missing from
	      // props.
	      var allKeys = assign({}, props[propName], shapeTypes);
	      for (var key in allKeys) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          return new PropTypeError(
	            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
	            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
	            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
	          );
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function isNode(propValue) {
	    switch (typeof propValue) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }

	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }

	        return true;
	      default:
	        return false;
	    }
	  }

	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }

	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }

	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }

	    return false;
	  }

	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue;
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }

	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }

	  // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"
	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);
	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;
	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;
	      default:
	        return type;
	    }
	  }

	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }

	  ReactPropTypes.checkPropTypes = checkPropTypes;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var validateFormat = function validateFormat(format) {};

	if (process.env.NODE_ENV !== 'production') {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var emptyFunction = __webpack_require__(24);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (process.env.NODE_ENV !== 'production') {
	  var printWarning = function printWarning(format) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };

	  warning = function warning(condition, format) {
	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }

	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }

	      printWarning.apply(undefined, [format].concat(args));
	    }
	  };
	}

	module.exports = warning;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	if (process.env.NODE_ENV !== 'production') {
	  var invariant = __webpack_require__(25);
	  var warning = __webpack_require__(26);
	  var ReactPropTypesSecret = __webpack_require__(28);
	  var loggedTypeFailures = {};
	}

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  if (process.env.NODE_ENV !== 'production') {
	    for (var typeSpecName in typeSpecs) {
	      if (typeSpecs.hasOwnProperty(typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	        } catch (ex) {
	          error = ex;
	        }
	        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;

	          var stack = getStack ? getStack() : '';

	          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
	        }
	      }
	    }
	  }
	}

	module.exports = checkPropTypes;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(24);
	var invariant = __webpack_require__(25);
	var ReactPropTypesSecret = __webpack_require__(28);

	module.exports = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    invariant(
	      false,
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	  };
	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  };
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,

	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim
	  };

	  ReactPropTypes.checkPropTypes = emptyFunction;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _propTypes = __webpack_require__(22);

	var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

	var _domHelpersActiveElement = __webpack_require__(32);

	var _domHelpersActiveElement2 = babelHelpers.interopRequireDefault(_domHelpersActiveElement);

	var _domHelpersQueryContains = __webpack_require__(34);

	var _domHelpersQueryContains2 = babelHelpers.interopRequireDefault(_domHelpersQueryContains);

	var _classnames = __webpack_require__(35);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _createReactClass = __webpack_require__(36);

	var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _utilConstants = __webpack_require__(42);

	var _Popup = __webpack_require__(43);

	var _Popup2 = babelHelpers.interopRequireDefault(_Popup);

	var _utilCompat = __webpack_require__(47);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var _utilPropTypes = __webpack_require__(49);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _List = __webpack_require__(51);

	var _List2 = babelHelpers.interopRequireDefault(_List);

	var _ListGroupable = __webpack_require__(57);

	var _ListGroupable2 = babelHelpers.interopRequireDefault(_ListGroupable);

	var _utilValidateListInterface = __webpack_require__(59);

	var _utilValidateListInterface2 = babelHelpers.interopRequireDefault(_utilValidateListInterface);

	var _uncontrollable = __webpack_require__(60);

	var _uncontrollable2 = babelHelpers.interopRequireDefault(_uncontrollable);

	var _TetheredPopup = __webpack_require__(63);

	var _TetheredPopup2 = babelHelpers.interopRequireDefault(_TetheredPopup);

	var _utilDataHelpers = __webpack_require__(53);

	var _utilInteraction = __webpack_require__(67);

	var _utilWidgetHelpers = __webpack_require__(54);

	var omit = _util_2['default'].omit;
	var pick = _util_2['default'].pick;
	var result = _util_2['default'].result;

	var propTypes = {
	  //-- controlled props -----------
	  value: _propTypes2['default'].any,
	  onChange: _propTypes2['default'].func,
	  open: _propTypes2['default'].bool,
	  onToggle: _propTypes2['default'].func,
	  //------------------------------------

	  data: _propTypes2['default'].array,
	  valueField: _propTypes2['default'].string,
	  textField: _utilPropTypes2['default'].accessor,

	  valueComponent: _utilPropTypes2['default'].elementType,
	  itemComponent: _utilPropTypes2['default'].elementType,
	  listComponent: _utilPropTypes2['default'].elementType,
	  beforeListComponent: _propTypes2['default'].any,
	  afterListComponent: _propTypes2['default'].any,

	  groupComponent: _utilPropTypes2['default'].elementType,
	  groupBy: _utilPropTypes2['default'].accessor,

	  onSelect: _propTypes2['default'].func,

	  searchTerm: _propTypes2['default'].string,
	  onSearch: _propTypes2['default'].func,

	  busy: _propTypes2['default'].bool,

	  delay: _propTypes2['default'].number,

	  tetherPopup: _propTypes2['default'].bool,

	  multi: _propTypes2['default'].bool,

	  dropUp: _propTypes2['default'].bool,
	  duration: _propTypes2['default'].number, //popup

	  disabled: _utilPropTypes2['default'].disabled,

	  readOnly: _utilPropTypes2['default'].readOnly,

	  messages: _propTypes2['default'].shape({
	    open: _utilPropTypes2['default'].message,
	    emptyList: _utilPropTypes2['default'].message,
	    emptyFilter: _utilPropTypes2['default'].message,
	    filterPlaceholder: _utilPropTypes2['default'].message
	  }),

	  popupClassName: _propTypes2['default'].string

	};

	var DropdownList = _createReactClass2['default'](babelHelpers.createDecoratedObject([{
	  key: 'displayName',
	  initializer: function initializer() {
	    return 'DropdownList';
	  }
	}, {
	  key: 'mixins',
	  initializer: function initializer() {
	    return [__webpack_require__(68), __webpack_require__(69), __webpack_require__(70), __webpack_require__(71), __webpack_require__(76), __webpack_require__(56)(), __webpack_require__(77)({
	      didHandle: function didHandle(focused) {
	        if (!focused) this.close();
	      }
	    })];
	  }
	}, {
	  key: 'propTypes',
	  initializer: function initializer() {
	    return propTypes;
	  }
	}, {
	  key: 'getDefaultProps',
	  value: function getDefaultProps() {
	    return {
	      delay: 500,
	      value: '',
	      open: false,
	      data: [],
	      searchTerm: '',
	      messages: msgs(),
	      ariaActiveDescendantKey: 'dropdownlist',
	      tetherPopup: false,
	      multi: false,
	      beforeListComponent: null,
	      afterListComponent: null,
	      popupStyle: {}
	    };
	  }
	}, {
	  key: 'getInitialState',
	  value: function getInitialState() {
	    var _props = this.props;
	    var open = _props.open;
	    var filter = _props.filter;
	    var value = _props.value;
	    var data = _props.data;
	    var searchTerm = _props.searchTerm;
	    var valueField = _props.valueField;

	    var processed = filter ? this.filter(data, searchTerm) : data,
	        initialIdx = _utilDataHelpers.dataIndexOf(data, value, valueField);

	    return {
	      filteredData: open && filter ? processed : null,
	      selectedItem: processed[initialIdx],
	      focusedItem: processed[initialIdx] || data[0]
	    };
	  }
	}, {
	  key: 'componentDidUpdate',
	  value: function componentDidUpdate() {
	    this.listRef && _utilValidateListInterface2['default'](this.listRef);
	  }
	}, {
	  key: 'componentWillReceiveProps',
	  value: function componentWillReceiveProps(props) {
	    var open = props.open;
	    var filter = props.filter;
	    var value = props.value;
	    var data = props.data;
	    var searchTerm = props.searchTerm;
	    var valueField = props.valueField;

	    var processed = filter ? this.filter(data, searchTerm) : data,
	        idx = _utilDataHelpers.dataIndexOf(data, value, valueField);

	    this.setState({
	      filteredData: open && filter ? processed : null,
	      selectedItem: processed[idx],
	      focusedItem: processed[! ~idx ? 0 : idx]
	    });
	  }
	}, {
	  key: 'render',
	  value: function render() {
	    var _cx,
	        _this = this;

	    var _props2 = this.props;
	    var className = _props2.className;
	    var tabIndex = _props2.tabIndex;
	    var filter = _props2.filter;
	    var valueField = _props2.valueField;
	    var textField = _props2.textField;
	    var groupBy = _props2.groupBy;
	    var messages = _props2.messages;
	    var data = _props2.data;
	    var busy = _props2.busy;
	    var dropUp = _props2.dropUp;
	    var searchTerm = _props2.searchTerm;
	    var onChange = _props2.onChange;
	    var placeholder = _props2.placeholder;
	    var value = _props2.value;
	    var open = _props2.open;
	    var disabled = _props2.disabled;
	    var readOnly = _props2.readOnly;
	    var ValueComponent = _props2.valueComponent;
	    var multi = _props2.multi;
	    var tetherPopup = _props2.tetherPopup;
	    var popupClassName = _props2.popupClassName;
	    var beforeListComponent = _props2.beforeListComponent;
	    var afterListComponent = _props2.afterListComponent;
	    var List = _props2.listComponent;
	    var popupStyle = _props2.popupStyle;

	    List = List || groupBy && _ListGroupable2['default'] || _List2['default'];

	    var elementProps = omit(this.props, Object.keys(propTypes));
	    var listProps = pick(this.props, Object.keys(List.propTypes));
	    var PopupComponent = tetherPopup ? _TetheredPopup2['default'] : _Popup2['default'];

	    var popupProps = pick(this.props, Object.keys(PopupComponent.propTypes));
	    var _state = this.state;
	    var focusedItem = _state.focusedItem;
	    var selectedItem = _state.selectedItem;
	    var focused = _state.focused;

	    var items = this._data(),
	        valueItem = false,
	        listID = _utilWidgetHelpers.instanceId(this, '__listbox');

	    if (value !== null) {
	      valueItem = _utilDataHelpers.dataItem(data, value, valueField); // take value from the raw data
	    }

	    var shouldRenderList = _utilWidgetHelpers.isFirstFocusedRender(this) || open;

	    messages = msgs(messages);

	    return _react2['default'].createElement(
	      'div',
	      babelHelpers._extends({}, elementProps, {
	        ref: function (ref) {
	          return _this.inputRef = ref;
	        },
	        role: 'combobox',
	        tabIndex: tabIndex || '0',
	        'aria-expanded': open,
	        'aria-haspopup': true,
	        'aria-owns': listID,
	        'aria-busy': !!busy,
	        'aria-live': !open && 'polite',
	        //aria-activedescendant={activeID}
	        'aria-autocomplete': 'list',
	        'aria-disabled': disabled,
	        'aria-readonly': readOnly,
	        onKeyDown: tetherPopup ? null : this._keyDown,
	        onClick: this._click,
	        onFocus: tetherPopup ? function () {
	          return _this.setState({ focused: true });
	        } : this.handleFocus,
	        onBlur: tetherPopup ? function () {
	          return _this.setState({ focused: false });
	        } : this.handleBlur,
	        className: _classnames2['default'](className, 'rw-dropdownlist', 'rw-widget', (_cx = {
	          'rw-state-disabled': disabled,
	          'rw-state-readonly': readOnly,
	          'rw-state-focus': focused,
	          'rw-rtl': this.isRtl()

	        }, _cx['rw-open' + (dropUp ? '-up' : '')] = open, _cx)) }),
	      _react2['default'].createElement(
	        'span',
	        { className: 'rw-dropdownlist-picker rw-select rw-btn' },
	        _react2['default'].createElement(
	          'i',
	          { className: 'rw-i rw-i-caret-down' + (busy ? ' rw-loading' : '') },
	          _react2['default'].createElement(
	            'span',
	            { className: 'rw-sr' },
	            result(messages.open, this.props)
	          )
	        )
	      ),
	      _react2['default'].createElement(
	        'div',
	        {
	          className: 'rw-input'
	        },
	        !valueItem && placeholder ? _react2['default'].createElement(
	          'span',
	          { className: 'rw-placeholder' },
	          placeholder
	        ) : this.props.valueComponent ? _react2['default'].createElement(ValueComponent, { item: valueItem }) : _utilDataHelpers.dataText(valueItem, textField)
	      ),
	      _react2['default'].createElement(
	        PopupComponent,
	        babelHelpers._extends({}, popupProps, {
	          className: popupClassName,
	          getTetherFocus: filter ? function () {
	            return _this.filterRef;
	          } : function () {
	            return _this.listRef.ulRef;
	          },
	          onOpen: tetherPopup ? this.handleFocus : this.focus,
	          onKeyDown: this._keyDown,
	          onBlur: this._focus.bind(null, false),
	          onOpening: function () {
	            return _this.listRef.forceUpdate();
	          },
	          onRequestClose: this.close,
	          popupStyle: popupStyle
	        }),
	        _react2['default'].createElement(
	          'div',
	          null,
	          filter && this._renderFilter(messages),
	          beforeListComponent && _react2['default'].cloneElement(beforeListComponent, { value: value, searchTerm: searchTerm, data: data, onChange: onChange }),
	          shouldRenderList && _react2['default'].createElement(List, babelHelpers._extends({ ref: function (ref) {
	              return _this.listRef = ref;
	            }
	          }, listProps, {
	            data: items,
	            id: listID,
	            'aria-live': open && 'polite',
	            'aria-labelledby': _utilWidgetHelpers.instanceId(this),
	            'aria-hidden': !this.props.open,
	            selected: selectedItem,
	            focused: open && focusedItem,
	            onSelect: this._onSelect,
	            onMove: multi ? function () {} : this._scrollTo,
	            messages: {
	              emptyList: data.length ? messages.emptyFilter : messages.emptyList
	            }
	          })),
	          afterListComponent && _react2['default'].cloneElement(afterListComponent, { value: value, searchTerm: searchTerm, data: data, onChange: onChange })
	        )
	      )
	    );
	  }
	}, {
	  key: '_renderFilter',
	  value: function _renderFilter(messages) {
	    var _this2 = this;

	    return _react2['default'].createElement(
	      'div',
	      { ref: function (ref) {
	          return _this2.filterWrapperRef = ref;
	        }, className: 'rw-filter-input' },
	      _react2['default'].createElement(
	        'span',
	        { className: 'rw-select rw-btn' },
	        _react2['default'].createElement('i', { className: 'rw-i rw-i-search' })
	      ),
	      _react2['default'].createElement('input', { ref: function (ref) {
	          return _this2.filterRef = ref;
	        }, className: 'rw-input',
	        placeholder: _util_2['default'].result(messages.filterPlaceholder, this.props),
	        value: this.props.searchTerm,
	        onChange: function (e) {
	          return _utilWidgetHelpers.notify(_this2.props.onSearch, e.target.value);
	        } })
	    );
	  }
	}, {
	  key: '_focus',
	  decorators: [_utilInteraction.widgetEnabled],
	  value: function _focus(focused, e) {
	    var _this3 = this;

	    this.setTimeout('focus', function () {
	      if (!focused) _this3.close();

	      if (focused !== _this3.state.focused) {
	        _utilWidgetHelpers.notify(_this3.props[focused ? 'onFocus' : 'onBlur'], e);
	        _this3.setState({ focused: focused });
	      }
	    });
	  }
	}, {
	  key: '_onSelect',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _onSelect(data) {
	    var _props3 = this.props;
	    var onSelect = _props3.onSelect;
	    var tetherPopup = _props3.tetherPopup;

	    _utilWidgetHelpers.notify(onSelect, data);
	    this.change(data);
	    this.close();
	    if (tetherPopup) this._focus(false);
	    this.focus(this);
	  }
	}, {
	  key: '_click',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _click(e) {
	    var wrapper = this.filterWrapperRef;
	    if (!this.props.filter || !this.props.open) this.toggle();else if (!_domHelpersQueryContains2['default'](_utilCompat2['default'].findDOMNode(wrapper), e.target)) this.close();

	    _utilWidgetHelpers.notify(this.props.onClick, e);
	  }
	}, {
	  key: '_keyDown',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _keyDown(e) {
	    var _this4 = this;

	    var self = this,
	        key = e.keyCode,
	        alt = e.altKey,
	        list = this.listRef,
	        filtering = this.props.filter,
	        focusedItem = this.state.focusedItem,
	        selectedItem = this.state.selectedItem,
	        isOpen = this.props.open,
	        closeWithFocus = function closeWithFocus() {
	      _this4.close(), _utilCompat2['default'].findDOMNode(_this4).focus();
	    };
	    _utilWidgetHelpers.notify(this.props.onKeyDown, [e]);

	    if (e.defaultPrevented) return;

	    if (key === _utilConstants.keyCodes.END) {
	      if (isOpen) this.setState({ focusedItem: list.last() });else change(list.last());
	      e.preventDefault();
	    } else if (key === _utilConstants.keyCodes.HOME) {
	      if (isOpen) this.setState({ focusedItem: list.first() });else change(list.first());
	      e.preventDefault();
	    } else if (key === _utilConstants.keyCodes.ESCAPE && isOpen) {
	      closeWithFocus();
	    } else if ((key === _utilConstants.keyCodes.ENTER || key === ' ' && !filtering) && isOpen) {
	      change(this.state.focusedItem, true);
	    } else if (key === _utilConstants.keyCodes.DOWN_ARROW) {
	      if (alt) this.open();else if (isOpen) this.setState({ focusedItem: list.next(focusedItem) });else change(list.next(selectedItem));
	      e.preventDefault();
	    } else if (key === _utilConstants.keyCodes.UP_ARROW) {
	      if (alt) closeWithFocus();else if (isOpen) this.setState({ focusedItem: list.prev(focusedItem) });else change(list.prev(selectedItem));
	      e.preventDefault();
	    } else if (!(this.props.filter && isOpen)) this.search(String.fromCharCode(e.keyCode), function (item) {
	      isOpen ? _this4.setState({ focusedItem: item }) : change(item);
	    });

	    function change(item, fromList) {
	      if (!item) return;
	      fromList ? self._onSelect(item) : self.change(item);
	    }
	  }
	}, {
	  key: 'change',
	  value: function change(data) {
	    if (!_util_2['default'].isShallowEqual(data, this.props.value)) {
	      _utilWidgetHelpers.notify(this.props.onChange, data);
	      if (!this.props.multi) {
	        _utilWidgetHelpers.notify(this.props.onSearch, '');
	      }
	      this.close();
	    }
	  }
	}, {
	  key: 'focus',
	  value: function focus(target) {
	    var inst = target || (this.props.filter && this.props.open ? this.filterRef : this.inputRef);

	    if (_domHelpersActiveElement2['default']() !== _utilCompat2['default'].findDOMNode(inst)) _utilCompat2['default'].findDOMNode(inst).focus();
	  }
	}, {
	  key: '_data',
	  value: function _data() {
	    return this.state.filteredData || this.props.data.concat();
	  }
	}, {
	  key: 'search',
	  value: function search(character, cb) {
	    var _this5 = this;

	    var word = ((this._searchTerm || '') + character).toLowerCase();

	    this._searchTerm = word;

	    this.setTimeout('search', function () {
	      var list = _this5.listRef,
	          key = _this5.props.open ? 'focusedItem' : 'selectedItem',
	          item = list.next(_this5.state[key], word);

	      _this5._searchTerm = '';
	      if (item) cb(item);
	    }, this.props.delay);
	  }
	}, {
	  key: 'open',
	  value: function open() {
	    _utilWidgetHelpers.notify(this.props.onToggle, true);
	  }
	}, {
	  key: 'close',
	  value: function close() {

	    _utilWidgetHelpers.notify(this.props.onToggle, false);
	  }
	}, {
	  key: 'toggle',
	  value: function toggle() {
	    this.props.open ? this.close() : this.open();
	  }
	}]));

	function msgs(msgs) {
	  return babelHelpers._extends({
	    open: 'open dropdown',
	    filterPlaceholder: '',
	    emptyList: 'There are no items in this list',
	    emptyFilter: 'The filter returned no results'
	  }, msgs);
	}

	exports['default'] = _uncontrollable2['default'](DropdownList, { open: 'onToggle', value: 'onChange', searchTerm: 'onSearch' }, ['focus']);
	module.exports = exports['default'];

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(12);

	exports.__esModule = true;

	/**
	 * document.activeElement
	 */
	exports['default'] = activeElement;

	var _ownerDocument = __webpack_require__(33);

	var _ownerDocument2 = babelHelpers.interopRequireDefault(_ownerDocument);

	function activeElement() {
	  var doc = arguments[0] === undefined ? document : arguments[0];

	  try {
	    return doc.activeElement;
	  } catch (e) {}
	}

	module.exports = exports['default'];

/***/ }),
/* 33 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = ownerDocument;

	function ownerDocument(node) {
	  return node && node.ownerDocument || document;
	}

	module.exports = exports["default"];

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var canUseDOM = __webpack_require__(15);

	var contains = (function () {
	  var root = canUseDOM && document.documentElement;

	  return root && root.contains ? function (context, node) {
	    return context.contains(node);
	  } : root && root.compareDocumentPosition ? function (context, node) {
	    return context === node || !!(context.compareDocumentPosition(node) & 16);
	  } : function (context, node) {
	    if (node) do {
	      if (node === context) return true;
	    } while (node = node.parentNode);

	    return false;
	  };
	})();

	module.exports = contains;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var React = __webpack_require__(21);
	var factory = __webpack_require__(37);

	if (typeof React === 'undefined') {
	  throw Error(
	    'create-react-class could not find the React object. If you are using script tags, ' +
	      'make sure that React is being loaded before create-react-class.'
	  );
	}

	// Hack to grab NoopUpdateQueue from isomorphic React
	var ReactNoopUpdateQueue = new React.Component().updater;

	module.exports = factory(
	  React.Component,
	  React.isValidElement,
	  ReactNoopUpdateQueue
	);


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var _assign = __webpack_require__(27);

	var emptyObject = __webpack_require__(38);
	var _invariant = __webpack_require__(39);

	if (process.env.NODE_ENV !== 'production') {
	  var warning = __webpack_require__(40);
	}

	var MIXINS_KEY = 'mixins';

	// Helper function to allow the creation of anonymous functions which do not
	// have .name set to the name of the variable being assigned to.
	function identity(fn) {
	  return fn;
	}

	var ReactPropTypeLocationNames;
	if (process.env.NODE_ENV !== 'production') {
	  ReactPropTypeLocationNames = {
	    prop: 'prop',
	    context: 'context',
	    childContext: 'child context'
	  };
	} else {
	  ReactPropTypeLocationNames = {};
	}

	function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
	  /**
	   * Policies that describe methods in `ReactClassInterface`.
	   */

	  var injectedMixins = [];

	  /**
	   * Composite components are higher-level components that compose other composite
	   * or host components.
	   *
	   * To create a new type of `ReactClass`, pass a specification of
	   * your new class to `React.createClass`. The only requirement of your class
	   * specification is that you implement a `render` method.
	   *
	   *   var MyComponent = React.createClass({
	   *     render: function() {
	   *       return <div>Hello World</div>;
	   *     }
	   *   });
	   *
	   * The class specification supports a specific protocol of methods that have
	   * special meaning (e.g. `render`). See `ReactClassInterface` for
	   * more the comprehensive protocol. Any other properties and methods in the
	   * class specification will be available on the prototype.
	   *
	   * @interface ReactClassInterface
	   * @internal
	   */
	  var ReactClassInterface = {
	    /**
	     * An array of Mixin objects to include when defining your component.
	     *
	     * @type {array}
	     * @optional
	     */
	    mixins: 'DEFINE_MANY',

	    /**
	     * An object containing properties and methods that should be defined on
	     * the component's constructor instead of its prototype (static methods).
	     *
	     * @type {object}
	     * @optional
	     */
	    statics: 'DEFINE_MANY',

	    /**
	     * Definition of prop types for this component.
	     *
	     * @type {object}
	     * @optional
	     */
	    propTypes: 'DEFINE_MANY',

	    /**
	     * Definition of context types for this component.
	     *
	     * @type {object}
	     * @optional
	     */
	    contextTypes: 'DEFINE_MANY',

	    /**
	     * Definition of context types this component sets for its children.
	     *
	     * @type {object}
	     * @optional
	     */
	    childContextTypes: 'DEFINE_MANY',

	    // ==== Definition methods ====

	    /**
	     * Invoked when the component is mounted. Values in the mapping will be set on
	     * `this.props` if that prop is not specified (i.e. using an `in` check).
	     *
	     * This method is invoked before `getInitialState` and therefore cannot rely
	     * on `this.state` or use `this.setState`.
	     *
	     * @return {object}
	     * @optional
	     */
	    getDefaultProps: 'DEFINE_MANY_MERGED',

	    /**
	     * Invoked once before the component is mounted. The return value will be used
	     * as the initial value of `this.state`.
	     *
	     *   getInitialState: function() {
	     *     return {
	     *       isOn: false,
	     *       fooBaz: new BazFoo()
	     *     }
	     *   }
	     *
	     * @return {object}
	     * @optional
	     */
	    getInitialState: 'DEFINE_MANY_MERGED',

	    /**
	     * @return {object}
	     * @optional
	     */
	    getChildContext: 'DEFINE_MANY_MERGED',

	    /**
	     * Uses props from `this.props` and state from `this.state` to render the
	     * structure of the component.
	     *
	     * No guarantees are made about when or how often this method is invoked, so
	     * it must not have side effects.
	     *
	     *   render: function() {
	     *     var name = this.props.name;
	     *     return <div>Hello, {name}!</div>;
	     *   }
	     *
	     * @return {ReactComponent}
	     * @required
	     */
	    render: 'DEFINE_ONCE',

	    // ==== Delegate methods ====

	    /**
	     * Invoked when the component is initially created and about to be mounted.
	     * This may have side effects, but any external subscriptions or data created
	     * by this method must be cleaned up in `componentWillUnmount`.
	     *
	     * @optional
	     */
	    componentWillMount: 'DEFINE_MANY',

	    /**
	     * Invoked when the component has been mounted and has a DOM representation.
	     * However, there is no guarantee that the DOM node is in the document.
	     *
	     * Use this as an opportunity to operate on the DOM when the component has
	     * been mounted (initialized and rendered) for the first time.
	     *
	     * @param {DOMElement} rootNode DOM element representing the component.
	     * @optional
	     */
	    componentDidMount: 'DEFINE_MANY',

	    /**
	     * Invoked before the component receives new props.
	     *
	     * Use this as an opportunity to react to a prop transition by updating the
	     * state using `this.setState`. Current props are accessed via `this.props`.
	     *
	     *   componentWillReceiveProps: function(nextProps, nextContext) {
	     *     this.setState({
	     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
	     *     });
	     *   }
	     *
	     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
	     * transition may cause a state change, but the opposite is not true. If you
	     * need it, you are probably looking for `componentWillUpdate`.
	     *
	     * @param {object} nextProps
	     * @optional
	     */
	    componentWillReceiveProps: 'DEFINE_MANY',

	    /**
	     * Invoked while deciding if the component should be updated as a result of
	     * receiving new props, state and/or context.
	     *
	     * Use this as an opportunity to `return false` when you're certain that the
	     * transition to the new props/state/context will not require a component
	     * update.
	     *
	     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
	     *     return !equal(nextProps, this.props) ||
	     *       !equal(nextState, this.state) ||
	     *       !equal(nextContext, this.context);
	     *   }
	     *
	     * @param {object} nextProps
	     * @param {?object} nextState
	     * @param {?object} nextContext
	     * @return {boolean} True if the component should update.
	     * @optional
	     */
	    shouldComponentUpdate: 'DEFINE_ONCE',

	    /**
	     * Invoked when the component is about to update due to a transition from
	     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
	     * and `nextContext`.
	     *
	     * Use this as an opportunity to perform preparation before an update occurs.
	     *
	     * NOTE: You **cannot** use `this.setState()` in this method.
	     *
	     * @param {object} nextProps
	     * @param {?object} nextState
	     * @param {?object} nextContext
	     * @param {ReactReconcileTransaction} transaction
	     * @optional
	     */
	    componentWillUpdate: 'DEFINE_MANY',

	    /**
	     * Invoked when the component's DOM representation has been updated.
	     *
	     * Use this as an opportunity to operate on the DOM when the component has
	     * been updated.
	     *
	     * @param {object} prevProps
	     * @param {?object} prevState
	     * @param {?object} prevContext
	     * @param {DOMElement} rootNode DOM element representing the component.
	     * @optional
	     */
	    componentDidUpdate: 'DEFINE_MANY',

	    /**
	     * Invoked when the component is about to be removed from its parent and have
	     * its DOM representation destroyed.
	     *
	     * Use this as an opportunity to deallocate any external resources.
	     *
	     * NOTE: There is no `componentDidUnmount` since your component will have been
	     * destroyed by that point.
	     *
	     * @optional
	     */
	    componentWillUnmount: 'DEFINE_MANY',

	    /**
	     * Replacement for (deprecated) `componentWillMount`.
	     *
	     * @optional
	     */
	    UNSAFE_componentWillMount: 'DEFINE_MANY',

	    /**
	     * Replacement for (deprecated) `componentWillReceiveProps`.
	     *
	     * @optional
	     */
	    UNSAFE_componentWillReceiveProps: 'DEFINE_MANY',

	    /**
	     * Replacement for (deprecated) `componentWillUpdate`.
	     *
	     * @optional
	     */
	    UNSAFE_componentWillUpdate: 'DEFINE_MANY',

	    // ==== Advanced methods ====

	    /**
	     * Updates the component's currently mounted DOM representation.
	     *
	     * By default, this implements React's rendering and reconciliation algorithm.
	     * Sophisticated clients may wish to override this.
	     *
	     * @param {ReactReconcileTransaction} transaction
	     * @internal
	     * @overridable
	     */
	    updateComponent: 'OVERRIDE_BASE'
	  };

	  /**
	   * Similar to ReactClassInterface but for static methods.
	   */
	  var ReactClassStaticInterface = {
	    /**
	     * This method is invoked after a component is instantiated and when it
	     * receives new props. Return an object to update state in response to
	     * prop changes. Return null to indicate no change to state.
	     *
	     * If an object is returned, its keys will be merged into the existing state.
	     *
	     * @return {object || null}
	     * @optional
	     */
	    getDerivedStateFromProps: 'DEFINE_MANY_MERGED'
	  };

	  /**
	   * Mapping from class specification keys to special processing functions.
	   *
	   * Although these are declared like instance properties in the specification
	   * when defining classes using `React.createClass`, they are actually static
	   * and are accessible on the constructor instead of the prototype. Despite
	   * being static, they must be defined outside of the "statics" key under
	   * which all other static methods are defined.
	   */
	  var RESERVED_SPEC_KEYS = {
	    displayName: function(Constructor, displayName) {
	      Constructor.displayName = displayName;
	    },
	    mixins: function(Constructor, mixins) {
	      if (mixins) {
	        for (var i = 0; i < mixins.length; i++) {
	          mixSpecIntoComponent(Constructor, mixins[i]);
	        }
	      }
	    },
	    childContextTypes: function(Constructor, childContextTypes) {
	      if (process.env.NODE_ENV !== 'production') {
	        validateTypeDef(Constructor, childContextTypes, 'childContext');
	      }
	      Constructor.childContextTypes = _assign(
	        {},
	        Constructor.childContextTypes,
	        childContextTypes
	      );
	    },
	    contextTypes: function(Constructor, contextTypes) {
	      if (process.env.NODE_ENV !== 'production') {
	        validateTypeDef(Constructor, contextTypes, 'context');
	      }
	      Constructor.contextTypes = _assign(
	        {},
	        Constructor.contextTypes,
	        contextTypes
	      );
	    },
	    /**
	     * Special case getDefaultProps which should move into statics but requires
	     * automatic merging.
	     */
	    getDefaultProps: function(Constructor, getDefaultProps) {
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps = createMergedResultFunction(
	          Constructor.getDefaultProps,
	          getDefaultProps
	        );
	      } else {
	        Constructor.getDefaultProps = getDefaultProps;
	      }
	    },
	    propTypes: function(Constructor, propTypes) {
	      if (process.env.NODE_ENV !== 'production') {
	        validateTypeDef(Constructor, propTypes, 'prop');
	      }
	      Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
	    },
	    statics: function(Constructor, statics) {
	      mixStaticSpecIntoComponent(Constructor, statics);
	    },
	    autobind: function() {}
	  };

	  function validateTypeDef(Constructor, typeDef, location) {
	    for (var propName in typeDef) {
	      if (typeDef.hasOwnProperty(propName)) {
	        // use a warning instead of an _invariant so components
	        // don't show up in prod but only in __DEV__
	        if (process.env.NODE_ENV !== 'production') {
	          warning(
	            typeof typeDef[propName] === 'function',
	            '%s: %s type `%s` is invalid; it must be a function, usually from ' +
	              'React.PropTypes.',
	            Constructor.displayName || 'ReactClass',
	            ReactPropTypeLocationNames[location],
	            propName
	          );
	        }
	      }
	    }
	  }

	  function validateMethodOverride(isAlreadyDefined, name) {
	    var specPolicy = ReactClassInterface.hasOwnProperty(name)
	      ? ReactClassInterface[name]
	      : null;

	    // Disallow overriding of base class methods unless explicitly allowed.
	    if (ReactClassMixin.hasOwnProperty(name)) {
	      _invariant(
	        specPolicy === 'OVERRIDE_BASE',
	        'ReactClassInterface: You are attempting to override ' +
	          '`%s` from your class specification. Ensure that your method names ' +
	          'do not overlap with React methods.',
	        name
	      );
	    }

	    // Disallow defining methods more than once unless explicitly allowed.
	    if (isAlreadyDefined) {
	      _invariant(
	        specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED',
	        'ReactClassInterface: You are attempting to define ' +
	          '`%s` on your component more than once. This conflict may be due ' +
	          'to a mixin.',
	        name
	      );
	    }
	  }

	  /**
	   * Mixin helper which handles policy validation and reserved
	   * specification keys when building React classes.
	   */
	  function mixSpecIntoComponent(Constructor, spec) {
	    if (!spec) {
	      if (process.env.NODE_ENV !== 'production') {
	        var typeofSpec = typeof spec;
	        var isMixinValid = typeofSpec === 'object' && spec !== null;

	        if (process.env.NODE_ENV !== 'production') {
	          warning(
	            isMixinValid,
	            "%s: You're attempting to include a mixin that is either null " +
	              'or not an object. Check the mixins included by the component, ' +
	              'as well as any mixins they include themselves. ' +
	              'Expected object but got %s.',
	            Constructor.displayName || 'ReactClass',
	            spec === null ? null : typeofSpec
	          );
	        }
	      }

	      return;
	    }

	    _invariant(
	      typeof spec !== 'function',
	      "ReactClass: You're attempting to " +
	        'use a component class or function as a mixin. Instead, just use a ' +
	        'regular object.'
	    );
	    _invariant(
	      !isValidElement(spec),
	      "ReactClass: You're attempting to " +
	        'use a component as a mixin. Instead, just use a regular object.'
	    );

	    var proto = Constructor.prototype;
	    var autoBindPairs = proto.__reactAutoBindPairs;

	    // By handling mixins before any other properties, we ensure the same
	    // chaining order is applied to methods with DEFINE_MANY policy, whether
	    // mixins are listed before or after these methods in the spec.
	    if (spec.hasOwnProperty(MIXINS_KEY)) {
	      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
	    }

	    for (var name in spec) {
	      if (!spec.hasOwnProperty(name)) {
	        continue;
	      }

	      if (name === MIXINS_KEY) {
	        // We have already handled mixins in a special case above.
	        continue;
	      }

	      var property = spec[name];
	      var isAlreadyDefined = proto.hasOwnProperty(name);
	      validateMethodOverride(isAlreadyDefined, name);

	      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
	        RESERVED_SPEC_KEYS[name](Constructor, property);
	      } else {
	        // Setup methods on prototype:
	        // The following member methods should not be automatically bound:
	        // 1. Expected ReactClass methods (in the "interface").
	        // 2. Overridden methods (that were mixed in).
	        var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
	        var isFunction = typeof property === 'function';
	        var shouldAutoBind =
	          isFunction &&
	          !isReactClassMethod &&
	          !isAlreadyDefined &&
	          spec.autobind !== false;

	        if (shouldAutoBind) {
	          autoBindPairs.push(name, property);
	          proto[name] = property;
	        } else {
	          if (isAlreadyDefined) {
	            var specPolicy = ReactClassInterface[name];

	            // These cases should already be caught by validateMethodOverride.
	            _invariant(
	              isReactClassMethod &&
	                (specPolicy === 'DEFINE_MANY_MERGED' ||
	                  specPolicy === 'DEFINE_MANY'),
	              'ReactClass: Unexpected spec policy %s for key %s ' +
	                'when mixing in component specs.',
	              specPolicy,
	              name
	            );

	            // For methods which are defined more than once, call the existing
	            // methods before calling the new property, merging if appropriate.
	            if (specPolicy === 'DEFINE_MANY_MERGED') {
	              proto[name] = createMergedResultFunction(proto[name], property);
	            } else if (specPolicy === 'DEFINE_MANY') {
	              proto[name] = createChainedFunction(proto[name], property);
	            }
	          } else {
	            proto[name] = property;
	            if (process.env.NODE_ENV !== 'production') {
	              // Add verbose displayName to the function, which helps when looking
	              // at profiling tools.
	              if (typeof property === 'function' && spec.displayName) {
	                proto[name].displayName = spec.displayName + '_' + name;
	              }
	            }
	          }
	        }
	      }
	    }
	  }

	  function mixStaticSpecIntoComponent(Constructor, statics) {
	    if (!statics) {
	      return;
	    }

	    for (var name in statics) {
	      var property = statics[name];
	      if (!statics.hasOwnProperty(name)) {
	        continue;
	      }

	      var isReserved = name in RESERVED_SPEC_KEYS;
	      _invariant(
	        !isReserved,
	        'ReactClass: You are attempting to define a reserved ' +
	          'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' +
	          'as an instance property instead; it will still be accessible on the ' +
	          'constructor.',
	        name
	      );

	      var isAlreadyDefined = name in Constructor;
	      if (isAlreadyDefined) {
	        var specPolicy = ReactClassStaticInterface.hasOwnProperty(name)
	          ? ReactClassStaticInterface[name]
	          : null;

	        _invariant(
	          specPolicy === 'DEFINE_MANY_MERGED',
	          'ReactClass: You are attempting to define ' +
	            '`%s` on your component more than once. This conflict may be ' +
	            'due to a mixin.',
	          name
	        );

	        Constructor[name] = createMergedResultFunction(Constructor[name], property);

	        return;
	      }

	      Constructor[name] = property;
	    }
	  }

	  /**
	   * Merge two objects, but throw if both contain the same key.
	   *
	   * @param {object} one The first object, which is mutated.
	   * @param {object} two The second object
	   * @return {object} one after it has been mutated to contain everything in two.
	   */
	  function mergeIntoWithNoDuplicateKeys(one, two) {
	    _invariant(
	      one && two && typeof one === 'object' && typeof two === 'object',
	      'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'
	    );

	    for (var key in two) {
	      if (two.hasOwnProperty(key)) {
	        _invariant(
	          one[key] === undefined,
	          'mergeIntoWithNoDuplicateKeys(): ' +
	            'Tried to merge two objects with the same key: `%s`. This conflict ' +
	            'may be due to a mixin; in particular, this may be caused by two ' +
	            'getInitialState() or getDefaultProps() methods returning objects ' +
	            'with clashing keys.',
	          key
	        );
	        one[key] = two[key];
	      }
	    }
	    return one;
	  }

	  /**
	   * Creates a function that invokes two functions and merges their return values.
	   *
	   * @param {function} one Function to invoke first.
	   * @param {function} two Function to invoke second.
	   * @return {function} Function that invokes the two argument functions.
	   * @private
	   */
	  function createMergedResultFunction(one, two) {
	    return function mergedResult() {
	      var a = one.apply(this, arguments);
	      var b = two.apply(this, arguments);
	      if (a == null) {
	        return b;
	      } else if (b == null) {
	        return a;
	      }
	      var c = {};
	      mergeIntoWithNoDuplicateKeys(c, a);
	      mergeIntoWithNoDuplicateKeys(c, b);
	      return c;
	    };
	  }

	  /**
	   * Creates a function that invokes two functions and ignores their return vales.
	   *
	   * @param {function} one Function to invoke first.
	   * @param {function} two Function to invoke second.
	   * @return {function} Function that invokes the two argument functions.
	   * @private
	   */
	  function createChainedFunction(one, two) {
	    return function chainedFunction() {
	      one.apply(this, arguments);
	      two.apply(this, arguments);
	    };
	  }

	  /**
	   * Binds a method to the component.
	   *
	   * @param {object} component Component whose method is going to be bound.
	   * @param {function} method Method to be bound.
	   * @return {function} The bound method.
	   */
	  function bindAutoBindMethod(component, method) {
	    var boundMethod = method.bind(component);
	    if (process.env.NODE_ENV !== 'production') {
	      boundMethod.__reactBoundContext = component;
	      boundMethod.__reactBoundMethod = method;
	      boundMethod.__reactBoundArguments = null;
	      var componentName = component.constructor.displayName;
	      var _bind = boundMethod.bind;
	      boundMethod.bind = function(newThis) {
	        for (
	          var _len = arguments.length,
	            args = Array(_len > 1 ? _len - 1 : 0),
	            _key = 1;
	          _key < _len;
	          _key++
	        ) {
	          args[_key - 1] = arguments[_key];
	        }

	        // User is trying to bind() an autobound method; we effectively will
	        // ignore the value of "this" that the user is trying to use, so
	        // let's warn.
	        if (newThis !== component && newThis !== null) {
	          if (process.env.NODE_ENV !== 'production') {
	            warning(
	              false,
	              'bind(): React component methods may only be bound to the ' +
	                'component instance. See %s',
	              componentName
	            );
	          }
	        } else if (!args.length) {
	          if (process.env.NODE_ENV !== 'production') {
	            warning(
	              false,
	              'bind(): You are binding a component method to the component. ' +
	                'React does this for you automatically in a high-performance ' +
	                'way, so you can safely remove this call. See %s',
	              componentName
	            );
	          }
	          return boundMethod;
	        }
	        var reboundMethod = _bind.apply(boundMethod, arguments);
	        reboundMethod.__reactBoundContext = component;
	        reboundMethod.__reactBoundMethod = method;
	        reboundMethod.__reactBoundArguments = args;
	        return reboundMethod;
	      };
	    }
	    return boundMethod;
	  }

	  /**
	   * Binds all auto-bound methods in a component.
	   *
	   * @param {object} component Component whose method is going to be bound.
	   */
	  function bindAutoBindMethods(component) {
	    var pairs = component.__reactAutoBindPairs;
	    for (var i = 0; i < pairs.length; i += 2) {
	      var autoBindKey = pairs[i];
	      var method = pairs[i + 1];
	      component[autoBindKey] = bindAutoBindMethod(component, method);
	    }
	  }

	  var IsMountedPreMixin = {
	    componentDidMount: function() {
	      this.__isMounted = true;
	    }
	  };

	  var IsMountedPostMixin = {
	    componentWillUnmount: function() {
	      this.__isMounted = false;
	    }
	  };

	  /**
	   * Add more to the ReactClass base class. These are all legacy features and
	   * therefore not already part of the modern ReactComponent.
	   */
	  var ReactClassMixin = {
	    /**
	     * TODO: This will be deprecated because state should always keep a consistent
	     * type signature and the only use case for this, is to avoid that.
	     */
	    replaceState: function(newState, callback) {
	      this.updater.enqueueReplaceState(this, newState, callback);
	    },

	    /**
	     * Checks whether or not this composite component is mounted.
	     * @return {boolean} True if mounted, false otherwise.
	     * @protected
	     * @final
	     */
	    isMounted: function() {
	      if (process.env.NODE_ENV !== 'production') {
	        warning(
	          this.__didWarnIsMounted,
	          '%s: isMounted is deprecated. Instead, make sure to clean up ' +
	            'subscriptions and pending requests in componentWillUnmount to ' +
	            'prevent memory leaks.',
	          (this.constructor && this.constructor.displayName) ||
	            this.name ||
	            'Component'
	        );
	        this.__didWarnIsMounted = true;
	      }
	      return !!this.__isMounted;
	    }
	  };

	  var ReactClassComponent = function() {};
	  _assign(
	    ReactClassComponent.prototype,
	    ReactComponent.prototype,
	    ReactClassMixin
	  );

	  /**
	   * Creates a composite component class given a class specification.
	   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
	   *
	   * @param {object} spec Class specification (which must define `render`).
	   * @return {function} Component constructor function.
	   * @public
	   */
	  function createClass(spec) {
	    // To keep our warnings more understandable, we'll use a little hack here to
	    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
	    // unnecessarily identify a class without displayName as 'Constructor'.
	    var Constructor = identity(function(props, context, updater) {
	      // This constructor gets overridden by mocks. The argument is used
	      // by mocks to assert on what gets mounted.

	      if (process.env.NODE_ENV !== 'production') {
	        warning(
	          this instanceof Constructor,
	          'Something is calling a React component directly. Use a factory or ' +
	            'JSX instead. See: https://fb.me/react-legacyfactory'
	        );
	      }

	      // Wire up auto-binding
	      if (this.__reactAutoBindPairs.length) {
	        bindAutoBindMethods(this);
	      }

	      this.props = props;
	      this.context = context;
	      this.refs = emptyObject;
	      this.updater = updater || ReactNoopUpdateQueue;

	      this.state = null;

	      // ReactClasses doesn't have constructors. Instead, they use the
	      // getInitialState and componentWillMount methods for initialization.

	      var initialState = this.getInitialState ? this.getInitialState() : null;
	      if (process.env.NODE_ENV !== 'production') {
	        // We allow auto-mocks to proceed as if they're returning null.
	        if (
	          initialState === undefined &&
	          this.getInitialState._isMockFunction
	        ) {
	          // This is probably bad practice. Consider warning here and
	          // deprecating this convenience.
	          initialState = null;
	        }
	      }
	      _invariant(
	        typeof initialState === 'object' && !Array.isArray(initialState),
	        '%s.getInitialState(): must return an object or null',
	        Constructor.displayName || 'ReactCompositeComponent'
	      );

	      this.state = initialState;
	    });
	    Constructor.prototype = new ReactClassComponent();
	    Constructor.prototype.constructor = Constructor;
	    Constructor.prototype.__reactAutoBindPairs = [];

	    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

	    mixSpecIntoComponent(Constructor, IsMountedPreMixin);
	    mixSpecIntoComponent(Constructor, spec);
	    mixSpecIntoComponent(Constructor, IsMountedPostMixin);

	    // Initialize the defaultProps property after all mixins have been merged.
	    if (Constructor.getDefaultProps) {
	      Constructor.defaultProps = Constructor.getDefaultProps();
	    }

	    if (process.env.NODE_ENV !== 'production') {
	      // This is a tag to indicate that the use of these method names is ok,
	      // since it's used with createClass. If it's not, then it's likely a
	      // mistake so we'll warn you to use the static property, property
	      // initializer or constructor respectively.
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps.isReactClassApproved = {};
	      }
	      if (Constructor.prototype.getInitialState) {
	        Constructor.prototype.getInitialState.isReactClassApproved = {};
	      }
	    }

	    _invariant(
	      Constructor.prototype.render,
	      'createClass(...): Class specification must implement a `render` method.'
	    );

	    if (process.env.NODE_ENV !== 'production') {
	      warning(
	        !Constructor.prototype.componentShouldUpdate,
	        '%s has a method called ' +
	          'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' +
	          'The name is phrased as a question because the function is ' +
	          'expected to return a value.',
	        spec.displayName || 'A component'
	      );
	      warning(
	        !Constructor.prototype.componentWillRecieveProps,
	        '%s has a method called ' +
	          'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',
	        spec.displayName || 'A component'
	      );
	      warning(
	        !Constructor.prototype.UNSAFE_componentWillRecieveProps,
	        '%s has a method called UNSAFE_componentWillRecieveProps(). ' +
	          'Did you mean UNSAFE_componentWillReceiveProps()?',
	        spec.displayName || 'A component'
	      );
	    }

	    // Reduce time spent doing lookups by setting these on the prototype.
	    for (var methodName in ReactClassInterface) {
	      if (!Constructor.prototype[methodName]) {
	        Constructor.prototype[methodName] = null;
	      }
	    }

	    return Constructor;
	  }

	  return createClass;
	}

	module.exports = factory;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var emptyObject = {};

	if (process.env.NODE_ENV !== 'production') {
	  Object.freeze(emptyObject);
	}

	module.exports = emptyObject;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var validateFormat = function validateFormat(format) {};

	if (process.env.NODE_ENV !== 'production') {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var emptyFunction = __webpack_require__(41);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (process.env.NODE_ENV !== 'production') {
	  var printWarning = function printWarning(format) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };

	  warning = function warning(condition, format) {
	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }

	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }

	      printWarning.apply(undefined, [format].concat(args));
	    }
	  };
	}

	module.exports = warning;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 41 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ }),
/* 42 */
/***/ (function(module, exports) {

	'use strict';

	var _calendarViewHierarchy, _calendarViewUnits;

	var views = {
	  MONTH: 'month',
	  YEAR: 'year',
	  DECADE: 'decade',
	  CENTURY: 'century'
	};

	module.exports = {
	  directions: {
	    LEFT: 'LEFT',
	    RIGHT: 'RIGHT',
	    UP: 'UP',
	    DOWN: 'DOWN'
	  },

	  datePopups: {
	    TIME: 'time',
	    CALENDAR: 'calendar'
	  },

	  calendarViews: views,

	  calendarViewHierarchy: (_calendarViewHierarchy = {}, _calendarViewHierarchy[views.MONTH] = views.YEAR, _calendarViewHierarchy[views.YEAR] = views.DECADE, _calendarViewHierarchy[views.DECADE] = views.CENTURY, _calendarViewHierarchy),

	  calendarViewUnits: (_calendarViewUnits = {}, _calendarViewUnits[views.MONTH] = 'day', _calendarViewUnits[views.YEAR] = views.MONTH, _calendarViewUnits[views.DECADE] = views.YEAR, _calendarViewUnits[views.CENTURY] = views.DECADE, _calendarViewUnits),

	  keyCodes: {
	    ENTER: 13,
	    ESCAPE: 27,
	    END: 35,
	    HOME: 36,
	    UP_ARROW: 38,
	    DOWN_ARROW: 40
	  }
	};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _propTypes = __webpack_require__(22);

	var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(36);

	var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

	var _domHelpersStyle = __webpack_require__(7);

	var _domHelpersStyle2 = babelHelpers.interopRequireDefault(_domHelpersStyle);

	var _domHelpersQueryHeight = __webpack_require__(44);

	var _domHelpersQueryHeight2 = babelHelpers.interopRequireDefault(_domHelpersQueryHeight);

	var _utilConfiguration = __webpack_require__(4);

	var _utilConfiguration2 = babelHelpers.interopRequireDefault(_utilConfiguration);

	var _classnames = __webpack_require__(35);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _utilCompat = __webpack_require__(47);

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

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var offset = __webpack_require__(45),
	    getWindow = __webpack_require__(46);

	module.exports = function height(node, client) {
	  var win = getWindow(node);
	  return win ? win.innerHeight : client ? node.clientHeight : offset(node).height;
	};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var contains = __webpack_require__(34),
	    getWindow = __webpack_require__(46),
	    ownerDocument = __webpack_require__(33);

	module.exports = function offset(node) {
	  var doc = ownerDocument(node),
	      win = getWindow(doc),
	      docElem = doc && doc.documentElement,
	      box = { top: 0, left: 0, height: 0, width: 0 };

	  if (!doc) return;

	  // Make sure it's not a disconnected DOM node
	  if (!contains(docElem, node)) return box;

	  if (node.getBoundingClientRect !== undefined) box = node.getBoundingClientRect();

	  if (box.width || box.height) {

	    box = {
	      top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
	      left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0),
	      width: (box.width == null ? node.offsetWidth : box.width) || 0,
	      height: (box.height == null ? node.offsetHeight : box.height) || 0
	    };
	  }

	  return box;
	};

/***/ }),
/* 46 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function getWindow(node) {
	  return node === node.window ? node : node.nodeType === 9 ? node.defaultView || node.parentWindow : false;
	};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _reactDom = __webpack_require__(48);

	var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);

	var _version = _react2['default'].version.split('.').map(parseFloat);

	module.exports = {

	  version: function version() {
	    return _version;
	  },

	  findDOMNode: function findDOMNode(component) {
	    return _reactDom2['default'].findDOMNode(component);
	  },

	  batchedUpdates: function batchedUpdates(cb) {
	    _reactDom2['default'].unstable_batchedUpdates(cb);
	  }

	};

/***/ }),
/* 48 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_48__;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _propTypes = __webpack_require__(22);

	var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(36);

	var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

	var _localizers = __webpack_require__(18);

	var _localizers2 = babelHelpers.interopRequireDefault(_localizers);

	var _filter = __webpack_require__(50);

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

/***/ }),
/* 50 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;
	var common = {
	  eq: function eq(a, b) {
	    return a === b;
	  },
	  neq: function neq(a, b) {
	    return a !== b;
	  },
	  gt: function gt(a, b) {
	    return a > b;
	  },
	  gte: function gte(a, b) {
	    return a >= b;
	  },
	  lt: function lt(a, b) {
	    return a < b;
	  },
	  lte: function lte(a, b) {
	    return a <= b;
	  },

	  contains: function contains(a, b) {
	    return a.indexOf(b) !== -1;
	  },

	  startsWith: function startsWith(a, b) {
	    return a.lastIndexOf(b, 0) === 0;
	  },

	  endsWith: function endsWith(a, b) {
	    var pos = a.length - b.length,
	        lastIndex = a.indexOf(b, pos);

	    return lastIndex !== -1 && lastIndex === pos;
	  }
	};

	exports["default"] = common;
	module.exports = exports["default"];

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _propTypes = __webpack_require__(22);

	var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(36);

	var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

	var _ListOption = __webpack_require__(52);

	var _ListOption2 = babelHelpers.interopRequireDefault(_ListOption);

	var _utilPropTypes = __webpack_require__(49);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _utilCompat = __webpack_require__(47);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var _classnames = __webpack_require__(35);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _utilDataHelpers = __webpack_require__(53);

	var _utilWidgetHelpers = __webpack_require__(54);

	var optionId = function optionId(id, idx) {
	  return id + '__option__' + idx;
	};

	exports['default'] = _createReactClass2['default']({

	  displayName: 'List',

	  mixins: [__webpack_require__(55), __webpack_require__(56)()],

	  propTypes: {
	    data: _propTypes2['default'].array,
	    onSelect: _propTypes2['default'].func,
	    onMove: _propTypes2['default'].func,

	    optionComponent: _utilPropTypes2['default'].elementType,
	    itemComponent: _utilPropTypes2['default'].elementType,

	    selectedIndex: _propTypes2['default'].number,
	    focusedIndex: _propTypes2['default'].number,
	    valueField: _propTypes2['default'].string,
	    textField: _utilPropTypes2['default'].accessor,

	    focused: _propTypes2['default'].element,

	    optionID: _propTypes2['default'].func,

	    messages: _propTypes2['default'].shape({
	      emptyList: _utilPropTypes2['default'].message
	    })
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      optID: '',
	      onSelect: function onSelect() {},
	      optionComponent: _ListOption2['default'],
	      ariaActiveDescendantKey: 'list',
	      data: [],
	      messages: {
	        emptyList: 'There are no items in this list'
	      }
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    this.move();
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    var _props = this.props;
	    var data = _props.data;
	    var focused = _props.focused;
	    var idx = data.indexOf(focused);
	    var activeId = optionId(_utilWidgetHelpers.instanceId(this), idx);

	    this.ariaActiveDescendant(idx !== -1 ? activeId : null);

	    this.move();
	  },

	  render: function render() {
	    var _this = this;

	    var _props2 = this.props;
	    var className = _props2.className;
	    var role = _props2.role;
	    var data = _props2.data;
	    var textField = _props2.textField;
	    var valueField = _props2.valueField;
	    var focused = _props2.focused;
	    var selected = _props2.selected;
	    var messages = _props2.messages;
	    var onSelect = _props2.onSelect;
	    var ItemComponent = _props2.itemComponent;
	    var Option = _props2.optionComponent;
	    var optionID = _props2.optionID;
	    var props = babelHelpers.objectWithoutProperties(_props2, ['className', 'role', 'data', 'textField', 'valueField', 'focused', 'selected', 'messages', 'onSelect', 'itemComponent', 'optionComponent', 'optionID']);
	    var id = _utilWidgetHelpers.instanceId(this);
	    var items;

	    items = !data.length ? _react2['default'].createElement(
	      'li',
	      { className: 'rw-list-empty' },
	      _util_2['default'].result(messages.emptyList, this.props)
	    ) : data.map(function (item, idx) {
	      var currentId = optionId(id, idx);

	      return _react2['default'].createElement(
	        Option,
	        {
	          key: 'item_' + idx,
	          id: currentId,
	          dataItem: item,
	          focused: focused === item,
	          selected: selected === item,
	          onClick: onSelect.bind(null, item)
	        },
	        ItemComponent ? _react2['default'].createElement(ItemComponent, {
	          item: item,
	          value: _utilDataHelpers.dataValue(item, valueField),
	          text: _utilDataHelpers.dataText(item, textField)
	        }) : _utilDataHelpers.dataText(item, textField)
	      );
	    });

	    return _react2['default'].createElement(
	      'ul',
	      babelHelpers._extends({
	        ref: function (ref) {
	          return _this.ulRef = ref;
	        },
	        id: id,
	        tabIndex: '-1',
	        className: _classnames2['default'](className, 'rw-list'),
	        role: role === undefined ? 'listbox' : role
	      }, props),
	      items
	    );
	  },

	  _data: function _data() {
	    return this.props.data;
	  },

	  move: function move() {
	    var list = _utilCompat2['default'].findDOMNode(this),
	        idx = this._data().indexOf(this.props.focused),
	        selected = list.children[idx];

	    if (!selected) return;

	    _utilWidgetHelpers.notify(this.props.onMove, [selected, list, this.props.focused]);
	  }

	});
	module.exports = exports['default'];

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _propTypes = __webpack_require__(22);

	var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(35);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _createReactClass = __webpack_require__(36);

	var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

	var ListOption = _createReactClass2['default']({
	  propTypes: {
	    dataItem: _propTypes2['default'].any,
	    focused: _propTypes2['default'].bool,
	    selected: _propTypes2['default'].bool
	  },

	  render: function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var children = _props.children;
	    var focused = _props.focused;
	    var selected = _props.selected;
	    var props = babelHelpers.objectWithoutProperties(_props, ['className', 'children', 'focused', 'selected']);

	    var classes = {
	      'rw-state-focus': focused,
	      'rw-state-selected': selected
	    };

	    return _react2['default'].createElement(
	      'li',
	      babelHelpers._extends({
	        role: 'option',
	        tabIndex: '-1',
	        'aria-selected': !!selected,
	        className: _classnames2['default']('rw-list-option', className, classes)
	      }, props),
	      children
	    );
	  }
	});

	exports['default'] = ListOption;
	module.exports = exports['default'];

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.dataValue = dataValue;
	exports.dataText = dataText;
	exports.dataIndexOf = dataIndexOf;
	exports.valueMatcher = valueMatcher;
	exports.dataItem = dataItem;

	var _ = __webpack_require__(20);

	function accessor(data, field) {
	  var value = data;

	  if (typeof field === 'function') value = field(data);else if (data == null) value = data;else if (typeof field === 'string' && typeof data === 'object' && field in data) value = data[field];

	  return value;
	}

	function dataValue(item, valueField) {
	  return valueField && item && _.has(item, valueField) ? item[valueField] : item;
	}

	function dataText(item, textField) {
	  var value = accessor(item, textField);
	  return value == null ? '' : value + '';
	}

	function dataIndexOf(data, item, valueField) {
	  var idx = -1,
	      len = data.length,
	      finder = function finder(datum) {
	    return valueMatcher(item, datum, valueField);
	  };

	  while (++idx < len) if (finder(data[idx])) return idx;

	  return -1;
	}

	function valueMatcher(a, b, valueField) {
	  return _.isShallowEqual(dataValue(a, valueField), dataValue(b, valueField));
	}

	function dataItem(data, item, valueField) {
	  var first = data[0],
	      idx;

	  // make an attempt to see if we were passed in dataItem vs just a valueField value
	  // either an object with the right prop, or a primitive
	  // { valueField: 5 } || "hello" [ "hello" ]
	  if (_.has(item, valueField) || typeof first === typeof val) return item;

	  idx = dataIndexOf(data, dataValue(item, valueField), valueField);

	  if (idx !== -1) return data[idx];

	  return item;
	}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.notify = notify;
	exports.instanceId = instanceId;
	exports.isFirstFocusedRender = isFirstFocusedRender;

	var _ = __webpack_require__(20);

	function notify(handler, args) {
	  handler && handler.apply(null, [].concat(args));
	}

	function instanceId(component) {
	  var suffix = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

	  component.__id || (component.__id = _.uniqueId('rw_'));
	  return (component.props.id || component.__id) + suffix;
	}

	function isFirstFocusedRender(component) {
	  return component._firstFocus || component.state.focused && (component._firstFocus = true);
	}

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _propTypes = __webpack_require__(22);

	var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

	var _utilFilter = __webpack_require__(50);

	var _utilFilter2 = babelHelpers.interopRequireDefault(_utilFilter);

	var _utilDataHelpers = __webpack_require__(53);

	module.exports = {

	  propTypes: {
	    textField: _propTypes2['default'].string
	  },

	  first: function first() {
	    return this._data()[0];
	  },

	  last: function last() {
	    var data = this._data();
	    return data[data.length - 1];
	  },

	  prev: function prev(item, word) {
	    var textField = this.props.textField,
	        data = this._data(),
	        idx = data.indexOf(item);

	    if (idx === -1) idx = data.length;

	    return word ? findPrevInstance(textField, data, word, idx) : --idx < 0 ? data[0] : data[idx];
	  },

	  next: function next(item, word) {
	    var textField = this.props.textField,
	        data = this._data(),
	        idx = data.indexOf(item);

	    return word ? findNextInstance(textField, data, word, idx) : ++idx === data.length ? data[data.length - 1] : data[idx];
	  }

	};

	function findNextInstance(textField, data, word, startIndex) {
	  var matches = _utilFilter2['default'].startsWith,
	      idx = -1,
	      len = data.length,
	      foundStart,
	      itemText;

	  word = word.toLowerCase();

	  while (++idx < len) {
	    foundStart = foundStart || idx > startIndex;
	    itemText = foundStart && _utilDataHelpers.dataText(data[idx], textField).toLowerCase();

	    if (foundStart && matches(itemText, word)) return data[idx];
	  }
	}

	function findPrevInstance(textField, data, word, startIndex) {
	  var matches = _utilFilter2['default'].startsWith,
	      idx = data.length,
	      foundStart,
	      itemText;

	  word = word.toLowerCase();

	  while (--idx >= 0) {
	    foundStart = foundStart || idx < startIndex;
	    itemText = foundStart && _utilDataHelpers.dataText(data[idx], textField).toLowerCase();

	    if (foundStart && matches(itemText, word)) return data[idx];
	  }
	}

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _propTypes = __webpack_require__(22);

	var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

	var _utilCompat = __webpack_require__(47);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var shape = _propTypes2['default'].shape({
	  //setActive: PropTypes.func,
	  reconcile: _propTypes2['default'].func
	});

	function defaultReconcile(key, id) {
	  return id;
	}

	function flushAriaToNode(id, nodeOrComponent, ctx) {
	  var node = typeof nodeOrComponent === 'function' ? nodeOrComponent(ctx) : typeof nodeOrComponent === 'string' ? ctx.refs[nodeOrComponent] : ctx;

	  if (node) {
	    if (id) _utilCompat2['default'].findDOMNode(node).setAttribute('aria-activedescendant', id);else _utilCompat2['default'].findDOMNode(node).removeAttribute('aria-activedescendant');
	  }
	}

	exports['default'] = function (nodeOrComponent) {
	  var reconcileChildren = arguments.length <= 1 || arguments[1] === undefined ? defaultReconcile : arguments[1];

	  return {
	    propTypes: {
	      ariaActiveDescendantKey: _propTypes2['default'].string.isRequired
	    },

	    contextTypes: {
	      activeDescendants: shape
	    },

	    childContextTypes: {
	      activeDescendants: shape
	    },

	    ariaActiveDescendant: function ariaActiveDescendant(id) {
	      var key = arguments.length <= 1 || arguments[1] === undefined ? this.props.ariaActiveDescendantKey : arguments[1];
	      var activeDescendants = this.context.activeDescendants;

	      var current = this.__ariaActiveDescendantId;

	      if (id === undefined) return current;

	      id = reconcileChildren.call(this, key, id);

	      if (id === undefined) id = current;else {
	        this.__ariaActiveDescendantId = id;
	        flushAriaToNode(id, nodeOrComponent, this);
	      }

	      activeDescendants && activeDescendants.reconcile(key, id);
	    },

	    getChildContext: function getChildContext() {
	      var _this = this;

	      return this._context || (this._context = {
	        activeDescendants: {
	          reconcile: function reconcile(key, id) {
	            return _this.ariaActiveDescendant(id, key);
	          }
	        }
	      });
	    }
	  };
	};

	module.exports = exports['default'];

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _propTypes = __webpack_require__(22);

	var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(36);

	var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

	var _ListOption = __webpack_require__(52);

	var _ListOption2 = babelHelpers.interopRequireDefault(_ListOption);

	var _utilPropTypes = __webpack_require__(49);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _utilCompat = __webpack_require__(47);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var _classnames = __webpack_require__(35);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _warning = __webpack_require__(58);

	var _warning2 = babelHelpers.interopRequireDefault(_warning);

	var _utilDataHelpers = __webpack_require__(53);

	var _utilWidgetHelpers = __webpack_require__(54);

	var optionId = function optionId(id, idx) {
	  return id + '__option__' + idx;
	};

	exports['default'] = _createReactClass2['default']({

	  displayName: 'List',

	  mixins: [__webpack_require__(55), __webpack_require__(56)()],

	  propTypes: {
	    data: _propTypes2['default'].array,
	    onSelect: _propTypes2['default'].func,
	    onMove: _propTypes2['default'].func,

	    optionComponent: _utilPropTypes2['default'].elementType,
	    itemComponent: _utilPropTypes2['default'].elementType,
	    groupComponent: _utilPropTypes2['default'].elementType,

	    selected: _propTypes2['default'].any,
	    focused: _propTypes2['default'].any,

	    valueField: _propTypes2['default'].string,
	    textField: _utilPropTypes2['default'].accessor,

	    optID: _propTypes2['default'].string,

	    groupBy: _utilPropTypes2['default'].accessor,

	    messages: _propTypes2['default'].shape({
	      emptyList: _utilPropTypes2['default'].message
	    })
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      optID: '',
	      onSelect: function onSelect() {},
	      data: [],
	      optionComponent: _ListOption2['default'],
	      ariaActiveDescendantKey: 'groupedList',
	      messages: {
	        emptyList: 'There are no items in this list'
	      }
	    };
	  },

	  getInitialState: function getInitialState() {
	    var keys = [];

	    return {
	      groups: this._group(this.props.groupBy, this.props.data, keys),

	      sortedKeys: keys
	    };
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    var keys = [];

	    if (nextProps.data !== this.props.data || nextProps.groupBy !== this.props.groupBy) this.setState({
	      groups: this._group(nextProps.groupBy, nextProps.data, keys),
	      sortedKeys: keys
	    });
	  },

	  componentDidMount: function componentDidMount() {
	    this.move();
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    this.ariaActiveDescendant(this._currentActiveID);
	    this.move();
	  },

	  render: function render() {
	    var _this = this;

	    var _props = this.props;
	    var className = _props.className;
	    var role = _props.role;
	    var data = _props.data;
	    var messages = _props.messages;
	    var onSelect = _props.onSelect;
	    var selectedIndex = _props.selectedIndex;
	    var props = babelHelpers.objectWithoutProperties(_props, ['className', 'role', 'data', 'messages', 'onSelect', 'selectedIndex']);
	    var id = _utilWidgetHelpers.instanceId(this);var _state = this.state;
	    var sortedKeys = _state.sortedKeys;
	    var groups = _state.groups;

	    var items = [],
	        idx = -1,
	        group = undefined;

	    this._currentActiveID = null;

	    if (data.length) {
	      items = sortedKeys.reduce(function (items, key) {
	        group = groups[key];
	        items.push(_this._renderGroupHeader(key));

	        for (var itemIdx = 0; itemIdx < group.length; itemIdx++) items.push(_this._renderItem(key, group[itemIdx], ++idx));

	        return items;
	      }, []);
	    } else items = _react2['default'].createElement(
	      'li',
	      { className: 'rw-list-empty' },
	      _util_2['default'].result(messages.emptyList, this.props)
	    );

	    return _react2['default'].createElement(
	      'ul',
	      babelHelpers._extends({
	        ref: function (ref) {
	          return _this.scrollableRef = ref;
	        },
	        id: id,
	        tabIndex: '-1',
	        className: _classnames2['default'](className, 'rw-list', 'rw-list-grouped'),
	        role: role === undefined ? 'listbox' : role
	      }, props),
	      items
	    );
	  },

	  _renderGroupHeader: function _renderGroupHeader(group) {
	    var GroupComponent = this.props.groupComponent,
	        id = _utilWidgetHelpers.instanceId(this);

	    return _react2['default'].createElement(
	      'li',
	      {
	        key: 'item_' + group,
	        tabIndex: '-1',
	        role: 'separator',
	        id: id + '_group_' + group,
	        className: 'rw-list-optgroup'
	      },
	      GroupComponent ? _react2['default'].createElement(GroupComponent, { item: group }) : group
	    );
	  },

	  _renderItem: function _renderItem(group, item, idx) {
	    var _props2 = this.props;
	    var focused = _props2.focused;
	    var selected = _props2.selected;
	    var onSelect = _props2.onSelect;
	    var textField = _props2.textField;
	    var valueField = _props2.valueField;
	    var ItemComponent = _props2.itemComponent;
	    var Option = _props2.optionComponent;

	    var currentID = optionId(_utilWidgetHelpers.instanceId(this), idx);

	    if (focused === item) this._currentActiveID = currentID;

	    return _react2['default'].createElement(
	      Option,
	      {
	        key: 'item_' + group + '_' + idx,
	        id: currentID,
	        dataItem: item,
	        focused: focused === item,
	        selected: selected === item,
	        onClick: onSelect.bind(null, item)
	      },
	      ItemComponent ? _react2['default'].createElement(ItemComponent, {
	        item: item,
	        value: _utilDataHelpers.dataValue(item, valueField),
	        text: _utilDataHelpers.dataText(item, textField)
	      }) : _utilDataHelpers.dataText(item, textField)
	    );
	  },

	  _isIndexOf: function _isIndexOf(idx, item) {
	    return this.props.data[idx] === item;
	  },

	  _group: function _group(groupBy, data, keys) {
	    var iter = typeof groupBy === 'function' ? groupBy : function (item) {
	      return item[groupBy];
	    };

	    // the keys array ensures that groups are rendered in the order they came in
	    // which means that if you sort the data array it will render sorted,
	    // so long as you also sorted by group
	    keys = keys || [];

	    _warning2['default'](typeof groupBy !== 'string' || !data.length || _util_2['default'].has(data[0], groupBy), '[React Widgets] You are seem to be trying to group this list by a ' + ('property `' + groupBy + '` that doesn\'t exist in the dataset items, this may be a typo'));

	    return data.reduce(function (grps, item) {
	      var group = iter(item);

	      _util_2['default'].has(grps, group) ? grps[group].push(item) : (keys.push(group), grps[group] = [item]);

	      return grps;
	    }, {});
	  },

	  _data: function _data() {
	    var groups = this.state.groups;

	    return this.state.sortedKeys.reduce(function (flat, grp) {
	      return flat.concat(groups[grp]);
	    }, []);
	  },

	  move: function move() {
	    var selected = this.getItemDOMNode(this.props.focused);

	    if (!selected) return;

	    _utilWidgetHelpers.notify(this.props.onMove, [selected, _utilCompat2['default'].findDOMNode(this), this.props.focused]);
	  },

	  getItemDOMNode: function getItemDOMNode(item) {
	    var list = _utilCompat2['default'].findDOMNode(this),
	        groups = this.state.groups,
	        idx = -1,
	        itemIdx,
	        child;

	    this.state.sortedKeys.some(function (group) {
	      itemIdx = groups[group].indexOf(item);
	      idx++;

	      if (itemIdx !== -1) return !!(child = list.children[idx + itemIdx + 1]);

	      idx += groups[group].length;
	    });

	    return child;
	  }

	});
	module.exports = exports['default'];

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = function() {};

	if (process.env.NODE_ENV !== 'production') {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }

	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}

	module.exports = warning;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;
	exports['default'] = validateListComponent;

	var _invariant = __webpack_require__(19);

	var _invariant2 = babelHelpers.interopRequireDefault(_invariant);

	var METHODS = ['next', 'prev', 'first', 'last'];

	function validateListComponent(list) {
	  if (process.env.NODE_ENV !== 'production') {
	    METHODS.forEach(function (method) {
	      return _invariant2['default'](typeof list[method] === 'function', 'List components must implement a `' + method + '()` method');
	    });
	  }
	}

	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createUncontrollable = __webpack_require__(61);

	var _createUncontrollable2 = _interopRequireDefault(_createUncontrollable);

	var mixin = {
	  shouldComponentUpdate: function shouldComponentUpdate() {
	    //let the forceUpdate trigger the update
	    return !this._notifying;
	  }
	};

	function set(component, propName, handler, value, args) {
	  if (handler) {
	    component._notifying = true;
	    handler.call.apply(handler, [component, value].concat(args));
	    component._notifying = false;
	  }

	  component._values[propName] = value;

	  if (component.isMounted()) component.forceUpdate();
	}

	exports['default'] = _createUncontrollable2['default']([mixin], set);
	module.exports = exports['default'];

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = createUncontrollable;

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var _react = __webpack_require__(21);

	var _react2 = _interopRequireDefault(_react);

	var _utils = __webpack_require__(62);

	var utils = _interopRequireWildcard(_utils);

	function createUncontrollable(mixins, set) {

	  return uncontrollable;

	  function uncontrollable(Component, controlledValues) {
	    var methods = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

	    var displayName = Component.displayName || Component.name || 'Component',
	        basePropTypes = utils.getType(Component).propTypes,
	        propTypes;

	    propTypes = utils.uncontrolledPropTypes(controlledValues, basePropTypes, displayName);

	    methods = utils.transform(methods, function (obj, method) {
	      obj[method] = function () {
	        var _refs$inner;

	        return (_refs$inner = this.refs.inner)[method].apply(_refs$inner, arguments);
	      };
	    }, {});

	    var component = _react2['default'].createClass(_extends({

	      displayName: 'Uncontrolled(' + displayName + ')',

	      mixins: mixins,

	      propTypes: propTypes

	    }, methods, {

	      componentWillMount: function componentWillMount() {
	        var props = this.props,
	            keys = Object.keys(controlledValues);

	        this._values = utils.transform(keys, function (values, key) {
	          values[key] = props[utils.defaultKey(key)];
	        }, {});
	      },

	      /**
	       * If a prop switches from controlled to Uncontrolled
	       * or if the prop's default counterpart changes
	       * reset its value to the defaultValue
	       */
	      componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        var _this = this;

	        var props = this.props,
	            keys = Object.keys(controlledValues);

	        keys.forEach(function (key) {
	          if (utils.getValue(nextProps, key) === undefined && utils.getValue(props, key) !== undefined) {
	            _this._values[key] = nextProps[utils.defaultKey(key)];
	          } else if (utils.getValue(nextProps, utils.defaultKey(key)) !== utils.getValue(props, utils.defaultKey(key))) {
	            _this._values[key] = nextProps[utils.defaultKey(key)];
	          }
	        });
	      },

	      render: function render() {
	        var _this2 = this;

	        var newProps = {};
	        var _props = this.props;
	        var valueLink = _props.valueLink;
	        var checkedLink = _props.checkedLink;

	        var props = _objectWithoutProperties(_props, ['valueLink', 'checkedLink']);

	        utils.each(controlledValues, function (handle, propName) {
	          var linkPropName = utils.getLinkName(propName),
	              prop = _this2.props[propName];

	          if (linkPropName && !isProp(_this2.props, propName) && isProp(_this2.props, linkPropName)) {
	            prop = _this2.props[linkPropName].value;
	          }

	          newProps[propName] = prop !== undefined ? prop : _this2._values[propName];

	          newProps[handle] = setAndNotify.bind(_this2, propName);
	        });

	        newProps = _extends({}, props, newProps, { ref: 'inner' });

	        return _react2['default'].createElement(Component, newProps);
	      }

	    }));

	    component.ControlledComponent = Component;

	    /**
	     * useful when wrapping a Component and you want to control
	     * everything
	     */
	    component.deferControlTo = function (newComponent, additions, nextMethods) {
	      if (additions === undefined) additions = {};

	      return uncontrollable(newComponent, _extends({}, controlledValues, additions), nextMethods);
	    };

	    return component;

	    function setAndNotify(propName, value) {
	      var linkName = utils.getLinkName(propName),
	          handler = this.props[controlledValues[propName]];

	      if (linkName && isProp(this.props, linkName) && !handler) {
	        handler = this.props[linkName].requestChange;
	      }

	      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	        args[_key - 2] = arguments[_key];
	      }

	      set(this, propName, handler, value, args);
	    }

	    function isProp(props, prop) {
	      return props[prop] !== undefined;
	    }
	  }
	}

	module.exports = exports['default'];

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports.customPropType = customPropType;
	exports.uncontrolledPropTypes = uncontrolledPropTypes;
	exports.getType = getType;
	exports.getValue = getValue;
	exports.getLinkName = getLinkName;
	exports.defaultKey = defaultKey;
	exports.chain = chain;
	exports.transform = transform;
	exports.each = each;
	exports.has = has;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(21);

	var _react2 = _interopRequireDefault(_react);

	var _invariant = __webpack_require__(19);

	var _invariant2 = _interopRequireDefault(_invariant);

	function customPropType(handler, propType, name) {

	  return function (props, propName) {

	    if (props[propName] !== undefined) {
	      if (!props[handler]) {
	        return new Error('You have provided a `' + propName + '` prop to ' + '`' + name + '` without an `' + handler + '` handler. This will render a read-only field. ' + 'If the field should be mutable use `' + defaultKey(propName) + '`. Otherwise, set `' + handler + '`');
	      }

	      return propType && propType(props, propName, name);
	    }
	  };
	}

	function uncontrolledPropTypes(controlledValues, basePropTypes, displayName) {
	  var propTypes = {};

	  if (process.env.NODE_ENV !== 'production' && basePropTypes) {
	    transform(controlledValues, function (obj, handler, prop) {
	      var type = basePropTypes[prop];

	      _invariant2['default'](typeof handler === 'string' && handler.trim().length, 'Uncontrollable - [%s]: the prop `%s` needs a valid handler key name in order to make it uncontrollable', displayName, prop);

	      obj[prop] = customPropType(handler, type, displayName);

	      if (type !== undefined) obj[defaultKey(prop)] = type;
	    }, propTypes);
	  }

	  return propTypes;
	}

	var version = _react2['default'].version.split('.').map(parseFloat);

	exports.version = version;

	function getType(component) {
	  if (version[0] === 0 && version[1] >= 13) return component;

	  return component.type;
	}

	function getValue(props, name) {
	  var linkPropName = getLinkName(name);

	  if (linkPropName && !isProp(props, name) && isProp(props, linkPropName)) return props[linkPropName].value;

	  return props[name];
	}

	function isProp(props, prop) {
	  return props[prop] !== undefined;
	}

	function getLinkName(name) {
	  return name === 'value' ? 'valueLink' : name === 'checked' ? 'checkedLink' : null;
	}

	function defaultKey(key) {
	  return 'default' + key.charAt(0).toUpperCase() + key.substr(1);
	}

	function chain(thisArg, a, b) {
	  return function chainedFunction() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    a && a.call.apply(a, [thisArg].concat(args));
	    b && b.call.apply(b, [thisArg].concat(args));
	  };
	}

	function transform(obj, cb, seed) {
	  each(obj, cb.bind(null, seed = seed || (Array.isArray(obj) ? [] : {})));
	  return seed;
	}

	function each(obj, cb, thisArg) {
	  if (Array.isArray(obj)) return obj.forEach(cb, thisArg);

	  for (var key in obj) if (has(obj, key)) cb.call(thisArg, obj[key], key, obj);
	}

	function has(o, k) {
	  return o ? Object.prototype.hasOwnProperty.call(o, k) : false;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _propTypes = __webpack_require__(22);

	var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

	var _domHelpersStyle = __webpack_require__(7);

	var _domHelpersStyle2 = babelHelpers.interopRequireDefault(_domHelpersStyle);

	var _domHelpersQueryHeight = __webpack_require__(44);

	var _domHelpersQueryHeight2 = babelHelpers.interopRequireDefault(_domHelpersQueryHeight);

	var _createReactClass = __webpack_require__(36);

	var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

	var _utilConfiguration = __webpack_require__(4);

	var _utilConfiguration2 = babelHelpers.interopRequireDefault(_utilConfiguration);

	var _classnames = __webpack_require__(35);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _utilCompat = __webpack_require__(47);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var _TetherTarget = __webpack_require__(64);

	var _TetherTarget2 = babelHelpers.interopRequireDefault(_TetherTarget);

	var _util_ = __webpack_require__(20);

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

	    if (!open) return null;

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
	    var placeholder = this.contentRef;
	    var self = this,
	        anim = _utilCompat2['default'].findDOMNode(this),
	        contentEl = _utilCompat2['default'].findDOMNode(content);

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

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _propTypes = __webpack_require__(22);

	var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

	var _utilTetherElement = __webpack_require__(65);

	var _utilTetherElement2 = babelHelpers.interopRequireDefault(_utilTetherElement);

	var _utilCompat = __webpack_require__(47);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var TetherTarget = (function (_React$Component) {
	  babelHelpers.inherits(TetherTarget, _React$Component);

	  function TetherTarget() {
	    babelHelpers.classCallCheck(this, TetherTarget);

	    _React$Component.apply(this, arguments);
	  }

	  TetherTarget.prototype.render = function render() {
	    var Component = this.props.component;

	    return _react2['default'].createElement(
	      Component,
	      this.props,
	      this.props.children
	    );
	  };

	  TetherTarget.prototype.componentDidMount = function componentDidMount() {
	    var _props = this.props;
	    var tether = _props.tether;
	    var tetherOptions = _props.options;

	    var options = babelHelpers._extends({}, tetherOptions, { target: _utilCompat2['default'].findDOMNode(this) });

	    this.tethered = new _utilTetherElement2['default'](tether, options);
	  };

	  TetherTarget.prototype.componentDidUpdate = function componentDidUpdate() {
	    var tether = this.props.tether;

	    this.tethered.update(tether);
	  };

	  TetherTarget.prototype.componentWillUnmount = function componentWillUnmount() {
	    this.tethered.destroy();
	  };

	  babelHelpers.createClass(TetherTarget, null, [{
	    key: 'propTypes',
	    value: {
	      tethered: _propTypes2['default'].node,
	      options: _propTypes2['default'].object,
	      component: _propTypes2['default'].node
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      component: 'div'
	    },
	    enumerable: true
	  }]);
	  return TetherTarget;
	})(_react2['default'].Component);

	exports['default'] = TetherTarget;
	module.exports = exports['default'];

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _tether = __webpack_require__(66);

	var _tether2 = babelHelpers.interopRequireDefault(_tether);

	var _reactDom = __webpack_require__(48);

	var TetherElement = (function () {
		function TetherElement(component, options) {
			babelHelpers.classCallCheck(this, TetherElement);

			this.component = component;
			this.node = document.createElement('div');
			this.node.style.position = 'absolute';
			document.body.appendChild(this.node);
			this.tether = new _tether2['default'](babelHelpers._extends({}, options, { element: this.node }));
			this.update(component);
		}

		TetherElement.prototype.update = function update() {
			var _this = this;

			var component = arguments.length <= 0 || arguments[0] === undefined ? this.component : arguments[0];

			_reactDom.render(component, this.node, function () {
				return _this.tether.position();
			});

			this.component = component;
		};

		TetherElement.prototype.destroy = function destroy() {
			_reactDom.unmountComponentAtNode(this.node);
			this.node.parentNode.removeChild(this.node);
			this.tether.destroy();
		};

		return TetherElement;
	})();

	exports['default'] = TetherElement;
	module.exports = exports['default'];

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! tether 1.4.0 */

	(function(root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    module.exports = factory(require, exports, module);
	  } else {
	    root.Tether = factory();
	  }
	}(this, function(require, exports, module) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var TetherBase = undefined;
	if (typeof TetherBase === 'undefined') {
	  TetherBase = { modules: [] };
	}

	var zeroElement = null;

	// Same as native getBoundingClientRect, except it takes into account parent <frame> offsets
	// if the element lies within a nested document (<frame> or <iframe>-like).
	function getActualBoundingClientRect(node) {
	  var boundingRect = node.getBoundingClientRect();

	  // The original object returned by getBoundingClientRect is immutable, so we clone it
	  // We can't use extend because the properties are not considered part of the object by hasOwnProperty in IE9
	  var rect = {};
	  for (var k in boundingRect) {
	    rect[k] = boundingRect[k];
	  }

	  if (node.ownerDocument !== document) {
	    var _frameElement = node.ownerDocument.defaultView.frameElement;
	    if (_frameElement) {
	      var frameRect = getActualBoundingClientRect(_frameElement);
	      rect.top += frameRect.top;
	      rect.bottom += frameRect.top;
	      rect.left += frameRect.left;
	      rect.right += frameRect.left;
	    }
	  }

	  return rect;
	}

	function getScrollParents(el) {
	  // In firefox if the el is inside an iframe with display: none; window.getComputedStyle() will return null;
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=548397
	  var computedStyle = getComputedStyle(el) || {};
	  var position = computedStyle.position;
	  var parents = [];

	  if (position === 'fixed') {
	    return [el];
	  }

	  var parent = el;
	  while ((parent = parent.parentNode) && parent && parent.nodeType === 1) {
	    var style = undefined;
	    try {
	      style = getComputedStyle(parent);
	    } catch (err) {}

	    if (typeof style === 'undefined' || style === null) {
	      parents.push(parent);
	      return parents;
	    }

	    var _style = style;
	    var overflow = _style.overflow;
	    var overflowX = _style.overflowX;
	    var overflowY = _style.overflowY;

	    if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
	      if (position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0) {
	        parents.push(parent);
	      }
	    }
	  }

	  parents.push(el.ownerDocument.body);

	  // If the node is within a frame, account for the parent window scroll
	  if (el.ownerDocument !== document) {
	    parents.push(el.ownerDocument.defaultView);
	  }

	  return parents;
	}

	var uniqueId = (function () {
	  var id = 0;
	  return function () {
	    return ++id;
	  };
	})();

	var zeroPosCache = {};
	var getOrigin = function getOrigin() {
	  // getBoundingClientRect is unfortunately too accurate.  It introduces a pixel or two of
	  // jitter as the user scrolls that messes with our ability to detect if two positions
	  // are equivilant or not.  We place an element at the top left of the page that will
	  // get the same jitter, so we can cancel the two out.
	  var node = zeroElement;
	  if (!node || !document.body.contains(node)) {
	    node = document.createElement('div');
	    node.setAttribute('data-tether-id', uniqueId());
	    extend(node.style, {
	      top: 0,
	      left: 0,
	      position: 'absolute'
	    });

	    document.body.appendChild(node);

	    zeroElement = node;
	  }

	  var id = node.getAttribute('data-tether-id');
	  if (typeof zeroPosCache[id] === 'undefined') {
	    zeroPosCache[id] = getActualBoundingClientRect(node);

	    // Clear the cache when this position call is done
	    defer(function () {
	      delete zeroPosCache[id];
	    });
	  }

	  return zeroPosCache[id];
	};

	function removeUtilElements() {
	  if (zeroElement) {
	    document.body.removeChild(zeroElement);
	  }
	  zeroElement = null;
	};

	function getBounds(el) {
	  var doc = undefined;
	  if (el === document) {
	    doc = document;
	    el = document.documentElement;
	  } else {
	    doc = el.ownerDocument;
	  }

	  var docEl = doc.documentElement;

	  var box = getActualBoundingClientRect(el);

	  var origin = getOrigin();

	  box.top -= origin.top;
	  box.left -= origin.left;

	  if (typeof box.width === 'undefined') {
	    box.width = document.body.scrollWidth - box.left - box.right;
	  }
	  if (typeof box.height === 'undefined') {
	    box.height = document.body.scrollHeight - box.top - box.bottom;
	  }

	  box.top = box.top - docEl.clientTop;
	  box.left = box.left - docEl.clientLeft;
	  box.right = doc.body.clientWidth - box.width - box.left;
	  box.bottom = doc.body.clientHeight - box.height - box.top;

	  return box;
	}

	function getOffsetParent(el) {
	  return el.offsetParent || document.documentElement;
	}

	var _scrollBarSize = null;
	function getScrollBarSize() {
	  if (_scrollBarSize) {
	    return _scrollBarSize;
	  }
	  var inner = document.createElement('div');
	  inner.style.width = '100%';
	  inner.style.height = '200px';

	  var outer = document.createElement('div');
	  extend(outer.style, {
	    position: 'absolute',
	    top: 0,
	    left: 0,
	    pointerEvents: 'none',
	    visibility: 'hidden',
	    width: '200px',
	    height: '150px',
	    overflow: 'hidden'
	  });

	  outer.appendChild(inner);

	  document.body.appendChild(outer);

	  var widthContained = inner.offsetWidth;
	  outer.style.overflow = 'scroll';
	  var widthScroll = inner.offsetWidth;

	  if (widthContained === widthScroll) {
	    widthScroll = outer.clientWidth;
	  }

	  document.body.removeChild(outer);

	  var width = widthContained - widthScroll;

	  _scrollBarSize = { width: width, height: width };
	  return _scrollBarSize;
	}

	function extend() {
	  var out = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var args = [];

	  Array.prototype.push.apply(args, arguments);

	  args.slice(1).forEach(function (obj) {
	    if (obj) {
	      for (var key in obj) {
	        if (({}).hasOwnProperty.call(obj, key)) {
	          out[key] = obj[key];
	        }
	      }
	    }
	  });

	  return out;
	}

	function removeClass(el, name) {
	  if (typeof el.classList !== 'undefined') {
	    name.split(' ').forEach(function (cls) {
	      if (cls.trim()) {
	        el.classList.remove(cls);
	      }
	    });
	  } else {
	    var regex = new RegExp('(^| )' + name.split(' ').join('|') + '( |$)', 'gi');
	    var className = getClassName(el).replace(regex, ' ');
	    setClassName(el, className);
	  }
	}

	function addClass(el, name) {
	  if (typeof el.classList !== 'undefined') {
	    name.split(' ').forEach(function (cls) {
	      if (cls.trim()) {
	        el.classList.add(cls);
	      }
	    });
	  } else {
	    removeClass(el, name);
	    var cls = getClassName(el) + (' ' + name);
	    setClassName(el, cls);
	  }
	}

	function hasClass(el, name) {
	  if (typeof el.classList !== 'undefined') {
	    return el.classList.contains(name);
	  }
	  var className = getClassName(el);
	  return new RegExp('(^| )' + name + '( |$)', 'gi').test(className);
	}

	function getClassName(el) {
	  // Can't use just SVGAnimatedString here since nodes within a Frame in IE have
	  // completely separately SVGAnimatedString base classes
	  if (el.className instanceof el.ownerDocument.defaultView.SVGAnimatedString) {
	    return el.className.baseVal;
	  }
	  return el.className;
	}

	function setClassName(el, className) {
	  el.setAttribute('class', className);
	}

	function updateClasses(el, add, all) {
	  // Of the set of 'all' classes, we need the 'add' classes, and only the
	  // 'add' classes to be set.
	  all.forEach(function (cls) {
	    if (add.indexOf(cls) === -1 && hasClass(el, cls)) {
	      removeClass(el, cls);
	    }
	  });

	  add.forEach(function (cls) {
	    if (!hasClass(el, cls)) {
	      addClass(el, cls);
	    }
	  });
	}

	var deferred = [];

	var defer = function defer(fn) {
	  deferred.push(fn);
	};

	var flush = function flush() {
	  var fn = undefined;
	  while (fn = deferred.pop()) {
	    fn();
	  }
	};

	var Evented = (function () {
	  function Evented() {
	    _classCallCheck(this, Evented);
	  }

	  _createClass(Evented, [{
	    key: 'on',
	    value: function on(event, handler, ctx) {
	      var once = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	      if (typeof this.bindings === 'undefined') {
	        this.bindings = {};
	      }
	      if (typeof this.bindings[event] === 'undefined') {
	        this.bindings[event] = [];
	      }
	      this.bindings[event].push({ handler: handler, ctx: ctx, once: once });
	    }
	  }, {
	    key: 'once',
	    value: function once(event, handler, ctx) {
	      this.on(event, handler, ctx, true);
	    }
	  }, {
	    key: 'off',
	    value: function off(event, handler) {
	      if (typeof this.bindings === 'undefined' || typeof this.bindings[event] === 'undefined') {
	        return;
	      }

	      if (typeof handler === 'undefined') {
	        delete this.bindings[event];
	      } else {
	        var i = 0;
	        while (i < this.bindings[event].length) {
	          if (this.bindings[event][i].handler === handler) {
	            this.bindings[event].splice(i, 1);
	          } else {
	            ++i;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'trigger',
	    value: function trigger(event) {
	      if (typeof this.bindings !== 'undefined' && this.bindings[event]) {
	        var i = 0;

	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	          args[_key - 1] = arguments[_key];
	        }

	        while (i < this.bindings[event].length) {
	          var _bindings$event$i = this.bindings[event][i];
	          var handler = _bindings$event$i.handler;
	          var ctx = _bindings$event$i.ctx;
	          var once = _bindings$event$i.once;

	          var context = ctx;
	          if (typeof context === 'undefined') {
	            context = this;
	          }

	          handler.apply(context, args);

	          if (once) {
	            this.bindings[event].splice(i, 1);
	          } else {
	            ++i;
	          }
	        }
	      }
	    }
	  }]);

	  return Evented;
	})();

	TetherBase.Utils = {
	  getActualBoundingClientRect: getActualBoundingClientRect,
	  getScrollParents: getScrollParents,
	  getBounds: getBounds,
	  getOffsetParent: getOffsetParent,
	  extend: extend,
	  addClass: addClass,
	  removeClass: removeClass,
	  hasClass: hasClass,
	  updateClasses: updateClasses,
	  defer: defer,
	  flush: flush,
	  uniqueId: uniqueId,
	  Evented: Evented,
	  getScrollBarSize: getScrollBarSize,
	  removeUtilElements: removeUtilElements
	};
	/* globals TetherBase, performance */

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x6, _x7, _x8) { var _again = true; _function: while (_again) { var object = _x6, property = _x7, receiver = _x8; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x6 = parent; _x7 = property; _x8 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	if (typeof TetherBase === 'undefined') {
	  throw new Error('You must include the utils.js file before tether.js');
	}

	var _TetherBase$Utils = TetherBase.Utils;
	var getScrollParents = _TetherBase$Utils.getScrollParents;
	var getBounds = _TetherBase$Utils.getBounds;
	var getOffsetParent = _TetherBase$Utils.getOffsetParent;
	var extend = _TetherBase$Utils.extend;
	var addClass = _TetherBase$Utils.addClass;
	var removeClass = _TetherBase$Utils.removeClass;
	var updateClasses = _TetherBase$Utils.updateClasses;
	var defer = _TetherBase$Utils.defer;
	var flush = _TetherBase$Utils.flush;
	var getScrollBarSize = _TetherBase$Utils.getScrollBarSize;
	var removeUtilElements = _TetherBase$Utils.removeUtilElements;

	function within(a, b) {
	  var diff = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

	  return a + diff >= b && b >= a - diff;
	}

	var transformKey = (function () {
	  if (typeof document === 'undefined') {
	    return '';
	  }
	  var el = document.createElement('div');

	  var transforms = ['transform', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
	  for (var i = 0; i < transforms.length; ++i) {
	    var key = transforms[i];
	    if (el.style[key] !== undefined) {
	      return key;
	    }
	  }
	})();

	var tethers = [];

	var position = function position() {
	  tethers.forEach(function (tether) {
	    tether.position(false);
	  });
	  flush();
	};

	function now() {
	  if (typeof performance !== 'undefined' && typeof performance.now !== 'undefined') {
	    return performance.now();
	  }
	  return +new Date();
	}

	(function () {
	  var lastCall = null;
	  var lastDuration = null;
	  var pendingTimeout = null;

	  var tick = function tick() {
	    if (typeof lastDuration !== 'undefined' && lastDuration > 16) {
	      // We voluntarily throttle ourselves if we can't manage 60fps
	      lastDuration = Math.min(lastDuration - 16, 250);

	      // Just in case this is the last event, remember to position just once more
	      pendingTimeout = setTimeout(tick, 250);
	      return;
	    }

	    if (typeof lastCall !== 'undefined' && now() - lastCall < 10) {
	      // Some browsers call events a little too frequently, refuse to run more than is reasonable
	      return;
	    }

	    if (pendingTimeout != null) {
	      clearTimeout(pendingTimeout);
	      pendingTimeout = null;
	    }

	    lastCall = now();
	    position();
	    lastDuration = now() - lastCall;
	  };

	  if (typeof window !== 'undefined' && typeof window.addEventListener !== 'undefined') {
	    ['resize', 'scroll', 'touchmove'].forEach(function (event) {
	      window.addEventListener(event, tick);
	    });
	  }
	})();

	var MIRROR_LR = {
	  center: 'center',
	  left: 'right',
	  right: 'left'
	};

	var MIRROR_TB = {
	  middle: 'middle',
	  top: 'bottom',
	  bottom: 'top'
	};

	var OFFSET_MAP = {
	  top: 0,
	  left: 0,
	  middle: '50%',
	  center: '50%',
	  bottom: '100%',
	  right: '100%'
	};

	var autoToFixedAttachment = function autoToFixedAttachment(attachment, relativeToAttachment) {
	  var left = attachment.left;
	  var top = attachment.top;

	  if (left === 'auto') {
	    left = MIRROR_LR[relativeToAttachment.left];
	  }

	  if (top === 'auto') {
	    top = MIRROR_TB[relativeToAttachment.top];
	  }

	  return { left: left, top: top };
	};

	var attachmentToOffset = function attachmentToOffset(attachment) {
	  var left = attachment.left;
	  var top = attachment.top;

	  if (typeof OFFSET_MAP[attachment.left] !== 'undefined') {
	    left = OFFSET_MAP[attachment.left];
	  }

	  if (typeof OFFSET_MAP[attachment.top] !== 'undefined') {
	    top = OFFSET_MAP[attachment.top];
	  }

	  return { left: left, top: top };
	};

	function addOffset() {
	  var out = { top: 0, left: 0 };

	  for (var _len = arguments.length, offsets = Array(_len), _key = 0; _key < _len; _key++) {
	    offsets[_key] = arguments[_key];
	  }

	  offsets.forEach(function (_ref) {
	    var top = _ref.top;
	    var left = _ref.left;

	    if (typeof top === 'string') {
	      top = parseFloat(top, 10);
	    }
	    if (typeof left === 'string') {
	      left = parseFloat(left, 10);
	    }

	    out.top += top;
	    out.left += left;
	  });

	  return out;
	}

	function offsetToPx(offset, size) {
	  if (typeof offset.left === 'string' && offset.left.indexOf('%') !== -1) {
	    offset.left = parseFloat(offset.left, 10) / 100 * size.width;
	  }
	  if (typeof offset.top === 'string' && offset.top.indexOf('%') !== -1) {
	    offset.top = parseFloat(offset.top, 10) / 100 * size.height;
	  }

	  return offset;
	}

	var parseOffset = function parseOffset(value) {
	  var _value$split = value.split(' ');

	  var _value$split2 = _slicedToArray(_value$split, 2);

	  var top = _value$split2[0];
	  var left = _value$split2[1];

	  return { top: top, left: left };
	};
	var parseAttachment = parseOffset;

	var TetherClass = (function (_Evented) {
	  _inherits(TetherClass, _Evented);

	  function TetherClass(options) {
	    var _this = this;

	    _classCallCheck(this, TetherClass);

	    _get(Object.getPrototypeOf(TetherClass.prototype), 'constructor', this).call(this);
	    this.position = this.position.bind(this);

	    tethers.push(this);

	    this.history = [];

	    this.setOptions(options, false);

	    TetherBase.modules.forEach(function (module) {
	      if (typeof module.initialize !== 'undefined') {
	        module.initialize.call(_this);
	      }
	    });

	    this.position();
	  }

	  _createClass(TetherClass, [{
	    key: 'getClass',
	    value: function getClass() {
	      var key = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	      var classes = this.options.classes;

	      if (typeof classes !== 'undefined' && classes[key]) {
	        return this.options.classes[key];
	      } else if (this.options.classPrefix) {
	        return this.options.classPrefix + '-' + key;
	      } else {
	        return key;
	      }
	    }
	  }, {
	    key: 'setOptions',
	    value: function setOptions(options) {
	      var _this2 = this;

	      var pos = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	      var defaults = {
	        offset: '0 0',
	        targetOffset: '0 0',
	        targetAttachment: 'auto auto',
	        classPrefix: 'tether'
	      };

	      this.options = extend(defaults, options);

	      var _options = this.options;
	      var element = _options.element;
	      var target = _options.target;
	      var targetModifier = _options.targetModifier;

	      this.element = element;
	      this.target = target;
	      this.targetModifier = targetModifier;

	      if (this.target === 'viewport') {
	        this.target = document.body;
	        this.targetModifier = 'visible';
	      } else if (this.target === 'scroll-handle') {
	        this.target = document.body;
	        this.targetModifier = 'scroll-handle';
	      }

	      ['element', 'target'].forEach(function (key) {
	        if (typeof _this2[key] === 'undefined') {
	          throw new Error('Tether Error: Both element and target must be defined');
	        }

	        if (typeof _this2[key].jquery !== 'undefined') {
	          _this2[key] = _this2[key][0];
	        } else if (typeof _this2[key] === 'string') {
	          _this2[key] = document.querySelector(_this2[key]);
	        }
	      });

	      addClass(this.element, this.getClass('element'));
	      if (!(this.options.addTargetClasses === false)) {
	        addClass(this.target, this.getClass('target'));
	      }

	      if (!this.options.attachment) {
	        throw new Error('Tether Error: You must provide an attachment');
	      }

	      this.targetAttachment = parseAttachment(this.options.targetAttachment);
	      this.attachment = parseAttachment(this.options.attachment);
	      this.offset = parseOffset(this.options.offset);
	      this.targetOffset = parseOffset(this.options.targetOffset);

	      if (typeof this.scrollParents !== 'undefined') {
	        this.disable();
	      }

	      if (this.targetModifier === 'scroll-handle') {
	        this.scrollParents = [this.target];
	      } else {
	        this.scrollParents = getScrollParents(this.target);
	      }

	      if (!(this.options.enabled === false)) {
	        this.enable(pos);
	      }
	    }
	  }, {
	    key: 'getTargetBounds',
	    value: function getTargetBounds() {
	      if (typeof this.targetModifier !== 'undefined') {
	        if (this.targetModifier === 'visible') {
	          if (this.target === document.body) {
	            return { top: pageYOffset, left: pageXOffset, height: innerHeight, width: innerWidth };
	          } else {
	            var bounds = getBounds(this.target);

	            var out = {
	              height: bounds.height,
	              width: bounds.width,
	              top: bounds.top,
	              left: bounds.left
	            };

	            out.height = Math.min(out.height, bounds.height - (pageYOffset - bounds.top));
	            out.height = Math.min(out.height, bounds.height - (bounds.top + bounds.height - (pageYOffset + innerHeight)));
	            out.height = Math.min(innerHeight, out.height);
	            out.height -= 2;

	            out.width = Math.min(out.width, bounds.width - (pageXOffset - bounds.left));
	            out.width = Math.min(out.width, bounds.width - (bounds.left + bounds.width - (pageXOffset + innerWidth)));
	            out.width = Math.min(innerWidth, out.width);
	            out.width -= 2;

	            if (out.top < pageYOffset) {
	              out.top = pageYOffset;
	            }
	            if (out.left < pageXOffset) {
	              out.left = pageXOffset;
	            }

	            return out;
	          }
	        } else if (this.targetModifier === 'scroll-handle') {
	          var bounds = undefined;
	          var target = this.target;
	          if (target === document.body) {
	            target = document.documentElement;

	            bounds = {
	              left: pageXOffset,
	              top: pageYOffset,
	              height: innerHeight,
	              width: innerWidth
	            };
	          } else {
	            bounds = getBounds(target);
	          }

	          var style = getComputedStyle(target);

	          var hasBottomScroll = target.scrollWidth > target.clientWidth || [style.overflow, style.overflowX].indexOf('scroll') >= 0 || this.target !== document.body;

	          var scrollBottom = 0;
	          if (hasBottomScroll) {
	            scrollBottom = 15;
	          }

	          var height = bounds.height - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth) - scrollBottom;

	          var out = {
	            width: 15,
	            height: height * 0.975 * (height / target.scrollHeight),
	            left: bounds.left + bounds.width - parseFloat(style.borderLeftWidth) - 15
	          };

	          var fitAdj = 0;
	          if (height < 408 && this.target === document.body) {
	            fitAdj = -0.00011 * Math.pow(height, 2) - 0.00727 * height + 22.58;
	          }

	          if (this.target !== document.body) {
	            out.height = Math.max(out.height, 24);
	          }

	          var scrollPercentage = this.target.scrollTop / (target.scrollHeight - height);
	          out.top = scrollPercentage * (height - out.height - fitAdj) + bounds.top + parseFloat(style.borderTopWidth);

	          if (this.target === document.body) {
	            out.height = Math.max(out.height, 24);
	          }

	          return out;
	        }
	      } else {
	        return getBounds(this.target);
	      }
	    }
	  }, {
	    key: 'clearCache',
	    value: function clearCache() {
	      this._cache = {};
	    }
	  }, {
	    key: 'cache',
	    value: function cache(k, getter) {
	      // More than one module will often need the same DOM info, so
	      // we keep a cache which is cleared on each position call
	      if (typeof this._cache === 'undefined') {
	        this._cache = {};
	      }

	      if (typeof this._cache[k] === 'undefined') {
	        this._cache[k] = getter.call(this);
	      }

	      return this._cache[k];
	    }
	  }, {
	    key: 'enable',
	    value: function enable() {
	      var _this3 = this;

	      var pos = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	      if (!(this.options.addTargetClasses === false)) {
	        addClass(this.target, this.getClass('enabled'));
	      }
	      addClass(this.element, this.getClass('enabled'));
	      this.enabled = true;

	      this.scrollParents.forEach(function (parent) {
	        if (parent !== _this3.target.ownerDocument) {
	          parent.addEventListener('scroll', _this3.position);
	        }
	      });

	      if (pos) {
	        this.position();
	      }
	    }
	  }, {
	    key: 'disable',
	    value: function disable() {
	      var _this4 = this;

	      removeClass(this.target, this.getClass('enabled'));
	      removeClass(this.element, this.getClass('enabled'));
	      this.enabled = false;

	      if (typeof this.scrollParents !== 'undefined') {
	        this.scrollParents.forEach(function (parent) {
	          parent.removeEventListener('scroll', _this4.position);
	        });
	      }
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var _this5 = this;

	      this.disable();

	      tethers.forEach(function (tether, i) {
	        if (tether === _this5) {
	          tethers.splice(i, 1);
	        }
	      });

	      // Remove any elements we were using for convenience from the DOM
	      if (tethers.length === 0) {
	        removeUtilElements();
	      }
	    }
	  }, {
	    key: 'updateAttachClasses',
	    value: function updateAttachClasses(elementAttach, targetAttach) {
	      var _this6 = this;

	      elementAttach = elementAttach || this.attachment;
	      targetAttach = targetAttach || this.targetAttachment;
	      var sides = ['left', 'top', 'bottom', 'right', 'middle', 'center'];

	      if (typeof this._addAttachClasses !== 'undefined' && this._addAttachClasses.length) {
	        // updateAttachClasses can be called more than once in a position call, so
	        // we need to clean up after ourselves such that when the last defer gets
	        // ran it doesn't add any extra classes from previous calls.
	        this._addAttachClasses.splice(0, this._addAttachClasses.length);
	      }

	      if (typeof this._addAttachClasses === 'undefined') {
	        this._addAttachClasses = [];
	      }
	      var add = this._addAttachClasses;

	      if (elementAttach.top) {
	        add.push(this.getClass('element-attached') + '-' + elementAttach.top);
	      }
	      if (elementAttach.left) {
	        add.push(this.getClass('element-attached') + '-' + elementAttach.left);
	      }
	      if (targetAttach.top) {
	        add.push(this.getClass('target-attached') + '-' + targetAttach.top);
	      }
	      if (targetAttach.left) {
	        add.push(this.getClass('target-attached') + '-' + targetAttach.left);
	      }

	      var all = [];
	      sides.forEach(function (side) {
	        all.push(_this6.getClass('element-attached') + '-' + side);
	        all.push(_this6.getClass('target-attached') + '-' + side);
	      });

	      defer(function () {
	        if (!(typeof _this6._addAttachClasses !== 'undefined')) {
	          return;
	        }

	        updateClasses(_this6.element, _this6._addAttachClasses, all);
	        if (!(_this6.options.addTargetClasses === false)) {
	          updateClasses(_this6.target, _this6._addAttachClasses, all);
	        }

	        delete _this6._addAttachClasses;
	      });
	    }
	  }, {
	    key: 'position',
	    value: function position() {
	      var _this7 = this;

	      var flushChanges = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	      // flushChanges commits the changes immediately, leave true unless you are positioning multiple
	      // tethers (in which case call Tether.Utils.flush yourself when you're done)

	      if (!this.enabled) {
	        return;
	      }

	      this.clearCache();

	      // Turn 'auto' attachments into the appropriate corner or edge
	      var targetAttachment = autoToFixedAttachment(this.targetAttachment, this.attachment);

	      this.updateAttachClasses(this.attachment, targetAttachment);

	      var elementPos = this.cache('element-bounds', function () {
	        return getBounds(_this7.element);
	      });

	      var width = elementPos.width;
	      var height = elementPos.height;

	      if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
	        var _lastSize = this.lastSize;

	        // We cache the height and width to make it possible to position elements that are
	        // getting hidden.
	        width = _lastSize.width;
	        height = _lastSize.height;
	      } else {
	        this.lastSize = { width: width, height: height };
	      }

	      var targetPos = this.cache('target-bounds', function () {
	        return _this7.getTargetBounds();
	      });
	      var targetSize = targetPos;

	      // Get an actual px offset from the attachment
	      var offset = offsetToPx(attachmentToOffset(this.attachment), { width: width, height: height });
	      var targetOffset = offsetToPx(attachmentToOffset(targetAttachment), targetSize);

	      var manualOffset = offsetToPx(this.offset, { width: width, height: height });
	      var manualTargetOffset = offsetToPx(this.targetOffset, targetSize);

	      // Add the manually provided offset
	      offset = addOffset(offset, manualOffset);
	      targetOffset = addOffset(targetOffset, manualTargetOffset);

	      // It's now our goal to make (element position + offset) == (target position + target offset)
	      var left = targetPos.left + targetOffset.left - offset.left;
	      var top = targetPos.top + targetOffset.top - offset.top;

	      for (var i = 0; i < TetherBase.modules.length; ++i) {
	        var _module2 = TetherBase.modules[i];
	        var ret = _module2.position.call(this, {
	          left: left,
	          top: top,
	          targetAttachment: targetAttachment,
	          targetPos: targetPos,
	          elementPos: elementPos,
	          offset: offset,
	          targetOffset: targetOffset,
	          manualOffset: manualOffset,
	          manualTargetOffset: manualTargetOffset,
	          scrollbarSize: scrollbarSize,
	          attachment: this.attachment
	        });

	        if (ret === false) {
	          return false;
	        } else if (typeof ret === 'undefined' || typeof ret !== 'object') {
	          continue;
	        } else {
	          top = ret.top;
	          left = ret.left;
	        }
	      }

	      // We describe the position three different ways to give the optimizer
	      // a chance to decide the best possible way to position the element
	      // with the fewest repaints.
	      var next = {
	        // It's position relative to the page (absolute positioning when
	        // the element is a child of the body)
	        page: {
	          top: top,
	          left: left
	        },

	        // It's position relative to the viewport (fixed positioning)
	        viewport: {
	          top: top - pageYOffset,
	          bottom: pageYOffset - top - height + innerHeight,
	          left: left - pageXOffset,
	          right: pageXOffset - left - width + innerWidth
	        }
	      };

	      var doc = this.target.ownerDocument;
	      var win = doc.defaultView;

	      var scrollbarSize = undefined;
	      if (win.innerHeight > doc.documentElement.clientHeight) {
	        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
	        next.viewport.bottom -= scrollbarSize.height;
	      }

	      if (win.innerWidth > doc.documentElement.clientWidth) {
	        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
	        next.viewport.right -= scrollbarSize.width;
	      }

	      if (['', 'static'].indexOf(doc.body.style.position) === -1 || ['', 'static'].indexOf(doc.body.parentElement.style.position) === -1) {
	        // Absolute positioning in the body will be relative to the page, not the 'initial containing block'
	        next.page.bottom = doc.body.scrollHeight - top - height;
	        next.page.right = doc.body.scrollWidth - left - width;
	      }

	      if (typeof this.options.optimizations !== 'undefined' && this.options.optimizations.moveElement !== false && !(typeof this.targetModifier !== 'undefined')) {
	        (function () {
	          var offsetParent = _this7.cache('target-offsetparent', function () {
	            return getOffsetParent(_this7.target);
	          });
	          var offsetPosition = _this7.cache('target-offsetparent-bounds', function () {
	            return getBounds(offsetParent);
	          });
	          var offsetParentStyle = getComputedStyle(offsetParent);
	          var offsetParentSize = offsetPosition;

	          var offsetBorder = {};
	          ['Top', 'Left', 'Bottom', 'Right'].forEach(function (side) {
	            offsetBorder[side.toLowerCase()] = parseFloat(offsetParentStyle['border' + side + 'Width']);
	          });

	          offsetPosition.right = doc.body.scrollWidth - offsetPosition.left - offsetParentSize.width + offsetBorder.right;
	          offsetPosition.bottom = doc.body.scrollHeight - offsetPosition.top - offsetParentSize.height + offsetBorder.bottom;

	          if (next.page.top >= offsetPosition.top + offsetBorder.top && next.page.bottom >= offsetPosition.bottom) {
	            if (next.page.left >= offsetPosition.left + offsetBorder.left && next.page.right >= offsetPosition.right) {
	              // We're within the visible part of the target's scroll parent
	              var scrollTop = offsetParent.scrollTop;
	              var scrollLeft = offsetParent.scrollLeft;

	              // It's position relative to the target's offset parent (absolute positioning when
	              // the element is moved to be a child of the target's offset parent).
	              next.offset = {
	                top: next.page.top - offsetPosition.top + scrollTop - offsetBorder.top,
	                left: next.page.left - offsetPosition.left + scrollLeft - offsetBorder.left
	              };
	            }
	          }
	        })();
	      }

	      // We could also travel up the DOM and try each containing context, rather than only
	      // looking at the body, but we're gonna get diminishing returns.

	      this.move(next);

	      this.history.unshift(next);

	      if (this.history.length > 3) {
	        this.history.pop();
	      }

	      if (flushChanges) {
	        flush();
	      }

	      return true;
	    }

	    // THE ISSUE
	  }, {
	    key: 'move',
	    value: function move(pos) {
	      var _this8 = this;

	      if (!(typeof this.element.parentNode !== 'undefined')) {
	        return;
	      }

	      var same = {};

	      for (var type in pos) {
	        same[type] = {};

	        for (var key in pos[type]) {
	          var found = false;

	          for (var i = 0; i < this.history.length; ++i) {
	            var point = this.history[i];
	            if (typeof point[type] !== 'undefined' && !within(point[type][key], pos[type][key])) {
	              found = true;
	              break;
	            }
	          }

	          if (!found) {
	            same[type][key] = true;
	          }
	        }
	      }

	      var css = { top: '', left: '', right: '', bottom: '' };

	      var transcribe = function transcribe(_same, _pos) {
	        var hasOptimizations = typeof _this8.options.optimizations !== 'undefined';
	        var gpu = hasOptimizations ? _this8.options.optimizations.gpu : null;
	        if (gpu !== false) {
	          var yPos = undefined,
	              xPos = undefined;
	          if (_same.top) {
	            css.top = 0;
	            yPos = _pos.top;
	          } else {
	            css.bottom = 0;
	            yPos = -_pos.bottom;
	          }

	          if (_same.left) {
	            css.left = 0;
	            xPos = _pos.left;
	          } else {
	            css.right = 0;
	            xPos = -_pos.right;
	          }

	          if (window.matchMedia) {
	            // HubSpot/tether#207
	            var retina = window.matchMedia('only screen and (min-resolution: 1.3dppx)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3)').matches;
	            if (!retina) {
	              xPos = Math.round(xPos);
	              yPos = Math.round(yPos);
	            }
	          }

	          css[transformKey] = 'translateX(' + xPos + 'px) translateY(' + yPos + 'px)';

	          if (transformKey !== 'msTransform') {
	            // The Z transform will keep this in the GPU (faster, and prevents artifacts),
	            // but IE9 doesn't support 3d transforms and will choke.
	            css[transformKey] += " translateZ(0)";
	          }
	        } else {
	          if (_same.top) {
	            css.top = _pos.top + 'px';
	          } else {
	            css.bottom = _pos.bottom + 'px';
	          }

	          if (_same.left) {
	            css.left = _pos.left + 'px';
	          } else {
	            css.right = _pos.right + 'px';
	          }
	        }
	      };

	      var moved = false;
	      if ((same.page.top || same.page.bottom) && (same.page.left || same.page.right)) {
	        css.position = 'absolute';
	        transcribe(same.page, pos.page);
	      } else if ((same.viewport.top || same.viewport.bottom) && (same.viewport.left || same.viewport.right)) {
	        css.position = 'fixed';
	        transcribe(same.viewport, pos.viewport);
	      } else if (typeof same.offset !== 'undefined' && same.offset.top && same.offset.left) {
	        (function () {
	          css.position = 'absolute';
	          var offsetParent = _this8.cache('target-offsetparent', function () {
	            return getOffsetParent(_this8.target);
	          });

	          if (getOffsetParent(_this8.element) !== offsetParent) {
	            defer(function () {
	              _this8.element.parentNode.removeChild(_this8.element);
	              offsetParent.appendChild(_this8.element);
	            });
	          }

	          transcribe(same.offset, pos.offset);
	          moved = true;
	        })();
	      } else {
	        css.position = 'absolute';
	        transcribe({ top: true, left: true }, pos.page);
	      }

	      if (!moved) {
	        if (this.options.bodyElement) {
	          this.options.bodyElement.appendChild(this.element);
	        } else {
	          var offsetParentIsBody = true;
	          var currentNode = this.element.parentNode;
	          while (currentNode && currentNode.nodeType === 1 && currentNode.tagName !== 'BODY') {
	            if (getComputedStyle(currentNode).position !== 'static') {
	              offsetParentIsBody = false;
	              break;
	            }

	            currentNode = currentNode.parentNode;
	          }

	          if (!offsetParentIsBody) {
	            this.element.parentNode.removeChild(this.element);
	            this.element.ownerDocument.body.appendChild(this.element);
	          }
	        }
	      }

	      // Any css change will trigger a repaint, so let's avoid one if nothing changed
	      var writeCSS = {};
	      var write = false;
	      for (var key in css) {
	        var val = css[key];
	        var elVal = this.element.style[key];

	        if (elVal !== val) {
	          write = true;
	          writeCSS[key] = val;
	        }
	      }

	      if (write) {
	        defer(function () {
	          extend(_this8.element.style, writeCSS);
	          _this8.trigger('repositioned');
	        });
	      }
	    }
	  }]);

	  return TetherClass;
	})(Evented);

	TetherClass.modules = [];

	TetherBase.position = position;

	var Tether = extend(TetherClass, TetherBase);
	/* globals TetherBase */

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _TetherBase$Utils = TetherBase.Utils;
	var getBounds = _TetherBase$Utils.getBounds;
	var extend = _TetherBase$Utils.extend;
	var updateClasses = _TetherBase$Utils.updateClasses;
	var defer = _TetherBase$Utils.defer;

	var BOUNDS_FORMAT = ['left', 'top', 'right', 'bottom'];

	function getBoundingRect(tether, to) {
	  if (to === 'scrollParent') {
	    to = tether.scrollParents[0];
	  } else if (to === 'window') {
	    to = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset];
	  }

	  if (to === document) {
	    to = to.documentElement;
	  }

	  if (typeof to.nodeType !== 'undefined') {
	    (function () {
	      var node = to;
	      var size = getBounds(to);
	      var pos = size;
	      var style = getComputedStyle(to);

	      to = [pos.left, pos.top, size.width + pos.left, size.height + pos.top];

	      // Account any parent Frames scroll offset
	      if (node.ownerDocument !== document) {
	        var win = node.ownerDocument.defaultView;
	        to[0] += win.pageXOffset;
	        to[1] += win.pageYOffset;
	        to[2] += win.pageXOffset;
	        to[3] += win.pageYOffset;
	      }

	      BOUNDS_FORMAT.forEach(function (side, i) {
	        side = side[0].toUpperCase() + side.substr(1);
	        if (side === 'Top' || side === 'Left') {
	          to[i] += parseFloat(style['border' + side + 'Width']);
	        } else {
	          to[i] -= parseFloat(style['border' + side + 'Width']);
	        }
	      });
	    })();
	  }

	  return to;
	}

	TetherBase.modules.push({
	  position: function position(_ref) {
	    var _this = this;

	    var top = _ref.top;
	    var left = _ref.left;
	    var targetAttachment = _ref.targetAttachment;

	    if (!this.options.constraints) {
	      return true;
	    }

	    var _cache = this.cache('element-bounds', function () {
	      return getBounds(_this.element);
	    });

	    var height = _cache.height;
	    var width = _cache.width;

	    if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
	      var _lastSize = this.lastSize;

	      // Handle the item getting hidden as a result of our positioning without glitching
	      // the classes in and out
	      width = _lastSize.width;
	      height = _lastSize.height;
	    }

	    var targetSize = this.cache('target-bounds', function () {
	      return _this.getTargetBounds();
	    });

	    var targetHeight = targetSize.height;
	    var targetWidth = targetSize.width;

	    var allClasses = [this.getClass('pinned'), this.getClass('out-of-bounds')];

	    this.options.constraints.forEach(function (constraint) {
	      var outOfBoundsClass = constraint.outOfBoundsClass;
	      var pinnedClass = constraint.pinnedClass;

	      if (outOfBoundsClass) {
	        allClasses.push(outOfBoundsClass);
	      }
	      if (pinnedClass) {
	        allClasses.push(pinnedClass);
	      }
	    });

	    allClasses.forEach(function (cls) {
	      ['left', 'top', 'right', 'bottom'].forEach(function (side) {
	        allClasses.push(cls + '-' + side);
	      });
	    });

	    var addClasses = [];

	    var tAttachment = extend({}, targetAttachment);
	    var eAttachment = extend({}, this.attachment);

	    this.options.constraints.forEach(function (constraint) {
	      var to = constraint.to;
	      var attachment = constraint.attachment;
	      var pin = constraint.pin;

	      if (typeof attachment === 'undefined') {
	        attachment = '';
	      }

	      var changeAttachX = undefined,
	          changeAttachY = undefined;
	      if (attachment.indexOf(' ') >= 0) {
	        var _attachment$split = attachment.split(' ');

	        var _attachment$split2 = _slicedToArray(_attachment$split, 2);

	        changeAttachY = _attachment$split2[0];
	        changeAttachX = _attachment$split2[1];
	      } else {
	        changeAttachX = changeAttachY = attachment;
	      }

	      var bounds = getBoundingRect(_this, to);

	      if (changeAttachY === 'target' || changeAttachY === 'both') {
	        if (top < bounds[1] && tAttachment.top === 'top') {
	          top += targetHeight;
	          tAttachment.top = 'bottom';
	        }

	        if (top + height > bounds[3] && tAttachment.top === 'bottom') {
	          top -= targetHeight;
	          tAttachment.top = 'top';
	        }
	      }

	      if (changeAttachY === 'together') {
	        if (tAttachment.top === 'top') {
	          if (eAttachment.top === 'bottom' && top < bounds[1]) {
	            top += targetHeight;
	            tAttachment.top = 'bottom';

	            top += height;
	            eAttachment.top = 'top';
	          } else if (eAttachment.top === 'top' && top + height > bounds[3] && top - (height - targetHeight) >= bounds[1]) {
	            top -= height - targetHeight;
	            tAttachment.top = 'bottom';

	            eAttachment.top = 'bottom';
	          }
	        }

	        if (tAttachment.top === 'bottom') {
	          if (eAttachment.top === 'top' && top + height > bounds[3]) {
	            top -= targetHeight;
	            tAttachment.top = 'top';

	            top -= height;
	            eAttachment.top = 'bottom';
	          } else if (eAttachment.top === 'bottom' && top < bounds[1] && top + (height * 2 - targetHeight) <= bounds[3]) {
	            top += height - targetHeight;
	            tAttachment.top = 'top';

	            eAttachment.top = 'top';
	          }
	        }

	        if (tAttachment.top === 'middle') {
	          if (top + height > bounds[3] && eAttachment.top === 'top') {
	            top -= height;
	            eAttachment.top = 'bottom';
	          } else if (top < bounds[1] && eAttachment.top === 'bottom') {
	            top += height;
	            eAttachment.top = 'top';
	          }
	        }
	      }

	      if (changeAttachX === 'target' || changeAttachX === 'both') {
	        if (left < bounds[0] && tAttachment.left === 'left') {
	          left += targetWidth;
	          tAttachment.left = 'right';
	        }

	        if (left + width > bounds[2] && tAttachment.left === 'right') {
	          left -= targetWidth;
	          tAttachment.left = 'left';
	        }
	      }

	      if (changeAttachX === 'together') {
	        if (left < bounds[0] && tAttachment.left === 'left') {
	          if (eAttachment.left === 'right') {
	            left += targetWidth;
	            tAttachment.left = 'right';

	            left += width;
	            eAttachment.left = 'left';
	          } else if (eAttachment.left === 'left') {
	            left += targetWidth;
	            tAttachment.left = 'right';

	            left -= width;
	            eAttachment.left = 'right';
	          }
	        } else if (left + width > bounds[2] && tAttachment.left === 'right') {
	          if (eAttachment.left === 'left') {
	            left -= targetWidth;
	            tAttachment.left = 'left';

	            left -= width;
	            eAttachment.left = 'right';
	          } else if (eAttachment.left === 'right') {
	            left -= targetWidth;
	            tAttachment.left = 'left';

	            left += width;
	            eAttachment.left = 'left';
	          }
	        } else if (tAttachment.left === 'center') {
	          if (left + width > bounds[2] && eAttachment.left === 'left') {
	            left -= width;
	            eAttachment.left = 'right';
	          } else if (left < bounds[0] && eAttachment.left === 'right') {
	            left += width;
	            eAttachment.left = 'left';
	          }
	        }
	      }

	      if (changeAttachY === 'element' || changeAttachY === 'both') {
	        if (top < bounds[1] && eAttachment.top === 'bottom') {
	          top += height;
	          eAttachment.top = 'top';
	        }

	        if (top + height > bounds[3] && eAttachment.top === 'top') {
	          top -= height;
	          eAttachment.top = 'bottom';
	        }
	      }

	      if (changeAttachX === 'element' || changeAttachX === 'both') {
	        if (left < bounds[0]) {
	          if (eAttachment.left === 'right') {
	            left += width;
	            eAttachment.left = 'left';
	          } else if (eAttachment.left === 'center') {
	            left += width / 2;
	            eAttachment.left = 'left';
	          }
	        }

	        if (left + width > bounds[2]) {
	          if (eAttachment.left === 'left') {
	            left -= width;
	            eAttachment.left = 'right';
	          } else if (eAttachment.left === 'center') {
	            left -= width / 2;
	            eAttachment.left = 'right';
	          }
	        }
	      }

	      if (typeof pin === 'string') {
	        pin = pin.split(',').map(function (p) {
	          return p.trim();
	        });
	      } else if (pin === true) {
	        pin = ['top', 'left', 'right', 'bottom'];
	      }

	      pin = pin || [];

	      var pinned = [];
	      var oob = [];

	      if (top < bounds[1]) {
	        if (pin.indexOf('top') >= 0) {
	          top = bounds[1];
	          pinned.push('top');
	        } else {
	          oob.push('top');
	        }
	      }

	      if (top + height > bounds[3]) {
	        if (pin.indexOf('bottom') >= 0) {
	          top = bounds[3] - height;
	          pinned.push('bottom');
	        } else {
	          oob.push('bottom');
	        }
	      }

	      if (left < bounds[0]) {
	        if (pin.indexOf('left') >= 0) {
	          left = bounds[0];
	          pinned.push('left');
	        } else {
	          oob.push('left');
	        }
	      }

	      if (left + width > bounds[2]) {
	        if (pin.indexOf('right') >= 0) {
	          left = bounds[2] - width;
	          pinned.push('right');
	        } else {
	          oob.push('right');
	        }
	      }

	      if (pinned.length) {
	        (function () {
	          var pinnedClass = undefined;
	          if (typeof _this.options.pinnedClass !== 'undefined') {
	            pinnedClass = _this.options.pinnedClass;
	          } else {
	            pinnedClass = _this.getClass('pinned');
	          }

	          addClasses.push(pinnedClass);
	          pinned.forEach(function (side) {
	            addClasses.push(pinnedClass + '-' + side);
	          });
	        })();
	      }

	      if (oob.length) {
	        (function () {
	          var oobClass = undefined;
	          if (typeof _this.options.outOfBoundsClass !== 'undefined') {
	            oobClass = _this.options.outOfBoundsClass;
	          } else {
	            oobClass = _this.getClass('out-of-bounds');
	          }

	          addClasses.push(oobClass);
	          oob.forEach(function (side) {
	            addClasses.push(oobClass + '-' + side);
	          });
	        })();
	      }

	      if (pinned.indexOf('left') >= 0 || pinned.indexOf('right') >= 0) {
	        eAttachment.left = tAttachment.left = false;
	      }
	      if (pinned.indexOf('top') >= 0 || pinned.indexOf('bottom') >= 0) {
	        eAttachment.top = tAttachment.top = false;
	      }

	      if (tAttachment.top !== targetAttachment.top || tAttachment.left !== targetAttachment.left || eAttachment.top !== _this.attachment.top || eAttachment.left !== _this.attachment.left) {
	        _this.updateAttachClasses(eAttachment, tAttachment);
	        _this.trigger('update', {
	          attachment: eAttachment,
	          targetAttachment: tAttachment
	        });
	      }
	    });

	    defer(function () {
	      if (!(_this.options.addTargetClasses === false)) {
	        updateClasses(_this.target, addClasses, allClasses);
	      }
	      updateClasses(_this.element, addClasses, allClasses);
	    });

	    return { top: top, left: left };
	  }
	});
	/* globals TetherBase */

	'use strict';

	var _TetherBase$Utils = TetherBase.Utils;
	var getBounds = _TetherBase$Utils.getBounds;
	var updateClasses = _TetherBase$Utils.updateClasses;
	var defer = _TetherBase$Utils.defer;

	TetherBase.modules.push({
	  position: function position(_ref) {
	    var _this = this;

	    var top = _ref.top;
	    var left = _ref.left;

	    var _cache = this.cache('element-bounds', function () {
	      return getBounds(_this.element);
	    });

	    var height = _cache.height;
	    var width = _cache.width;

	    var targetPos = this.getTargetBounds();

	    var bottom = top + height;
	    var right = left + width;

	    var abutted = [];
	    if (top <= targetPos.bottom && bottom >= targetPos.top) {
	      ['left', 'right'].forEach(function (side) {
	        var targetPosSide = targetPos[side];
	        if (targetPosSide === left || targetPosSide === right) {
	          abutted.push(side);
	        }
	      });
	    }

	    if (left <= targetPos.right && right >= targetPos.left) {
	      ['top', 'bottom'].forEach(function (side) {
	        var targetPosSide = targetPos[side];
	        if (targetPosSide === top || targetPosSide === bottom) {
	          abutted.push(side);
	        }
	      });
	    }

	    var allClasses = [];
	    var addClasses = [];

	    var sides = ['left', 'top', 'right', 'bottom'];
	    allClasses.push(this.getClass('abutted'));
	    sides.forEach(function (side) {
	      allClasses.push(_this.getClass('abutted') + '-' + side);
	    });

	    if (abutted.length) {
	      addClasses.push(this.getClass('abutted'));
	    }

	    abutted.forEach(function (side) {
	      addClasses.push(_this.getClass('abutted') + '-' + side);
	    });

	    defer(function () {
	      if (!(_this.options.addTargetClasses === false)) {
	        updateClasses(_this.target, addClasses, allClasses);
	      }
	      updateClasses(_this.element, addClasses, allClasses);
	    });

	    return true;
	  }
	});
	/* globals TetherBase */

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	TetherBase.modules.push({
	  position: function position(_ref) {
	    var top = _ref.top;
	    var left = _ref.left;

	    if (!this.options.shift) {
	      return;
	    }

	    var shift = this.options.shift;
	    if (typeof this.options.shift === 'function') {
	      shift = this.options.shift.call(this, { top: top, left: left });
	    }

	    var shiftTop = undefined,
	        shiftLeft = undefined;
	    if (typeof shift === 'string') {
	      shift = shift.split(' ');
	      shift[1] = shift[1] || shift[0];

	      var _shift = shift;

	      var _shift2 = _slicedToArray(_shift, 2);

	      shiftTop = _shift2[0];
	      shiftLeft = _shift2[1];

	      shiftTop = parseFloat(shiftTop, 10);
	      shiftLeft = parseFloat(shiftLeft, 10);
	    } else {
	      shiftTop = shift.top;
	      shiftLeft = shift.left;
	    }

	    top += shiftTop;
	    left += shiftLeft;

	    return { top: top, left: left };
	  }
	});
	return Tether;

	}));


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.isDisabled = isDisabled;
	exports.isReadOnly = isReadOnly;
	exports.isDisabledItem = isDisabledItem;
	exports.isReadOnlyItem = isReadOnlyItem;
	exports.contains = contains;
	exports.move = move;

	var _dataHelpers = __webpack_require__(53);

	function isDisabled(props) {
	  return props.disabled === true || props.disabled === 'disabled';
	}

	function isReadOnly(props) {
	  return props.readOnly === true || props.readOnly === 'readOnly';
	}

	function isDisabledItem(item, props) {
	  return isDisabled(props) || contains(item, props.disabled, props.valueField);
	}

	function isReadOnlyItem(item, props) {
	  return isReadOnly(props) || contains(item, props.readOnly, props.valueField);
	}

	function contains(item, values, valueField) {
	  return Array.isArray(values) ? values.some(function (value) {
	    return _dataHelpers.valueMatcher(item, value, valueField);
	  }) : _dataHelpers.valueMatcher(item, values, valueField);
	}

	function move(dir, item, props, list) {
	  var isDisabledOrReadonly = function isDisabledOrReadonly(item) {
	    return isDisabledItem(item, props) || isReadOnlyItem(item, props);
	  },
	      stop = dir === 'next' ? list.last() : list.first(),
	      next = list[dir](item);

	  while (next !== stop && isDisabledOrReadonly(next)) next = list[dir](next);

	  return isDisabledOrReadonly(next) ? item : next;
	}

	var widgetEnabled = interactionDecorator(true);

	exports.widgetEnabled = widgetEnabled;
	var widgetEditable = interactionDecorator(false);

	exports.widgetEditable = widgetEditable;
	function interactionDecorator(disabledOnly) {
	  function wrap(method) {
	    return function decoratedMethod() {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      if (!(isDisabled(this.props) || !disabledOnly && isReadOnly(this.props))) return method.apply(this, args);
	    };
	  }

	  return function decorate(target, key, desc) {
	    if (desc.initializer) {
	      (function () {
	        var init = desc.initializer;
	        desc.initializer = function () {
	          return wrap(init());
	        };
	      })();
	    } else desc.value = wrap(desc.value);
	    return desc;
	  };
	}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(20);

	var has = _require.has;

	module.exports = {

	  componentWillUnmount: function componentWillUnmount() {
	    var timers = this._timers || {};

	    this._unmounted = true;

	    for (var k in timers) if (has(timers, k)) clearTimeout(timers[k]);
	  },

	  setTimeout: function setTimeout(key, cb, duration) {
	    var timers = this._timers || (this._timers = Object.create(null));

	    if (this._unmounted) return;

	    clearTimeout(timers[key]);
	    timers[key] = window.setTimeout(cb, duration);
	  }

	};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var _ = __webpack_require__(20);

	//backport PureRenderEqual
	module.exports = {

	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    return !_.isShallowEqual(this.props, nextProps) || !_.isShallowEqual(this.state, nextState);
	  }
	};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _propTypes = __webpack_require__(22);

	var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

	var _utilFilter = __webpack_require__(50);

	var _utilFilter2 = babelHelpers.interopRequireDefault(_utilFilter);

	var _utilPropTypes = __webpack_require__(49);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _utilDataHelpers = __webpack_require__(53);

	var dflt = function dflt(f) {
	  return f === true ? 'startsWith' : f ? f : 'eq';
	};

	module.exports = {

	  propTypes: {
	    data: _propTypes2['default'].array,
	    value: _propTypes2['default'].any,
	    filter: _utilPropTypes2['default'].filter,
	    caseSensitive: _propTypes2['default'].bool,
	    minLength: _propTypes2['default'].number
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      caseSensitive: false,
	      minLength: 1
	    };
	  },

	  filterIndexOf: function filterIndexOf(items, searchTerm) {
	    var idx = -1,
	        matches = typeof this.props.filter === 'function' ? this.props.filter : getFilter(_utilFilter2['default'][dflt(this.props.filter)], searchTerm, this);

	    if (!searchTerm || !searchTerm.trim() || this.props.filter && searchTerm.length < (this.props.minLength || 1)) return -1;

	    items.every(function (item, i) {
	      if (matches(item, searchTerm, i)) return idx = i, false;

	      return true;
	    });

	    return idx;
	  },

	  filter: function filter(items, searchTerm) {
	    var matches = typeof this.props.filter === 'string' ? getFilter(_utilFilter2['default'][this.props.filter], searchTerm, this) : this.props.filter;

	    if (!matches || !searchTerm || !searchTerm.trim() || searchTerm.length < (this.props.minLength || 1)) return items;

	    return items.filter(function (item, idx) {
	      return matches(item, searchTerm, idx);
	    });
	  }
	};

	function getFilter(matcher, searchTerm, ctx) {
	  searchTerm = !ctx.props.caseSensitive ? searchTerm.toLowerCase() : searchTerm;

	  return function (item) {
	    var val = _utilDataHelpers.dataText(item, ctx.props.textField);

	    if (!ctx.props.caseSensitive) val = val.toLowerCase();

	    return matcher(val, searchTerm);
	  };
	}

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _domHelpersUtilScrollTo = __webpack_require__(72);

	var _domHelpersUtilScrollTo2 = babelHelpers.interopRequireDefault(_domHelpersUtilScrollTo);

	exports['default'] = {

	  _scrollTo: function _scrollTo(selected, list, focused) {
	    var state = this._scrollState || (this._scrollState = {}),
	        handler = this.props.onMove,
	        lastVisible = state.visible,
	        lastItem = state.focused,
	        shown,
	        changed;

	    state.visible = !(!list.offsetWidth || !list.offsetHeight);
	    state.focused = focused;

	    changed = lastItem !== focused;
	    shown = state.visible && !lastVisible;

	    if (shown || state.visible && changed) {
	      if (handler) handler(selected, list, focused);else {
	        state.scrollCancel && state.scrollCancel();
	        state.scrollCancel = _domHelpersUtilScrollTo2['default'](selected, list);
	      }
	    }
	  }
	};
	module.exports = exports['default'];

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var getOffset = __webpack_require__(45),
	    height = __webpack_require__(44),
	    getScrollParent = __webpack_require__(73),
	    scrollTop = __webpack_require__(74),
	    raf = __webpack_require__(75),
	    getWindow = __webpack_require__(46);

	module.exports = function scrollTo(selected, scrollParent) {
	    var offset = getOffset(selected),
	        poff = { top: 0, left: 0 },
	        list,
	        listScrollTop,
	        selectedTop,
	        isWin,
	        selectedHeight,
	        listHeight,
	        bottom;

	    if (!selected) return;

	    list = scrollParent || getScrollParent(selected);
	    isWin = getWindow(list);
	    listScrollTop = scrollTop(list);

	    listHeight = height(list, true);
	    isWin = getWindow(list);

	    if (!isWin) poff = getOffset(list);

	    offset = {
	        top: offset.top - poff.top,
	        left: offset.left - poff.left,
	        height: offset.height,
	        width: offset.width
	    };

	    selectedHeight = offset.height;
	    selectedTop = offset.top + (isWin ? 0 : listScrollTop);
	    bottom = selectedTop + selectedHeight;

	    listScrollTop = listScrollTop > selectedTop ? selectedTop : bottom > listScrollTop + listHeight ? bottom - listHeight : listScrollTop;

	    var id = raf(function () {
	        return scrollTop(list, listScrollTop);
	    });

	    return function () {
	        return raf.cancel(id);
	    };
	};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var css = __webpack_require__(7),
	    height = __webpack_require__(44);

	module.exports = function scrollPrarent(node) {
	  var position = css(node, 'position'),
	      excludeStatic = position === 'absolute',
	      ownerDoc = node.ownerDocument;

	  if (position === 'fixed') return ownerDoc || document;

	  while ((node = node.parentNode) && node.nodeType !== 9) {

	    var isStatic = excludeStatic && css(node, 'position') === 'static',
	        style = css(node, 'overflow') + css(node, 'overflow-y') + css(node, 'overflow-x');

	    if (isStatic) continue;

	    if (/(auto|scroll)/.test(style) && height(node) < node.scrollHeight) return node;
	  }

	  return document;
	};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var getWindow = __webpack_require__(46);

	module.exports = function scrollTop(node, val) {
	  var win = getWindow(node);

	  if (val === undefined) return win ? 'pageYOffset' in win ? win.pageYOffset : win.document.documentElement.scrollTop : node.scrollTop;

	  if (win) win.scrollTo('pageXOffset' in win ? win.pageXOffset : win.document.documentElement.scrollLeft, val);else node.scrollTop = val;
	};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var canUseDOM = __webpack_require__(15);

	var vendors = ['', 'webkit', 'moz', 'o', 'ms'],
	    cancel = 'clearTimeout',
	    raf = fallback,
	    compatRaf;

	var getKey = function getKey(vendor, k) {
	  return vendor + (!vendor ? k : k[0].toUpperCase() + k.substr(1)) + 'AnimationFrame';
	};

	if (canUseDOM) {
	  vendors.some(function (vendor) {
	    var rafKey = getKey(vendor, 'request');

	    if (rafKey in window) {
	      cancel = getKey(vendor, 'cancel');
	      return raf = function (cb) {
	        return window[rafKey](cb);
	      };
	    }
	  });
	}

	/* https://github.com/component/raf */
	var prev = new Date().getTime();

	function fallback(fn) {
	  var curr = new Date().getTime(),
	      ms = Math.max(0, 16 - (curr - prev)),
	      req = setTimeout(fn, ms);

	  prev = curr;
	  return req;
	}

	compatRaf = function (cb) {
	  return raf(cb);
	};
	compatRaf.cancel = function (id) {
	  return window[cancel](id);
	};

	module.exports = compatRaf;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	var _propTypes = __webpack_require__(22);

	var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

	var React = __webpack_require__(21);

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

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;
	exports['default'] = FocusMixin;

	var _utilWidgetHelpers = __webpack_require__(54);

	var _utilInteraction = __webpack_require__(67);

	var _utilCompat = __webpack_require__(47);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	function FocusMixin(_ref) {
	  var willHandle = _ref.willHandle;
	  var didHandle = _ref.didHandle;

	  function _handleFocus(inst, focused, event) {
	    var handler = inst.props[focused ? 'onFocus' : 'onBlur'];

	    if (handler && event) event.persist();

	    if (willHandle && willHandle.call(inst, focused, event) === false) return;

	    inst.setTimeout('focus', function () {
	      _utilCompat2['default'].batchedUpdates(function () {
	        if (didHandle) didHandle.call(inst, focused, event);

	        if (focused !== inst.state.focused) {
	          _utilWidgetHelpers.notify(handler, event);
	          if (inst.isMounted()) inst.setState({ focused: focused });
	        }
	      });
	    });
	  }

	  return babelHelpers.createDecoratedObject([{
	    key: 'handleBlur',
	    decorators: [_utilInteraction.widgetEnabled],
	    value: function handleBlur(event) {
	      _handleFocus(this, false, event);
	    }
	  }, {
	    key: 'handleFocus',
	    decorators: [_utilInteraction.widgetEnabled],
	    value: function handleFocus(event) {
	      _handleFocus(this, true, event);
	    }
	  }]);
	}

	module.exports = exports['default'];

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _propTypes = __webpack_require__(22);

	var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(35);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _createReactClass = __webpack_require__(36);

	var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _utilFilter = __webpack_require__(50);

	var _utilFilter2 = babelHelpers.interopRequireDefault(_utilFilter);

	var _Popup = __webpack_require__(43);

	var _Popup2 = babelHelpers.interopRequireDefault(_Popup);

	var _TetheredPopup = __webpack_require__(63);

	var _TetheredPopup2 = babelHelpers.interopRequireDefault(_TetheredPopup);

	var _WidgetButton = __webpack_require__(79);

	var _WidgetButton2 = babelHelpers.interopRequireDefault(_WidgetButton);

	var _ComboboxInput = __webpack_require__(80);

	var _ComboboxInput2 = babelHelpers.interopRequireDefault(_ComboboxInput);

	var _utilCompat = __webpack_require__(47);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var _utilPropTypes = __webpack_require__(49);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _List = __webpack_require__(51);

	var _List2 = babelHelpers.interopRequireDefault(_List);

	var _ListGroupable = __webpack_require__(57);

	var _ListGroupable2 = babelHelpers.interopRequireDefault(_ListGroupable);

	var _utilValidateListInterface = __webpack_require__(59);

	var _utilValidateListInterface2 = babelHelpers.interopRequireDefault(_utilValidateListInterface);

	var _uncontrollable = __webpack_require__(60);

	var _uncontrollable2 = babelHelpers.interopRequireDefault(_uncontrollable);

	var _utilDataHelpers = __webpack_require__(53);

	var _utilInteraction = __webpack_require__(67);

	var _utilWidgetHelpers = __webpack_require__(54);

	var defaultSuggest = function defaultSuggest(f) {
	  return f === true ? 'startsWith' : f ? f : 'eq';
	};

	var omit = _util_2['default'].omit;
	var pick = _util_2['default'].pick;

	var propTypes = {
	  //-- controlled props -----------
	  value: _propTypes2['default'].any,
	  onChange: _propTypes2['default'].func,
	  open: _propTypes2['default'].bool,
	  onToggle: _propTypes2['default'].func,
	  //------------------------------------

	  itemComponent: _utilPropTypes2['default'].elementType,
	  listComponent: _utilPropTypes2['default'].elementType,
	  afterListComponent: _propTypes2['default'].any,
	  groupComponent: _utilPropTypes2['default'].elementType,
	  groupBy: _utilPropTypes2['default'].multiAccessor,

	  data: _propTypes2['default'].array,
	  valueField: _propTypes2['default'].string,
	  textField: _utilPropTypes2['default'].accessor,
	  name: _propTypes2['default'].string,

	  onSelect: _propTypes2['default'].func,

	  autoFocus: _propTypes2['default'].bool,
	  disabled: _utilPropTypes2['default'].disabled,
	  readOnly: _utilPropTypes2['default'].readOnly,

	  suggest: _utilPropTypes2['default'].filter,
	  filter: _utilPropTypes2['default'].filter,

	  busy: _propTypes2['default'].bool,

	  tetherPopup: _propTypes2['default'].bool,

	  dropUp: _propTypes2['default'].bool,
	  duration: _propTypes2['default'].number, //popup

	  placeholder: _propTypes2['default'].string,

	  messages: _propTypes2['default'].shape({
	    open: _utilPropTypes2['default'].message,
	    emptyList: _utilPropTypes2['default'].message,
	    emptyFilter: _utilPropTypes2['default'].message
	  })
	};

	var ComboBox = _createReactClass2['default'](babelHelpers.createDecoratedObject([{
	  key: 'displayName',
	  initializer: function initializer() {
	    return 'ComboBox';
	  }
	}, {
	  key: 'mixins',
	  initializer: function initializer() {
	    return [__webpack_require__(68), __webpack_require__(70), __webpack_require__(71), __webpack_require__(76), __webpack_require__(56)('input')];
	  }
	}, {
	  key: 'propTypes',
	  initializer: function initializer() {
	    return propTypes;
	  }
	}, {
	  key: 'getInitialState',
	  value: function getInitialState() {
	    var _props = this.props;
	    var value = _props.value;
	    var data = _props.data;
	    var valueField = _props.valueField;
	    var items = this.process(data, value);
	    var idx = _utilDataHelpers.dataIndexOf(items, value, valueField);

	    return {
	      selectedItem: items[idx],
	      focusedItem: items[! ~idx ? 0 : idx],
	      processedData: items,
	      open: false
	    };
	  }
	}, {
	  key: 'getDefaultProps',
	  value: function getDefaultProps() {
	    return {
	      data: [],
	      value: '',
	      open: false,
	      suggest: false,
	      filter: false,
	      delay: 500,
	      tetherPopup: false,
	      popupStyle: {},

	      messages: msgs(),
	      ariaActiveDescendantKey: 'combobox'
	    };
	  }
	}, {
	  key: 'componentDidUpdate',
	  value: function componentDidUpdate() {
	    this.listRef && _utilValidateListInterface2['default'](this.listRef);
	  }
	}, {
	  key: 'shouldComponentUpdate',
	  value: function shouldComponentUpdate(nextProps, nextState) {
	    var isSuggesting = this.inputRef && this.inputRef.isSuggesting(),
	        stateChanged = !_util_2['default'].isShallowEqual(nextState, this.state),
	        valueChanged = !_util_2['default'].isShallowEqual(nextProps, this.props);

	    return isSuggesting || stateChanged || valueChanged;
	  }
	}, {
	  key: 'componentWillReceiveProps',
	  value: function componentWillReceiveProps(nextProps) {
	    var value = nextProps.value;
	    var data = nextProps.data;
	    var valueField = nextProps.valueField;
	    var textField = nextProps.textField;

	    var rawIdx = _utilDataHelpers.dataIndexOf(data, value, valueField),
	        valueItem = rawIdx === -1 ? nextProps.value : nextProps.data[rawIdx],
	        isSuggesting = this.inputRef.isSuggesting(),
	        items = this.process(nextProps.data, nextProps.value, (rawIdx === -1 || isSuggesting) && _utilDataHelpers.dataText(valueItem, textField)),
	        idx = _utilDataHelpers.dataIndexOf(items, value, valueField),
	        focused = this.filterIndexOf(items, _utilDataHelpers.dataText(valueItem, textField));

	    this._searchTerm = '';

	    this.setState({
	      processedData: items,
	      selectedItem: items[idx],
	      focusedItem: items[idx === -1 ? focused !== -1 ? focused : 0 // focus the closest match
	      : idx]
	    });
	  }
	}, {
	  key: 'render',
	  value: function render() {
	    var _cx,
	        _this = this;

	    var _props2 = this.props;
	    var className = _props2.className;
	    var tabIndex = _props2.tabIndex;
	    var filter = _props2.filter;
	    var suggest = _props2.suggest;
	    var valueField = _props2.valueField;
	    var textField = _props2.textField;
	    var groupBy = _props2.groupBy;
	    var tetherPopup = _props2.tetherPopup;
	    var popupStyle = _props2.popupStyle;
	    var messages = _props2.messages;
	    var data = _props2.data;
	    var busy = _props2.busy;
	    var dropUp = _props2.dropUp;
	    var name = _props2.name;
	    var autoFocus = _props2.autoFocus;
	    var placeholder = _props2.placeholder;
	    var value = _props2.value;
	    var open = _props2.open;
	    var disabled = _props2.disabled;
	    var readOnly = _props2.readOnly;
	    var afterListComponent = _props2.afterListComponent;
	    var searchTerm = _props2.searchTerm;
	    var onChange = _props2.onChange;
	    var List = _props2.listComponent;

	    List = List || groupBy && _ListGroupable2['default'] || _List2['default'];
	    var PopupComponent = tetherPopup ? _TetheredPopup2['default'] : _Popup2['default'];

	    var elementProps = omit(this.props, Object.keys(propTypes));
	    var listProps = pick(this.props, Object.keys(List.propTypes));
	    var popupProps = pick(this.props, Object.keys(PopupComponent.propTypes));

	    var _state = this.state;
	    var focusedItem = _state.focusedItem;
	    var selectedItem = _state.selectedItem;
	    var focused = _state.focused;

	    var items = this._data(),
	        valueItem = _utilDataHelpers.dataItem(data, value, valueField),
	        // take value from the raw data
	    inputID = _utilWidgetHelpers.instanceId(this, '_input'),
	        listID = _utilWidgetHelpers.instanceId(this, '_listbox'),
	        completeType = suggest ? filter ? 'both' : 'inline' : filter ? 'list' : '';

	    var shouldRenderList = _utilWidgetHelpers.isFirstFocusedRender(this) || open;

	    messages = msgs(messages);

	    return _react2['default'].createElement(
	      'div',
	      babelHelpers._extends({}, elementProps, {
	        ref: function (ref) {
	          return _this.elementRef = ref;
	        },
	        onKeyDown: this._keyDown,
	        onFocus: this._focus.bind(null, true),
	        onBlur: tetherPopup ? function () {
	          return _this.setState({ focused: false });
	        } : this._focus.bind(null, false),
	        tabIndex: '-1',
	        className: _classnames2['default'](className, 'rw-combobox', 'rw-widget', (_cx = {
	          'rw-state-focus': focused,
	          'rw-state-disabled': disabled,
	          'rw-state-readonly': readOnly,
	          'rw-rtl': this.isRtl()

	        }, _cx['rw-open' + (dropUp ? '-up' : '')] = open, _cx))
	      }),
	      _react2['default'].createElement(
	        _WidgetButton2['default'],
	        {
	          tabIndex: '-1',
	          className: 'rw-select',
	          onClick: this.toggle,
	          disabled: !!(disabled || readOnly)
	        },
	        _react2['default'].createElement(
	          'i',
	          { className: _classnames2['default']('rw-i rw-i-caret-down', { 'rw-loading': busy }) },
	          _react2['default'].createElement(
	            'span',
	            { className: 'rw-sr' },
	            _util_2['default'].result(messages.open, this.props)
	          )
	        )
	      ),
	      _react2['default'].createElement(_ComboboxInput2['default'], {
	        ref: function (ref) {
	          return _this.inputRef = ref;
	        },
	        id: inputID,
	        autoFocus: autoFocus,
	        tabIndex: tabIndex,
	        suggest: suggest,
	        name: name,
	        role: 'combobox',
	        'aria-owns': listID,
	        'aria-busy': !!busy,
	        'aria-autocomplete': completeType,
	        'aria-expanded': open,
	        'aria-haspopup': true,
	        placeholder: placeholder,
	        disabled: disabled,
	        readOnly: readOnly,
	        className: 'rw-input',
	        value: _utilDataHelpers.dataText(valueItem, textField),
	        onChange: this._inputTyping,
	        onKeyDown: this._inputKeyDown
	      }),
	      _react2['default'].createElement(
	        PopupComponent,
	        babelHelpers._extends({}, popupProps, {
	          onOpening: function () {
	            return _this.listRef.forceUpdate();
	          },
	          getTetherFocus: function () {
	            return _this.listRef.ulRef;
	          },
	          onBlur: this._focus.bind(null, false),
	          onOpen: this.focus,
	          onRequestClose: this.close,
	          popupStyle: popupStyle
	        }),
	        _react2['default'].createElement(
	          'div',
	          null,
	          shouldRenderList && _react2['default'].createElement(List, babelHelpers._extends({
	            ref: function (ref) {
	              return _this.listRef = ref;
	            }
	          }, listProps, {
	            id: listID,
	            data: items,
	            selected: selectedItem,
	            focused: focusedItem,
	            'aria-hidden': !open,
	            'aria-labelledby': inputID,
	            'aria-live': open && 'polite',
	            onSelect: this._onSelect,
	            onMove: this._scrollTo,
	            messages: {
	              emptyList: data.length ? messages.emptyFilter : messages.emptyList
	            } })),
	          afterListComponent && _react2['default'].cloneElement(afterListComponent, { value: value, searchTerm: searchTerm, data: data, onChange: onChange })
	        )
	      )
	    );
	  }
	}, {
	  key: '_onSelect',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _onSelect(data) {
	    var _props3 = this.props;
	    var onSelect = _props3.onSelect;
	    var tetherPopup = _props3.tetherPopup;

	    this.close();
	    _utilWidgetHelpers.notify(onSelect, data);
	    this.change(data);
	    this.focus();
	    if (tetherPopup) this._focus(false);
	  }
	}, {
	  key: '_inputKeyDown',
	  value: function _inputKeyDown(e) {
	    this._deleting = e.key === 'Backspace' || e.key === 'Delete';
	    this._isTyping = true;
	  }
	}, {
	  key: '_inputTyping',
	  value: function _inputTyping(e) {
	    var _props4 = this.props;
	    var data = _props4.data;
	    var textField = _props4.textField;

	    var shouldSuggest = !!this.props.suggest,
	        strVal = e.target.value,
	        suggestion;

	    suggestion = this._deleting || !shouldSuggest ? strVal : this.suggest(this._data(), strVal);

	    suggestion = suggestion || strVal;

	    data = _util_2['default'].find(data, function (item) {
	      return _utilDataHelpers.dataText(item, textField).toLowerCase() === suggestion.toLowerCase();
	    });

	    this.change(!this._deleting && data ? data : strVal, true);

	    this.open();
	  }
	}, {
	  key: 'focus',
	  value: function focus() {
	    this.inputRef.focus();
	  }
	}, {
	  key: '_focus',
	  decorators: [_utilInteraction.widgetEnabled],
	  value: function _focus(focused, e) {
	    var _this2 = this;

	    !focused && this.inputRef.accept(); //not suggesting anymore

	    this.setTimeout('focus', function () {

	      if (!focused) _this2.close();

	      if (focused !== _this2.state.focused) {
	        _utilWidgetHelpers.notify(_this2.props[focused ? 'onFocus' : 'onBlur'], e);
	        _this2.setState({ focused: focused });
	      }
	    });
	  }
	}, {
	  key: '_keyDown',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _keyDown(e) {
	    var self = this,
	        key = e.key,
	        alt = e.altKey,
	        list = this.listRef,
	        focusedItem = this.state.focusedItem,
	        selectedItem = this.state.selectedItem,
	        isOpen = this.props.open;

	    _utilWidgetHelpers.notify(this.props.onKeyDown, [e]);

	    if (e.defaultPrevented) return;

	    if (key === 'End') if (isOpen) this.setState({ focusedItem: list.last() });else select(list.last(), true);else if (key === 'Home') if (isOpen) this.setState({ focusedItem: list.first() });else select(list.first(), true);else if (key === 'Escape' && isOpen) this.close();else if (key === 'Enter' && isOpen) {
	      select(this.state.focusedItem, true);
	    } else if (key === 'ArrowDown') {
	      if (alt) this.open();else {
	        if (isOpen) this.setState({ focusedItem: list.next(focusedItem) });else select(list.next(selectedItem), true);
	      }
	    } else if (key === 'ArrowUp') {
	      if (alt) this.close();else {
	        if (isOpen) this.setState({ focusedItem: list.prev(focusedItem) });else select(list.prev(selectedItem), true);
	      }
	    }

	    function select(item, fromList) {
	      if (!item) return self.change(_utilCompat2['default'].findDOMNode(self.inputRef).value, false);

	      self.inputRef.accept(true); //removes caret

	      if (fromList) return self._onSelect(item);

	      self.change(item, false);
	    }
	  }
	}, {
	  key: 'change',
	  value: function change(data, typing) {
	    this._typedChange = !!typing;
	    _utilWidgetHelpers.notify(this.props.onChange, data);
	  }
	}, {
	  key: 'open',
	  value: function open() {
	    if (!this.props.open) _utilWidgetHelpers.notify(this.props.onToggle, true);
	  }
	}, {
	  key: 'close',
	  value: function close() {
	    if (this.props.open) _utilWidgetHelpers.notify(this.props.onToggle, false);
	  }
	}, {
	  key: 'toggle',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function toggle() {
	    this.focus();

	    this.props.open ? this.close() : this.open();
	  }
	}, {
	  key: 'suggest',
	  value: function suggest(data, value) {
	    var _props5 = this.props;
	    var textField = _props5.textField;
	    var suggest = _props5.suggest;
	    var minLength = _props5.minLength;

	    var word = _utilDataHelpers.dataText(value, textField),
	        suggestion;

	    suggest = defaultSuggest(suggest);

	    if (!(word || '').trim() || word.length < (minLength || 1)) return '';

	    suggestion = typeof value === 'string' ? _util_2['default'].find(data, getFilter(suggest, word, textField)) : value;

	    if (suggestion && (!this.state || !this.state.deleting)) return _utilDataHelpers.dataText(suggestion, textField);

	    return '';
	  }
	}, {
	  key: '_data',
	  value: function _data() {
	    return this.state.processedData;
	  }
	}, {
	  key: 'process',
	  value: function process(data, values, searchTerm) {
	    if (this.props.filter && searchTerm) data = this.filter(data, searchTerm);

	    return data;
	  }
	}]));

	exports['default'] = _uncontrollable2['default'](ComboBox, { open: 'onToggle', value: 'onChange' });

	function msgs(msgs) {
	  return babelHelpers._extends({
	    open: 'open combobox',
	    emptyList: 'There are no items in this list',
	    emptyFilter: 'The filter returned no results'
	  }, msgs);
	}

	function getFilter(suggest, word, textField) {
	  return typeof suggest === 'string' ? function (item) {
	    return _utilFilter2['default'][suggest](_utilDataHelpers.dataText(item, textField).toLowerCase(), word.toLowerCase());
	  } : function (item) {
	    return suggest(item, word);
	  };
	}
	module.exports = exports['default'];

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _createReactClass = __webpack_require__(36);

	var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

	var _classnames = __webpack_require__(35);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	exports['default'] = _createReactClass2['default']({

	  render: function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var children = _props.children;
	    var props = babelHelpers.objectWithoutProperties(_props, ['className', 'children']);

	    return _react2['default'].createElement(
	      'button',
	      babelHelpers._extends({}, props, { type: 'button', className: _classnames2['default'](className, 'rw-btn') }),
	      children
	    );
	  }
	});
	module.exports = exports['default'];

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _propTypes = __webpack_require__(22);

	var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(36);

	var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

	var _utilCaret = __webpack_require__(81);

	var _utilCaret2 = babelHelpers.interopRequireDefault(_utilCaret);

	var _utilCompat = __webpack_require__(47);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	exports['default'] = _createReactClass2['default']({

	  displayName: 'ComboboxInput',

	  propTypes: {
	    value: _propTypes2['default'].string,
	    onChange: _propTypes2['default'].func.isRequired
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    var input = _utilCompat2['default'].findDOMNode(this),
	        val = this.props.value;

	    if (this.isSuggesting()) {
	      var start = val.toLowerCase().indexOf(this._last.toLowerCase()) + this._last.length,
	          end = val.length - start;

	      if (start >= 0) {
	        _utilCaret2['default'](input, start, start + end);
	      }
	    }
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      value: ''
	    };
	  },

	  render: function render() {
	    return _react2['default'].createElement('input', babelHelpers._extends({}, this.props, {
	      type: 'text',
	      'aria-disabled': this.props.disabled,
	      'aria-readonly': this.props.readOnly,
	      'aria-autocomplete': 'none',
	      autoComplete: 'off',
	      className: this.props.className + ' rw-input',
	      onKeyDown: this.props.onKeyDown,
	      onChange: this._change,
	      value: this.props.value == null ? '' : this.props.value
	    }));
	  },

	  isSuggesting: function isSuggesting() {
	    var val = this.props.value,
	        isSuggestion = this._last != null && val.toLowerCase().indexOf(this._last.toLowerCase()) !== -1;

	    return this.props.suggest && isSuggestion;
	  },

	  accept: function accept(removeCaret) {
	    var val = _utilCompat2['default'].findDOMNode(this).value || '',
	        end = val.length;

	    this._last = null;
	    removeCaret && _utilCaret2['default'](_utilCompat2['default'].findDOMNode(this), end, end);
	  },

	  _change: function _change(e) {
	    var val = e.target.value,
	        pl = !!this.props.placeholder;

	    // IE fires input events when setting/unsetting placeholders.
	    // issue #112
	    if (pl && !val && val === (this.props.value || '')) return;

	    this._last = val;
	    this.props.onChange(e, val);
	  },

	  focus: function focus() {
	    _utilCompat2['default'].findDOMNode(this).focus();
	  }
	});
	module.exports = exports['default'];

/***/ }),
/* 81 */
/***/ (function(module, exports) {

	/*eslint-disable no-empty */
	'use strict';

	exports.__esModule = true;
	exports['default'] = caret;

	function caret(el, start, end) {
	  if (start === undefined) return get(el);

	  set(el, start, end);
	}

	function get(el) {
	  var start, end, rangeEl, clone;

	  if (el.selectionStart !== undefined) {
	    start = el.selectionStart;
	    end = el.selectionEnd;
	  } else {
	    try {
	      el.focus();
	      rangeEl = el.createTextRange();
	      clone = rangeEl.duplicate();

	      rangeEl.moveToBookmark(document.selection.createRange().getBookmark());
	      clone.setEndPoint('EndToStart', rangeEl);

	      start = clone.text.length;
	      end = start + rangeEl.text.length;
	    } catch (e) {/* not focused or not visible */}
	  }

	  return { start: start, end: end };
	}

	function set(el, start, end) {
	  var rangeEl;

	  try {
	    if (el.selectionStart !== undefined) {
	      el.focus();
	      el.setSelectionRange(start, end);
	    } else {
	      el.focus();
	      rangeEl = el.createTextRange();
	      rangeEl.collapse(true);
	      rangeEl.moveStart('character', start);
	      rangeEl.moveEnd('character', end - start);
	      rangeEl.select();
	    }
	  } catch (e) {/* not focused or not visible */}
	}
	module.exports = exports['default'];

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _VIEW, _OPPOSITE_DIRECTION, _MULTIPLIER;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _propTypes = __webpack_require__(22);

	var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(35);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _createReactClass = __webpack_require__(36);

	var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

	var _utilCompat = __webpack_require__(47);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var _Header = __webpack_require__(83);

	var _Header2 = babelHelpers.interopRequireDefault(_Header);

	var _Footer = __webpack_require__(85);

	var _Footer2 = babelHelpers.interopRequireDefault(_Footer);

	var _Month = __webpack_require__(86);

	var _Month2 = babelHelpers.interopRequireDefault(_Month);

	var _Year = __webpack_require__(89);

	var _Year2 = babelHelpers.interopRequireDefault(_Year);

	var _Decade = __webpack_require__(90);

	var _Decade2 = babelHelpers.interopRequireDefault(_Decade);

	var _Century = __webpack_require__(91);

	var _Century2 = babelHelpers.interopRequireDefault(_Century);

	var _utilLocalizers = __webpack_require__(18);

	var _utilPropTypes = __webpack_require__(49);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _uncontrollable = __webpack_require__(60);

	var _uncontrollable2 = babelHelpers.interopRequireDefault(_uncontrollable);

	var _SlideTransition = __webpack_require__(92);

	var _SlideTransition2 = babelHelpers.interopRequireDefault(_SlideTransition);

	var _utilDates = __webpack_require__(87);

	var _utilDates2 = babelHelpers.interopRequireDefault(_utilDates);

	var _utilConstants = __webpack_require__(42);

	var _utilConstants2 = babelHelpers.interopRequireDefault(_utilConstants);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	//values, omit

	var _utilWidgetHelpers = __webpack_require__(54);

	var _utilInteraction = __webpack_require__(67);

	var dir = _utilConstants2['default'].directions,
	    values = function values(obj) {
	  return Object.keys(obj).map(function (k) {
	    return obj[k];
	  });
	},
	    invert = function invert(obj) {
	  return _util_2['default'].transform(obj, function (o, val, key) {
	    o[val] = key;
	  }, {});
	};

	var views = _utilConstants2['default'].calendarViews,
	    VIEW_OPTIONS = values(views),
	    ALT_VIEW = invert(_utilConstants2['default'].calendarViewHierarchy),
	    NEXT_VIEW = _utilConstants2['default'].calendarViewHierarchy,
	    VIEW_UNIT = _utilConstants2['default'].calendarViewUnits,
	    VIEW = (_VIEW = {}, _VIEW[views.MONTH] = _Month2['default'], _VIEW[views.YEAR] = _Year2['default'], _VIEW[views.DECADE] = _Decade2['default'], _VIEW[views.CENTURY] = _Century2['default'], _VIEW);

	var ARROWS_TO_DIRECTION = {
	  ArrowDown: dir.DOWN,
	  ArrowUp: dir.UP,
	  ArrowRight: dir.RIGHT,
	  ArrowLeft: dir.LEFT
	};

	var OPPOSITE_DIRECTION = (_OPPOSITE_DIRECTION = {}, _OPPOSITE_DIRECTION[dir.LEFT] = dir.RIGHT, _OPPOSITE_DIRECTION[dir.RIGHT] = dir.LEFT, _OPPOSITE_DIRECTION);

	var MULTIPLIER = (_MULTIPLIER = {}, _MULTIPLIER[views.YEAR] = 1, _MULTIPLIER[views.DECADE] = 10, _MULTIPLIER[views.CENTURY] = 100, _MULTIPLIER);

	var format = function format(props, f) {
	  return _utilLocalizers.date.getFormat(f, props[f + 'Format']);
	};

	var propTypes = {

	  disabled: _utilPropTypes2['default'].disabled,
	  readOnly: _utilPropTypes2['default'].readOnly,

	  onChange: _propTypes2['default'].func,
	  value: _propTypes2['default'].instanceOf(Date),

	  min: _propTypes2['default'].instanceOf(Date),
	  max: _propTypes2['default'].instanceOf(Date),

	  initialView: _propTypes2['default'].oneOf(VIEW_OPTIONS),

	  finalView: function finalView(props, propname, componentName) {
	    var err = _propTypes2['default'].oneOf(VIEW_OPTIONS)(props, propname, componentName);

	    if (err) return err;
	    if (VIEW_OPTIONS.indexOf(props[propname]) < VIEW_OPTIONS.indexOf(props.initialView)) return new Error(('The `' + propname + '` prop: `' + props[propname] + '` cannot be \'lower\' than the `initialView`\n        prop. This creates a range that cannot be rendered.').replace(/\n\t/g, ''));
	  },

	  culture: _propTypes2['default'].string,

	  footer: _propTypes2['default'].bool,

	  dayComponent: _utilPropTypes2['default'].elementType,
	  headerFormat: _utilPropTypes2['default'].dateFormat,
	  footerFormat: _utilPropTypes2['default'].dateFormat,

	  dayFormat: _utilPropTypes2['default'].dateFormat,
	  dateFormat: _utilPropTypes2['default'].dateFormat,
	  monthFormat: _utilPropTypes2['default'].dateFormat,
	  yearFormat: _utilPropTypes2['default'].dateFormat,
	  decadeFormat: _utilPropTypes2['default'].dateFormat,
	  centuryFormat: _utilPropTypes2['default'].dateFormat,

	  messages: _propTypes2['default'].shape({
	    moveBack: _propTypes2['default'].string,
	    moveForward: _propTypes2['default'].string
	  })
	};

	var Calendar = _createReactClass2['default'](babelHelpers.createDecoratedObject([{
	  key: 'displayName',
	  initializer: function initializer() {
	    return 'Calendar';
	  }
	}, {
	  key: 'mixins',
	  initializer: function initializer() {
	    return [__webpack_require__(68), __webpack_require__(69), __webpack_require__(76), __webpack_require__(56)()];
	  }
	}, {
	  key: 'propTypes',
	  initializer: function initializer() {
	    return propTypes;
	  }
	}, {
	  key: 'getInitialState',
	  value: function getInitialState() {
	    var value = this.inRangeValue(this.props.value);

	    return {
	      selectedIndex: 0,
	      view: this.props.initialView || 'month',
	      currentDate: value ? new Date(value) : this.inRangeValue(new Date())
	    };
	  }
	}, {
	  key: 'getDefaultProps',
	  value: function getDefaultProps() {
	    return {

	      value: null,
	      min: new Date(1900, 0, 1),
	      max: new Date(2099, 11, 31),

	      initialView: 'month',
	      finalView: 'century',

	      tabIndex: '0',
	      footer: false,

	      ariaActiveDescendantKey: 'calendar',
	      messages: msgs({})
	    };
	  }
	}, {
	  key: 'componentWillReceiveProps',
	  value: function componentWillReceiveProps(nextProps) {
	    var bottom = VIEW_OPTIONS.indexOf(nextProps.initialView),
	        top = VIEW_OPTIONS.indexOf(nextProps.finalView),
	        current = VIEW_OPTIONS.indexOf(this.state.view),
	        view = this.state.view,
	        val = this.inRangeValue(nextProps.value);

	    if (current < bottom) this.setState({ view: view = nextProps.initialView });else if (current > top) this.setState({ view: view = nextProps.finalView });

	    //if the value changes reset views to the new one
	    if (!_utilDates2['default'].eq(val, dateOrNull(this.props.value), VIEW_UNIT[view])) this.setState({
	      currentDate: val ? new Date(val) : new Date()
	    });
	  }
	}, {
	  key: 'render',
	  value: function render() {
	    var _this = this;

	    var _props = this.props;
	    var className = _props.className;
	    var value = _props.value;
	    var footerFormat = _props.footerFormat;
	    var disabled = _props.disabled;
	    var readOnly = _props.readOnly;
	    var finalView = _props.finalView;
	    var footer = _props.footer;
	    var messages = _props.messages;
	    var min = _props.min;
	    var max = _props.max;
	    var culture = _props.culture;
	    var duration = _props.duration;
	    var _state = this.state;
	    var view = _state.view;
	    var currentDate = _state.currentDate;
	    var slideDirection = _state.slideDirection;
	    var focused = _state.focused;

	    var View = VIEW[view],
	        unit = VIEW_UNIT[view],
	        todaysDate = new Date(),
	        todayNotInRange = !_utilDates2['default'].inRange(todaysDate, min, max, view);

	    unit = unit === 'day' ? 'date' : unit;

	    var viewID = _utilWidgetHelpers.instanceId(this, '_calendar'),
	        labelID = _utilWidgetHelpers.instanceId(this, '_calendar_label'),
	        key = view + '_' + _utilDates2['default'][view](currentDate);

	    var elementProps = _util_2['default'].omit(this.props, Object.keys(propTypes)),
	        viewProps = _util_2['default'].pick(this.props, Object.keys(View.propTypes));

	    var isDisabled = disabled || readOnly;

	    messages = msgs(this.props.messages);

	    return _react2['default'].createElement(
	      'div',
	      babelHelpers._extends({}, elementProps, {
	        role: 'group',
	        onKeyDown: this._keyDown,
	        onFocus: this._focus.bind(null, true),
	        onBlur: this._focus.bind(null, false),
	        className: _classnames2['default'](className, 'rw-calendar', 'rw-widget', {
	          'rw-state-focus': focused,
	          'rw-state-disabled': disabled,
	          'rw-state-readonly': readOnly,
	          'rw-rtl': this.isRtl()
	        })
	      }),
	      _react2['default'].createElement(_Header2['default'], {
	        label: this._label(),
	        labelId: labelID,
	        messages: messages,
	        upDisabled: isDisabled || view === finalView,
	        prevDisabled: isDisabled || !_utilDates2['default'].inRange(this.nextDate(dir.LEFT), min, max, view),
	        nextDisabled: isDisabled || !_utilDates2['default'].inRange(this.nextDate(dir.RIGHT), min, max, view),
	        onViewChange: this.navigate.bind(null, dir.UP, null),
	        onMoveLeft: this.navigate.bind(null, dir.LEFT, null),
	        onMoveRight: this.navigate.bind(null, dir.RIGHT, null)
	      }),
	      _react2['default'].createElement(
	        _SlideTransition2['default'],
	        {
	          ref: function (ref) {
	            return _this.animationRef = ref;
	          },
	          duration: duration,
	          direction: slideDirection,
	          onAnimate: function () {
	            return focused && _this.focus();
	          }
	        },
	        _react2['default'].createElement(View, babelHelpers._extends({}, viewProps, {
	          tabIndex: '-1',
	          key: key,
	          id: viewID,
	          className: 'rw-calendar-grid',
	          'aria-labelledby': labelID,
	          today: todaysDate,
	          value: value,
	          focused: currentDate,
	          onChange: this.change,
	          onKeyDown: this._keyDown,
	          ariaActiveDescendantKey: 'calendarView'
	        }))
	      ),
	      footer && _react2['default'].createElement(_Footer2['default'], {
	        value: todaysDate,
	        format: footerFormat,
	        culture: culture,
	        disabled: disabled || todayNotInRange,
	        readOnly: readOnly,
	        onClick: this.select
	      })
	    );
	  }
	}, {
	  key: 'navigate',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function navigate(direction, date) {
	    var view = this.state.view,
	        slideDir = direction === dir.LEFT || direction === dir.UP ? 'right' : 'left';

	    if (!date) date = [dir.LEFT, dir.RIGHT].indexOf(direction) !== -1 ? this.nextDate(direction) : this.state.currentDate;

	    if (direction === dir.DOWN) view = ALT_VIEW[view] || view;

	    if (direction === dir.UP) view = NEXT_VIEW[view] || view;

	    if (this.isValidView(view) && _utilDates2['default'].inRange(date, this.props.min, this.props.max, view)) {
	      _utilWidgetHelpers.notify(this.props.onNavigate, [date, slideDir, view]);
	      this.focus(true);

	      this.setState({
	        currentDate: date,
	        slideDirection: slideDir,
	        view: view
	      });
	    }
	  }
	}, {
	  key: 'focus',
	  value: function focus() {
	    if (+this.props.tabIndex > -1) _utilCompat2['default'].findDOMNode(this).focus();

	    //console.log(document.activeElement)
	  }
	}, {
	  key: '_focus',
	  decorators: [_utilInteraction.widgetEnabled],
	  value: function _focus(focused, e) {
	    var _this2 = this;

	    if (+this.props.tabIndex === -1) return;

	    this.setTimeout('focus', function () {
	      if (focused !== _this2.state.focused) {
	        _utilWidgetHelpers.notify(_this2.props[focused ? 'onFocus' : 'onBlur'], e);
	        _this2.setState({ focused: focused });
	      }
	    });
	  }
	}, {
	  key: 'change',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function change(date) {
	    if (this.state.view === this.props.initialView) {
	      _utilWidgetHelpers.notify(this.props.onChange, date);
	      this.focus();
	      return;
	    }

	    this.navigate(dir.DOWN, date);
	  }
	}, {
	  key: 'select',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function select(date) {
	    var view = this.props.initialView,
	        slideDir = view !== this.state.view || _utilDates2['default'].gt(date, this.state.currentDate) ? 'left' // move down to a the view
	    : 'right';

	    _utilWidgetHelpers.notify(this.props.onChange, date);

	    if (this.isValidView(view) && _utilDates2['default'].inRange(date, this.props.min, this.props.max, view)) {
	      this.focus();

	      this.setState({
	        currentDate: date,
	        slideDirection: slideDir,
	        view: view
	      });
	    }
	  }
	}, {
	  key: 'nextDate',
	  value: function nextDate(direction) {
	    var method = direction === dir.LEFT ? 'subtract' : 'add',
	        view = this.state.view,
	        unit = view === views.MONTH ? view : views.YEAR,
	        multi = MULTIPLIER[view] || 1;

	    return _utilDates2['default'][method](this.state.currentDate, 1 * multi, unit);
	  }
	}, {
	  key: '_keyDown',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _keyDown(e) {
	    var ctrl = e.ctrlKey,
	        key = e.key,
	        direction = ARROWS_TO_DIRECTION[key],
	        current = this.state.currentDate,
	        view = this.state.view,
	        unit = VIEW_UNIT[view],
	        currentDate = current;

	    if (key === 'Enter') {
	      e.preventDefault();
	      return this.change(current);
	    }

	    if (direction) {
	      if (ctrl) {
	        e.preventDefault();
	        this.navigate(direction);
	      } else {
	        if (this.isRtl() && OPPOSITE_DIRECTION[direction]) direction = OPPOSITE_DIRECTION[direction];

	        currentDate = _utilDates2['default'].move(currentDate, this.props.min, this.props.max, view, direction);

	        if (!_utilDates2['default'].eq(current, currentDate, unit)) {
	          e.preventDefault();

	          if (_utilDates2['default'].gt(currentDate, current, view)) this.navigate(dir.RIGHT, currentDate);else if (_utilDates2['default'].lt(currentDate, current, view)) this.navigate(dir.LEFT, currentDate);else this.setState({ currentDate: currentDate });
	        }
	      }
	    }

	    _utilWidgetHelpers.notify(this.props.onKeyDown, [e]);
	  }
	}, {
	  key: '_label',
	  value: function _label() {
	    var _props2 = this.props;
	    var culture = _props2.culture;
	    var props = babelHelpers.objectWithoutProperties(_props2, ['culture']);
	    var view = this.state.view;
	    var dt = this.state.currentDate;

	    if (view === 'month') return _utilLocalizers.date.format(dt, format(props, 'header'), culture);else if (view === 'year') return _utilLocalizers.date.format(dt, format(props, 'year'), culture);else if (view === 'decade') return _utilLocalizers.date.format(_utilDates2['default'].startOf(dt, 'decade'), format(props, 'decade'), culture);else if (view === 'century') return _utilLocalizers.date.format(_utilDates2['default'].startOf(dt, 'century'), format(props, 'century'), culture);
	  }
	}, {
	  key: 'inRangeValue',
	  value: function inRangeValue(_value) {
	    var value = dateOrNull(_value);

	    if (value === null) return value;

	    return _utilDates2['default'].max(_utilDates2['default'].min(value, this.props.max), this.props.min);
	  }
	}, {
	  key: 'isValidView',
	  value: function isValidView(next) {
	    var bottom = VIEW_OPTIONS.indexOf(this.props.initialView),
	        top = VIEW_OPTIONS.indexOf(this.props.finalView),
	        current = VIEW_OPTIONS.indexOf(next);

	    return current >= bottom && current <= top;
	  }
	}]));

	function dateOrNull(dt) {
	  if (dt && !isNaN(dt.getTime())) return dt;
	  return null;
	}

	function msgs(msgs) {
	  return babelHelpers._extends({
	    moveBack: 'navigate back',
	    moveForward: 'navigate forward'
	  }, msgs);
	}

	exports['default'] = _uncontrollable2['default'](Calendar, { value: 'onChange' });
	module.exports = exports['default'];

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _propTypes = __webpack_require__(22);

	var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(36);

	var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

	var _WidgetButton = __webpack_require__(79);

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

	  mixins: [__webpack_require__(69), __webpack_require__(84)],

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

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _propTypes = __webpack_require__(22);

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

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _createReactClass = __webpack_require__(36);

	var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

	var _WidgetButton = __webpack_require__(79);

	var _WidgetButton2 = babelHelpers.interopRequireDefault(_WidgetButton);

	var _utilLocalizers = __webpack_require__(18);

	var format = function format(props) {
	  return _utilLocalizers.date.getFormat('footer', props.format);
	};

	module.exports = _createReactClass2['default']({

	  displayName: 'Footer',

	  render: function render() {
	    var now = this.props.value,
	        formatted = _utilLocalizers.date.format(now, format(this.props), this.props.culture);

	    return _react2['default'].createElement(
	      'div',
	      { className: 'rw-footer' },
	      _react2['default'].createElement(
	        _WidgetButton2['default'],
	        { tabIndex: '-1',
	          'aria-disabled': !!this.props.disabled,
	          'aria-readonly': !!this.props.readOnly,
	          disabled: this.props.disabled,
	          readOnly: this.props.readOnly,
	          onClick: this.props.onClick.bind(null, now)
	        },
	        formatted
	      )
	    );
	  }

	});

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _propTypes = __webpack_require__(22);

	var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(35);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _createReactClass = __webpack_require__(36);

	var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

	var _utilDates = __webpack_require__(87);

	var _utilDates2 = babelHelpers.interopRequireDefault(_utilDates);

	var _utilLocalizers = __webpack_require__(18);

	var _utilPropTypes = __webpack_require__(49);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _utilWidgetHelpers = __webpack_require__(54);

	var dayFormat = function dayFormat(props) {
	  return _utilLocalizers.date.getFormat('weekday', props.dayFormat);
	},
	    dateFormat = function dateFormat(props) {
	  return _utilLocalizers.date.getFormat('dayOfMonth', props.dateFormat);
	};

	var optionId = function optionId(id, date) {
	  return id + '__month_' + _utilDates2['default'].month(date) + '-' + _utilDates2['default'].date(date);
	};

	var propTypes = {
	  optionID: _propTypes2['default'].func,

	  culture: _propTypes2['default'].string,
	  value: _propTypes2['default'].instanceOf(Date),
	  focused: _propTypes2['default'].instanceOf(Date),
	  min: _propTypes2['default'].instanceOf(Date),
	  max: _propTypes2['default'].instanceOf(Date),

	  dayComponent: _utilPropTypes2['default'].elementType,

	  dayFormat: _utilPropTypes2['default'].dateFormat,
	  dateFormat: _utilPropTypes2['default'].dateFormat,
	  footerFormat: _utilPropTypes2['default'].dateFormat,

	  onChange: _propTypes2['default'].func.isRequired
	};

	var isEqual = function isEqual(dateA, dateB) {
	  return _utilDates2['default'].eq(dateA, dateB, 'day');
	};

	var MonthView = _createReactClass2['default']({

	  displayName: 'MonthView',

	  statics: {
	    isEqual: isEqual
	  },

	  mixins: [__webpack_require__(84), __webpack_require__(56)()],

	  propTypes: propTypes,

	  componentDidUpdate: function componentDidUpdate() {
	    var activeId = optionId(_utilWidgetHelpers.instanceId(this), this.props.focused);
	    this.ariaActiveDescendant(activeId, null);
	  },

	  render: function render() {
	    var _props = this.props;
	    var focused = _props.focused;
	    var culture = _props.culture;
	    var month = _utilDates2['default'].visibleDays(focused, culture);
	    var rows = _util_2['default'].chunk(month, 7);

	    var elementProps = _util_2['default'].omit(this.props, Object.keys(propTypes));

	    return _react2['default'].createElement(
	      'table',
	      babelHelpers._extends({}, elementProps, {
	        role: 'grid'
	      }),
	      _react2['default'].createElement(
	        'thead',
	        null,
	        _react2['default'].createElement(
	          'tr',
	          null,
	          this._headers(rows[0], dayFormat(this.props), culture)
	        )
	      ),
	      _react2['default'].createElement(
	        'tbody',
	        null,
	        rows.map(this._row)
	      )
	    );
	  },

	  _row: function _row(row, rowIdx) {
	    var _this = this;

	    var _props2 = this.props;
	    var focused = _props2.focused;
	    var today = _props2.today;
	    var disabled = _props2.disabled;
	    var onChange = _props2.onChange;
	    var value = _props2.value;
	    var culture = _props2.culture;
	    var min = _props2.min;
	    var max = _props2.max;
	    var Day = _props2.dayComponent;
	    var id = _utilWidgetHelpers.instanceId(this);
	    var labelFormat = _utilLocalizers.date.getFormat('footer');

	    return _react2['default'].createElement(
	      'tr',
	      { key: 'week_' + rowIdx, role: 'row' },
	      row.map(function (day, colIdx) {

	        var isFocused = isEqual(day, focused),
	            isSelected = isEqual(day, value),
	            isToday = isEqual(day, today),
	            date = _utilLocalizers.date.format(day, dateFormat(_this.props), culture),
	            label = _utilLocalizers.date.format(day, labelFormat, culture);

	        var currentID = optionId(id, day);

	        return !_utilDates2['default'].inRange(day, min, max) ? _react2['default'].createElement(
	          'td',
	          { key: 'day_' + colIdx, role: 'presentation', className: 'rw-empty-cell' },
	          ' '
	        ) : _react2['default'].createElement(
	          'td',
	          {
	            key: 'day_' + colIdx,
	            role: 'gridcell',
	            id: currentID,
	            title: label,
	            'aria-selected': isSelected,
	            'aria-label': label,
	            'aria-readonly': disabled
	          },
	          _react2['default'].createElement(
	            'span',
	            {
	              'aria-labelledby': currentID,
	              onClick: onChange.bind(null, day),
	              className: _classnames2['default']('rw-btn', {
	                'rw-off-range': _utilDates2['default'].month(day) !== _utilDates2['default'].month(focused),
	                'rw-state-focus': isFocused,
	                'rw-state-selected': isSelected,
	                'rw-now': isToday
	              })
	            },
	            Day ? _react2['default'].createElement(Day, { date: day, label: date }) : date
	          )
	        );
	      })
	    );
	  },

	  _headers: function _headers(week, format, culture) {
	    return week.map(function (date) {
	      return _react2['default'].createElement(
	        'th',
	        { key: 'header_' + _utilDates2['default'].weekday(date, undefined, _utilLocalizers.date.startOfWeek(culture)) },
	        _utilLocalizers.date.format(date, format, culture)
	      );
	    });
	  }

	});

	exports['default'] = MonthView;
	module.exports = exports['default'];

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _dateArithmetic = __webpack_require__(88);

	var _dateArithmetic2 = babelHelpers.interopRequireDefault(_dateArithmetic);

	var _constants = __webpack_require__(42);

	var _constants2 = babelHelpers.interopRequireDefault(_constants);

	var _localizers = __webpack_require__(18);

	var directions = _constants2['default'].directions;
	var calendarViewUnits = _constants2['default'].calendarViewUnits;

	var dates = babelHelpers._extends(_dateArithmetic2['default'], {

	  parse: function parse(date, format, culture) {
	    return _localizers.date.parse(date, format, culture);
	  },

	  format: function format(date, _format, culture) {
	    return _localizers.date.format(date, _format, culture);
	  },

	  monthsInYear: function monthsInYear(year) {
	    var months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
	        date = new Date(year, 0, 1);

	    return months.map(function (i) {
	      return dates.month(date, i);
	    });
	  },

	  firstVisibleDay: function firstVisibleDay(date, culture) {
	    var firstOfMonth = dates.startOf(date, 'month');
	    return dates.startOf(firstOfMonth, 'week', _localizers.date.startOfWeek(culture));
	  },

	  lastVisibleDay: function lastVisibleDay(date, culture) {
	    var endOfMonth = dates.endOf(date, 'month');

	    return dates.endOf(endOfMonth, 'week', _localizers.date.startOfWeek(culture));
	  },

	  visibleDays: function visibleDays(date, culture) {
	    var current = dates.firstVisibleDay(date, culture),
	        last = dates.lastVisibleDay(date, culture),
	        days = [];

	    while (dates.lte(current, last, 'day')) {
	      days.push(current);
	      current = dates.add(current, 1, 'day');
	    }

	    return days;
	  },

	  move: function move(date, min, max, unit, direction) {
	    var isMonth = unit === 'month',
	        isUpOrDown = direction === directions.UP || direction === directions.DOWN,
	        rangeUnit = calendarViewUnits[unit],
	        addUnit = isMonth && isUpOrDown ? 'week' : calendarViewUnits[unit],
	        amount = isMonth || !isUpOrDown ? 1 : 4,
	        newDate;

	    if (direction === directions.UP || direction === directions.LEFT) amount *= -1;

	    newDate = dates.add(date, amount, addUnit);

	    return dates.inRange(newDate, min, max, rangeUnit) ? newDate : date;
	  },

	  merge: function merge(date, time) {
	    if (time == null && date == null) return null;

	    if (time == null) time = new Date();
	    if (date == null) date = new Date();

	    date = dates.startOf(date, 'day');
	    date = dates.hours(date, dates.hours(time));
	    date = dates.minutes(date, dates.minutes(time));
	    date = dates.seconds(date, dates.seconds(time));
	    return dates.milliseconds(date, dates.milliseconds(time));
	  },

	  sameMonth: function sameMonth(dateA, dateB) {
	    return dates.eq(dateA, dateB, 'month');
	  },

	  today: function today() {
	    return this.startOf(new Date(), 'day');
	  },

	  yesterday: function yesterday() {
	    return this.add(this.startOf(new Date(), 'day'), -1, 'day');
	  },

	  tomorrow: function tomorrow() {
	    return this.add(this.startOf(new Date(), 'day'), 1, 'day');
	  }
	});

	exports['default'] = dates;
	module.exports = exports['default'];

/***/ }),
/* 88 */
/***/ (function(module, exports) {

	var MILI    = 'milliseconds'
	  , SECONDS = 'seconds'
	  , MINUTES = 'minutes'
	  , HOURS   = 'hours'
	  , DAY     = 'day'
	  , WEEK    = 'week'
	  , MONTH   = 'month'
	  , YEAR    = 'year'
	  , DECADE  = 'decade'
	  , CENTURY = 'century';

	var dates = module.exports = {

	  add: function(date, num, unit) {
	    date = new Date(date)

	    switch (unit){
	      case MILI:
	      case SECONDS:
	      case MINUTES:
	      case HOURS:
	      case YEAR:
	        return dates[unit](date, dates[unit](date) + num)
	      case DAY:
	        return dates.date(date, dates.date(date) + num)
	      case WEEK:
	        return dates.date(date, dates.date(date) + (7 * num)) 
	      case MONTH:
	        return monthMath(date, num)
	      case DECADE:
	        return dates.year(date, dates.year(date) + (num * 10))
	      case CENTURY:
	        return dates.year(date, dates.year(date) + (num * 100))
	    }

	    throw new TypeError('Invalid units: "' + unit + '"')
	  },

	  subtract: function(date, num, unit) {
	    return dates.add(date, -num, unit)
	  },

	  startOf: function(date, unit, firstOfWeek) {
	    date = new Date(date)

	    switch (unit) {
	      case 'century':
	      case 'decade':
	      case 'year':
	          date = dates.month(date, 0);
	      case 'month':
	          date = dates.date(date, 1);
	      case 'week':
	      case 'day':
	          date = dates.hours(date, 0);
	      case 'hours':
	          date = dates.minutes(date, 0);
	      case 'minutes':
	          date = dates.seconds(date, 0);
	      case 'seconds':
	          date = dates.milliseconds(date, 0);
	    }

	    if (unit === DECADE) 
	      date = dates.subtract(date, dates.year(date) % 10, 'year')
	    
	    if (unit === CENTURY) 
	      date = dates.subtract(date, dates.year(date) % 100, 'year')

	    if (unit === WEEK) 
	      date = dates.weekday(date, 0, firstOfWeek);

	    return date
	  },


	  endOf: function(date, unit, firstOfWeek){
	    date = new Date(date)
	    date = dates.startOf(date, unit, firstOfWeek)
	    date = dates.add(date, 1, unit)
	    date = dates.subtract(date, 1, MILI)
	    return date
	  },

	  eq:  createComparer(function(a, b){ return a === b }),
	  neq: createComparer(function(a, b){ return a !== b }),
	  gt:  createComparer(function(a, b){ return a > b }),
	  gte: createComparer(function(a, b){ return a >= b }),
	  lt:  createComparer(function(a, b){ return a < b }),
	  lte: createComparer(function(a, b){ return a <= b }),

	  min: function(){
	    return new Date(Math.min.apply(Math, arguments))
	  },

	  max: function(){
	    return new Date(Math.max.apply(Math, arguments))
	  },
	  
	  inRange: function(day, min, max, unit){
	    unit = unit || 'day'

	    return (!min || dates.gte(day, min, unit))
	        && (!max || dates.lte(day, max, unit))
	  },

	  milliseconds:   createAccessor('Milliseconds'),
	  seconds:        createAccessor('Seconds'),
	  minutes:        createAccessor('Minutes'),
	  hours:          createAccessor('Hours'),
	  day:            createAccessor('Day'),
	  date:           createAccessor('Date'),
	  month:          createAccessor('Month'),
	  year:           createAccessor('FullYear'),

	  decade: function (date, val) {
	    return val === undefined 
	      ? dates.year(dates.startOf(date, DECADE))
	      : dates.add(date, val + 10, YEAR);
	  },

	  century: function (date, val) {
	    return val === undefined 
	      ? dates.year(dates.startOf(date, CENTURY))
	      : dates.add(date, val + 100, YEAR);
	  },

	  weekday: function (date, val, firstDay) {
	      var weekday = (dates.day(date) + 7 - (firstDay || 0) ) % 7;

	      return val === undefined 
	        ? weekday 
	        : dates.add(date, val - weekday, DAY);
	  },

	  diff: function (date1, date2, unit, asFloat) {
	    var dividend, divisor, result;

	    switch (unit) {
	      case MILI:
	      case SECONDS:
	      case MINUTES:
	      case HOURS:
	      case DAY:
	      case WEEK:
	        dividend = date2.getTime() - date1.getTime(); break;
	      case MONTH:
	      case YEAR:
	      case DECADE:
	      case CENTURY:
	        dividend = (dates.year(date2) - dates.year(date1)) * 12 + dates.month(date2) - dates.month(date1); break;
	      default:
	        throw new TypeError('Invalid units: "' + unit + '"');
	    }

	    switch (unit) {
	      case MILI:
	          divisor = 1; break;
	      case SECONDS:
	          divisor = 1000; break;
	      case MINUTES:
	          divisor = 1000 * 60; break;
	      case HOURS:
	          divisor = 1000 * 60 * 60; break;
	      case DAY:
	          divisor = 1000 * 60 * 60 * 24; break;
	      case WEEK:
	          divisor = 1000 * 60 * 60 * 24 * 7; break;
	      case MONTH:
	          divisor = 1; break;
	      case YEAR:
	          divisor = 12; break;
	      case DECADE:
	          divisor = 120; break;
	      case CENTURY:
	          divisor = 1200; break;
	      default:
	        throw new TypeError('Invalid units: "' + unit + '"');
	    }

	    result = dividend / divisor;

	    return asFloat ? result : absoluteFloor(result);
	  }
	};

	function absoluteFloor(number) {
	  return number < 0 ? Math.ceil(number) : Math.floor(number);
	}

	function monthMath(date, val){
	  var current = dates.month(date)
	    , newMonth  = (current + val);

	    date = dates.month(date, newMonth)

	    while (newMonth < 0 ) newMonth = 12 + newMonth
	      
	    //month rollover
	    if ( dates.month(date) !== ( newMonth % 12))
	      date = dates.date(date, 0) //move to last of month

	    return date
	}

	function createAccessor(method){
	  return function(date, val){
	    if (val === undefined)
	      return date['get' + method]()

	    date = new Date(date)
	    date['set' + method](val)
	    return date
	  }
	}

	function createComparer(operator) {
	  return function (a, b, unit) {
	    return operator(+dates.startOf(a, unit), +dates.startOf(b, unit))
	  };
	}


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _propTypes = __webpack_require__(22);

	var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(35);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _createReactClass = __webpack_require__(36);

	var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

	var _utilDates = __webpack_require__(87);

	var _utilDates2 = babelHelpers.interopRequireDefault(_utilDates);

	var _utilLocalizers = __webpack_require__(18);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _utilPropTypes = __webpack_require__(49);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _utilWidgetHelpers = __webpack_require__(54);

	var format = function format(props) {
	  return _utilLocalizers.date.getFormat('month', props.monthFormat);
	};

	var propTypes = {
	  optionID: _propTypes2['default'].func,
	  culture: _propTypes2['default'].string,
	  value: _propTypes2['default'].instanceOf(Date),
	  focused: _propTypes2['default'].instanceOf(Date),
	  min: _propTypes2['default'].instanceOf(Date),
	  max: _propTypes2['default'].instanceOf(Date),
	  onChange: _propTypes2['default'].func.isRequired,

	  monthFormat: _utilPropTypes2['default'].dateFormat
	};

	var isEqual = function isEqual(dateA, dateB) {
	  return _utilDates2['default'].eq(dateA, dateB, 'month');
	};
	var optionId = function optionId(id, date) {
	  return id + '__year_' + _utilDates2['default'].year(date) + '-' + _utilDates2['default'].month(date);
	};

	var YearView = _createReactClass2['default']({

	  displayName: 'YearView',

	  mixins: [__webpack_require__(84), __webpack_require__(56)()],

	  propTypes: propTypes,

	  componentDidUpdate: function componentDidUpdate() {
	    var activeId = optionId(_utilWidgetHelpers.instanceId(this), this.props.focused);
	    this.ariaActiveDescendant(activeId);
	  },

	  render: function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var focused = _props.focused;
	    var months = _utilDates2['default'].monthsInYear(_utilDates2['default'].year(focused));
	    var rows = _util_2['default'].chunk(months, 4);

	    var elementProps = _util_2['default'].omit(this.props, Object.keys(propTypes));

	    return _react2['default'].createElement(
	      'table',
	      babelHelpers._extends({}, elementProps, {
	        role: 'grid',
	        className: _classnames2['default'](className, 'rw-nav-view')
	      }),
	      _react2['default'].createElement(
	        'tbody',
	        null,
	        rows.map(this._row)
	      )
	    );
	  },

	  _row: function _row(row, rowIdx) {
	    var _this = this;

	    var _props2 = this.props;
	    var focused = _props2.focused;
	    var disabled = _props2.disabled;
	    var onChange = _props2.onChange;
	    var value = _props2.value;
	    var today = _props2.today;
	    var culture = _props2.culture;
	    var min = _props2.min;
	    var max = _props2.max;
	    var id = _utilWidgetHelpers.instanceId(this);
	    var labelFormat = _utilLocalizers.date.getFormat('header');

	    return _react2['default'].createElement(
	      'tr',
	      { key: rowIdx, role: 'row' },
	      row.map(function (date, colIdx) {
	        var isFocused = isEqual(date, focused),
	            isSelected = isEqual(date, value),
	            currentMonth = isEqual(date, today),
	            label = _utilLocalizers.date.format(date, labelFormat, culture);

	        var currentID = optionId(id, date);

	        return _utilDates2['default'].inRange(date, min, max, 'month') ? _react2['default'].createElement(
	          'td',
	          {
	            key: colIdx,
	            role: 'gridcell',
	            id: currentID,
	            title: label,
	            'aria-selected': isSelected,
	            'aria-readonly': disabled,
	            'aria-label': label
	          },
	          _react2['default'].createElement(
	            'span',
	            {
	              'aria-labelledby': currentID,
	              onClick: onChange.bind(null, date),
	              className: _classnames2['default']('rw-btn', {
	                'rw-state-focus': isFocused,
	                'rw-state-selected': isSelected,
	                'rw-now': currentMonth
	              })
	            },
	            _utilLocalizers.date.format(date, format(_this.props), culture)
	          )
	        ) : _react2['default'].createElement(
	          'td',
	          { key: colIdx, className: 'rw-empty-cell', role: 'presentation' },
	          ' '
	        );
	      })
	    );
	  }

	});

	exports['default'] = YearView;
	module.exports = exports['default'];

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _propTypes = __webpack_require__(22);

	var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(35);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _createReactClass = __webpack_require__(36);

	var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

	var _utilDates = __webpack_require__(87);

	var _utilDates2 = babelHelpers.interopRequireDefault(_utilDates);

	var _utilLocalizers = __webpack_require__(18);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _utilPropTypes = __webpack_require__(49);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _utilWidgetHelpers = __webpack_require__(54);

	var propTypes = {
	  optionID: _propTypes2['default'].func,
	  culture: _propTypes2['default'].string,

	  value: _propTypes2['default'].instanceOf(Date),
	  focused: _propTypes2['default'].instanceOf(Date),
	  min: _propTypes2['default'].instanceOf(Date),
	  max: _propTypes2['default'].instanceOf(Date),
	  onChange: _propTypes2['default'].func.isRequired,

	  yearFormat: _utilPropTypes2['default'].dateFormat
	};

	var isEqual = function isEqual(dataA, dateB) {
	  return _utilDates2['default'].eq(dataA, dateB, 'year');
	};
	var optionId = function optionId(id, date) {
	  return id + '__decade_' + _utilDates2['default'].year(date);
	};

	exports['default'] = _createReactClass2['default']({

	  displayName: 'DecadeView',

	  mixins: [__webpack_require__(69), __webpack_require__(84), __webpack_require__(56)()],

	  propTypes: propTypes,

	  componentDidUpdate: function componentDidUpdate() {
	    var activeId = optionId(_utilWidgetHelpers.instanceId(this), this.props.focused);
	    this.ariaActiveDescendant(activeId);
	  },

	  render: function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var focused = _props.focused;
	    var years = getDecadeYears(focused);
	    var rows = _util_2['default'].chunk(years, 4);

	    var elementProps = _util_2['default'].omit(this.props, Object.keys(propTypes));

	    return _react2['default'].createElement(
	      'table',
	      babelHelpers._extends({}, elementProps, {
	        role: 'grid',
	        className: _classnames2['default'](className, 'rw-nav-view')
	      }),
	      _react2['default'].createElement(
	        'tbody',
	        null,
	        rows.map(this._row)
	      )
	    );
	  },

	  _row: function _row(row, rowIdx) {
	    var _this = this;

	    var _props2 = this.props;
	    var focused = _props2.focused;
	    var disabled = _props2.disabled;
	    var onChange = _props2.onChange;
	    var value = _props2.value;
	    var today = _props2.today;
	    var culture = _props2.culture;
	    var min = _props2.min;
	    var max = _props2.max;
	    var id = _utilWidgetHelpers.instanceId(this);

	    return _react2['default'].createElement(
	      'tr',
	      { key: 'row_' + rowIdx, role: 'row' },
	      row.map(function (date, colIdx) {
	        var isFocused = isEqual(date, focused),
	            isSelected = isEqual(date, value),
	            currentYear = isEqual(date, today),
	            label = _utilLocalizers.date.format(date, _utilLocalizers.date.getFormat('year', _this.props.yearFormat), culture);

	        var currentID = optionId(id, date);

	        return !_utilDates2['default'].inRange(date, min, max, 'year') ? _react2['default'].createElement(
	          'td',
	          { key: colIdx, role: 'presentation', className: 'rw-empty-cell' },
	          ' '
	        ) : _react2['default'].createElement(
	          'td',
	          {
	            key: colIdx,
	            role: 'gridcell',
	            id: currentID,
	            title: label,
	            'aria-selected': isSelected,
	            'aria-label': label,
	            'aria-readonly': disabled
	          },
	          _react2['default'].createElement(
	            'span',
	            {
	              'aria-labelledby': currentID,
	              onClick: onChange.bind(null, date),
	              className: _classnames2['default']('rw-btn', {
	                'rw-off-range': !inDecade(date, focused),
	                'rw-state-focus': isFocused,
	                'rw-state-selected': isSelected,
	                'rw-now': currentYear
	              })
	            },
	            label
	          )
	        );
	      })
	    );
	  }
	});

	function inDecade(date, start) {
	  return _utilDates2['default'].gte(date, _utilDates2['default'].startOf(start, 'decade'), 'year') && _utilDates2['default'].lte(date, _utilDates2['default'].endOf(start, 'decade'), 'year');
	}

	function getDecadeYears(_date) {
	  var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
	      date = _utilDates2['default'].add(_utilDates2['default'].startOf(_date, 'decade'), -2, 'year');

	  return days.map(function () {
	    return date = _utilDates2['default'].add(date, 1, 'year');
	  });
	}
	module.exports = exports['default'];

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _propTypes = __webpack_require__(22);

	var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(35);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _createReactClass = __webpack_require__(36);

	var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

	var _utilDates = __webpack_require__(87);

	var _utilDates2 = babelHelpers.interopRequireDefault(_utilDates);

	var _utilLocalizers = __webpack_require__(18);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _utilPropTypes = __webpack_require__(49);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _utilWidgetHelpers = __webpack_require__(54);

	var format = function format(props) {
	  return _utilLocalizers.date.getFormat('decade', props.decadeFormat);
	};

	var isEqual = function isEqual(dateA, dateB) {
	  return _utilDates2['default'].eq(dateA, dateB, 'decade');
	};
	var optionId = function optionId(id, date) {
	  return id + '__century_' + _utilDates2['default'].year(date);
	};

	var propTypes = {
	  optionID: _propTypes2['default'].func,
	  culture: _propTypes2['default'].string,
	  value: _propTypes2['default'].instanceOf(Date),
	  min: _propTypes2['default'].instanceOf(Date),
	  max: _propTypes2['default'].instanceOf(Date),

	  onChange: _propTypes2['default'].func.isRequired,
	  decadeFormat: _utilPropTypes2['default'].dateFormat
	};

	exports['default'] = _createReactClass2['default']({

	  displayName: 'CenturyView',

	  mixins: [__webpack_require__(69), __webpack_require__(84), __webpack_require__(56)()],

	  propTypes: propTypes,

	  componentDidUpdate: function componentDidUpdate() {
	    var activeId = optionId(_utilWidgetHelpers.instanceId(this), this.props.focused);
	    this.ariaActiveDescendant(activeId);
	  },

	  render: function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var focused = _props.focused;
	    var years = getCenturyDecades(focused);
	    var rows = _util_2['default'].chunk(years, 4);

	    var elementProps = _util_2['default'].omit(this.props, Object.keys(propTypes));

	    return _react2['default'].createElement(
	      'table',
	      babelHelpers._extends({}, elementProps, {
	        role: 'grid',
	        className: _classnames2['default'](className, 'rw-nav-view')
	      }),
	      _react2['default'].createElement(
	        'tbody',
	        null,
	        rows.map(this._row)
	      )
	    );
	  },

	  _row: function _row(row, rowIdx) {
	    var _this = this;

	    var _props2 = this.props;
	    var focused = _props2.focused;
	    var disabled = _props2.disabled;
	    var onChange = _props2.onChange;
	    var value = _props2.value;
	    var today = _props2.today;
	    var culture = _props2.culture;
	    var min = _props2.min;
	    var max = _props2.max;
	    var id = _utilWidgetHelpers.instanceId(this, '_century');

	    return _react2['default'].createElement(
	      'tr',
	      { key: 'row_' + rowIdx, role: 'row' },
	      row.map(function (date, colIdx) {
	        var isFocused = isEqual(date, focused),
	            isSelected = isEqual(date, value),
	            currentDecade = isEqual(date, today),
	            label = _utilLocalizers.date.format(_utilDates2['default'].startOf(date, 'decade'), format(_this.props), culture);

	        var currentID = optionId(id, date);

	        return !inRange(date, min, max) ? _react2['default'].createElement(
	          'td',
	          { key: colIdx, role: 'gridcell', className: 'rw-empty-cell' },
	          ' '
	        ) : _react2['default'].createElement(
	          'td',
	          {
	            key: colIdx,
	            role: 'gridcell',
	            id: currentID,
	            title: label,
	            'aria-selected': isSelected,
	            'aria-label': label,
	            'aria-readonly': disabled
	          },
	          _react2['default'].createElement(
	            'span',
	            {
	              'aria-labelledby': currentID,
	              onClick: onChange.bind(null, inRangeDate(date, min, max)),
	              className: _classnames2['default']('rw-btn', {
	                'rw-off-range': !inCentury(date, focused),
	                'rw-state-focus': isFocused,
	                'rw-state-selected': isSelected,
	                'rw-now': currentDecade
	              })
	            },
	            label
	          )
	        );
	      })
	    );
	  }

	});

	function inRangeDate(decade, min, max) {
	  return _utilDates2['default'].max(_utilDates2['default'].min(decade, max), min);
	}

	function inRange(decade, min, max) {
	  return _utilDates2['default'].gte(decade, _utilDates2['default'].startOf(min, 'decade'), 'year') && _utilDates2['default'].lte(decade, _utilDates2['default'].endOf(max, 'decade'), 'year');
	}

	function inCentury(date, start) {
	  return _utilDates2['default'].gte(date, _utilDates2['default'].startOf(start, 'century'), 'year') && _utilDates2['default'].lte(date, _utilDates2['default'].endOf(start, 'century'), 'year');
	}

	function getCenturyDecades(_date) {
	  var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
	      date = _utilDates2['default'].add(_utilDates2['default'].startOf(_date, 'century'), -20, 'year');

	  return days.map(function () {
	    return date = _utilDates2['default'].add(date, 10, 'year');
	  });
	}
	module.exports = exports['default'];

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	var React = __webpack_require__(21),
	    PropTypes = __webpack_require__(22),
	    createReactClass = __webpack_require__(36),
	    ReplaceTransitionGroup = __webpack_require__(93),
	    compat = __webpack_require__(47),
	    css = __webpack_require__(7),
	    getWidth = __webpack_require__(94),
	    config = __webpack_require__(4);

	var SlideChildGroup = createReactClass({

	  propTypes: {
	    direction: PropTypes.oneOf(['left', 'right']),
	    duration: PropTypes.number
	  },

	  componentWillEnter: function componentWillEnter(done) {
	    var _this = this;

	    var node = compat.findDOMNode(this),
	        width = getWidth(node),
	        direction = this.props.direction;

	    width = direction === 'left' ? width : -width;

	    this.ORGINAL_POSITION = node.style.position;

	    css(node, { position: 'absolute', left: width + 'px', top: 0 });

	    config.animate(node, { left: 0 }, this.props.duration, function () {

	      css(node, {
	        position: _this.ORGINAL_POSITION,
	        overflow: 'hidden'
	      });

	      _this.ORGINAL_POSITION = null;
	      done && done();
	    });
	  },

	  componentWillLeave: function componentWillLeave(done) {
	    var _this2 = this;

	    var node = compat.findDOMNode(this),
	        width = getWidth(node),
	        direction = this.props.direction;

	    width = direction === 'left' ? -width : width;

	    this.ORGINAL_POSITION = node.style.position;

	    css(node, { position: 'absolute', top: 0, left: 0 });

	    config.animate(node, { left: width + 'px' }, this.props.duration, function () {
	      css(node, {
	        position: _this2.ORGINAL_POSITION,
	        overflow: 'hidden'
	      });

	      _this2.ORGINAL_POSITION = null;
	      done && done();
	    });
	  },

	  render: function render() {
	    return React.Children.only(this.props.children);
	  }

	});

	module.exports = createReactClass({

	  propTypes: {
	    direction: PropTypes.oneOf(['left', 'right']),
	    duration: PropTypes.number
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      direction: 'left',
	      duration: 250
	    };
	  },

	  _wrapChild: function _wrapChild(child, ref) {
	    return React.createElement(
	      SlideChildGroup,
	      { key: child.key, ref: ref,
	        direction: this.props.direction,
	        duration: this.props.duration },
	      child
	    );
	  },

	  render: function render() {
	    var _this3 = this;

	    var _props = this.props;
	    var style = _props.style;
	    var children = _props.children;
	    var props = babelHelpers.objectWithoutProperties(_props, ['style', 'children']);

	    style = babelHelpers._extends({}, style, { position: 'relative', overflow: 'hidden' });

	    return React.createElement(
	      ReplaceTransitionGroup,
	      babelHelpers._extends({}, props, {
	        ref: function (ref) {
	          return _this3.containerRef = ref;
	        },
	        childFactory: this._wrapChild,
	        style: style,
	        component: 'div' }),
	      children
	    );
	  },

	  isTransitioning: function isTransitioning() {
	    return this.isMounted() && this.containerRef.isTransitioning();
	  }
	});

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * A streamlined version of TransitionGroup built for managing at most two active children
	 * also provides additional hooks for animation start/end
	 * https://github.com/facebook/react/blob/master/src/addons/transitions/ReactTransitionGroup.js
	 * relevent code is licensed accordingly
	 */
	'use strict';

	var React = __webpack_require__(21),
	    PropTypes = __webpack_require__(22),
	    css = __webpack_require__(7),
	    createReactClass = __webpack_require__(36),
	    height = __webpack_require__(44),
	    width = __webpack_require__(94),
	    compat = __webpack_require__(47),
	    _ = __webpack_require__(20);

	module.exports = createReactClass({

	  displayName: 'ReplaceTransitionGroup',

	  propTypes: {
	    component: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
	    childFactory: PropTypes.func,

	    onAnimating: PropTypes.func,
	    onAnimate: PropTypes.func
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      component: 'span',
	      childFactory: function childFactory(a) {
	        return a;
	      },

	      onAnimating: _.noop,
	      onAnimate: _.noop
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      children: _.splat(this.props.children)
	    };
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    var nextChild = getChild(nextProps.children),
	        stack = this.state.children.slice(),
	        next = stack[1],
	        last = stack[0];

	    var isLastChild = last && key(last) === key(nextChild),
	        isNextChild = next && key(next) === key(nextChild);

	    //no children
	    if (!last) {
	      stack.push(nextChild);
	      this.entering = nextChild;
	    } else if (last && !next && !isLastChild) {
	      //new child
	      stack.push(nextChild);
	      this.leaving = last;
	      this.entering = nextChild;
	    } else if (last && next && !isLastChild && !isNextChild) {
	      // the child is not the current one, exit the current one, add the new one
	      //  - shift the stack down
	      stack.shift();
	      stack.push(nextChild);
	      this.leaving = next;
	      this.entering = nextChild;
	    }
	    //new child that just needs to be re-rendered
	    else if (isLastChild) stack.splice(0, 1, nextChild);else if (isNextChild) stack.splice(1, 1, nextChild);

	    if (this.state.children[0] !== stack[0] || this.state.children[1] !== stack[1]) this.setState({ children: stack });
	  },

	  componentWillMount: function componentWillMount() {
	    this.animatingKeys = {};
	    this.leaving = null;
	    this.entering = null;
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    var entering = this.entering,
	        leaving = this.leaving,
	        first = this.refs[key(entering) || key(leaving)],
	        node = compat.findDOMNode(this),
	        el = first && compat.findDOMNode(first);

	    if (el) css(node, {
	      overflow: 'hidden',
	      height: height(el) + 'px',
	      width: width(el) + 'px'
	    });

	    this.props.onAnimating();

	    this.entering = null;
	    this.leaving = null;

	    if (entering) this.performEnter(key(entering));
	    if (leaving) this.performLeave(key(leaving));
	  },

	  performEnter: function performEnter(key) {
	    var component = this.refs[key];

	    if (!component) return;

	    this.animatingKeys[key] = true;

	    if (component.componentWillEnter) component.componentWillEnter(this._handleDoneEntering.bind(this, key));else this._handleDoneEntering(key);
	  },

	  _tryFinish: function _tryFinish() {

	    if (this.isTransitioning()) return;

	    if (this.isMounted()) css(compat.findDOMNode(this), { overflow: 'visible', height: '', width: '' });

	    this.props.onAnimate();
	  },

	  _handleDoneEntering: function _handleDoneEntering(enterkey) {
	    var component = this.refs[enterkey];

	    if (component && component.componentDidEnter) component.componentDidEnter();

	    delete this.animatingKeys[enterkey];

	    if (key(this.props.children) !== enterkey) this.performLeave(enterkey); // This was removed before it had fully entered. Remove it.

	    this._tryFinish();
	  },

	  isTransitioning: function isTransitioning() {
	    return Object.keys(this.animatingKeys).length !== 0;
	  },

	  performLeave: function performLeave(key) {
	    var component = this.refs[key];

	    if (!component) return;

	    this.animatingKeys[key] = true;

	    if (component.componentWillLeave) component.componentWillLeave(this._handleDoneLeaving.bind(this, key));else this._handleDoneLeaving(key);
	  },

	  _handleDoneLeaving: function _handleDoneLeaving(leavekey) {
	    var component = this.refs[leavekey];

	    if (component && component.componentDidLeave) component.componentDidLeave();

	    delete this.animatingKeys[leavekey];

	    if (key(this.props.children) === leavekey) this.performEnter(leavekey); // This entered again before it fully left. Add it again.

	    else if (this.isMounted()) this.setState({
	        children: this.state.children.filter(function (c) {
	          return key(c) !== leavekey;
	        })
	      });

	    this._tryFinish();
	  },

	  render: function render() {
	    var _this = this;

	    var Component = this.props.component;
	    return React.createElement(
	      Component,
	      this.props,
	      this.state.children.map(function (c) {
	        return _this.props.childFactory(c, key(c));
	      })
	    );
	  }
	});

	function getChild(children) {
	  return React.Children.only(children);
	}

	function key(child) {
	  return child && child.key;
	}

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var offset = __webpack_require__(45),
	    getWindow = __webpack_require__(46);

	module.exports = function width(node, client) {
	  var win = getWindow(node);
	  return win ? win.innerWidth : client ? node.clientWidth : offset(node).width;
	};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _propTypes = __webpack_require__(22);

	var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

	var _invariant = __webpack_require__(19);

	var _invariant2 = babelHelpers.interopRequireDefault(_invariant);

	var _domHelpersActiveElement = __webpack_require__(32);

	var _domHelpersActiveElement2 = babelHelpers.interopRequireDefault(_domHelpersActiveElement);

	var _classnames = __webpack_require__(35);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _createReactClass = __webpack_require__(36);

	var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

	var _utilCompat = __webpack_require__(47);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	//pick, omit, has

	var _utilDates = __webpack_require__(87);

	var _utilDates2 = babelHelpers.interopRequireDefault(_utilDates);

	var _utilLocalizers = __webpack_require__(18);

	var _utilConstants = __webpack_require__(42);

	var _utilConstants2 = babelHelpers.interopRequireDefault(_utilConstants);

	var _Popup = __webpack_require__(43);

	var _Popup2 = babelHelpers.interopRequireDefault(_Popup);

	var _Calendar2 = __webpack_require__(82);

	var _Calendar3 = babelHelpers.interopRequireDefault(_Calendar2);

	var _TimeList = __webpack_require__(96);

	var _TimeList2 = babelHelpers.interopRequireDefault(_TimeList);

	var _DateInput = __webpack_require__(97);

	var _DateInput2 = babelHelpers.interopRequireDefault(_DateInput);

	var _WidgetButton = __webpack_require__(79);

	var _WidgetButton2 = babelHelpers.interopRequireDefault(_WidgetButton);

	var _utilPropTypes = __webpack_require__(49);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _uncontrollable = __webpack_require__(60);

	var _uncontrollable2 = babelHelpers.interopRequireDefault(_uncontrollable);

	var _utilInteraction = __webpack_require__(67);

	var _utilWidgetHelpers = __webpack_require__(54);

	var _TetheredPopup = __webpack_require__(63);

	var _TetheredPopup2 = babelHelpers.interopRequireDefault(_TetheredPopup);

	var views = _utilConstants2['default'].calendarViews;
	var popups = _utilConstants2['default'].datePopups;

	var Calendar = _Calendar3['default'].ControlledComponent;
	var viewEnum = Object.keys(views).map(function (k) {
	  return views[k];
	});

	var omit = _util_2['default'].omit;
	var pick = _util_2['default'].pick;

	var propTypes = babelHelpers._extends({}, Calendar.propTypes, {

	  //-- controlled props -----------
	  value: _propTypes2['default'].instanceOf(Date),
	  onChange: _propTypes2['default'].func,
	  open: _propTypes2['default'].oneOf([false, popups.TIME, popups.CALENDAR]),
	  onToggle: _propTypes2['default'].func,
	  //------------------------------------

	  onSelect: _propTypes2['default'].func,

	  min: _propTypes2['default'].instanceOf(Date),
	  max: _propTypes2['default'].instanceOf(Date),

	  culture: _propTypes2['default'].string,

	  format: _utilPropTypes2['default'].dateFormat,
	  timeFormat: _utilPropTypes2['default'].dateFormat,
	  editFormat: _utilPropTypes2['default'].dateFormat,

	  calendar: _propTypes2['default'].bool,
	  time: _propTypes2['default'].bool,

	  timeComponent: _utilPropTypes2['default'].elementType,

	  //popup
	  dropUp: _propTypes2['default'].bool,
	  duration: _propTypes2['default'].number,

	  placeholder: _propTypes2['default'].string,
	  name: _propTypes2['default'].string,

	  initialView: _propTypes2['default'].oneOf(viewEnum),
	  finalView: _propTypes2['default'].oneOf(viewEnum),

	  autoFocus: _propTypes2['default'].bool,
	  disabled: _utilPropTypes2['default'].disabled,
	  readOnly: _utilPropTypes2['default'].readOnly,

	  parse: _propTypes2['default'].oneOfType([_propTypes2['default'].arrayOf(_propTypes2['default'].string), _propTypes2['default'].string, _propTypes2['default'].func]),

	  'aria-labelledby': _propTypes2['default'].string,

	  messages: _propTypes2['default'].shape({
	    calendarButton: _propTypes2['default'].string,
	    timeButton: _propTypes2['default'].string
	  })
	});

	var DateTimePicker = _createReactClass2['default'](babelHelpers.createDecoratedObject([{
	  key: 'displayName',
	  initializer: function initializer() {
	    return 'DateTimePicker';
	  }
	}, {
	  key: 'mixins',
	  initializer: function initializer() {
	    return [__webpack_require__(68), __webpack_require__(69), __webpack_require__(71), __webpack_require__(76), __webpack_require__(56)('valueInput', function (key, id) {
	      var open = this.props.open;
	      var current = this.ariaActiveDescendant();
	      var calIsActive = open === popups.CALENDAR && key === 'calendar';
	      var timeIsActive = open === popups.TIME && key === 'timelist';

	      if (!current || timeIsActive || calIsActive) return id;
	    })];
	  }
	}, {
	  key: 'propTypes',
	  initializer: function initializer() {
	    return propTypes;
	  }
	}, {
	  key: 'getInitialState',
	  value: function getInitialState() {
	    return {
	      focused: false
	    };
	  }
	}, {
	  key: 'getDefaultProps',
	  value: function getDefaultProps() {

	    return {
	      value: null,

	      min: new Date(1900, 0, 1),
	      max: new Date(2099, 11, 31),
	      calendar: true,
	      time: true,
	      open: false,

	      //calendar override
	      footer: true,

	      messages: {
	        calendarButton: 'Select Date',
	        timeButton: 'Select Time'
	      },

	      ariaActiveDescendantKey: 'dropdownlist',
	      timePopupStyle: {},
	      calendarPopupStyle: {}
	    };
	  }
	}, {
	  key: 'render',
	  value: function render() {
	    var _cx,
	        _this = this;

	    var _props = this.props;
	    var className = _props.className;
	    var calendar = _props.calendar;
	    var time = _props.time;
	    var open = _props.open;
	    var tabIndex = _props.tabIndex;
	    var value = _props.value;
	    var editFormat = _props.editFormat;
	    var timeFormat = _props.timeFormat;
	    var culture = _props.culture;
	    var duration = _props.duration;
	    var step = _props.step;
	    var messages = _props.messages;
	    var min = _props.min;
	    var max = _props.max;
	    var busy = _props.busy;
	    var placeholder = _props.placeholder;
	    var disabled = _props.disabled;
	    var readOnly = _props.readOnly;
	    var name = _props.name;
	    var dropUp = _props.dropUp;
	    var timeComponent = _props.timeComponent;
	    var autoFocus = _props.autoFocus;
	    var ariaLabelledby = _props['aria-labelledby'];
	    var ariaDescribedby = _props['aria-describedby'];
	    var tetherPopup = _props.tetherPopup;
	    var calendarPopupStyle = _props.calendarPopupStyle;
	    var timePopupStyle = _props.timePopupStyle;
	    var focused = this.state.focused;

	    var inputID = _utilWidgetHelpers.instanceId(this, '_input'),
	        timeListID = _utilWidgetHelpers.instanceId(this, '_time_listbox'),
	        dateListID = _utilWidgetHelpers.instanceId(this, '_cal'),
	        owns = '';

	    var elementProps = omit(this.props, Object.keys(propTypes)),
	        calProps = pick(this.props, Object.keys(Calendar.propTypes));

	    var shouldRenderList = _utilWidgetHelpers.isFirstFocusedRender(this) || open,
	        disabledOrReadonly = disabled || readOnly,
	        calendarIsOpen = open === popups.CALENDAR,
	        timeIsOpen = open === popups.TIME;

	    if (calendar) owns += dateListID;
	    if (time) owns += ' ' + timeListID;

	    value = dateOrNull(value);

	    var PopupComponent = tetherPopup ? _TetheredPopup2['default'] : _Popup2['default'];

	    return _react2['default'].createElement(
	      'div',
	      babelHelpers._extends({}, elementProps, {
	        ref: function (ref) {
	          return _this.elementRef = ref;
	        },
	        tabIndex: '-1',
	        onKeyDown: tetherPopup ? null : this._keyDown,
	        onFocus: tetherPopup ? function () {
	          return _this.setState({ focused: true });
	        } : this._focus.bind(null, true),
	        onBlur: tetherPopup ? function () {
	          return _this.setState({ focused: false });
	        } : this._focus.bind(null, false),
	        className: _classnames2['default'](className, 'rw-datetimepicker', 'rw-widget', (_cx = {
	          'rw-state-focus': focused,
	          'rw-state-disabled': disabled,
	          'rw-state-readonly': readOnly,
	          'rw-has-both': calendar && time,
	          'rw-has-neither': !calendar && !time,
	          'rw-rtl': this.isRtl()

	        }, _cx['rw-open' + (dropUp ? '-up' : '')] = open, _cx))
	      }),
	      _react2['default'].createElement(_DateInput2['default'], {
	        ref: function (ref) {
	          return _this.valueInputRef = ref;
	        },
	        id: inputID,
	        autoFocus: autoFocus,
	        tabIndex: tabIndex || 0,
	        role: 'combobox',
	        'aria-labelledby': ariaLabelledby,
	        'aria-describedby': ariaDescribedby,
	        'aria-expanded': !!open,
	        'aria-busy': !!busy,
	        'aria-owns': owns.trim(),
	        'aria-haspopup': true,
	        placeholder: placeholder,
	        name: name,
	        disabled: disabled,
	        readOnly: readOnly,
	        value: value,
	        format: getFormat(this.props),
	        editFormat: editFormat,
	        editing: focused,
	        culture: culture,
	        parse: this._parse,
	        onChange: this._change
	      }),
	      (calendar || time) && _react2['default'].createElement(
	        'span',
	        { className: 'rw-select' },
	        calendar && _react2['default'].createElement(
	          _WidgetButton2['default'],
	          {
	            tabIndex: '-1',
	            className: 'rw-btn-calendar',
	            disabled: disabledOrReadonly,
	            'aria-disabled': disabledOrReadonly,
	            'aria-label': messages.calendarButton,
	            onClick: tetherPopup ? function () {
	              return _this.toggle(popups.CALENDAR);
	            } : this._click.bind(null, popups.CALENDAR)
	          },
	          _react2['default'].createElement('i', { className: 'rw-i rw-i-calendar',
	            'aria-hidden': 'true'
	          })
	        ),
	        time && _react2['default'].createElement(
	          _WidgetButton2['default'],
	          {
	            tabIndex: '-1',
	            className: 'rw-btn-time',
	            disabled: disabledOrReadonly,
	            'aria-disabled': disabledOrReadonly,
	            'aria-label': messages.timeButton,
	            onClick: this._click.bind(null, popups.TIME)
	          },
	          _react2['default'].createElement('i', { className: 'rw-i rw-i-clock-o',
	            'aria-hidden': 'true'
	          })
	        )
	      ),
	      _react2['default'].createElement(
	        PopupComponent,
	        {
	          dropUp: dropUp,
	          open: timeIsOpen,
	          onRequestClose: this.close,
	          duration: duration,
	          onOpening: function () {
	            return _this.timePopupRef.forceUpdate();
	          },
	          onOpen: tetherPopup ? null : function () {
	            return _this._focus(true);
	          },
	          onKeyDown: this._keyDown,
	          onBlur: this._focus.bind(null, false),
	          getTetherFocus: function () {},
	          popupStyle: timePopupStyle
	        },
	        _react2['default'].createElement(
	          'div',
	          null,
	          shouldRenderList && _react2['default'].createElement(_TimeList2['default'], { ref: function (ref) {
	              return _this.timePopupRef = ref;
	            },
	            id: timeListID,
	            ariaActiveDescendantKey: 'timelist',
	            'aria-labelledby': inputID,
	            'aria-live': open && 'polite',
	            'aria-hidden': !open,
	            value: value,
	            format: timeFormat,
	            step: step,
	            min: min,
	            max: max,
	            culture: culture,
	            onMove: this._scrollTo,
	            preserveDate: !!calendar,
	            itemComponent: timeComponent,
	            onSelect: this._selectTime
	          })
	        )
	      ),
	      _react2['default'].createElement(
	        PopupComponent,
	        {
	          className: 'rw-calendar-popup',
	          dropUp: dropUp,
	          open: calendarIsOpen,
	          duration: duration,
	          onRequestClose: this.close,
	          onOpen: tetherPopup ? null : function () {
	            return _this._focus(true);
	          },
	          onKeyDown: this._keyDown,
	          onBlur: function () {
	            return _this._focus(false);
	          },
	          getTetherFocus: function () {},
	          popupStyle: calendarPopupStyle
	        },
	        shouldRenderList && _react2['default'].createElement(Calendar, babelHelpers._extends({}, calProps, {
	          ref: function (ref) {
	            return _this.calPopupRef = ref;
	          },
	          tabIndex: '-1',
	          id: dateListID,
	          value: value,
	          'aria-hidden': !open,
	          'aria-live': 'polite',
	          ariaActiveDescendantKey: 'calendar',
	          onChange: this._selectDate,
	          // #75: need to aggressively reclaim focus from the calendar otherwise
	          // disabled header/footer buttons will drop focus completely from the widget
	          onNavigate: function () {
	            return _this.focus();
	          }
	        }))
	      )
	    );
	  }
	}, {
	  key: '_change',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _change(date, str, constrain) {
	    var _props2 = this.props;
	    var onChange = _props2.onChange;
	    var value = _props2.value;

	    if (constrain) date = this.inRangeValue(date);

	    if (onChange) {
	      if (date == null || value == null) {
	        if (date != value) //eslint-disable-line eqeqeq
	          onChange(date, str);
	      } else if (!_utilDates2['default'].eq(date, value)) onChange(date, str);
	    }
	  }
	}, {
	  key: '_keyDown',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _keyDown(e) {
	    var _props3 = this.props;
	    var open = _props3.open;
	    var calendar = _props3.calendar;
	    var time = _props3.time;

	    _utilWidgetHelpers.notify(this.props.onKeyDown, [e]);

	    if (e.defaultPrevented) return;

	    if (e.key === 'Escape' && open) this.close();else if (e.altKey) {
	      e.preventDefault();

	      if (e.key === 'ArrowDown') {
	        if (calendar && time) this.open(open === popups.CALENDAR ? popups.TIME : popups.CALENDAR);else if (time) this.open(popups.TIME);else if (calendar) this.open(popups.CALENDAR);
	      } else if (e.key === 'ArrowUp') this.close();
	    } else if (open) {
	      if (open === popups.CALENDAR) this.calPopupRef._keyDown(e);
	      if (open === popups.TIME) this.timePopupRef._keyDown(e);
	    }
	  }
	}, {
	  key: '_focus',
	  decorators: [_utilInteraction.widgetEnabled],
	  value: function _focus(focused, e) {
	    var _this2 = this;

	    this.setTimeout('focus', function () {
	      if (!focused) _this2.close();

	      if (focused !== _this2.state.focused) {
	        _utilWidgetHelpers.notify(_this2.props[focused ? 'onFocus' : 'onBlur'], e);
	        _this2.setState({ focused: focused });
	      }
	    });
	  }
	}, {
	  key: 'focus',
	  value: function focus() {
	    if (_domHelpersActiveElement2['default']() !== _utilCompat2['default'].findDOMNode(this.valueInputRef)) this.valueInputRef.focus();
	  }
	}, {
	  key: '_selectDate',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _selectDate(date) {
	    var format = getFormat(this.props),
	        dateTime = _utilDates2['default'].merge(date, this.props.value),
	        dateStr = formatDate(date, format, this.props.culture);

	    this.close();
	    _utilWidgetHelpers.notify(this.props.onSelect, [dateTime, dateStr]);
	    this._change(dateTime, dateStr, true);
	    this.focus();
	  }
	}, {
	  key: '_selectTime',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _selectTime(datum) {
	    var format = getFormat(this.props),
	        dateTime = _utilDates2['default'].merge(this.props.value, datum.date),
	        dateStr = formatDate(datum.date, format, this.props.culture);

	    this.close();
	    _utilWidgetHelpers.notify(this.props.onSelect, [dateTime, dateStr]);
	    this._change(dateTime, dateStr, true);
	    this.focus();
	  }
	}, {
	  key: '_click',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _click(view, e) {
	    this.focus();
	    this.toggle(view, e);
	  }
	}, {
	  key: '_parse',
	  value: function _parse(string) {
	    var format = getFormat(this.props, true),
	        editFormat = this.props.editFormat,
	        parse = this.props.parse,
	        formats = [];

	    if (typeof parse === 'function') return parse(string, this.props.culture);

	    if (typeof format === 'string') formats.push(format);

	    if (typeof editFormat === 'string') formats.push(editFormat);

	    if (parse) formats = formats.concat(this.props.parse);

	    _invariant2['default'](formats.length, 'React Widgets: there are no specified `parse` formats provided and the `format` prop is a function. ' + 'the DateTimePicker is unable to parse `%s` into a dateTime, ' + 'please provide either a parse function or Globalize.js compatible string for `format`', string);

	    return formatsParser(formats, this.props.culture, string);
	  }
	}, {
	  key: 'toggle',
	  value: function toggle(view) {
	    this.props.open ? this.props.open !== view ? this.open(view) : this.close(view) : this.open(view);
	  }
	}, {
	  key: 'open',
	  value: function open(view) {
	    if (this.props.open !== view && this.props[view] === true) _utilWidgetHelpers.notify(this.props.onToggle, view);
	  }
	}, {
	  key: 'close',
	  value: function close() {
	    if (this.props.open) _utilWidgetHelpers.notify(this.props.onToggle, false);
	  }
	}, {
	  key: 'inRangeValue',
	  value: function inRangeValue(value) {
	    if (value == null) return value;

	    return _utilDates2['default'].max(_utilDates2['default'].min(value, this.props.max), this.props.min);
	  }
	}]));

	exports['default'] = _uncontrollable2['default'](DateTimePicker, { open: 'onToggle', value: 'onChange' });

	function getFormat(props) {
	  var cal = props[popups.CALENDAR] != null ? props.calendar : true,
	      time = props[popups.TIME] != null ? props.time : true;

	  return props.format ? props.format : cal && time || !cal && !time ? _utilLocalizers.date.getFormat('default') : _utilLocalizers.date.getFormat(cal ? 'date' : 'time');
	}

	function formatDate(date, format, culture) {
	  var val = '';

	  if (date instanceof Date && !isNaN(date.getTime())) val = _utilLocalizers.date.format(date, format, culture);

	  return val;
	}

	function formatsParser(formats, culture, str) {
	  var date;

	  for (var i = 0; i < formats.length; i++) {
	    date = _utilLocalizers.date.parse(str, formats[i], culture);
	    if (date) return date;
	  }
	  return null;
	}

	function dateOrNull(dt) {
	  if (dt && !isNaN(dt.getTime())) return dt;
	  return null;
	}
	module.exports = exports['default'];

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _propTypes = __webpack_require__(22);

	var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(36);

	var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

	var _utilDates = __webpack_require__(87);

	var _utilDates2 = babelHelpers.interopRequireDefault(_utilDates);

	var _List = __webpack_require__(51);

	var _List2 = babelHelpers.interopRequireDefault(_List);

	var _utilLocalizers = __webpack_require__(18);

	var _utilPropTypes = __webpack_require__(49);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var format = function format(props) {
	  return _utilLocalizers.date.getFormat('time', props.format);
	};

	exports['default'] = _createReactClass2['default']({

	  displayName: 'TimeList',

	  propTypes: {
	    value: _propTypes2['default'].instanceOf(Date),
	    min: _propTypes2['default'].instanceOf(Date),
	    max: _propTypes2['default'].instanceOf(Date),
	    step: _propTypes2['default'].number,
	    itemComponent: _utilPropTypes2['default'].elementType,
	    format: _utilPropTypes2['default'].dateFormat,
	    onSelect: _propTypes2['default'].func,
	    preserveDate: _propTypes2['default'].bool,
	    culture: _propTypes2['default'].string
	  },

	  mixins: [__webpack_require__(68)],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      step: 30,
	      onSelect: function onSelect() {},
	      min: new Date(1900, 0, 1),
	      max: new Date(2099, 11, 31),
	      preserveDate: true,
	      delay: 300
	    };
	  },

	  getInitialState: function getInitialState() {
	    var data = this._dates(this.props),
	        focusedItem = this._closestDate(data, this.props.value);

	    return {
	      focusedItem: focusedItem || data[0],
	      dates: data
	    };
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    var data = this._dates(nextProps),
	        focusedItem = this._closestDate(data, nextProps.value),
	        valChanged = !_utilDates2['default'].eq(nextProps.value, this.props.value, 'minutes'),
	        minChanged = !_utilDates2['default'].eq(nextProps.min, this.props.min, 'minutes'),
	        maxChanged = !_utilDates2['default'].eq(nextProps.max, this.props.max, 'minutes'),
	        localeChanged = this.props.format !== nextProps.format || this.props.culture !== nextProps.culture;

	    if (valChanged || minChanged || maxChanged || localeChanged) {
	      this.setState({
	        focusedItem: focusedItem || data[0],
	        dates: data
	      });
	    }
	  },

	  render: function render() {
	    var _this = this;

	    var _props = this.props;
	    var min = _props.min;
	    var max = _props.max;
	    var value = _props.value;
	    var step = _props.step;
	    var props = babelHelpers.objectWithoutProperties(_props, ['min', 'max', 'value', 'step']);

	    var times = this.state.dates,
	        date = this._closestDate(times, value);

	    return _react2['default'].createElement(_List2['default'], babelHelpers._extends({}, props, {
	      ref: function (ref) {
	        return _this.listRef = ref;
	      },
	      data: times,
	      textField: 'label',
	      valueField: 'date',
	      selected: date,
	      focused: this.state.focusedItem
	    }));
	  },

	  _closestDate: function _closestDate(times, date) {
	    var roundTo = 1000 * 60 * this.props.step,
	        inst = null,
	        label;

	    if (!date) return null;

	    date = new Date(Math.floor(date.getTime() / roundTo) * roundTo);
	    label = _utilLocalizers.date.format(date, format(this.props), this.props.culture);

	    times.some(function (time) {
	      if (time.label === label) return inst = time;
	    });

	    return inst;
	  },

	  _data: function _data() {
	    return this.state.dates;
	  },

	  _dates: function _dates(props) {
	    var times = [],
	        i = 0,
	        values = this._dateValues(props),
	        start = values.min,
	        startDay = _utilDates2['default'].date(start);

	    while (_utilDates2['default'].date(start) === startDay && _utilDates2['default'].lte(start, values.max)) {
	      i++;
	      times.push({ date: start, label: _utilLocalizers.date.format(start, format(props), props.culture) });
	      start = _utilDates2['default'].add(start, props.step || 30, 'minutes');
	    }
	    return times;
	  },

	  _dateValues: function _dateValues(props) {
	    var value = props.value || _utilDates2['default'].today(),
	        useDate = props.preserveDate,
	        min = props.min,
	        max = props.max,
	        start,
	        end;

	    //compare just the time regradless of whether they fall on the same day
	    if (!useDate) {
	      start = _utilDates2['default'].startOf(_utilDates2['default'].merge(new Date(), min), 'minutes');
	      end = _utilDates2['default'].startOf(_utilDates2['default'].merge(new Date(), max), 'minutes');

	      if (_utilDates2['default'].lte(end, start) && _utilDates2['default'].gt(max, min, 'day')) end = _utilDates2['default'].tomorrow();

	      return {
	        min: start,
	        max: end
	      };
	    }

	    start = _utilDates2['default'].today();
	    end = _utilDates2['default'].tomorrow();
	    //date parts are equal
	    return {
	      min: _utilDates2['default'].eq(value, min, 'day') ? _utilDates2['default'].merge(start, min) : start,
	      max: _utilDates2['default'].eq(value, max, 'day') ? _utilDates2['default'].merge(start, max) : end
	    };
	  },

	  _keyDown: function _keyDown(e) {
	    var _this2 = this;

	    var key = e.key,
	        character = String.fromCharCode(e.keyCode),
	        focusedItem = this.state.focusedItem,
	        list = this.listRef;

	    if (key === 'End') this.setState({ focusedItem: list.last() });else if (key === 'Home') this.setState({ focusedItem: list.first() });else if (key === 'Enter') this.props.onSelect(focusedItem);else if (key === 'ArrowDown') {
	      e.preventDefault();
	      this.setState({ focusedItem: list.next(focusedItem) });
	    } else if (key === 'ArrowUp') {
	      e.preventDefault();
	      this.setState({ focusedItem: list.prev(focusedItem) });
	    } else {
	      e.preventDefault();

	      this.search(character, function (item) {
	        _this2.setState({ focusedItem: item });
	      });
	    }
	  },

	  scrollTo: function scrollTo() {
	    this.listRef.move && this.listRef.move();
	  },

	  search: function search(character, cb) {
	    var _this3 = this;

	    var word = ((this._searchTerm || '') + character).toLowerCase();

	    this._searchTerm = word;

	    this.setTimeout('search', function () {
	      var list = _this3.listRef,
	          item = list.next(_this3.state.focusedItem, word);

	      _this3._searchTerm = '';
	      if (item) cb(item);
	    }, this.props.delay);
	  }

	});
	module.exports = exports['default'];

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _propTypes = __webpack_require__(22);

	var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(35);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _createReactClass = __webpack_require__(36);

	var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

	var _utilCompat = __webpack_require__(47);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var _utilLocalizers = __webpack_require__(18);

	var _utilPropTypes = __webpack_require__(49);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	exports['default'] = _createReactClass2['default']({

	  displayName: 'DatePickerInput',

	  propTypes: {
	    format: _utilPropTypes2['default'].dateFormat.isRequired,
	    editFormat: _utilPropTypes2['default'].dateFormat,
	    parse: _propTypes2['default'].func.isRequired,

	    value: _propTypes2['default'].instanceOf(Date),
	    onChange: _propTypes2['default'].func.isRequired,
	    culture: _propTypes2['default'].string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      textValue: ''
	    };
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    var text = formatDate(nextProps.value, nextProps.editing && nextProps.editFormat ? nextProps.editFormat : nextProps.format, nextProps.culture);

	    this.startValue = text;

	    this.setState({
	      textValue: text
	    });
	  },

	  getInitialState: function getInitialState() {
	    var text = formatDate(this.props.value, this.props.editing && this.props.editFormat ? this.props.editFormat : this.props.format, this.props.culture);

	    this.startValue = text;

	    return {
	      textValue: text
	    };
	  },

	  render: function render() {
	    var value = this.state.textValue;

	    return _react2['default'].createElement('input', babelHelpers._extends({}, this.props, {
	      type: 'text',
	      className: _classnames2['default']({ 'rw-input': true }),
	      value: value,
	      'aria-disabled': this.props.disabled,
	      'aria-readonly': this.props.readOnly,
	      disabled: this.props.disabled,
	      readOnly: this.props.readOnly,
	      onChange: this._change,
	      onBlur: chain(this.props.blur, this._blur, this) }));
	  },

	  _change: function _change(e) {
	    this.setState({ textValue: e.target.value });
	    this._needsFlush = true;
	  },

	  _blur: function _blur(e) {
	    var val = e.target.value,
	        date;

	    if (this._needsFlush) {
	      this._needsFlush = false;
	      date = this.props.parse(val);

	      this.props.onChange(date, formatDate(date, this.props.format, this.props.culture));
	    }
	  },

	  focus: function focus() {
	    _utilCompat2['default'].findDOMNode(this).focus();
	  }

	});

	function isValid(d) {
	  return !isNaN(d.getTime());
	}

	function formatDate(date, format, culture) {
	  var val = '';

	  if (date instanceof Date && isValid(date)) val = _utilLocalizers.date.format(date, format, culture);

	  return val;
	}

	function chain(a, b, thisArg) {
	  return function () {
	    a && a.apply(thisArg, arguments);
	    b && b.apply(thisArg, arguments);
	  };
	}
	module.exports = exports['default'];

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _propTypes = __webpack_require__(22);

	var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(35);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _createReactClass = __webpack_require__(36);

	var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _utilCompat = __webpack_require__(47);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var _utilPropTypes = __webpack_require__(49);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _uncontrollable = __webpack_require__(60);

	var _uncontrollable2 = babelHelpers.interopRequireDefault(_uncontrollable);

	var _utilConstants = __webpack_require__(42);

	var _utilConstants2 = babelHelpers.interopRequireDefault(_utilConstants);

	var _utilRepeater = __webpack_require__(99);

	var _utilRepeater2 = babelHelpers.interopRequireDefault(_utilRepeater);

	var _utilLocalizers = __webpack_require__(18);

	var _NumberInput = __webpack_require__(100);

	var _NumberInput2 = babelHelpers.interopRequireDefault(_NumberInput);

	var _WidgetButton = __webpack_require__(79);

	var _WidgetButton2 = babelHelpers.interopRequireDefault(_WidgetButton);

	var _utilInteraction = __webpack_require__(67);

	var _utilWidgetHelpers = __webpack_require__(54);

	var directions = _utilConstants2['default'].directions;

	var format = function format(props) {
	  return _utilLocalizers.number.getFormat('default', props.format);
	};

	var propTypes = {

	  // -- controlled props -----------
	  value: _propTypes2['default'].number,
	  onChange: _propTypes2['default'].func,
	  //------------------------------------

	  min: _propTypes2['default'].number,
	  max: _propTypes2['default'].number,
	  step: _propTypes2['default'].number,

	  precision: _propTypes2['default'].number,

	  culture: _propTypes2['default'].string,

	  format: _utilPropTypes2['default'].numberFormat,

	  name: _propTypes2['default'].string,

	  parse: _propTypes2['default'].func,

	  autoFocus: _propTypes2['default'].bool,
	  disabled: _utilPropTypes2['default'].disabled,
	  readOnly: _utilPropTypes2['default'].readOnly,

	  messages: _propTypes2['default'].shape({
	    increment: _propTypes2['default'].string,
	    decrement: _propTypes2['default'].string
	  }),

	  placeholder: _propTypes2['default'].string
	};

	var NumberPicker = _createReactClass2['default'](babelHelpers.createDecoratedObject([{
	  key: 'displayName',
	  initializer: function initializer() {
	    return 'NumberPicker';
	  }
	}, {
	  key: 'mixins',
	  initializer: function initializer() {
	    return [__webpack_require__(68), __webpack_require__(69), __webpack_require__(76)];
	  }
	}, {
	  key: 'propTypes',
	  initializer: function initializer() {
	    return propTypes;
	  }
	}, {
	  key: 'getDefaultProps',
	  value: function getDefaultProps() {
	    return {
	      value: null,
	      open: false,

	      min: -Infinity,
	      max: Infinity,
	      step: 1,

	      messages: {
	        increment: 'increment value',
	        decrement: 'decrement value'
	      }
	    };
	  }
	}, {
	  key: 'getInitialState',
	  value: function getInitialState() {
	    return {
	      focused: false,
	      active: false
	    };
	  }
	}, {
	  key: 'render',
	  value: function render() {
	    var _this = this;

	    var _$omit = _util_2['default'].omit(this.props, Object.keys(propTypes));

	    var className = _$omit.className;
	    var onKeyPress = _$omit.onKeyPress;
	    var onKeyUp = _$omit.onKeyUp;
	    var autoFocus = _$omit.autoFocus;
	    var props = babelHelpers.objectWithoutProperties(_$omit, ['className', 'onKeyPress', 'onKeyUp', 'autoFocus']);
	    var val = this.constrainValue(this.props.value);

	    return _react2['default'].createElement(
	      'div',
	      babelHelpers._extends({}, props, {
	        ref: function (ref) {
	          return _this.elementRef = ref;
	        },
	        onKeyDown: this._keyDown,
	        onFocus: this._focus.bind(null, true),
	        onBlur: this._focus.bind(null, false),
	        tabIndex: '-1',
	        className: _classnames2['default'](className, 'rw-numberpicker', 'rw-widget', {
	          'rw-state-focus': this.state.focused,
	          'rw-state-disabled': this.props.disabled,
	          'rw-state-readonly': this.props.readOnly,
	          'rw-rtl': this.isRtl()
	        }) }),
	      _react2['default'].createElement(
	        'span',
	        { className: 'rw-select' },
	        _react2['default'].createElement(
	          _WidgetButton2['default'],
	          {
	            tabIndex: '-1',
	            className: _classnames2['default']({ 'rw-state-active': this.state.active === directions.UP }),
	            onMouseDown: this._mouseDown.bind(null, directions.UP),
	            onMouseUp: this._mouseUp.bind(null, directions.UP),
	            onMouseOut: this._mouseUp.bind(null, directions.UP),
	            onClick: this._focus.bind(null, true),
	            disabled: val === this.props.max || this.props.disabled,
	            'aria-disabled': val === this.props.max || this.props.disabled },
	          _react2['default'].createElement(
	            'i',
	            { className: 'rw-i rw-i-caret-up' },
	            _react2['default'].createElement(
	              'span',
	              { className: 'rw-sr' },
	              this.props.messages.increment
	            )
	          )
	        ),
	        _react2['default'].createElement(
	          _WidgetButton2['default'],
	          {
	            tabIndex: '-1',
	            className: _classnames2['default']({ 'rw-state-active': this.state.active === directions.DOWN }),
	            onMouseDown: this._mouseDown.bind(null, directions.DOWN),
	            onMouseUp: this._mouseUp.bind(null, directions.DOWN),
	            onMouseOut: this._mouseUp.bind(null, directions.DOWN),
	            onClick: this._focus.bind(null, true),
	            disabled: val === this.props.min || this.props.disabled,
	            'aria-disabled': val === this.props.min || this.props.disabled },
	          _react2['default'].createElement(
	            'i',
	            { className: 'rw-i rw-i-caret-down' },
	            _react2['default'].createElement(
	              'span',
	              { className: 'rw-sr' },
	              this.props.messages.decrement
	            )
	          )
	        )
	      ),
	      _react2['default'].createElement(_NumberInput2['default'], {
	        ref: function (ref) {
	          return _this.inputRef = ref;
	        },
	        tabIndex: props.tabIndex,
	        placeholder: this.props.placeholder,
	        value: val,
	        autoFocus: autoFocus,
	        editing: this.state.focused,
	        format: this.props.format,
	        parse: this.props.parse,
	        name: this.props.name,
	        role: 'spinbutton',
	        min: this.props.min,
	        'aria-valuenow': val,
	        'aria-valuemin': isFinite(this.props.min) ? this.props.min : null,
	        'aria-valuemax': isFinite(this.props.max) ? this.props.max : null,
	        'aria-disabled': this.props.disabled,
	        'aria-readonly': this.props.readonly,
	        disabled: this.props.disabled,
	        readOnly: this.props.readOnly,
	        onChange: this.change,
	        onKeyPress: onKeyPress,
	        onKeyUp: onKeyUp })
	    );
	  }
	}, {
	  key: '_mouseDown',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _mouseDown(dir) {
	    var method = dir === directions.UP ? this.increment : this.decrement;

	    this.setState({ active: dir });

	    var val = method.call(this);

	    if (!(dir === directions.UP && val === this.props.max || dir === directions.DOWN && val === this.props.min)) {
	      if (!this._cancelRepeater) this._cancelRepeater = _utilRepeater2['default'](this._mouseDown.bind(null, dir));
	    } else this._mouseUp();
	  }
	}, {
	  key: '_mouseUp',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _mouseUp() {
	    this.setState({ active: false });
	    this._cancelRepeater && this._cancelRepeater();
	    this._cancelRepeater = null;
	  }
	}, {
	  key: '_focus',
	  decorators: [_utilInteraction.widgetEnabled],
	  value: function _focus(focused, e) {
	    var _this2 = this;

	    focused && _utilCompat2['default'].findDOMNode(this.inputRef).focus();

	    this.setTimeout('focus', function () {
	      if (focused !== _this2.state.focused) {
	        _utilWidgetHelpers.notify(_this2.props[focused ? 'onFocus' : 'onBlur'], e);
	        _this2.setState({ focused: focused });
	      }
	    }, 0);
	  }
	}, {
	  key: '_keyDown',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _keyDown(e) {
	    var key = e.key;

	    console.log('hiii');
	    _utilWidgetHelpers.notify(this.props.onKeyDown, [e]);

	    if (e.defaultPrevented) return;

	    if (key === 'End' && isFinite(this.props.max)) this.change(this.props.max);else if (key === 'Home' && isFinite(this.props.min)) this.change(this.props.min);else if (key === 'ArrowDown') {
	      e.preventDefault();
	      this.decrement();
	    } else if (key === 'ArrowUp') {
	      e.preventDefault();
	      this.increment();
	    }
	  }
	}, {
	  key: 'increment',
	  value: function increment() {
	    return this.step(this.props.step);
	  }
	}, {
	  key: 'decrement',
	  value: function decrement() {
	    return this.step(-this.props.step);
	  }
	}, {
	  key: 'step',
	  value: function step(amount) {
	    var value = (this.props.value || 0) + amount;

	    var decimals = this.props.precision != null ? this.props.precision : _utilLocalizers.number.precision(format(this.props));

	    this.change(decimals != null ? round(value, decimals) : value);

	    return value;
	  }
	}, {
	  key: 'change',
	  value: function change(val) {
	    val = this.constrainValue(val);

	    if (this.props.value !== val) _utilWidgetHelpers.notify(this.props.onChange, val);
	  }
	}, {
	  key: 'constrainValue',
	  value: function constrainValue(value) {
	    var max = this.props.max == null ? Infinity : this.props.max,
	        min = this.props.min == null ? -Infinity : this.props.min;

	    if (value == null || value === '') return null;

	    return Math.max(Math.min(value, max), min);
	  }
	}]));

	exports['default'] = _uncontrollable2['default'](NumberPicker, { value: 'onChange' });

	// thank you kendo ui core
	// https://github.com/telerik/kendo-ui-core/blob/master/src/kendo.core.js#L1036
	function round(value, precision) {
	  precision = precision || 0;

	  value = ('' + value).split('e');
	  value = Math.round(+(value[0] + 'e' + (value[1] ? +value[1] + precision : precision)));

	  value = ('' + value).split('e');
	  value = +(value[0] + 'e' + (value[1] ? +value[1] - precision : -precision));

	  return value.toFixed(precision);
	}
	module.exports = exports['default'];

	//allow for styling, focus stealing keeping me from the normal what have you

/***/ }),
/* 99 */
/***/ (function(module, exports) {

	// my tests in ie11/chrome/FF indicate that keyDown repeats
	// at about 35ms+/- 5ms after an initial 500ms delay. callback fires on the leading edge
	"use strict";

	exports.__esModule = true;
	exports["default"] = Repeater;

	function Repeater(callback) {
	  var id,
	      cancel = function cancel() {
	    return clearInterval(id);
	  };

	  id = setInterval(function () {
	    cancel();
	    id = setInterval(callback, 35);
	    callback(); //fire after everything in case the user cancels on the first call
	  }, 500);

	  return cancel;
	}

	module.exports = exports["default"];

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _propTypes = __webpack_require__(22);

	var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(36);

	var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

	var _utilPropTypes = __webpack_require__(49);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _utilLocalizers = __webpack_require__(18);

	var format = function format(props) {
	  return _utilLocalizers.number.getFormat('default', props.format);
	};

	exports['default'] = _createReactClass2['default']({

	  displayName: 'NumberPickerInput',

	  propTypes: {
	    value: _propTypes2['default'].number,
	    placeholder: _propTypes2['default'].string,

	    format: _utilPropTypes2['default'].numberFormat,
	    parse: _propTypes2['default'].func.isRequired,
	    culture: _propTypes2['default'].string,

	    min: _propTypes2['default'].number,

	    onChange: _propTypes2['default'].func.isRequired,
	    onKeyDown: _propTypes2['default'].func
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      value: null,
	      editing: false,
	      parse: function parse(number, culture) {
	        return _utilLocalizers.number.parse(number, culture);
	      }
	    };
	  },

	  getDefaultState: function getDefaultState(props) {
	    var value = props.editing ? props.value : formatNumber(props.value, format(props), props.culture);

	    if (value == null || isNaN(props.value)) value = '';

	    return {
	      stringValue: '' + value
	    };
	  },

	  getInitialState: function getInitialState() {
	    return this.getDefaultState(this.props);
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    this.setState(this.getDefaultState(nextProps));
	  },

	  render: function render() {
	    var value = this.state.stringValue;

	    return _react2['default'].createElement('input', babelHelpers._extends({}, this.props, {
	      type: 'text',
	      className: 'rw-input',
	      onChange: this._change,
	      onBlur: this._finish,
	      'aria-disabled': this.props.disabled,
	      'aria-readonly': this.props.readOnly,
	      disabled: this.props.disabled,
	      readOnly: this.props.readOnly,
	      placeholder: this.props.placeholder,
	      value: value }));
	  },

	  _change: function _change(e) {
	    var val = e.target.value,
	        number = this.props.parse(e.target.value, this.props.culture),
	        valid = this.isValid(number);

	    if (val == null || val.trim() === '' || val.trim() === '-') return this.props.onChange(null);

	    if (valid && number !== this.props.value && !this.isAtDelimiter(number, val)) return this.props.onChange(number);

	    //console.log(val !== 0 && !val)
	    if (!isNaN(number) || this.isAtDelimiter(number, val)) this.current(e.target.value);
	  },

	  _finish: function _finish() {
	    var str = this.state.stringValue,
	        number = this.props.parse(str, this.props.culture);

	    // if number is below the min
	    // we need to flush low values and decimal stops, onBlur means i'm done inputing
	    if (!isNaN(number) && (number < this.props.min || this.isAtDelimiter(number, str))) {
	      this.props.onChange(number);
	    }
	  },

	  isAtDelimiter: function isAtDelimiter(num, str) {
	    var next;

	    if (str.length <= 1) return false;

	    next = this.props.parse(str.substr(0, str.length - 1), this.props.culture);

	    return typeof next === 'number' && !isNaN(next) && next === num;
	  },

	  isValid: function isValid(num) {
	    if (typeof num !== 'number' || isNaN(num)) return false;
	    return num >= this.props.min;
	  },

	  //this intermediate state is for when one runs into the decimal or are typing the number
	  current: function current(val) {
	    this.setState({ stringValue: val });
	  }

	});

	// function parseLocaleFloat(number, parser, culture) {
	//   if ( typeof format === 'function')
	//     return format(number, culture)

	//   return config.globalize.parseFloat(number, 10, culture)
	// }

	function formatNumber(number, format, culture) {
	  return _utilLocalizers.number.format(number, format, culture);
	}
	module.exports = exports['default'];

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _propTypes = __webpack_require__(22);

	var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(35);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _createReactClass = __webpack_require__(36);

	var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _Popup = __webpack_require__(43);

	var _Popup2 = babelHelpers.interopRequireDefault(_Popup);

	var _MultiselectInput = __webpack_require__(102);

	var _MultiselectInput2 = babelHelpers.interopRequireDefault(_MultiselectInput);

	var _MultiselectTagList = __webpack_require__(103);

	var _MultiselectTagList2 = babelHelpers.interopRequireDefault(_MultiselectTagList);

	var _utilPropTypes = __webpack_require__(49);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _List = __webpack_require__(51);

	var _List2 = babelHelpers.interopRequireDefault(_List);

	var _ListGroupable = __webpack_require__(57);

	var _ListGroupable2 = babelHelpers.interopRequireDefault(_ListGroupable);

	var _utilValidateListInterface = __webpack_require__(59);

	var _utilValidateListInterface2 = babelHelpers.interopRequireDefault(_utilValidateListInterface);

	var _uncontrollable = __webpack_require__(60);

	var _uncontrollable2 = babelHelpers.interopRequireDefault(_uncontrollable);

	var _utilDataHelpers = __webpack_require__(53);

	var _utilInteraction = __webpack_require__(67);

	var _utilWidgetHelpers = __webpack_require__(54);

	var compatCreate = function compatCreate(props, msgs) {
	  return typeof msgs.createNew === 'function' ? msgs.createNew(props) : [_react2['default'].createElement(
	    'strong',
	    null,
	    '"' + props.searchTerm + '"'
	  ), ' ' + msgs.createNew];
	};

	var omit = _util_2['default'].omit;
	var pick = _util_2['default'].pick;
	var splat = _util_2['default'].splat;

	var propTypes = {
	  data: _propTypes2['default'].array,
	  //-- controlled props --
	  value: _propTypes2['default'].array,
	  onChange: _propTypes2['default'].func,

	  searchTerm: _propTypes2['default'].string,
	  onSearch: _propTypes2['default'].func,

	  open: _propTypes2['default'].bool,
	  onToggle: _propTypes2['default'].func,
	  //-------------------------------------------

	  valueField: _propTypes2['default'].string,
	  textField: _utilPropTypes2['default'].accessor,

	  tagComponent: _utilPropTypes2['default'].elementType,
	  itemComponent: _utilPropTypes2['default'].elementType,
	  listComponent: _utilPropTypes2['default'].elementType,

	  groupComponent: _utilPropTypes2['default'].elementType,
	  groupBy: _utilPropTypes2['default'].accessor,

	  createComponent: _utilPropTypes2['default'].elementType,

	  onSelect: _propTypes2['default'].func,
	  onCreate: _propTypes2['default'].oneOfType([_propTypes2['default'].oneOf([false]), _propTypes2['default'].func]),

	  dropUp: _propTypes2['default'].bool,
	  duration: _propTypes2['default'].number, //popup

	  placeholder: _propTypes2['default'].string,

	  autoFocus: _propTypes2['default'].bool,
	  disabled: _utilPropTypes2['default'].disabled.acceptsArray,
	  readOnly: _utilPropTypes2['default'].readOnly.acceptsArray,

	  messages: _propTypes2['default'].shape({
	    open: _utilPropTypes2['default'].message,
	    emptyList: _utilPropTypes2['default'].message,
	    emptyFilter: _utilPropTypes2['default'].message,
	    createNew: _utilPropTypes2['default'].message
	  })
	};

	var Multiselect = _createReactClass2['default'](babelHelpers.createDecoratedObject([{
	  key: 'displayName',
	  initializer: function initializer() {
	    return 'Multiselect';
	  }
	}, {
	  key: 'mixins',
	  initializer: function initializer() {
	    return [__webpack_require__(68), __webpack_require__(70), __webpack_require__(71), __webpack_require__(76), __webpack_require__(56)('input', function (key, id) {
	      var myKey = this.props.ariaActiveDescendantKey;

	      var createIsActive = (!this._data().length || this.state.focusedItem === null) && key === myKey;

	      var tagIsActive = this.state.focusedTag != null && key === 'taglist';
	      var listIsActive = this.state.focusedTag == null && key === 'list';

	      if (createIsActive || tagIsActive || listIsActive) return id;
	    })];
	  }
	}, {
	  key: 'propTypes',
	  initializer: function initializer() {
	    return propTypes;
	  }
	}, {
	  key: 'getDefaultProps',
	  value: function getDefaultProps() {
	    return {
	      data: [],
	      filter: 'startsWith',
	      value: [],
	      open: false,
	      searchTerm: '',
	      ariaActiveDescendantKey: 'multiselect',
	      messages: {
	        createNew: '(create new tag)',
	        emptyList: 'There are no items in this list',
	        emptyFilter: 'The filter returned no results',
	        tagsLabel: 'selected items',
	        selectedItems: 'selected items',
	        noneSelected: 'no selected items',
	        removeLabel: 'remove selected item'
	      }
	    };
	  }
	}, {
	  key: 'getInitialState',
	  value: function getInitialState() {
	    var _props = this.props;
	    var data = _props.data;
	    var value = _props.value;
	    var valueField = _props.valueField;
	    var searchTerm = _props.searchTerm;
	    var dataItems = splat(value).map(function (item) {
	      return _utilDataHelpers.dataItem(data, item, valueField);
	    });
	    var processedData = this.process(data, dataItems, searchTerm);

	    return {
	      focusedTag: null,
	      focusedItem: processedData[0],
	      processedData: processedData,
	      dataItems: dataItems
	    };
	  }
	}, {
	  key: 'componentDidUpdate',
	  value: function componentDidUpdate() {
	    this.ariaActiveDescendant(_utilWidgetHelpers.instanceId(this, '__createlist_option'));

	    this.listRef && _utilValidateListInterface2['default'](this.listRef);
	  }
	}, {
	  key: 'componentWillReceiveProps',
	  value: function componentWillReceiveProps(nextProps) {
	    var data = nextProps.data;
	    var value = nextProps.value;
	    var valueField = nextProps.valueField;
	    var searchTerm = nextProps.searchTerm;
	    var values = _util_2['default'].splat(value);
	    var current = this.state.focusedItem;
	    var items = this.process(data, values, searchTerm);

	    this.setState({
	      processedData: items,
	      focusedItem: items.indexOf(current) === -1 ? items[0] : current,
	      dataItems: values.map(function (item) {
	        return _utilDataHelpers.dataItem(data, item, valueField);
	      })
	    });
	  }
	}, {
	  key: 'render',
	  value: function render() {
	    var _cx,
	        _this = this;

	    var _props2 = this.props;
	    var searchTerm = _props2.searchTerm;
	    var maxLength = _props2.maxLength;
	    var className = _props2.className;
	    var tabIndex = _props2.tabIndex;
	    var textField = _props2.textField;
	    var groupBy = _props2.groupBy;
	    var messages = _props2.messages;
	    var busy = _props2.busy;
	    var dropUp = _props2.dropUp;
	    var open = _props2.open;
	    var disabled = _props2.disabled;
	    var readOnly = _props2.readOnly;
	    var TagComponent = _props2.tagComponent;
	    var List = _props2.listComponent;

	    List = List || groupBy && _ListGroupable2['default'] || _List2['default'];

	    messages = msgs(messages);

	    var elementProps = omit(this.props, Object.keys(propTypes));
	    var tagsProps = pick(this.props, ['valueField', 'textField']);
	    var inputProps = pick(this.props, ['maxLength', 'searchTerm', 'autoFocus']);
	    var listProps = pick(this.props, Object.keys(List.propTypes));
	    var popupProps = pick(this.props, Object.keys(_Popup2['default'].propTypes));

	    var _state = this.state;
	    var focusedTag = _state.focusedTag;
	    var focusedItem = _state.focusedItem;
	    var focused = _state.focused;
	    var dataItems = _state.dataItems;

	    var items = this._data(),
	        tagsID = _utilWidgetHelpers.instanceId(this, '_taglist'),
	        listID = _utilWidgetHelpers.instanceId(this, '__listbox'),
	        createID = _utilWidgetHelpers.instanceId(this, '__createlist'),
	        createOptionID = _utilWidgetHelpers.instanceId(this, '__createlist_option');

	    var shouldRenderTags = !!dataItems.length,
	        shouldRenderPopup = _utilWidgetHelpers.isFirstFocusedRender(this) || open,
	        shouldShowCreate = this._shouldShowCreate(),
	        createIsFocused = !items.length || focusedItem === null;

	    if (focused) {
	      var notify = dataItems.length ? messages.selectedItems + ': ' + dataItems.map(function (item) {
	        return _utilDataHelpers.dataText(item, textField);
	      }).join(', ') : messages.noneSelected;
	    }

	    var classIconParent = _classnames2['default']({ "hidden": !busy });

	    return _react2['default'].createElement(
	      'div',
	      babelHelpers._extends({}, elementProps, {
	        ref: function (ref) {
	          return _this.elementRef = ref;
	        },
	        id: _utilWidgetHelpers.instanceId(this),
	        onKeyDown: this._keyDown,
	        onFocus: this._focus.bind(null, true),
	        onBlur: this._focus.bind(null, false),
	        onTouchEnd: this._focus.bind(null, true),
	        tabIndex: '-1',
	        className: _classnames2['default'](className, 'rw-widget', 'rw-multiselect', (_cx = {
	          'rw-state-focus': focused,
	          'rw-state-disabled': disabled === true,
	          'rw-state-readonly': readOnly === true,
	          'rw-rtl': this.isRtl()
	        }, _cx['rw-open' + (dropUp ? '-up' : '')] = open, _cx)) }),
	      _react2['default'].createElement(
	        'span',
	        {
	          ref: function (ref) {
	            return _this.statusRef = ref;
	          },
	          id: _utilWidgetHelpers.instanceId(this, '__notify'),
	          role: 'status',
	          className: 'rw-sr',
	          'aria-live': 'assertive',
	          'aria-atomic': 'true',
	          'aria-relevant': 'additions removals text'
	        },
	        notify
	      ),
	      _react2['default'].createElement(
	        'div',
	        { className: 'rw-multiselect-wrapper', ref: function (ref) {
	            return _this.wrapperRef = ref;
	          } },
	        _react2['default'].createElement(
	          'span',
	          { className: classIconParent },
	          _react2['default'].createElement('i', { className: 'rw-i rw-loading' })
	        ),
	        _react2['default'].createElement(
	          'div',
	          { className: _classnames2['default']({ hidden: !shouldRenderTags }) },
	          _react2['default'].createElement(_MultiselectTagList2['default'], babelHelpers._extends({}, tagsProps, {
	            ref: function (ref) {
	              return _this.tagListRef = ref;
	            },
	            id: tagsID,
	            busy: !!busy,
	            'aria-label': messages.tagsLabel,
	            value: dataItems,
	            focused: focusedTag,
	            disabled: disabled,
	            readOnly: readOnly,
	            onDelete: this._delete,
	            valueComponent: TagComponent,
	            ariaActiveDescendantKey: 'taglist'
	          }))
	        ),
	        _react2['default'].createElement(_MultiselectInput2['default'], babelHelpers._extends({}, inputProps, {
	          ref: function (ref) {
	            return _this.inputRef = ref;
	          },
	          tabIndex: tabIndex || 0,
	          role: 'listbox',
	          'aria-expanded': open,
	          'aria-busy': !!busy,
	          autoFocus: this.props.autoFocus,
	          'aria-owns': listID + ' ' + _utilWidgetHelpers.instanceId(this, '__notify') + (shouldRenderTags ? ' ' + tagsID : '') + (shouldShowCreate ? ' ' + createID : ''),
	          'aria-haspopup': true,
	          value: searchTerm,
	          maxLength: maxLength,
	          disabled: disabled === true,
	          readOnly: readOnly === true,
	          placeholder: this._placeholder(),
	          onKeyDown: this._searchKeyDown,
	          onKeyUp: this._searchgKeyUp,
	          onChange: this._typing,
	          onFocus: this._inputFocus,
	          onClick: this._inputFocus,
	          onTouchEnd: this._inputFocus
	        }))
	      ),
	      _react2['default'].createElement(
	        _Popup2['default'],
	        babelHelpers._extends({}, popupProps, {
	          onOpening: function () {
	            return _this.listRef.forceUpdate();
	          },
	          onRequestClose: this.close
	        }),
	        _react2['default'].createElement(
	          'div',
	          null,
	          shouldRenderPopup && [_react2['default'].createElement(List, babelHelpers._extends({ ref: function (ref) {
	              return _this.listRef = ref;
	            },
	            key: 0
	          }, listProps, {
	            readOnly: !!readOnly,
	            disabled: !!disabled,
	            id: listID,
	            'aria-live': 'polite',
	            'aria-labelledby': _utilWidgetHelpers.instanceId(this),
	            'aria-hidden': !open,
	            ariaActiveDescendantKey: 'list',
	            data: items,
	            focused: focusedItem,
	            onSelect: this._onSelect,
	            onMove: this._scrollTo,
	            messages: {
	              emptyList: this._lengthWithoutValues ? messages.emptyFilter : messages.emptyList
	            }
	          })), shouldShowCreate && _react2['default'].createElement(
	            'ul',
	            { key: 1, role: 'listbox', id: createID, className: 'rw-list rw-multiselect-create-tag' },
	            _react2['default'].createElement(
	              'li',
	              { onClick: this._onCreate.bind(null, searchTerm),
	                role: 'option',
	                id: createOptionID,
	                className: _classnames2['default']({
	                  'rw-list-option': true,
	                  'rw-state-focus': createIsFocused
	                }) },
	              compatCreate(this.props, messages)
	            )
	          )]
	        )
	      )
	    );
	  }
	}, {
	  key: '_data',
	  value: function _data() {
	    return this.state.processedData;
	  }
	}, {
	  key: '_delete',
	  value: function _delete(value) {
	    this._focus(true);
	    this.change(this.state.dataItems.filter(function (d) {
	      return d !== value;
	    }));
	  }
	}, {
	  key: '_inputFocus',
	  value: function _inputFocus() {
	    this._focus(true);
	    !this.props.open && this.open();
	  }
	}, {
	  key: '_focus',
	  decorators: [_utilInteraction.widgetEnabled],
	  value: function _focus(focused, e) {
	    var _this2 = this;

	    if (this.props.disabled === true) return;

	    if (focused) this.inputRef.focus();

	    this.setTimeout('focus', function () {
	      if (!focused) _this2.tagListRef && _this2.setState({ focusedTag: null });

	      if (focused !== _this2.state.focused) {
	        focused ? _this2.open() : _this2.close();

	        _utilWidgetHelpers.notify(_this2.props[focused ? 'onFocus' : 'onBlur'], e);
	        _this2.setState({ focused: focused });
	      }
	    });
	  }
	}, {
	  key: '_searchKeyDown',
	  value: function _searchKeyDown(e) {
	    if (e.key === 'Backspace' && e.target.value && !this._deletingText) this._deletingText = true;
	  }
	}, {
	  key: '_searchgKeyUp',
	  value: function _searchgKeyUp(e) {
	    if (e.key === 'Backspace' && this._deletingText) this._deletingText = false;
	  }
	}, {
	  key: '_typing',
	  value: function _typing(e) {
	    _utilWidgetHelpers.notify(this.props.onSearch, [e.target.value]);
	    this.open();
	  }
	}, {
	  key: '_onSelect',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _onSelect(data) {

	    if (data === undefined) {
	      if (this.props.onCreate) this._onCreate(this.props.searchTerm);

	      return;
	    }

	    _utilWidgetHelpers.notify(this.props.onSelect, data);
	    this.change(this.state.dataItems.concat(data));

	    this.close();
	    this._focus(true);
	  }
	}, {
	  key: '_onCreate',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _onCreate(tag) {
	    if (tag.trim() === '') return;

	    _utilWidgetHelpers.notify(this.props.onCreate, tag);
	    this.props.searchTerm && _utilWidgetHelpers.notify(this.props.onSearch, ['']);

	    this.close();
	    this._focus(true);
	  }
	}, {
	  key: '_keyDown',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _keyDown(e) {
	    var key = e.key;
	    var altKey = e.altKey;
	    var ctrlKey = e.ctrlKey;
	    var noSearch = !this.props.searchTerm && !this._deletingText;
	    var isOpen = this.props.open;var _state2 = this.state;
	    var focusedTag = _state2.focusedTag;
	    var focusedItem = _state2.focusedItem;

	    var list = this.listRef;
	    var tagList = this.tagListRef;
	    var nullTag = { focusedTag: null };

	    _utilWidgetHelpers.notify(this.props.onKeyDown, [e]);

	    if (e.defaultPrevented) return;

	    if (key === 'ArrowDown') {
	      var next = list.next(focusedItem),
	          creating = this._shouldShowCreate() && focusedItem === next || focusedItem === null;

	      next = creating ? null : next;

	      e.preventDefault();
	      if (isOpen) this.setState(babelHelpers._extends({ focusedItem: next }, nullTag));else this.open();
	    } else if (key === 'ArrowUp') {
	      var prev = focusedItem === null ? list.last() : list.prev(focusedItem);

	      e.preventDefault();

	      if (altKey) this.close();else if (isOpen) this.setState(babelHelpers._extends({ focusedItem: prev }, nullTag));
	    } else if (key === 'End') {
	      if (isOpen) this.setState(babelHelpers._extends({ focusedItem: list.last() }, nullTag));else tagList && this.setState({ focusedTag: tagList.last() });
	    } else if (key === 'Home') {
	      if (isOpen) this.setState(babelHelpers._extends({ focusedItem: list.first() }, nullTag));else tagList && this.setState({ focusedTag: tagList.first() });
	    } else if (isOpen && key === 'Enter') ctrlKey && this.props.onCreate || focusedItem === null ? this._onCreate(this.props.searchTerm) : this._onSelect(this.state.focusedItem);else if (key === 'Escape') isOpen ? this.close() : tagList && this.setState(nullTag);else if (noSearch && key === 'ArrowLeft') tagList && this.setState({ focusedTag: tagList.prev(focusedTag) });else if (noSearch && key === 'ArrowRight') tagList && this.setState({ focusedTag: tagList.next(focusedTag) });else if (noSearch && key === 'Delete') tagList && tagList.remove(focusedTag);else if (noSearch && key === 'Backspace') tagList && tagList.removeNext();
	  }
	}, {
	  key: 'change',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function change(data) {
	    _utilWidgetHelpers.notify(this.props.onChange, [data]);
	    _utilWidgetHelpers.notify(this.props.onSearch, ['']);
	  }
	}, {
	  key: 'open',
	  value: function open() {
	    if (!(this.props.disabled === true || this.props.readOnly === true)) _utilWidgetHelpers.notify(this.props.onToggle, true);
	  }
	}, {
	  key: 'close',
	  value: function close() {
	    _utilWidgetHelpers.notify(this.props.onToggle, false);
	  }
	}, {
	  key: 'toggle',
	  value: function toggle() {
	    this.props.open ? this.close() : this.open();
	  }
	}, {
	  key: 'process',
	  value: function process(data, values, searchTerm) {
	    var valueField = this.props.valueField;

	    var items = data.filter(function (i) {
	      return !values.some(function (v) {
	        return _utilDataHelpers.valueMatcher(i, v, valueField);
	      });
	    });

	    this._lengthWithoutValues = items.length;

	    if (searchTerm) items = this.filter(items, searchTerm);

	    return items;
	  }
	}, {
	  key: '_shouldShowCreate',
	  value: function _shouldShowCreate() {
	    var _props3 = this.props;
	    var textField = _props3.textField;
	    var searchTerm = _props3.searchTerm;
	    var onCreate = _props3.onCreate;

	    if (!onCreate || !searchTerm) return false;

	    // if there is an exact match on textFields: "john" => { name: "john" }, don't show
	    return !this._data().some(function (v) {
	      return _utilDataHelpers.dataText(v, textField) === searchTerm;
	    }) && !this.state.dataItems.some(function (v) {
	      return _utilDataHelpers.dataText(v, textField) === searchTerm;
	    });
	  }
	}, {
	  key: '_placeholder',
	  value: function _placeholder() {
	    return (this.props.value || []).length ? '' : this.props.placeholder || '';
	  }
	}]));

	function msgs(msgs) {
	  return babelHelpers._extends({
	    createNew: '(create new tag)',
	    emptyList: 'There are no items in this list',
	    emptyFilter: 'The filter returned no results',
	    tagsLabel: 'selected items',
	    selectedItems: 'selected items',
	    removeLabel: 'remove selected item'
	  }, msgs);
	}

	exports['default'] = _uncontrollable2['default'](Multiselect, { open: 'onToggle', value: 'onChange', searchTerm: 'onSearch' });
	module.exports = exports['default'];

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _propTypes = __webpack_require__(22);

	var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(36);

	var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

	var _utilCompat = __webpack_require__(47);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var _utilPropTypes = __webpack_require__(49);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	exports['default'] = _createReactClass2['default']({

	  displayName: 'MultiselectInput',

	  propTypes: {
	    value: _propTypes2['default'].string,
	    maxLength: _propTypes2['default'].number,
	    onChange: _propTypes2['default'].func.isRequired,
	    onFocus: _propTypes2['default'].func,

	    disabled: _utilPropTypes2['default'].disabled,
	    readOnly: _utilPropTypes2['default'].readOnly
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    this.props.focused && this.focus();
	  },

	  render: function render() {
	    var value = this.props.value,
	        placeholder = this.props.placeholder,
	        size = Math.max((value || placeholder).length, 1) + 1;

	    return _react2['default'].createElement('input', babelHelpers._extends({}, this.props, {
	      className: 'rw-input',
	      autoComplete: 'off',
	      'aria-disabled': this.props.disabled,
	      'aria-readonly': this.props.readOnly,
	      disabled: this.props.disabled,
	      readOnly: this.props.readOnly,
	      size: size
	    }));
	  },

	  focus: function focus() {
	    _utilCompat2['default'].findDOMNode(this).focus();
	  }

	});
	module.exports = exports['default'];

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _propTypes = __webpack_require__(22);

	var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(36);

	var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _classnames = __webpack_require__(35);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _utilPropTypes = __webpack_require__(49);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _utilWidgetHelpers = __webpack_require__(54);

	var _utilDataHelpers = __webpack_require__(53);

	var _utilInteraction = __webpack_require__(67);

	var optionId = function optionId(id, idx) {
	  return id + '__option__' + idx;
	};

	exports['default'] = _createReactClass2['default']({

	  displayName: 'MultiselectTagList',

	  mixins: [__webpack_require__(69), __webpack_require__(56)()],

	  propTypes: {
	    value: _propTypes2['default'].array,
	    focused: _propTypes2['default'].number,

	    valueField: _propTypes2['default'].string,
	    textField: _utilPropTypes2['default'].accessor,

	    valueComponent: _propTypes2['default'].func,

	    disabled: _utilPropTypes2['default'].disabled.acceptsArray,
	    readOnly: _utilPropTypes2['default'].readOnly.acceptsArray
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      ariaActiveDescendantKey: 'taglist'
	    };
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    var focused = this.props.focused;
	    var activeId = optionId(_utilWidgetHelpers.instanceId(this), focused);

	    this.ariaActiveDescendant(focused == null || _utilInteraction.isDisabledItem(focused, this.props) ? null : activeId);
	  },

	  render: function render() {
	    var _this = this;

	    var props = _util_2['default'].omit(this.props, ['value', 'disabled', 'readOnly']);
	    var _props = this.props;
	    var focused = _props.focused;
	    var value = _props.value;
	    var textField = _props.textField;
	    var ValueComponent = _props.valueComponent;

	    var id = _utilWidgetHelpers.instanceId(this);

	    if (value.length === 0) {
	      return _react2['default'].createElement('div', null);
	    }

	    return _react2['default'].createElement(
	      'ul',
	      babelHelpers._extends({}, props, {
	        role: 'listbox',
	        tabIndex: '-1',
	        className: 'rw-multiselect-taglist'
	      }),
	      value.map(function (item, i) {
	        var isDisabled = _utilInteraction.isDisabledItem(item, _this.props),
	            isReadonly = _utilInteraction.isReadOnlyItem(item, _this.props),
	            isFocused = !isDisabled && focused === i,
	            currentID = optionId(id, i);

	        return _react2['default'].createElement(
	          'li',
	          {
	            key: i,
	            id: currentID,
	            tabIndex: '-1',
	            role: 'option',
	            className: _classnames2['default']({
	              'rw-state-focus': isFocused,
	              'rw-state-disabled': isDisabled,
	              'rw-state-readonly': isReadonly
	            })
	          },
	          ValueComponent ? _react2['default'].createElement(ValueComponent, { item: item }) : _utilDataHelpers.dataText(item, textField),
	          _react2['default'].createElement(
	            'span',
	            {
	              tabIndex: '-1',
	              onClick: !(isDisabled || isReadonly) ? _this._delete.bind(null, item) : undefined,
	              'aria-disabled': isDisabled,
	              'aria-label': 'Unselect',
	              disabled: isDisabled
	            },
	            _react2['default'].createElement(
	              'span',
	              { className: 'rw-tag-btn', 'aria-hidden': 'true' },
	              '×'
	            )
	          )
	        );
	      })
	    );
	  },

	  _delete: function _delete(val) {
	    this.props.onDelete(val);
	  },

	  remove: function remove(idx) {
	    var val = this.props.value[idx];

	    if (val && !(_utilInteraction.isDisabledItem(val, this.props) || _utilInteraction.isReadOnlyItem(val, this.props))) this.props.onDelete(val);
	  },

	  removeNext: function removeNext() {
	    var val = this.props.value[this.props.value.length - 1];

	    if (val && !(_utilInteraction.isDisabledItem(val, this.props) || _utilInteraction.isReadOnlyItem(val, this.props))) this.props.onDelete(val);
	  },

	  clear: function clear() {
	    this.setState({ focused: null });
	  },

	  first: function first() {
	    var idx = 0,
	        value = this.props.value,
	        l = value.length;

	    while (idx < l && _utilInteraction.isDisabledItem(value[idx], this.props)) idx++;

	    return idx !== l ? idx : null;
	  },

	  last: function last() {
	    var value = this.props.value,
	        idx = value.length - 1;

	    while (idx > -1 && _utilInteraction.isDisabledItem(value[idx], this.props)) idx--;

	    return idx >= 0 ? idx : null;
	  },

	  next: function next(current) {
	    var nextIdx = current + 1,
	        value = this.props.value,
	        l = value.length;

	    while (nextIdx < l && _utilInteraction.isDisabledItem(nextIdx, this.props)) nextIdx++;

	    if (current === null || nextIdx >= l) return null;

	    return nextIdx;
	  },

	  prev: function prev(current) {
	    var nextIdx = current,
	        value = this.props.value;

	    if (nextIdx === null || nextIdx === 0) nextIdx = value.length;

	    nextIdx--;

	    while (nextIdx > -1 && _utilInteraction.isDisabledItem(value[nextIdx], this.props)) nextIdx--;

	    return nextIdx >= 0 ? nextIdx : null;
	  }
	});
	module.exports = exports['default'];

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _propTypes = __webpack_require__(22);

	var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(36);

	var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _classnames = __webpack_require__(35);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _uncontrollable = __webpack_require__(60);

	var _uncontrollable2 = babelHelpers.interopRequireDefault(_uncontrollable);

	var _utilCompat = __webpack_require__(47);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var _utilPropTypes = __webpack_require__(49);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _List = __webpack_require__(51);

	var _List2 = babelHelpers.interopRequireDefault(_List);

	var _utilValidateListInterface = __webpack_require__(59);

	var _utilValidateListInterface2 = babelHelpers.interopRequireDefault(_utilValidateListInterface);

	var _domHelpersUtilScrollTo = __webpack_require__(72);

	var _domHelpersUtilScrollTo2 = babelHelpers.interopRequireDefault(_domHelpersUtilScrollTo);

	var _utilDataHelpers = __webpack_require__(53);

	var _utilInteraction = __webpack_require__(67);

	var _utilWidgetHelpers = __webpack_require__(54);

	var omit = _util_2['default'].omit;
	var pick = _util_2['default'].pick;

	var propTypes = {

	  data: _propTypes2['default'].array,
	  value: _propTypes2['default'].oneOfType([_propTypes2['default'].any, _propTypes2['default'].array]),
	  onChange: _propTypes2['default'].func,
	  onMove: _propTypes2['default'].func,

	  multiple: _propTypes2['default'].bool,

	  itemComponent: _utilPropTypes2['default'].elementType,
	  listComponent: _utilPropTypes2['default'].elementType,

	  valueField: _propTypes2['default'].string,
	  textField: _utilPropTypes2['default'].accessor,

	  busy: _propTypes2['default'].bool,

	  filter: _propTypes2['default'].string,
	  delay: _propTypes2['default'].number,

	  disabled: _utilPropTypes2['default'].disabled.acceptsArray,
	  readOnly: _utilPropTypes2['default'].readOnly.acceptsArray,

	  messages: _propTypes2['default'].shape({
	    emptyList: _propTypes2['default'].string
	  })
	};

	var SelectList = _createReactClass2['default'](babelHelpers.createDecoratedObject([{
	  key: 'propTypes',
	  initializer: function initializer() {
	    return propTypes;
	  }
	}, {
	  key: 'mixins',
	  initializer: function initializer() {
	    return [__webpack_require__(68), __webpack_require__(76), __webpack_require__(56)()];
	  }
	}, {
	  key: 'getDefaultProps',
	  value: function getDefaultProps() {
	    return {
	      delay: 250,
	      value: [],
	      data: [],
	      ariaActiveDescendantKey: 'selectlist',
	      messages: {
	        emptyList: 'There are no items in this list'
	      }
	    };
	  }
	}, {
	  key: 'getDefaultState',
	  value: function getDefaultState(props) {
	    var data = props.data;
	    var value = props.value;
	    var valueField = props.valueField;
	    var multiple = props.multiple;
	    var isRadio = !multiple;
	    var values = _util_2['default'].splat(value);
	    var first = isRadio && _utilDataHelpers.dataItem(data, values[0], valueField);

	    first = isRadio && first ? first : (this.state || {}).focusedItem || null;

	    return {
	      focusedItem: first,
	      dataItems: !isRadio && values.map(function (item) {
	        return _utilDataHelpers.dataItem(data, item, valueField);
	      })
	    };
	  }
	}, {
	  key: 'getInitialState',
	  value: function getInitialState() {
	    var state = this.getDefaultState(this.props);

	    state.ListItem = getListItem(this);

	    return state;
	  }
	}, {
	  key: 'componentWillReceiveProps',
	  value: function componentWillReceiveProps(nextProps) {
	    return this.setState(this.getDefaultState(nextProps));
	  }
	}, {
	  key: 'componentDidMount',
	  value: function componentDidMount() {
	    _utilValidateListInterface2['default'](this.listRef);
	  }
	}, {
	  key: 'render',
	  value: function render() {
	    var _this = this;

	    var _props = this.props;
	    var className = _props.className;
	    var tabIndex = _props.tabIndex;
	    var busy = _props.busy;
	    var List = _props.listComponent;

	    List = List || _List2['default'];

	    var elementProps = omit(this.props, Object.keys(propTypes));
	    var listProps = pick(this.props, Object.keys(List.propTypes));

	    var _state = this.state;
	    var ListItem = _state.ListItem;
	    var focusedItem = _state.focusedItem;
	    var focused = _state.focused;

	    var items = this._data(),
	        listID = _utilWidgetHelpers.instanceId(this, '_listbox');

	    focusedItem = focused && !_utilInteraction.isDisabled(this.props) && !_utilInteraction.isReadOnly(this.props) && focusedItem;

	    return _react2['default'].createElement(
	      'div',
	      babelHelpers._extends({}, elementProps, {
	        onKeyDown: this._keyDown,
	        onFocus: this._focus.bind(null, true),
	        onBlur: this._focus.bind(null, false),
	        role: 'radiogroup',
	        'aria-busy': !!busy,
	        'aria-disabled': _utilInteraction.isDisabled(this.props),
	        'aria-readonly': _utilInteraction.isReadOnly(this.props),
	        tabIndex: '-1',
	        className: _classnames2['default'](className, 'rw-widget', 'rw-selectlist', {
	          'rw-state-focus': focused,
	          'rw-state-disabled': _utilInteraction.isDisabled(this.props),
	          'rw-state-readonly': _utilInteraction.isReadOnly(this.props),
	          'rw-rtl': this.isRtl(),
	          'rw-loading-mask': busy
	        })
	      }),
	      _react2['default'].createElement(List, babelHelpers._extends({}, listProps, {
	        ref: function (ref) {
	          return _this.listRef = ref;
	        },
	        id: listID,
	        role: 'radiogroup',
	        tabIndex: tabIndex || '0',
	        data: items,
	        focused: focusedItem,
	        optionComponent: ListItem,
	        itemComponent: this.props.itemComponent,
	        onMove: this._scrollTo
	      }))
	    );
	  }
	}, {
	  key: '_scrollTo',
	  value: function _scrollTo(selected, list) {
	    var handler = this.props.onMove;

	    if (handler) handler(selected, list);else {
	      this._scrollCancel && this._scrollCancel();
	      // default behavior is to scroll the whole page not just the widget
	      this._scrollCancel = _domHelpersUtilScrollTo2['default'](selected);
	    }
	  }
	}, {
	  key: '_keyDown',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _keyDown(e) {
	    var _this2 = this;

	    var key = e.key;
	    var _props2 = this.props;
	    var valueField = _props2.valueField;
	    var multiple = _props2.multiple;
	    var list = this.listRef;
	    var focusedItem = this.state.focusedItem;
	    var props = this.props;

	    var moveItem = function moveItem(dir, item) {
	      return _utilInteraction.move(dir, item, props, list);
	    };
	    var change = function change(item) {
	      if (item) _this2._change(item, multiple ? !_utilInteraction.contains(item, _this2._values(), valueField) // toggle value
	      : true);
	    };

	    _utilWidgetHelpers.notify(this.props.onKeyDown, [e]);

	    if (e.defaultPrevented) return;

	    if (key === 'End') {
	      e.preventDefault();

	      if (multiple) this.setState({ focusedItem: moveItem('prev', null) });else change(moveItem('prev', null));
	    } else if (key === 'Home') {
	      e.preventDefault();

	      if (multiple) this.setState({ focusedItem: moveItem('next', null) });else change(moveItem('next', null));
	    } else if (key === 'Enter' || key === ' ') {
	      e.preventDefault();
	      change(focusedItem);
	    } else if (key === 'ArrowDown' || key === 'ArrowRight') {
	      e.preventDefault();

	      if (multiple) this.setState({ focusedItem: moveItem('next', focusedItem) });else change(moveItem('next', focusedItem));
	    } else if (key === 'ArrowUp' || key === 'ArrowLeft') {
	      e.preventDefault();

	      if (multiple) this.setState({ focusedItem: moveItem('prev', focusedItem) });else change(moveItem('prev', focusedItem));
	    } else if (multiple && e.keyCode === 65 && e.ctrlKey) {
	      e.preventDefault();
	      this._selectAll();
	    } else this.search(String.fromCharCode(e.keyCode));
	  }
	}, {
	  key: '_selectAll',
	  value: function _selectAll() {
	    var _this3 = this;

	    var _props3 = this.props;
	    var disabled = _props3.disabled;
	    var readOnly = _props3.readOnly;
	    var valueField = _props3.valueField;
	    var values = this.state.dataItems;
	    var data = this._data();
	    var blacklist;

	    disabled = disabled || readOnly;
	    disabled = Array.isArray(disabled) ? disabled : [];
	    //disabled values that are not selected
	    blacklist = disabled.filter(function (v) {
	      return !_utilInteraction.contains(v, values, valueField);
	    });
	    data = data.filter(function (v) {
	      return !_utilInteraction.contains(v, blacklist, valueField);
	    });

	    if (data.length === values.length) {
	      data = disabled.filter(function (item) {
	        return _utilInteraction.contains(item, values, valueField);
	      });
	      data = data.map(function (item) {
	        return _utilDataHelpers.dataItem(_this3._data(), item, valueField);
	      });
	    }

	    _utilWidgetHelpers.notify(this.props.onChange, [data]);
	  }
	}, {
	  key: '_change',
	  value: function _change(item, checked) {
	    var multiple = this.props.multiple;
	    var values = this.state.dataItems;

	    multiple = !!multiple;

	    if (!multiple) return _utilWidgetHelpers.notify(this.props.onChange, checked ? item : null);

	    values = checked ? values.concat(item) : values.filter(function (v) {
	      return v !== item;
	    });

	    _utilWidgetHelpers.notify(this.props.onChange, [values || []]);
	  }
	}, {
	  key: '_focus',
	  decorators: [_utilInteraction.widgetEnabled],
	  value: function _focus(focused, e) {
	    var _this4 = this;

	    if (focused) _utilCompat2['default'].findDOMNode(this.listRef).focus();

	    this.setTimeout('focus', function () {
	      if (focused !== _this4.state.focused) {
	        _utilWidgetHelpers.notify(_this4.props[focused ? 'onFocus' : 'onBlur'], e);
	        _this4.setState({ focused: focused });
	      }
	    });
	  }
	}, {
	  key: 'search',
	  value: function search(character) {
	    var _this5 = this;

	    var word = ((this._searchTerm || '') + character).toLowerCase(),
	        list = this.listRef;

	    this._searchTerm = word;

	    this.setTimeout('search', function () {
	      var focusedItem = list.next(_this5.state.focusedItem, word);

	      _this5._searchTerm = '';

	      if (focusedItem) _this5.setState({ focusedItem: focusedItem });
	    }, this.props.delay);
	  }
	}, {
	  key: '_data',
	  value: function _data() {
	    return this.props.data;
	  }
	}, {
	  key: '_values',
	  value: function _values() {
	    return this.props.multiple ? this.state.dataItems : this.props.value;
	  }
	}]));

	function getListItem(parent) {

	  return _createReactClass2['default']({

	    displayName: 'SelectItem',

	    render: function render() {
	      var _props4 = this.props;
	      var children = _props4.children;
	      var focused = _props4.focused;
	      var selected = _props4.selected;
	      var item = _props4.dataItem;
	      var props = babelHelpers.objectWithoutProperties(_props4, ['children', 'focused', 'selected', 'dataItem']);
	      var _parent$props = parent.props;
	      var multiple = _parent$props.multiple;
	      var _parent$props$name = _parent$props.name;
	      var name = _parent$props$name === undefined ? _utilWidgetHelpers.instanceId(parent, '_name') : _parent$props$name;

	      var checked = _utilInteraction.contains(item, parent._values(), parent.props.valueField),
	          change = parent._change.bind(null, item),
	          disabled = _utilInteraction.isDisabledItem(item, parent.props),
	          readonly = _utilInteraction.isReadOnlyItem(item, parent.props),
	          type = multiple ? 'checkbox' : 'radio';

	      return _react2['default'].createElement(
	        'li',
	        babelHelpers._extends({}, props, {
	          tabIndex: '-1',
	          role: type,
	          'aria-checked': !!checked,
	          'aria-disabled': disabled || readonly,
	          className: _classnames2['default']('rw-list-option', {
	            'rw-state-focus': focused,
	            'rw-state-selected': selected,
	            'rw-state-disabled': disabled,
	            'rw-state-readonly': readonly
	          })
	        }),
	        _react2['default'].createElement(
	          'label',
	          null,
	          _react2['default'].createElement('input', {
	            name: name,
	            tabIndex: '-1',
	            role: 'presentation',
	            type: type,
	            onChange: onChange,
	            checked: checked,
	            disabled: disabled || readonly
	          }),
	          children
	        )
	      );

	      function onChange(e) {
	        if (!disabled && !readonly) change(e.target.checked);
	      }
	    }
	  });
	}

	exports['default'] = _uncontrollable2['default'](SelectList, { value: 'onChange' });
	module.exports = exports['default'];

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _propTypes = __webpack_require__(22);

	var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(36);

	var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

	var _ListOption = __webpack_require__(52);

	var _ListOption2 = babelHelpers.interopRequireDefault(_ListOption);

	var _utilPropTypes = __webpack_require__(49);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _utilCompat = __webpack_require__(47);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var _classnames = __webpack_require__(35);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _warning = __webpack_require__(58);

	var _warning2 = babelHelpers.interopRequireDefault(_warning);

	var _utilDataHelpers = __webpack_require__(53);

	var _utilWidgetHelpers = __webpack_require__(54);

	var _GroupHeader = __webpack_require__(106);

	var _GroupHeader2 = babelHelpers.interopRequireDefault(_GroupHeader);

	var _utilObjectTraversal = __webpack_require__(107);

	var optionId = function optionId(id, idx) {
	  return id + '__option__' + idx;
	};
	var PATH_DELIMITER = '::';

	function _stringifyPath(path) {
	  return path.join(PATH_DELIMITER);
	}

	function _getDepthString(depth) {
	  return 'rw-list-depth-' + (depth || 0);
	}

	function _getIn(obj, path) {
	  return path.reduce(function (seed, current) {
	    return seed && typeof seed === 'object' && seed[current];
	  }, obj);
	}

	function _ensureOrderedKeysExists(obj) {
	  if (obj && !obj._orderedKeys) {
	    obj._orderedKeys = [];
	  }
	}

	function _pushNewOrderedKey(obj, key) {
	  var shouldPushKey = obj && obj._orderedKeys && obj._orderedKeys.indexOf(key) === -1;

	  shouldPushKey && obj._orderedKeys.push(key);
	}

	function _setIn(obj, path, val) {
	  var cloned = babelHelpers._extends({}, obj);

	  path.reduce(function (seed, current, idx) {
	    if (idx == path.length - 1) {
	      seed[current] = val;
	    } else if (!seed[current]) {
	      seed[current] = {};
	    }

	    _ensureOrderedKeysExists(seed);
	    _pushNewOrderedKey(seed, current);

	    return seed[current];
	  }, cloned);

	  return cloned;
	}

	function _validateOrderedKeyObject(obj) {
	  if (!(obj && obj._orderedKeys)) {
	    throw new Error("currentNode is null/undefined/falsy, or is missing `_orderedKeys`");
	  }
	}

	function _pushPathStep(path, nextStep) {
	  if (!path || path.trim() === '') {
	    return nextStep;
	  }

	  return _stringifyPath([path, nextStep]);
	}

	function _flattenGroups(groups, array, sortKeys) {
	  if (!(groups && groups._orderedKeys)) {
	    return;
	  }

	  var identity = function identity(x) {
	    return x;
	  };
	  var sort = sortKeys[0] || identity;
	  var keys = sort(groups._orderedKeys.slice());

	  keys.forEach(function (key) {
	    var value = groups[key];

	    if (Array.isArray(value)) {
	      value.forEach(function (item) {
	        return array.push(item);
	      });
	    } else {
	      _flattenGroups(value, array, sortKeys.slice(1));
	    }
	  });
	}

	function _renderHeadersAndItems(groupedObj, renderGroupHeader, renderSingleItem, keySorts) {
	  var outputArray = [];
	  var getChildren = keySorts.map(function (fn) {
	    var identity = function identity(x) {
	      return x;
	    };
	    var sortKeys = fn || identity;

	    return function (obj) {
	      return sortKeys(obj._orderedKeys.slice());
	    };
	  });
	  var onInternal = function onInternal(key, state) {
	    outputArray.push(renderGroupHeader(key, state));
	  };
	  var onLeaf = function onLeaf(array, state) {
	    array.forEach(function (item, idx) {
	      outputArray.push(renderSingleItem(item, state, idx));
	    });
	  };

	  _utilObjectTraversal.depthFirst(groupedObj, getChildren, onInternal, onLeaf);

	  return outputArray;
	}

	function _setFoundIndex(state, foundIndex) {
	  return babelHelpers._extends({}, state, {
	    foundIndex: foundIndex
	  });
	}

	function _setOffset(state, offset) {
	  return babelHelpers._extends({}, state, {
	    offset: offset
	  });
	}

	/*
	 state:
	 {
	   foundIndex: boolean,
	   offset:     number
	 }
	 */
	function _getOrderedIndexHelper(item, currentNode, state) {
	  _validateOrderedKeyObject(currentNode);

	  return currentNode._orderedKeys.slice().reduce(function (_state, key) {
	    if (_state.foundIndex) {
	      return _state;
	    }

	    var value = currentNode[key];
	    if (!Array.isArray(value)) {
	      return _getOrderedIndexHelper(item, value, _setOffset(_state, _state.offset + 1));
	    } else {
	      var index = value.indexOf(item);

	      // NOTE: We're kind of looking ahead one level in the heirarchy,
	      // so the index/offset actually needs to be incremented once extra.
	      //
	      // This could probably be done slightly differently to alleviate that,
	      // but that isn't worth doing just yet...
	      if (index !== -1) {
	        var foundIndex = _state.offset + index + 1;

	        return _setFoundIndex(_state, foundIndex);
	      } else {
	        var offset = _state.offset + value.length + 1;

	        return _setOffset(_state, offset);
	      }
	    }
	  }, state);
	}

	function _getOrderedIndex(item, object) {
	  var result = _getOrderedIndexHelper(item, object, {
	    foundIndex: undefined,
	    offset: 0
	  });

	  return result.foundIndex || -1;
	}

	exports['default'] = _createReactClass2['default']({
	  displayName: 'List',

	  mixins: [__webpack_require__(55), __webpack_require__(56)()],

	  propTypes: {
	    data: _propTypes2['default'].array,
	    onSelect: _propTypes2['default'].func,
	    onMove: _propTypes2['default'].func,

	    optionComponent: _utilPropTypes2['default'].elementType,
	    itemComponent: _utilPropTypes2['default'].elementType,
	    groupComponent: _utilPropTypes2['default'].elementType,

	    selected: _propTypes2['default'].any,
	    focused: _propTypes2['default'].any,

	    valueField: _propTypes2['default'].string,
	    textField: _utilPropTypes2['default'].accessor,

	    optID: _propTypes2['default'].string,

	    groupBy: _utilPropTypes2['default'].multiAccessor,

	    messages: _propTypes2['default'].shape({
	      emptyList: _utilPropTypes2['default'].message
	    })
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      optID: '',
	      onSelect: function onSelect() {},
	      data: [],
	      optionComponent: _ListOption2['default'],
	      ariaActiveDescendantKey: 'groupedList',
	      messages: {
	        emptyList: 'There are no items in this list'
	      }
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      groups: this._group(this.props.groupBy, this.props.data)
	    };
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    var shouldSetState = nextProps.data !== this.props.data || nextProps.groupBy !== this.props.groupBy;

	    if (shouldSetState) {
	      var groups = this._group(nextProps.groupBy, nextProps.data);

	      this.setState({
	        groups: groups
	      });
	    }
	  },

	  componentDidMount: function componentDidMount() {
	    this.move();
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    this.ariaActiveDescendant(this._currentActiveID);
	    this.move();
	  },

	  render: function render() {
	    var _this = this;

	    var _props = this.props;
	    var className = _props.className;
	    var role = _props.role;
	    var data = _props.data;
	    var messages = _props.messages;
	    var onSelect = _props.onSelect;
	    var selectedIndex = _props.selectedIndex;
	    var props = babelHelpers.objectWithoutProperties(_props, ['className', 'role', 'data', 'messages', 'onSelect', 'selectedIndex']);

	    var id = _utilWidgetHelpers.instanceId(this);
	    var groups = this.state.groups;

	    var items = [];
	    var idx = -1;
	    var group = undefined;

	    this._currentActiveID = null;

	    if (data.length) {
	      items = _renderHeadersAndItems(groups, this._renderGroupHeader, this._renderItem, this.props.groupBy.map(function (x) {
	        return x.sortKeys;
	      }));
	    } else {
	      items = _react2['default'].createElement(
	        'li',
	        { className: 'rw-list-empty' },
	        _util_2['default'].result(messages.emptyList, this.props)
	      );
	    }

	    return _react2['default'].createElement(
	      'ul',
	      babelHelpers._extends({
	        ref: function (ref) {
	          return _this.scrollableRef = ref;
	        },
	        id: id,
	        tabIndex: '-1',
	        className: _classnames2['default'](className, 'rw-list', 'rw-list-grouped'),
	        role: role === undefined ? 'listbox' : role
	      }, props),
	      items
	    );
	  },

	  _renderGroupHeader: function _renderGroupHeader(label, state) {
	    var depth = state.path.length;
	    var pathString = _stringifyPath(state.path);

	    var className = 'rw-list-optgroup ' + _getDepthString(depth);
	    var id = _utilWidgetHelpers.instanceId(this);
	    var key = 'item_' + pathString + '_' + label;

	    return _react2['default'].createElement(_GroupHeader2['default'], {
	      className: className,
	      groupComponent: this.props.groupComponent,
	      id: id,
	      key: key,
	      label: label
	    });
	  },

	  _renderItem: function _renderItem(item, state, idx) {
	    var _props2 = this.props;
	    var focused = _props2.focused;
	    var selected = _props2.selected;
	    var onSelect = _props2.onSelect;
	    var textField = _props2.textField;
	    var valueField = _props2.valueField;
	    var ItemComponent = _props2.itemComponent;
	    var Option = _props2.optionComponent;

	    var currentId = optionId(_utilWidgetHelpers.instanceId(this), state.offset + idx);
	    var onClick = onSelect.bind(null, item);

	    if (focused === item) {
	      this._currentActiveID = currentId;
	    }

	    var depth = state.path.length;
	    var pathString = _stringifyPath(state.path);
	    var key = 'item_' + pathString + '_' + idx;

	    return _react2['default'].createElement(
	      Option,
	      {
	        key: key,
	        id: currentId,
	        dataItem: item,
	        focused: focused === item,
	        selected: selected === item,
	        onClick: onClick,
	        className: _getDepthString(depth)
	      },
	      ItemComponent ? _react2['default'].createElement(ItemComponent, {
	        item: item,
	        value: _utilDataHelpers.dataValue(item, valueField),
	        text: _utilDataHelpers.dataText(item, textField)
	      }) : _utilDataHelpers.dataText(item, textField)
	    );
	  },

	  _isIndexOf: function _isIndexOf(idx, item) {
	    return this.props.data[idx] === item;
	  },

	  _group: function _group(groupBy, data) {
	    return data.reduce(function (seed, current) {
	      var path = groupBy.map(function (x) {
	        return x.getHeaders(current);
	      });
	      var existingLeaf = _getIn(seed, path) || [];
	      var newLeaf = existingLeaf.concat(current);

	      return _setIn(seed, path, newLeaf);
	    }, {});
	  },

	  _data: function _data() {
	    var groups = this.state.groups;
	    var items = [];

	    _flattenGroups(groups, items, this.props.groupBy.map(function (x) {
	      return x.sortKeys;
	    }));

	    return items;
	  },

	  move: function move() {
	    var selected = this.getItemDOMNode(this.props.focused);

	    if (!selected) {
	      return;
	    }

	    _utilWidgetHelpers.notify(this.props.onMove, [selected, _utilCompat2['default'].findDOMNode(this), this.props.focused]);
	  },

	  getItemDOMNode: function getItemDOMNode(item) {
	    if (!item) {
	      return undefined;
	    }

	    var list = _utilCompat2['default'].findDOMNode(this);
	    var index = _getOrderedIndex(item, this.state.groups);

	    // Conveniently, array[-1] gives undefined, which is just what we want
	    return list[index];
	  }
	});
	module.exports = exports['default'];

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _propTypes = __webpack_require__(22);

	var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

	var _utilPropTypes = __webpack_require__(49);

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

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;
	exports.depthFirst = depthFirst;
	function _getDefaultState() {
	  return {
	    offset: 0,
	    path: []
	  };
	};

	function _getPoppedArrayClone(array) {
	  return array.slice(0, -1);
	}

	function depthFirst(currentNode, getChildren, onInternal, onLeaf, state) {
	  state = state || _getDefaultState();

	  if (Array.isArray(currentNode)) {
	    onLeaf && onLeaf(currentNode, state);

	    return babelHelpers._extends({}, state, {
	      offset: state.offset + currentNode.length,
	      path: state.path.slice()
	    });
	  }

	  var getCurrentChildren = getChildren[0] || function (x) {
	    return Object.keys(x);
	  };
	  var currentChildKeys = getCurrentChildren(currentNode);

	  return currentChildKeys.reduce(function (_state, key) {
	    // IMPORTANT: Only `_state` should be used inside the body of this
	    // function. Accidentally accessing `state` through closure will only get
	    // confusing.

	    onInternal(key, _state);

	    var passDownState = babelHelpers._extends({}, _state, {
	      offset: _state.offset + 1,
	      path: _state.path.concat(key)
	    });

	    var resultingState = depthFirst(currentNode[key], getChildren.slice(1), onInternal, onLeaf, passDownState);

	    var passUpState = babelHelpers._extends({}, resultingState, {
	      path: _getPoppedArrayClone(resultingState.path)
	    });

	    return passUpState;
	  }, state);
	}

/***/ })
/******/ ])
});
;