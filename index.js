var ymConf = require('./ymConf').default.ymConf;

var Api = require('./axios').default.Api;

var _require$default = require('./array').default,
    toObj = _require$default.toObj,
    hasObj = _require$default.hasObj,
    findObj = _require$default.findObj,
    objIndex = _require$default.objIndex,
    rejectObj = _require$default.rejectObj,
    filterObj = _require$default.filterObj,
    replaceObj = _require$default.replaceObj,
    getRandomObj = _require$default.getRandomObj,
    arrOnly = _require$default.arrOnly,
    unique = _require$default.unique,
    randomArr = _require$default.randomArr,
    rejectBad = _require$default.rejectBad;

var _require$default2 = require('./object').default,
    get = _require$default2.get,
    merge = _require$default2.merge;

var _require$default3 = require('./getUrl').default,
    getUrl = _require$default3.getUrl,
    getUrlObj = _require$default3.getUrlObj;

var _require$default4 = require('./cookie').default,
    csSet = _require$default4.csSet,
    csGet = _require$default4.csGet,
    csDel = _require$default4.csDel;

var _require$default5 = require('./localStorage').default,
    lsSet = _require$default5.lsSet,
    lsGet = _require$default5.lsGet,
    lsDel = _require$default5.lsDel;

var _require$default6 = require('./session').default,
    ssSet = _require$default6.ssSet,
    ssGet = _require$default6.ssGet,
    ssDel = _require$default6.ssDel,
    ssDelAll = _require$default6.ssDelAll;

var ajax = require('./ajax');

var _require$default7 = require('./string').default,
    strLen = _require$default7.strLen,
    cutStr = _require$default7.cutStr,
    replaceAll = _require$default7.replaceAll,
    strRepeat = _require$default7.strRepeat,
    trim = _require$default7.trim,
    trimAll = _require$default7.trimAll,
    trimLeft = _require$default7.trimLeft,
    trimRight = _require$default7.trimRight,
    startWith = _require$default7.startWith,
    endWith = _require$default7.endWith,
    randomWord = _require$default7.randomWord;

var mask = require('./mask').default;

var _require = require('./createModel'),
    createModel = _require.createModel,
    mergeReduce = _require.mergeReduce,
    Provider = _require.Provider,
    connect = _require.connect,
    createStore = _require.createStore;

var reduxMiddleware = require('./reduxMiddleware').default.reduxMiddleware;

module.exports = {
  //溢米常用配置
  ymConf: ymConf,
  //axios请求方法
  Api: Api,
  //ajax原生请求方法
  ajax: ajax,
  //数组常用的处理方法
  toObj: toObj,
  hasObj: hasObj,
  findObj: findObj,
  objIndex: objIndex,
  rejectObj: rejectObj,
  filterObj: filterObj,
  replaceObj: replaceObj,
  getRandomObj: getRandomObj,
  arrOnly: arrOnly,
  unique: unique,
  randomArr: randomArr,
  rejectBad: rejectBad,
  //对象获取值
  get: get,
  merge: merge,
  //URL参数获取
  getUrl: getUrl,
  getUrlObj: getUrlObj,
  //cokie操作
  csSet: csSet,
  csGet: csGet,
  csDel: csDel,
  //localStorage操作
  lsSet: lsSet,
  lsGet: lsGet,
  lsDel: lsDel,
  //session操作
  ssSet: ssSet,
  ssGet: ssGet,
  ssDel: ssDel,
  ssDelAll: ssDelAll,
  //遮罩
  mask: mask,
  //字符处理
  strLen: strLen,
  cutStr: cutStr,
  replaceAll: replaceAll,
  strRepeat: strRepeat,
  trim: trim,
  trimAll: trimAll,
  trimLeft: trimLeft,
  trimRight: trimRight,
  startWith: startWith,
  endWith: endWith,
  randomWord: randomWord,
  //reduce数据，model生成
  createModel: createModel,
  mergeReduce: mergeReduce,
  Provider: Provider,
  connect: connect,
  createStore: createStore,
  //溢米reduX中间件
  reduxMiddleware: reduxMiddleware
};