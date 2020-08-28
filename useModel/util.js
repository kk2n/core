var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

export var isFunction = function isFunction(fn) {
  return typeof fn === 'function';
};
export var isUndefined = function isUndefined(prop) {
  return typeof prop === 'undefined';
};
export var isObject = function isObject(o) {
  return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object';
};
export var isArray = function isArray(o) {
  return Array.isArray(o);
};

export var isPromise = function isPromise(fn) {
  // eslint-disable-next-line no-undef
  if (fn instanceof Promise) return true;
  return isObject(fn) && isFunction(fn.then);
};

export var addProxy = function addProxy(o, handler) {
  if (!isObject(o) || o === null) return o;
  if (isArray(o)) {
    o.forEach(function (item, index) {
      if (isObject(item)) {
        o[index] = addProxy(item, handler);
      }
    });
  } else if (isObject(o)) {
    Object.keys(o).forEach(function (key) {
      if (isObject(o[key])) {
        o[key] = addProxy(o[key], handler);
      }
    });
  }
  // eslint-disable-next-line no-undef
  return new Proxy(o, handler);
};