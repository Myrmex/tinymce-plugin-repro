/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var plugin = function (editor, url) {
    function rgb2hex(rgb) {
        var m = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (m && m.length === 4) ?
            ('0' + parseInt(m[1], 10).toString(16)).slice(-2) +
                ('0' + parseInt(m[2], 10).toString(16)).slice(-2) +
                ('0' + parseInt(m[3], 10).toString(16)).slice(-2) : '';
    }
    function update() {
        var node = editor.selection.getNode();
        var result = '-';
        if (node && node.nodeType === 1 && node.nodeName === 'SPAN') {
            var color = node.style.color;
            color = rgb2hex(color);
            if (color) {
                var map = editor.getParam('vsm_color_map');
                if (color in map) {
                    var h = map[color];
                    result = h.name + " (" + h.color + " - " + h.tag + ")";
                }
                else {
                    result = color;
                }
            }
        }
        editor.theme.panel.find('#format-display').text(result);
    }
    editor.on('init', function () {
        var statusbar = editor.theme.panel && editor.theme.panel.find('#statusbar')[0];
        if (statusbar) {
            window.setTimeout(function () {
                statusbar.insert({
                    type: 'label',
                    name: 'format-display',
                    text: '-',
                    classes: 'path'
                }, 0);
                editor.on('setcontent beforeaddundo keyup', update);
            }, 0);
        }
    });
};
exports["default"] = plugin;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var plugin_1 = __webpack_require__(0);
tinymce.PluginManager.add('formatDisplay', plugin_1["default"]);


/***/ })
/******/ ]);