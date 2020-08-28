var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

export function lsSet(key, value) {
  if (typeof value === 'string') {
    return localStorage.setItem(key, value);
  } else if (typeof value === 'undefined') {
    return localStorage.setItem(key, '');
  } else if (typeof value === 'number') {
    return localStorage.setItem(key, value.toString());
  } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
    return localStorage.setItem(key, JSON.stringify(value));
  }
}

// 客户端存储数据,取数据
export function lsGet(key) {
  return localStorage.getItem(key);
}

// 客户端存储数据,del数据
export function lsDel(val) {
  return localStorage.removeItem(val);
}

export default { lsSet: lsSet, lsGet: lsGet, lsDel: lsDel };