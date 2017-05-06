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
/******/ 	__webpack_require__.p = "/orbit/development/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 123);
/******/ })
/************************************************************************/
/******/ ({

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bodies = [];
var lastUpdate = 0;
var intervalId = null;
var speed = 0;

self.onmessage = function (_ref) {
  var _ref$data = _ref.data,
      type = _ref$data.type,
      value = _ref$data.value;

  switch (type) {
    case 'init':
      bodies = value;
      break;

    case 'run':
      lastUpdate = performance.now();
      intervalId = self.setInterval(update);
      break;

    case 'pause':
      self.clearInterval(intervalId);
      break;

    case 'get_bodies':
      self.postMessage(bodies);
      break;

    case 'add_body':
      bodies.push(value);
      break;

    case 'set_speed':
      speed = value;
      break;
  }
};

var update = function update() {
  var now = performance.now();
  var elapsed = now - lastUpdate;
  lastUpdate = now;

  var length = bodies.length;
  for (var i = 0; i < length; ++i) {
    var ax = 0;
    var ay = 0;

    for (var j = 0; j < length; ++j) {
      if (i === j) continue;
      var coefficient = -bodies[j].mass * Math.pow(Math.pow(bodies[i].x - bodies[j].x, 2) + Math.pow(bodies[i].y - bodies[j].y, 2), -1.5);
      ax += coefficient * (bodies[i].x - bodies[j].x);
      ay += coefficient * (bodies[i].y - bodies[j].y);
    }

    bodies[i].vx += ax * elapsed * speed;
    bodies[i].vy += ay * elapsed * speed;
    bodies[i].x += bodies[i].vx * elapsed * speed;
    bodies[i].y += bodies[i].vy * elapsed * speed;
  }
};

// vim: set ts=2 sw=2 et:

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2U1OWQ1MmViNzBhMzViYjA0ODI/YmJlZCoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FjdGlvbnMvYm9keVVwZGF0ZXIud29ya2VyLmpzIl0sIm5hbWVzIjpbImJvZGllcyIsImxhc3RVcGRhdGUiLCJpbnRlcnZhbElkIiwic3BlZWQiLCJzZWxmIiwib25tZXNzYWdlIiwiZGF0YSIsInR5cGUiLCJ2YWx1ZSIsInBlcmZvcm1hbmNlIiwibm93Iiwic2V0SW50ZXJ2YWwiLCJ1cGRhdGUiLCJjbGVhckludGVydmFsIiwicG9zdE1lc3NhZ2UiLCJwdXNoIiwiZWxhcHNlZCIsImxlbmd0aCIsImkiLCJheCIsImF5IiwiaiIsImNvZWZmaWNpZW50IiwibWFzcyIsIngiLCJ5IiwidngiLCJ2eSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQy9EQSxJQUFJQSxTQUFTLEVBQWI7QUFDQSxJQUFJQyxhQUFhLENBQWpCO0FBQ0EsSUFBSUMsYUFBYSxJQUFqQjtBQUNBLElBQUlDLFFBQVEsQ0FBWjs7QUFFQUMsS0FBS0MsU0FBTCxHQUFpQixnQkFBK0I7QUFBQSx1QkFBNUJDLElBQTRCO0FBQUEsTUFBcEJDLElBQW9CLGFBQXBCQSxJQUFvQjtBQUFBLE1BQWRDLEtBQWMsYUFBZEEsS0FBYzs7QUFDOUMsVUFBUUQsSUFBUjtBQUNFLFNBQUssTUFBTDtBQUNFUCxlQUFTUSxLQUFUO0FBQ0E7O0FBRUYsU0FBSyxLQUFMO0FBQ0VQLG1CQUFhUSxZQUFZQyxHQUFaLEVBQWI7QUFDQVIsbUJBQWFFLEtBQUtPLFdBQUwsQ0FBaUJDLE1BQWpCLENBQWI7QUFDQTs7QUFFRixTQUFLLE9BQUw7QUFDRVIsV0FBS1MsYUFBTCxDQUFtQlgsVUFBbkI7QUFDQTs7QUFFRixTQUFLLFlBQUw7QUFDRUUsV0FBS1UsV0FBTCxDQUFpQmQsTUFBakI7QUFDQTs7QUFFRixTQUFLLFVBQUw7QUFDRUEsYUFBT2UsSUFBUCxDQUFZUCxLQUFaO0FBQ0E7O0FBRUYsU0FBSyxXQUFMO0FBQ0VMLGNBQVFLLEtBQVI7QUFDQTtBQXhCSjtBQTBCRCxDQTNCRDs7QUE2QkEsSUFBTUksU0FBUyxTQUFUQSxNQUFTLEdBQU07QUFDbkIsTUFBTUYsTUFBTUQsWUFBWUMsR0FBWixFQUFaO0FBQ0EsTUFBTU0sVUFBVU4sTUFBTVQsVUFBdEI7QUFDQUEsZUFBYVMsR0FBYjs7QUFFQSxNQUFNTyxTQUFTakIsT0FBT2lCLE1BQXRCO0FBQ0EsT0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlELE1BQXBCLEVBQTRCLEVBQUVDLENBQTlCLEVBQWlDO0FBQy9CLFFBQUlDLEtBQUssQ0FBVDtBQUNBLFFBQUlDLEtBQUssQ0FBVDs7QUFFQSxTQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSUosTUFBcEIsRUFBNEIsRUFBRUksQ0FBOUIsRUFBaUM7QUFDL0IsVUFBSUgsTUFBTUcsQ0FBVixFQUFhO0FBQ2IsVUFBTUMsY0FBYyxDQUFDdEIsT0FBT3FCLENBQVAsRUFBVUUsSUFBWCxZQUFtQixTQUFDdkIsT0FBT2tCLENBQVAsRUFBVU0sQ0FBVixHQUFjeEIsT0FBT3FCLENBQVAsRUFBVUcsQ0FBekIsRUFBK0IsQ0FBL0IsYUFBb0N4QixPQUFPa0IsQ0FBUCxFQUFVTyxDQUFWLEdBQWN6QixPQUFPcUIsQ0FBUCxFQUFVSSxDQUE1RCxFQUFrRSxDQUFsRSxDQUFuQixFQUEyRixDQUFDLEdBQTVGLENBQXBCO0FBQ0FOLFlBQU1HLGVBQWV0QixPQUFPa0IsQ0FBUCxFQUFVTSxDQUFWLEdBQWN4QixPQUFPcUIsQ0FBUCxFQUFVRyxDQUF2QyxDQUFOO0FBQ0FKLFlBQU1FLGVBQWV0QixPQUFPa0IsQ0FBUCxFQUFVTyxDQUFWLEdBQWN6QixPQUFPcUIsQ0FBUCxFQUFVSSxDQUF2QyxDQUFOO0FBQ0Q7O0FBRUR6QixXQUFPa0IsQ0FBUCxFQUFVUSxFQUFWLElBQWdCUCxLQUFLSCxPQUFMLEdBQWViLEtBQS9CO0FBQ0FILFdBQU9rQixDQUFQLEVBQVVTLEVBQVYsSUFBZ0JQLEtBQUtKLE9BQUwsR0FBZWIsS0FBL0I7QUFDQUgsV0FBT2tCLENBQVAsRUFBVU0sQ0FBVixJQUFleEIsT0FBT2tCLENBQVAsRUFBVVEsRUFBVixHQUFlVixPQUFmLEdBQXlCYixLQUF4QztBQUNBSCxXQUFPa0IsQ0FBUCxFQUFVTyxDQUFWLElBQWV6QixPQUFPa0IsQ0FBUCxFQUFVUyxFQUFWLEdBQWVYLE9BQWYsR0FBeUJiLEtBQXhDO0FBQ0Q7QUFDRixDQXRCRDs7QUF3QkEseUIiLCJmaWxlIjoiYm9keVVwZGF0ZXIud29ya2VyLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL29yYml0L2RldmVsb3BtZW50L1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEyMyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgM2U1OWQ1MmViNzBhMzViYjA0ODIiLCIvKiBAZmxvdyAqL1xubGV0IGJvZGllcyA9IFtdXG5sZXQgbGFzdFVwZGF0ZSA9IDBcbmxldCBpbnRlcnZhbElkID0gbnVsbFxubGV0IHNwZWVkID0gMFxuXG5zZWxmLm9ubWVzc2FnZSA9ICh7IGRhdGE6IHsgdHlwZSwgdmFsdWUgfSB9KSA9PiB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ2luaXQnOlxuICAgICAgYm9kaWVzID0gdmFsdWVcbiAgICAgIGJyZWFrXG5cbiAgICBjYXNlICdydW4nOlxuICAgICAgbGFzdFVwZGF0ZSA9IHBlcmZvcm1hbmNlLm5vdygpXG4gICAgICBpbnRlcnZhbElkID0gc2VsZi5zZXRJbnRlcnZhbCh1cGRhdGUpXG4gICAgICBicmVha1xuXG4gICAgY2FzZSAncGF1c2UnOlxuICAgICAgc2VsZi5jbGVhckludGVydmFsKGludGVydmFsSWQpXG4gICAgICBicmVha1xuXG4gICAgY2FzZSAnZ2V0X2JvZGllcyc6XG4gICAgICBzZWxmLnBvc3RNZXNzYWdlKGJvZGllcylcbiAgICAgIGJyZWFrXG5cbiAgICBjYXNlICdhZGRfYm9keSc6XG4gICAgICBib2RpZXMucHVzaCh2YWx1ZSlcbiAgICAgIGJyZWFrXG5cbiAgICBjYXNlICdzZXRfc3BlZWQnOlxuICAgICAgc3BlZWQgPSB2YWx1ZVxuICAgICAgYnJlYWtcbiAgfVxufVxuXG5jb25zdCB1cGRhdGUgPSAoKSA9PiB7XG4gIGNvbnN0IG5vdyA9IHBlcmZvcm1hbmNlLm5vdygpXG4gIGNvbnN0IGVsYXBzZWQgPSBub3cgLSBsYXN0VXBkYXRlXG4gIGxhc3RVcGRhdGUgPSBub3dcblxuICBjb25zdCBsZW5ndGggPSBib2RpZXMubGVuZ3RoXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBsZXQgYXggPSAwXG4gICAgbGV0IGF5ID0gMFxuXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBsZW5ndGg7ICsraikge1xuICAgICAgaWYgKGkgPT09IGopIGNvbnRpbnVlXG4gICAgICBjb25zdCBjb2VmZmljaWVudCA9IC1ib2RpZXNbal0ubWFzcyAqICgoYm9kaWVzW2ldLnggLSBib2RpZXNbal0ueCkgKiogMiArIChib2RpZXNbaV0ueSAtIGJvZGllc1tqXS55KSAqKiAyKSAqKiAtMS41XG4gICAgICBheCArPSBjb2VmZmljaWVudCAqIChib2RpZXNbaV0ueCAtIGJvZGllc1tqXS54KVxuICAgICAgYXkgKz0gY29lZmZpY2llbnQgKiAoYm9kaWVzW2ldLnkgLSBib2RpZXNbal0ueSlcbiAgICB9XG5cbiAgICBib2RpZXNbaV0udnggKz0gYXggKiBlbGFwc2VkICogc3BlZWRcbiAgICBib2RpZXNbaV0udnkgKz0gYXkgKiBlbGFwc2VkICogc3BlZWRcbiAgICBib2RpZXNbaV0ueCArPSBib2RpZXNbaV0udnggKiBlbGFwc2VkICogc3BlZWRcbiAgICBib2RpZXNbaV0ueSArPSBib2RpZXNbaV0udnkgKiBlbGFwc2VkICogc3BlZWRcbiAgfVxufVxuXG4vLyB2aW06IHNldCB0cz0yIHN3PTIgZXQ6XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYWN0aW9ucy9ib2R5VXBkYXRlci53b3JrZXIuanMiXSwic291cmNlUm9vdCI6IiJ9