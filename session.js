var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// session存储数据,设置数据
export function ssSet(key, value) {
  if (typeof value === 'string') {
    return sessionStorage.setItem(key, value);
  } else if (typeof value === 'undefined') {
    return sessionStorage.setItem(key, '');
  } else if (typeof value === 'number') {
    return sessionStorage.setItem(key, value.toString());
  } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
    return sessionStorage.setItem(key, JSON.stringify(value));
  }
}

// session存储数据,取数据
export function ssGet(key) {
  return sessionStorage.getItem(key);
}

// session存储数据,取数据
export function ssGetObj(key) {
  return JSON.parse(sessionStorage.getItem(key));
}

// session存储数据,删数据
export function ssDel(val) {
  return sessionStorage.removeItem(val);
}

// session存储数据,删所有数据
export function ssDelAll() {
  return sessionStorage.clear();
}

export default {
  ssSet: ssSet,
  ssGet: ssGet,
  ssDel: ssDel,
  ssDelAll: ssDelAll
};