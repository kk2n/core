import _regeneratorRuntime from 'babel-runtime/regenerator';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/* eslint-disable */
import { mapObject, keys, values, intersection, isUndefined, isFunction, isObject, isString, isArray, invert, groupBy } from 'underscore';
import { connect as conn } from 'react-redux';
import Prov from 'react-redux/es/components/Provider';
import { createStore as create, applyMiddleware, combineReducers } from 'redux';
import { reduxMiddleware } from './reduxMiddleware';
import { handleActions } from 'redux-actions';
import { composeWithDevTools } from 'redux-devtools-extension';

export var createStore = function createStore(data, API) {
  var Middleware = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var combineReducersData = combineReducers(mapObject(data, function (item) {
    return handleActions.apply(undefined, item);
  }));
  var Midd = [reduxMiddleware(API)].concat(Middleware);
  return { store: create(combineReducersData, composeWithDevTools(applyMiddleware.apply(undefined, Midd))), combineReducersData: combineReducersData };
};
export var connect = conn;
export var Provider = Prov;

/**
 * action创建功能的公共封装
 * @param model object  每个模块的model对象,
 * 例：
 {
   name:"App"   // string  模块的名称,它应按模块命名，用在store树上的键，并且会使用，类似：App_getData作为actionType
   initState:{} // object 进入reduce的默认值
   // object 页面执行的动作,里面必须有reduce, reduce为箭头函数，对应redux-reduce里的语句，
   【其他】promise为选填,他为对象，例{ url: '/', method: 'get' }
   【其他】action为选填,函数，，携带信息(参数)进入reduce,例(payload,meta)=>{},参数：payload,meta
   getAges: {
    promise:{ url: '/', method: 'get' },
    reduce: (state, res) => {
      return {
        ...state,
        id: 1
      }
    }
  }
 }
 * @param modelState //箭头函数，参数为所有的state,从reduce里取部分state给模块，
 * @param otherAction //箭头函数，参数为当前model的所有action, 从reduce里取部分action给模块，如需要其他模块action请自行引入,注意action名称重复
 * @return 返回一个对象，{name, connect: *, reduce: []}
 例：{
   name,// string model的name，用于：store树的键
   connect: *, //redux的connect方法，用于，模块用装饰器的方法导入【部分的state】和【部分的action】
   reduce: [reduce,initState] //1.为当前模块需要reduce的数据，2.当前模块的初始值，用于导入全局的store
 }
 */
export function createModel() {
  var model = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _this = this,
      _reduce2;

  var modelState = arguments[1];
  var otherAction = arguments[2];

  //验证参数
  if (!isObject(model)) throw new Error('"model"\u7684\u7C7B\u578B\u4E0D\u6B63\u786E\uFF01\u4EC5\u652F\u6301object');

  //业务代码

  var name = model.name,
      initState = model.initState,
      _model$upState = model.upState,
      upState = _model$upState === undefined ? {} : _model$upState,
      actions = _objectWithoutProperties(model, ['name', 'initState', 'upState']),
      reduce = {};
  //处理upState


  var upStateToActionArr = {};
  mapObject(upState, function (a, aa) {
    return upStateToActionArr[aa + 'Up'] = aa;
  });
  actions = _extends({}, upStateToActionArr, actions);
  initState = _extends({}, initState, upState);
  var act = mapObject(actions, function (a, aa) {
    //处理带有get或post的actions
    if (isString(a) && ['post', 'get', 'POST', 'GET'].includes(a.split(' ')[0])) {
      //将a处理成对象
      a = {
        autoReduce: true,
        promise: {
          url: a
        }
      };
    }
    //autoReduce为真时，处理初始值
    if (a.autoReduce) {
      var _extends2;

      //初始值
      initState = _extends({}, initState, (_extends2 = {}, _extends2[aa + 'Res'] = _extends({}, initState[aa + 'Res'], {
        msg: '',
        status: false,
        data: null
      }), _extends2));
    }
    //处理reduce
    reduce[name + '_' + aa] = function (state, res) {
      //如果是字符，直接返回，改变数据
      if (isString(a)) {
        var _extends3;

        return _extends({}, state, (_extends3 = {}, _extends3[a] = res.meta, _extends3));
      }

      //验证reduce
      if (!isFunction(a.reduce) && !isUndefined(a.reduce) && !isObject(a.reduce)) throw new Error(name + '\u6A21\u5757\u91CC' + a + '\u7684reduce\u7C7B\u578B\u4E0D\u6B63\u786E\uFF01\u4EC5\u652F\u6301function,object,undefined');

      //当autoReduce存在时
      if (a.autoReduce) {
        //reduce为函数时，执行该函数
        if (!isFunction(a.reduce) && isObject(a.reduce) || isUndefined(a.reduce)) {
          var _extends4;

          //reduce为对象时，与原state合并,并自动处理reduce
          return _extends({}, state, a.reduce, (_extends4 = {}, _extends4[aa + 'Res'] = _extends({}, state[aa + 'Res'], {
            msg: res.payload.message || res.payload.msg,
            status: res.payload.status,
            data: res.payload.data
          }), _extends4));
        } else {
          return a.reduce(state, res);
        }
      } else if (isFunction(a.reduce)) {
        //没有autoReduce时，并且reduce是函数
        return a.reduce(state, res);
      } else if (isObject(a.reduce)) {
        //reduce是对象
        return _extends({}, state, a.reduce);
      } else {
        //如果reduce和autoReduce都为undefined,抛出错误
        throw new Error(name + '\u6A21\u5757\u91CC' + a + '\u7684reduce\u9519\u8BEF\uFF01\u5B83\u652F\u6301\u7684\u7C7B\u578B\u4E3Afunction,object\uFF0C\u4F46\u662F\u73B0\u5728reduce\uFF1A' + a.reduce + '\uFF0CautoReduce\uFF1A' + a.autoReduce);
      }
    };
    //返回action
    return function (meta) {
      //如果有action，直接执行action，//调用方法，可以是serve层调用接口
      if (!isFunction(a.action) && !isUndefined(a.action)) throw new Error(name + '\u6A21\u5757\u91CC' + aa + '\u7684\u7C7B\u578B\u4E0D\u6B63\u786E\uFF01\u4EC5\u652F\u6301function');
      if (!isFunction(a.promise) && !isUndefined(a.promise) && !isObject(a.promise) && !isString(a.promise)) throw new Error(name + '\u6A21\u5757\u91CC' + aa + '\u7684promise\u7C7B\u578B\u4E0D\u6B63\u786E\uFF01\u4EC5\u652F\u6301function,object,undefined,string');
      if (a.action) {
        return function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(dispatch) {
            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.t0 = dispatch;
                    _context.t1 = name + '_' + aa;
                    _context.next = 4;
                    return a.action(meta);

                  case 4:
                    _context.t2 = _context.sent;
                    _context.t3 = meta;
                    _context.t4 = {
                      type: _context.t1,
                      payload: _context.t2,
                      meta: _context.t3
                    };
                    (0, _context.t0)(_context.t4);

                  case 8:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this);
          }));

          return function (_x3) {
            return _ref.apply(this, arguments);
          };
        }();
      } else {
        //如果没有action
        // 只有promise存在，不返回状态
        if (isFunction(a.promise)) {
          var _a$promise = a.promise(meta),
              promise = _objectWithoutProperties(_a$promise, []);

          var param = _objectWithoutProperties(meta, []);

          return {
            types: [name + '_' + aa],
            promise: _extends({}, promise, { param: param, meta: meta }),
            meta: meta
          };
        } else if (isString(a.promise)) {
          //promise是个字符串时，无法设置config配置
          var allUrl = a.promise.split(' ');
          if (['get', 'post', 'GET', 'POST'].includes(allUrl[0])) {
            var _promise = {
              url: allUrl[1],
              method: allUrl[0]
            };
            return {
              types: [name + '_' + aa],
              promise: _extends({}, _promise, { param: meta }),
              meta: meta
            };
          }
        } else if (isObject(a.promise)) {
          //promise是个对象时
          var _allUrl = a.promise.url.split(' ');
          if (['get', 'post', 'GET', 'POST'].includes(_allUrl[0])) {
            var _promise2 = {
              url: _allUrl[1],
              method: _allUrl[0]
            };
            return {
              types: [name + '_' + aa],
              promise: _extends({}, _promise2, { param: meta }),
              meta: meta
            };
          }
          return {
            types: [name + '_' + aa],
            promise: _extends({}, a.promise, {
              param: meta,
              meta: meta,
              config: a.promise.config
            }),
            meta: meta
          };
        }
        //既没有promise,有没有action，返回原始的action
        return {
          type: [name + '_' + aa],
          meta: meta
        };
      }
    };
  });

  //处理modelState
  if (!isFunction(modelState) && !isUndefined(modelState) && !isString(modelState) && !isObject(modelState)) throw new Error('modelState\u7684\u7C7B\u578B\u4E0D\u6B63\u786E\uFF01\u4EC5\u652F\u6301function,undefined,String,Object');
  //如果是字符，加载单个
  if (isString(modelState)) {
    var key = modelState;
    modelState = function modelState(state) {
      var _ref2;

      return _ref2 = {}, _ref2[key] = state[key], _ref2;
    };
  }
  if (isObject(modelState) && !isArray(modelState) && !isFunction(modelState)) {
    var StateFn = function StateFn(x) {
      return function (state) {
        return mapObject(x, function (a, aa) {
          return state[aa];
        });
      };
    };
    modelState = StateFn(modelState);
  }
  //如果是数组
  //如果是数组
  if (isArray(modelState)) {
    var _StateFn = function _StateFn(x) {
      return function (state) {
        return mapObject(x, function (a, aa) {
          return state[aa];
        });
      };
    };
    modelState = _StateFn(invert(groupBy(modelState)));
  }
  //如果没有设置，加载全部
  if (isUndefined(modelState)) {
    modelState = function modelState(state) {
      return _extends({}, state);
    };
  }
  // 如果有第三个参数，代表设置新的mapAction
  if (!isFunction(otherAction) && !isUndefined(otherAction)) throw new Error('"otherAction"\u7684\u7C7B\u578B\u4E0D\u6B63\u786E\uFF01\u4EC5\u652F\u6301function,undefined');
  if (otherAction) {
    var _reduce;

    return {
      name: name,
      actions: act,
      connect: connect(modelState, otherAction(act)),
      reduce: (_reduce = {}, _reduce[name] = [reduce, initState], _reduce)
    };
  }
  // 如果没有第三个参数，则返回所有的Action
  return {
    name: name,
    actions: act,
    connect: connect(modelState, act),
    reduce: (_reduce2 = {}, _reduce2[name] = [reduce, initState], _reduce2)
  };
}

/**
 merge合并reduce,用于合并二级页面或三级页面的reduce值
 * @param parent 对象，合并的第一值
 * @param child 数组，要合并的其他reduce(reduce是对象)
 */
// export function mergeReduce(parent = {}, child = []) {
//   let temp = values(parent)[0]
//   const tParent0 = keys(temp[0])
//   const tParent1 = keys(temp[1])
//   child.forEach(a => {
//     //判断是否存在重复的键
//     const vVal0 = values(a)[0][0]
//     const vVal1 = values(a)[0][1]
//     const ActionJJ = intersection(tParent0, keys(vVal0))
//     if (ActionJJ.length > 0) throw new Error('存在相同的Action' + ActionJJ.join(','))
//     const initStateJJ = intersection(tParent1, keys(vVal1))
//     if (initStateJJ.length > 0) throw new Error('存在相同的initState：' + initStateJJ.join(','))
//     //数据合并
//     temp[0] = { ...temp[0], ...vVal0 }
//     temp[1] = { ...temp[1], ...vVal1 }
//   })
//   return { [keys(parent)[0]]: temp }
// }

// 完整的例子
/*
import createAction from '../../utils/createAction'
import { actions as aa } from '../demo2/demo.model'
export const model = {
  name: 'Demo',
  initValue: {
    id2: ''
  },
  getAges: {
    reduce: (state, res) => {
      return {
        ...state,
        id: 2
      }
    }
  },
  getAges2: {
    reduce: (state, res) => {
      return {
        ...state,
        id2: 2
      }
    }
  }
}
 //其他模块action
let { getAges: aa2 } = aa
//取部分数据给页面[应用的页面]
export let { name, connect, reduce, actions } = createAction(
  model,
  state => ({
    demo: state.Demo
  }),
  action => ({
    ...action,
    aa2: aa2
  })
)
//合并子模块
reduce = mergeReduce(reduce, [account])
*/

//合并 merge合并reduce,用于合并二级页面或三级页面的reduce值
export function mergeReduce(parent, childred) {
  var _ref3;

  if (!isObject(parent)) {
    throw new Error('mergeReduce\u65B9\u6CD5\u7B2C\u4E00\u4E2A\u53C2\u6570\u4E0D\u662Fobject');
  }
  if (!isArray(childred)) {
    throw new Error('mergeReduce\u65B9\u6CD5\u7B2C\u4E8C\u4E2A\u53C2\u6570\u4E0D\u662F\u6570\u7EC4');
  }
  var temp = values(parent)[0];
  childred.forEach(function (a) {
    //判断是否存在重复的键
    var ActionJJ = intersection(keys(temp[0]), keys(values(a)[0][0]));
    if (ActionJJ.length > 0) throw new Error(keys(parent)[0] + '\u5B58\u5728\u76F8\u540C\u7684Action\uFF1A' + ActionJJ.join(','));
    var initStateJJ = intersection(keys(temp[1]), keys(values(a)[0][1]));
    if (initStateJJ.length > 0) throw new Error(keys(parent)[0] + '\u5B58\u5728\u76F8\u540C\u7684initState\uFF1A' + initStateJJ.join(','));
    //数据合并
    temp[0] = _extends({}, temp[0], values(a)[0][0]);
    temp[1] = _extends({}, temp[1], values(a)[0][1]);
  });
  return _ref3 = {}, _ref3[keys(parent)[0]] = temp, _ref3;
}