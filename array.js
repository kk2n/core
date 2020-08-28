import _ from 'underscore';
/**
 * 将不是数组的对象转化成数组，默认为:[]
 * @param arr
 * @param defaultValue 默认值
 * @returns {Array}
 */
export var toArr = function toArr(arr) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (!_.isArray(arr)) return defaultValue;
  return arr;
};
/**
 * 将数组转成含有对象的数组
 * @param arr
 * @param name 变成数组的键名
 * @returns {Array}
 * eg:toObj([1,2,3],'id') ====> [{id:1},{id:2},{id:3}]
 */
export var toObj = function toObj(arr, name) {
  if (!_.isArray(arr)) return null;
  if (!name) return null;
  var str = [];
  arr.forEach(function (c) {
    var _str$push;

    return str.push((_str$push = {}, _str$push[name] = c, _str$push));
  });
  return str;
};

/**
 * 数组中是否有某个对象（只要一个kek相同,就返回真）
 * @param arr
 * @param obj 对象
 * @returns {boolean}
 * eg:hasObj([{id:1,name:'22'}],{id:1}) ====> true
 */
export var hasObj = function hasObj(arr, obj) {
  if (!_.isArray(arr)) return null;
  if (!_.isObject(obj)) return null;
  var tarr = _.find(arr, function (x) {
    return _.isEqual([x[_.keys(obj)]], _.values(obj));
  });
  return _.isObject(tarr);
};

/**
 * 数组中找到某一个对象，返回一个对象
 * @param obj 返回一个对象
 * @param arr
 * eg:findObj([{id:1,name:'22'}],{id:1}) ====> {id:1,name:'22'}
 */
export var findObj = function findObj(arr, obj) {
  return _.find(arr, function (x) {
    if (!_.isArray(arr)) return null;
    if (!_.isObject(obj)) return null;
    return _.isEqual([x[_.keys(obj)]], _.values(obj));
  });
};

/**
 * 数组中是否有某个对象的位置（只要一个kek相同,就返回index）
 * @param arr
 * @param obj
 * @returns {*} 返回索引或-1
 * eg:objIndex([{id:1,name:'22'}],{id:1}) ====> 0
 */
export var objIndex = function objIndex(arr, obj) {
  if (!_.isArray(arr)) return null;
  if (!_.isObject(obj)) return null;
  var index = arr.indexOf(findObj(arr, obj));
  if (index >= 0) return index;
  return -1;
};

/**
 * 排除数组中的对象Obj，返回一个数组
 * @param arr
 * @param obj
 * @returns {Array}
 * eg:rejectObj([{id:1,name:'22'}],{id:1}) ====> []
 */
export var rejectObj = function rejectObj(arr, obj) {
  if (!_.isArray(arr)) return null;
  if (!_.isObject(obj)) return null;
  return _.reject(arr, function (x) {
    return _.isEqual([x[_.keys(obj)]], _.values(obj));
  });
};

/**
 * 过滤数组中的对象Obj，返回一个数组
 * @param obj
 * @param arr
 * @returns {Array}
 * eg:filterObj([{id:1,name:'22'}],{id:1}) ====> [{id:1,name:'22'}]
 */
export var filterObj = function filterObj(arr, obj) {
  if (!_.isArray(arr)) return null;
  if (!_.isObject(obj)) return null;
  return _.filter(arr, function (x) {
    return _.isEqual([x[_.keys(obj)]], _.values(obj));
  });
};

/**
 * 数组中替换某个Obj，返回一个数组
 * @param arr
 * @param obj  需要替换的对象
 * @param obj2,替换成的对象
 * @returns {*}
 * eg:replaceObj([{id:1,name:'22'}],{id:1},{id:2}) ====> [{id:2}]
 */
export var replaceObj = function replaceObj(arr, obj, obj2) {
  if (!_.isArray(arr)) return null;
  if (!_.isObject(obj)) return null;
  if (!_.isObject(obj2)) return null;
  var index = arr.indexOf(findObj(arr, obj));
  if (index >= 0) {
    arr.splice(index, 1, obj2);
    return [].concat(arr);
  }
  return -1;
};

/**
 * 随机从数组中取一个值
 * @returns {*} 一个对象
 * @private
 */
export var getRandomObj = function getRandomObj(arr) {
  if (!_.isArray(arr)) return null;
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * 数组去重
 * @returns {Array}
 * @private
 */
export var arrOnly = function arrOnly(arr) {
  if (!_.isArray(arr)) return null;
  return _.uniq(arr);
};

/**
 * 数组去重
 param {Array} arr-待去重数组
 unique([1,2,3,4,2,1,2,3,4,5])
 result: [1, 2, 3, 4, 5]
 */
export var unique = arrOnly;

/*export let unique = arr => {
  if (!_.isArray(arr)) return null
  //es6
  return [...new Set(arr)]
}*/
/**
 * @description 数组顺序打乱,返回一个新的数组
 * @param arr
 * @return {Array.[]}
 * upsetArr([1,2,3,4,5,6,7,8,9,0])
 result:  [7, 1, 3, 2, 4, 6, 8, 9, 0, 5]
 */
export var randomArr = function randomArr(arr) {
  if (!_.isArray(arr)) return null;
  var j = void 0,
      tempitem = void 0;
  for (var i = 0; i < arr.length; i++) {
    j = Math.floor(Math.random() * i);
    tempitem = arr[i];
    arr[i] = arr[j];
    arr[j] = tempitem;
  }
  return arr;
};

/**
 * 数组去掉无效的值
 * @param arr
 * @return array
 */
export var rejectBad = function rejectBad(arr) {
  if (!_.isArray(arr)) return null;
  return _.compact(arr);
};

export default {
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
  rejectBad: rejectBad
};