var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import { stringify } from 'qs';
import axios from 'axios';
import { ymConf } from './ymConf';

export function Api(config) {
  var resIntercept = config.resIntercept,
      reqIntercept = config.reqIntercept,
      conf = _objectWithoutProperties(config, ['resIntercept', 'reqIntercept']);

  var transformObj = config.paramIsString ? {
    transformRequest: [function (data) {
      return stringify(data);
    }]
  } : {};
  var axiosConfig = _extends({
    method: 'get',
    //携带cookies
    withCredentials: false
  }, transformObj, {
    baseURL: '//' + ymConf('env') + 'api.' + ymConf('domain'),
    //超时
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  }, conf);
  //默认的错误处理
  function errorFn(error, txt) {
    console.log('txt', txt);
    return Promise.reject(error);
  }

  var ajax = axios.create(axiosConfig);
  //请求拦截器
  ajax.interceptors.request.use(reqIntercept);
  // 响应拦截器
  ajax.interceptors.response.use(resIntercept, function (error) {
    return errorFn(error, '[ajax.interceptors.request,接口访问错误]');
  });
  this.ajax = ajax;
  //绑定方法
  this.get = function (url, param, config) {
    return ajax.get(url + (param ? stringify(param, { addQueryPrefix: true }) : ''), config);
  };
  this.post = ajax.post;
}

export default Api;