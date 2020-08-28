import _regeneratorRuntime from 'babel-runtime/regenerator';

var _this = this;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { useEffect, useState } from 'react';
import axios from 'axios';

var fetchFn = function fetchFn(options) {
  return axios(_extends({
    method: 'get'
  }, options));
};

var useFetch = function useFetch(options) {
  var deps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var _useState = useState(false),
      loading = _useState[0],
      setLoading = _useState[1];

  var _useState2 = useState(null),
      res = _useState2[0],
      setRes = _useState2[1];

  var _useState3 = useState(null),
      error = _useState3[0],
      setError = _useState3[1];

  var fetchData = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var _ref2, data;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!loading) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return');

            case 2:
              setLoading(true);
              _context.prev = 3;
              _context.next = 6;
              return fetchFn(options);

            case 6:
              _ref2 = _context.sent;
              data = _ref2.data;

              setRes(data);
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context['catch'](3);

              setError(_context.t0.message);

            case 14:
              _context.prev = 14;

              setLoading(false);
              return _context.finish(14);

            case 17:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[3, 11, 14, 17]]);
    }));

    return function fetchData() {
      return _ref.apply(this, arguments);
    };
  }();
  useEffect(function () {
    fetchData();
  }, deps);
  return [loading, res, fetchData, error];
};

export { useFetch };