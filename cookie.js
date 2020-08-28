import Cookies from 'js-cookie';

/**
 * 设置cookie
 * @param key
 * @param val
 * @param time
 * @param path
 * @param domain
 * @returns {*}
 */
export function csSet(key, val, time, path, domain) {
  if (time && path && domain) {
    return Cookies.set(key, val, { expires: time, path: path, domain: domain });
  }
  if (time && path) {
    return Cookies.set(key, val, { expires: time, path: path });
  }
  if (time) {
    return Cookies.set(key, val, { expires: time });
  }
  if (path) {
    return Cookies.set(key, val, { path: path });
  }
  return Cookies.set(key, val);
}

/**
 * 获取cookie
 * @param key
 * @returns {*}
 */
export function csGet(key) {
  if (!key) {
    //获取所有的cookie
    return Cookies.get();
  }
  return Cookies.get(key);
}

/**
 * 删除cookie
 * @param key
 * @param path
 * @param domain
 * @returns {*}
 */
export function csDel(key, path, domain) {
  if (path) {
    return Cookies.remove(key, { path: path, domain: domain });
  }
  return Cookies.remove(key);
}

export default {
  csSet: csSet,
  csGet: csGet,
  csDel: csDel
};