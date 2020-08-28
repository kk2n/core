/* eslint-disable no-control-regex */
/**
 * 返回字符串的实际长度, 一个汉字算2个长度
 * param str 字符
 * zh 中文算几个字符，默认算一个，如果要算两个 ,设置zh="**"
 * @returns {*}
 */
export var strLen = function strLen(str) {
  var zh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '*';

  if (typeof str !== 'string') return null;
  return str.replace(/[^\x00-\xff]/g, zh).length;
};

/**
 * 字符串超出省略
 * @param str
 * @param len，长度
 * @returns {*}
 * @private
 */
export var cutStr = function cutStr(str, len) {
  if (typeof str !== 'string') return null;
  if (typeof len !== 'number') return null;
  var restr = str;
  var wlength = str.replace(/[^\x00-\xff]/g, '**').length;
  if (wlength > len) {
    for (var k = len / 2; k < str.length; k++) {
      if (str.substr(0, k).replace(/[^\x00-\xff]/g, '**').length >= len) {
        restr = str.substr(0, k) + '..';
        break;
      }
    }
  }
  return restr;
};

/**
 * 替换全部
 * @param str
 * @param s1
 * @param s2
 * @returns {*}
 */
export var replaceAll = function replaceAll(str, s1, s2) {
  if (typeof str !== 'string') return null;
  if (typeof s1 !== 'string') return null;
  if (typeof s2 !== 'string') return null;
  return str.replace(new RegExp(s1, 'gm'), s2);
};

/**
 * 字符串循环复制
 * @param str
 * @param n
 * @returns {*}
 */
export var strRepeat = function strRepeat(str, n) {
  if (typeof str !== 'string') return null;
  if (typeof n !== 'number') return null;
  return str.repeat(n);
};

/**
 * 字符串去空格
 * @returns {*}
 */
export var trim = function trim(target) {
  if (typeof target !== 'string') return null;
  return target.replace(/(^\s*)|(\s*$)/g, '');
};

export var trimAll = function trimAll(target) {
  if (typeof target !== 'string') return null;
  return target.replace(/\s+/g, '');
};

/**
 * 字符串去左边的空格
 * @returns {*}
 */
export var trimLeft = function trimLeft(target) {
  if (typeof target !== 'string') return null;
  return target.replace(/(^\s*)/g, '');
};

/**
 * 字符串去右边的空格
 * @returns {*}
 */
export var trimRight = function trimRight(target) {
  if (typeof target !== 'string') return null;
  return target.replace(/(\s*$)/g, '');
};

/**
 * 判断是否以某个字符串开头
 * @param target
 * @param str
 * @returns {boolean}
 */
export var startWith = function startWith(target, str) {
  if (typeof target !== 'string') return null;
  if (typeof str !== 'string') return null;
  return target.indexOf(str) === 0;
};

/**
 * 判断是否以某个字符串结束
 * @param target
 * @param str
 * @returns {boolean}
 */
export var endWith = function endWith(target, str) {
  if (typeof target !== 'string') return null;
  if (typeof str !== 'string') return null;
  var d = target.length - str.length;
  return d >= 0 && target.lastIndexOf(str) === d;
};

/**
 * -随机码
 * @param count 取值范围2-36,2代表2进制
 * @returns {string}
 */
export var randomWord = function randomWord() {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 36;

  if (count < 2 || count > 36) return null;
  return Math.random().toString(count).substring(2);
};
export default {
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
  randomWord: randomWord
};