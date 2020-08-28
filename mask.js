//遮罩层
/**
 * val,透明度 ，1-10
 * time,消失的时间
 * id ,自己独立的Id
 */
export default {
  //加入遮罩层
  open: function open(val, time) {
    var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'ajaxMask';

    if (document.getElementById('ajaxMask')) return false;
    var maskDom = document.createElement('div');
    maskDom.innerHTML = ''; //
    maskDom.style;
    maskDom.setAttribute('id', id);
    maskDom.setAttribute('class', 'Mask-class');
    maskDom.style.position = 'fixed';
    maskDom.style.top = 0;
    maskDom.style.width = '100%';
    maskDom.style.height = '100%';
    maskDom.style.zIndex = 1009;
    maskDom.style.backgroundColor = '#3C3F41';
    maskDom.style.opacity = Number(val) / 10;
    var container = document.getElementsByTagName('body')[0];
    container.appendChild(maskDom);
    //如果时间存在,自动延时关闭
    if (time) {
      setTimeout(function () {
        var myDom = document.getElementById(id);
        myDom && myDom.parentNode.removeChild(myDom);
      }, time);
    }
  },
  close: function close() {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'ajaxMask';

    // 关闭遮罩层
    var maskDom = document.getElementById(id);
    maskDom && maskDom.parentNode.removeChild(maskDom);
  }
};