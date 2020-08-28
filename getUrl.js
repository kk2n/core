/* eslint-disable */
import URL from 'url';
/**
 【获取url参数】
 * @description 获取url参数
 * @param url，网址
 * @param key url上的参数名
 * @return 返回一个对象 {{}}
 */
export var getUrl = function getUrl(key) {
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location.href;

  var pa = url.substring(url.indexOf('?') + 1),
      arrS = pa.split('&'),
      rs = {};
  for (var i = 0, _len = arrS.length; i < _len; i++) {
    var pos = arrS[i].indexOf('=');
    if (pos === -1) continue;
    var name = arrS[i].substring(0, pos);
    rs[name] = window.decodeURIComponent(arrS[i].substring(pos + 1));
  }
  return key ? rs[key] : rs;
};

/**
 * 获取Url参数，
 *
 * @param {any} url //url地址
 * @param {any} params //参数名
 * 有params返回参数名的值，string
 * 没有parama 返回整个参数 object
 * 例子：
 * http://abc.com/xx?id=1
 * getUrlParams('id') ==> 1
 */
export var getUrlObj = function getUrlObj() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location.href;
  return params ? URL.parse(url, { querystring: true }).query[params] : URL.parse(url, { querystring: true });
};

export default {
  getUrl: getUrl,
  getUrlObj: getUrlObj
};