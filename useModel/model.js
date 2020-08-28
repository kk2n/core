import _regeneratorRuntime from 'babel-runtime/regenerator';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import { addProxy, isFunction, isPromise, isUndefined } from './util';
import { broadcast } from './pub';
import _useModel, { stores } from './useModel';
var disableProps = ['loading', 'stores', 'useModel', 'update', 'API'];

export default (function (_ref) {
  var _ref$namespace = _ref.namespace,
      namespace = _ref$namespace === undefined ? '' : _ref$namespace,
      API = _ref.API,
      rest = _objectWithoutProperties(_ref, ['namespace', 'API']);

  //临时对象
  var service = {};
  //是否时改变中
  var isChanged = false;
  var reducers = {};
  var state = { namespace: namespace };
  if (!namespace) throw new Error('请设置命名空间');
  //直接取值，直接返回
  if (stores[namespace]) return stores[namespace];
  //不能设置的key
  disableProps.forEach(function (key) {
    if (!isUndefined(rest[key])) {
      throw new Error(key + '\uFF0C\u4E0D\u80FD\u8BBE\u7F6E\u4E3Akey!');
    }
  });

  Object.keys(rest).forEach(function (key) {
    //如果是函数时
    if (isFunction(rest[key])) {
      reducers[key] = rest[key];
    } else {
      //自定处理请求方法
      var method = typeof rest[key] === 'string' && rest[key].split(' ');
      if (['get', 'GET', 'post', 'POST'].includes(method[0])) {
        //自动加上key
        state[key + 'Res'] = {
          data: null,
          msg: 'msg',
          status: false
        };
        if (!API) {
          console.log('API缺失，无法发出请求！');
          return false;
        }
        //自动加上请求方法
        reducers[key] = function () {
          var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(params) {
            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return API[method[0]](method[1], params);

                  case 2:
                    state[key + 'Res'] = _context.sent;

                  case 3:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          return function (_x) {
            return _ref2.apply(this, arguments);
          };
        }();
      } else {
        //自动加上更新
        reducers[key + 'Up'] = function (x) {
          stores[namespace][key] = x;
        };
        state[key] = rest[key];
      }
    }
    //额外加上一个更新的方法setState
    reducers['update'] = function (x) {
      Object.keys(x).forEach(function (a) {
        return stores[namespace][a] = x[a];
      });
    };
  });

  var checkReducersStatus = function checkReducersStatus(name) {
    var keys = Object.keys(reducers);
    for (var i = 0; i < keys.length; i++) {
      if (service[keys[i]][name]) return true;
    }
    return false;
  };

  var handler = {
    set: function set(target, prop, newValue) {
      if (disableProps.includes(prop) || isFunction(newValue)) {
        target[prop] = newValue;
        return true;
      }
      if (!checkReducersStatus('unlock')) {
        console.error('不要再组件中改变状态，请在model中定义方法改变值！', 'namespace:' + namespace + ', prop:' + prop + ', value:' + newValue);
      }
      if (target[prop] !== newValue) {
        isChanged = true;
      }
      target[prop] = addProxy(newValue, handler);
      return true;
    }
  };
  service = addProxy(state, handler);

  var checkUpdateAndBroadcast = function checkUpdateAndBroadcast() {
    if (isChanged) {
      isChanged = false;
      broadcast(namespace, Math.random());
    }
  };

  Object.keys(reducers).forEach(function (key) {
    service[key] = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      service[key].unlock = true;
      var promise = reducers[key].apply(service, args);
      if (!isPromise(promise)) {
        service[key].unlock = false;
        checkUpdateAndBroadcast();
        return promise;
      }
      isChanged = true;
      service[key].loading = true;
      service[key].unlock = true;
      checkUpdateAndBroadcast();
      return new Promise(function (resolve, reject) {
        promise.then(resolve).catch(reject).finally(function () {
          isChanged = true;
          service[key].loading = false;
          service[key].unlock = false;
          checkUpdateAndBroadcast();
        });
      });
    };
    service[key].loading = false;
    service[key].unlock = false;
  });

  Object.defineProperty(service, 'loading', {
    get: function get() {
      return checkReducersStatus('loading');
    }
  });

  Object.assign(service, {
    stores: stores,
    useModel: function useModel() {
      return _useModel()[namespace];
    }
  });

  stores[namespace] = service;
  return service;
});