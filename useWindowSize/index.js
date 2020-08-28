var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

import { useEffect, useState } from 'react';

export function useWindowSize() {
  var isClient = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object';
  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  var _useState = useState(getSize),
      windowSize = _useState[0],
      setWindowSize = _useState[1];

  useEffect(function () {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return function () {
      return window.removeEventListener('resize', handleResize);
    };
  }, []); // 空数组保证effect只会在mount和unmount执行

  return windowSize;
}
export default useWindowSize;

/*
获取window尺寸
// Usage
function App() {
  const size = useWindowSize();
 
  return (
    <div>
      {size.width}px / {size.height}px
    </div>
  );

* */