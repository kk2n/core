import { useLayoutEffect } from 'react';
// Hook
export function useLockScroll() {
  useLayoutEffect(function () {
    // 获取原始body的overflow值
    var originalStyle = window.getComputedStyle(document.body).overflow;
    //防止在mount的过程中滚动
    document.body.style.overflow = 'hidden';
    // 当组件unmount的时候解锁滚动
    return function () {
      return document.body.style.overflow = originalStyle;
    };
  }, []); // 空数组保证了effect函数只会在mount和unmount的时候运行
}
export default useLockScroll;
/*
禁止body 滚动
用法
function Modal({ title, content, onClose }){
  // 调用hook锁定body滚动
  useLockScroll();
 
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal">
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );


* */