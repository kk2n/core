import _regeneratorRuntime from 'babel-runtime/regenerator';

var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { useEffect, useState } from 'react';

export var useAPI = function useAPI(API) {
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var params = arguments[2];
  var depend = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  var _useState = useState(false),
      loading = _useState[0],
      setLoading = _useState[1];

  var _useState2 = useState(null),
      data = _useState2[0],
      setData = _useState2[1];

  var _useState3 = useState(null),
      error = _useState3[0],
      setError = _useState3[1];

  var _useState4 = useState(false),
      status = _useState4[0],
      setStatus = _useState4[1];

  var methodPath = url.split(' ');
  var method = ['get', 'post', 'GET', 'POST'].includes(methodPath[0]) ? API[methodPath[0]] : API.get;
  var paths = ['get', 'post', 'GET', 'POST'].includes(methodPath[0]) ? methodPath[1] : methodPath[0];
  var getData = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(newParams) {
      var _ref2, d, ok;

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
              return method(paths, newParams || params);

            case 6:
              _ref2 = _context.sent;
              d = _ref2.data;
              ok = _ref2.status;

              if (ok) {
                _context.next = 11;
                break;
              }

              return _context.abrupt('return', false);

            case 11:
              setData(d);
              setStatus(ok);
              _context.next = 18;
              break;

            case 15:
              _context.prev = 15;
              _context.t0 = _context['catch'](3);

              setError(_context.t0.message);

            case 18:
              _context.prev = 18;

              setLoading(false);
              return _context.finish(18);

            case 21:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[3, 15, 18, 21]]);
    }));

    return function getData(_x3) {
      return _ref.apply(this, arguments);
    };
  }();
  useEffect(function () {
    getData().then();
  }, depend);
  return { loading: loading, data: data, status: status, getData: getData, error: error };
};

/*
项目中的公共方法
export const useAPI = (path, parmas, deps) => useFetch(API, path, parmas, deps)

具体的使用
let { data: haiYuQX } = useAPI('get /biz/auth/operation/permission', {
  type: 'MIS_CLIENT_ONLY_INNER_SEA'
})
或
let { data: haiYuQX } = useAPI('get /biz/auth/operation/permission', {
  type: 'MIS_CLIENT_ONLY_INNER_SEA'
},[haiYuQX])
* */

/*
一般用法 axios中声明
export const useAPI = (path, parmas, desp) => useFetch(API, path, parmas, desp)

页面调用，直接得到数据
  let { data } = useAPI('get /biz/auth/detail/staff', { a: 1 })
* */