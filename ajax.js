/* eslint-disable no-undef */
/** @description  封装ajax函数
 *  @param {string}obj.type http连接的方式，包括POST和GET两种方式
 *  @param {string}obj.url 发送请求的url
 *  @param {boolean}obj.async 是否为异步请求，true为异步的，false为同步的
 *  @param {object}obj.data 发送的参数，格式为对象类型
 *  @param {function}obj.success ajax发送并接收成功调用的回调函数
 *  @param {function}obj.error ajax发送失败或者接收失败调用的回调函数
 */
//  ajax({
//  	type:'get',
//  	url:'xxx',
//  	data:{
//  		id:'111'
//  	},
//  	success:function(res){
//  		console.log(res)
//  	}
//  })
export function ajax(obj) {
  obj = Object.assign({
    type: 'POST',
    url: '',
    async: true,
    data: null,
    success: function success() {},
    error: function error() {}
  }, obj);
  obj.type = obj.type.toUpperCase();
  var xmlHttp = null;
  if (XMLHttpRequest) {
    xmlHttp = new XMLHttpRequest();
  } else {
    xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
  }
  var params = [];
  for (var key in obj.data) {
    params.push(key + '=' + obj.data[key]);
  }
  var postData = params.join('&');
  if (obj.type.toUpperCase() === 'POST') {
    xmlHttp.open(obj.type, obj.url, obj.async);
    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    xmlHttp.send(postData);
  } else if (obj.type.toUpperCase() === 'GET') {
    xmlHttp.open(obj.type, obj.url + '?' + postData, obj.async);
    xmlHttp.send(null);
  }
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      obj.success(xmlHttp.responseText);
    } else {
      obj.error(xmlHttp.responseText);
    }
  };
}