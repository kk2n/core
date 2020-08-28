import _regeneratorRuntime from 'babel-runtime/regenerator';

var _this = this;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var reduxMiddleware = function reduxMiddleware(API) {
  return function (store) {
    return function (next) {
      return function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(action) {
          var dispatch, getState, promise, types, afterSuccess, rest, SUCCESS, FAILURE, onFulfilled, onRejected, url, _promise$method, method, param, config;

          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  dispatch = store.dispatch, getState = store.getState;
                  // 如果dispatch来的是一个function，此处不做处理，直接进入下一级

                  if (!(typeof action === 'function')) {
                    _context.next = 3;
                    break;
                  }

                  return _context.abrupt('return', action(dispatch, getState));

                case 3:

                  /*解析action*/
                  promise = action.promise, types = action.types, afterSuccess = action.afterSuccess, rest = _objectWithoutProperties(action, ['promise', 'types', 'afterSuccess']);
                  // 没有promise，证明不是想要发送ajax请求的，就直接进入下一步啦！

                  if (action.promise) {
                    _context.next = 6;
                    break;
                  }

                  return _context.abrupt('return', next(_extends({}, action, { type: action.types || action.type })));

                case 6:

                  /**
                   * 分解异步请求的三个阶段
                   */
                  SUCCESS = types[0];
                  FAILURE = types[1] || 'FAILURE';

                  /**
                   * 发出请求时
                   */
                  // next({
                  //   ...rest,
                  //   type: REQUEST
                  // });

                  /**
                   * 发出请求，成功时
                   */

                  onFulfilled = function onFulfilled(result, load) {
                    next(_extends({}, rest, {
                      payload: _extends({}, result),
                      type: SUCCESS
                    }));
                    //单独设置成功后的回调
                    if (afterSuccess) {
                      afterSuccess(result, dispatch, getState);
                    }
                  };

                  /**
                   * 发出请求，失败时
                   */


                  onRejected = function onRejected(error) {
                    next(_extends({}, rest, {
                      payload: _extends({}, error),
                      error: error,
                      type: FAILURE
                    }));
                  };

                  /*传递 url 时*/
                  //与后台接口，约定：get,delete,传参的方式为query,path,其他全部body


                  if (!((typeof promise === 'undefined' ? 'undefined' : _typeof(promise)) === 'object' && promise.url)) {
                    _context.next = 13;
                    break;
                  }

                  url = promise.url, _promise$method = promise.method, method = _promise$method === undefined ? 'get' : _promise$method, param = promise.param, config = promise.config;
                  return _context.abrupt('return', API[method](url, param, config).then(function (res) {
                    return onFulfilled(res);
                  }, function (res) {
                    return onRejected(res);
                  }));

                case 13:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }();
    };
  };
};
export { reduxMiddleware };
export default { reduxMiddleware: reduxMiddleware };