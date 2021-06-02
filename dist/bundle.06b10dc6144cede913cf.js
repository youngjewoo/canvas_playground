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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _require = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module 'node:vm'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())),\n    createContext = _require.createContext;\n\nfunction component() {\n  var element = document.createElement('div'); // Lodash, currently included via a script, is required for this line to work\n\n  element.innerHTML = 'Hello canvas world';\n  return element;\n} // 시간마다 불릴 옵저버 리스트\n\n\nvar observerList = []; // Init chart frame\n\nvar canvas = document.createElement('canvas');\ncanvas.width = 600;\ncanvas.height = 500;\ncanvas.id = 'test_canvas';\nvar ctx = canvas.getContext('2d');\nctx.beginPath();\nctx.moveTo(0, 0);\nctx.lineTo(0, canvas.height);\nctx.lineTo(canvas.width, canvas.height);\nctx.stroke();\nvar dotSize = 3; // Random number generator\n\nvar getRandomInt = function getRandomInt(min, max) {\n  return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함\n}; // Random data generator\n\n\nvar getRandomData = function getRandomData() {\n  var data = [];\n  var cnt = getRandomInt(0, 5);\n\n  for (var i = 0; i < cnt; ++i) {\n    data.push(getRandomInt(0, 1000));\n  }\n\n  return data;\n}; // Emiiter!\n\n\nsetInterval(function () {\n  var data = getRandomData();\n  observerList.forEach(function (obr) {\n    return obr(data);\n  });\n}, 1000); // Init data buffer\n\nvar buffer = Array.from({\n  length: 30\n}, function () {\n  return new Array();\n}); // Update buffer\n\nvar updateBuffer = function updateBuffer(data) {\n  buffer.shift();\n  buffer.push(data);\n}; // Update chart func\n\n\nvar updateChart = function updateChart(data) {\n  // Clear without border\n  ctx.clearRect(1, 0, canvas.width, canvas.height - 1);\n\n  for (var i = 0; i < buffer.length; ++i) {\n    var x = i * (canvas.width / 30);\n\n    for (var j = 0; j < buffer[i].length; ++j) {\n      var y = canvas.height - buffer[i][j] * (canvas.height / 1000);\n      ctx.fillStyle = 'green';\n      ctx.fillRect(x, y, dotSize, dotSize);\n    }\n  }\n}; // Canvas event handler\n\n\ncanvas.onmouseenter = function () {\n  var idx = observerList.indexOf(updateChart);\n  observerList.splice(idx, 1);\n};\n\ncanvas.onmouseleave = function () {\n  observerList.push(updateChart);\n};\n\ncanvas.onmousemove = function (e) {\n  var x = e.clientX - canvas.offsetLeft;\n  var y = e.clientY - canvas.offsetTop;\n  var index = (y * canvas.width + x) * 4;\n  var imgData = ctx.getImageData(x, y, 1, 1).data;\n  var r = imgData[index];\n  var g = imgData[index + 1];\n  var b = imgData[index + 2];\n  var a = imgData[index + 3];\n  console.log(r, g, b, a);\n};\n\nobserverList.push(updateChart);\nobserverList.push(updateBuffer);\ndocument.body.appendChild(component());\ndocument.body.appendChild(canvas);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });