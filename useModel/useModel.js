import { addProxy } from './util';
import useReactHooks from './useReactHooks';

export var stores = {};
export var store = addProxy({}, {
  get: function get(target, key) {
    //没有找到值返回空对象
    if (!stores[key]) {
      console.log('stores.' + [key] + '\uFF0C\u672A\u627E\u5230\uFF01');
    }
    useReactHooks(key);
    return stores[key];
  }
});
export default (function (namespace) {
  return store[namespace];
});