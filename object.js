var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { isObject } from 'underscore';
export function get(source, path) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

  // a[3].b -> a.3.b
  var paths = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  var result = source;
  for (var _iterator = paths, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var p = _ref;

    result = Object(result)[p];
    if (result === undefined) {
      return defaultValue;
    }
  }
  return result;
}

export function merge(source, other) {
  if (!isObject(source) || !isObject(other)) {
    return other === undefined ? source : other;
  }
  // 合并两个对象的 key，另外要区分数组的初始值为 []
  return Object.keys(_extends({}, source, other)).reduce(function (acc, key) {
    // 递归合并 value
    acc[key] = merge(source[key], other[key]);
    return acc;
  }, Array.isArray(source) ? [] : {});
}

export default {
  get: get,
  merge: merge
};