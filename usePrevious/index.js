import { useEffect, useRef } from 'react';

export function usePrevious(value) {
  // ref对象是一个通用容器其current属性为可变的，并且可以容纳任何值，类似与一个类上的实例属性。
  var ref = useRef();

  // Store current value in ref
  useEffect(function () {
    ref.current = value;
  }, [value]); // 只有当值改变时重新运行

  // 返回更新前的值 (发生在useEffect更新之前)
  return ref.current;
}
export default usePrevious;