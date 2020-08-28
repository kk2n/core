import { useState } from 'react';
export function useLocalStorage(key, initialValue) {
  // State to store our value
  var _useState = useState(function () {
    try {
      // 通过key值从localstorage中获取值
      var item = window.localStorage.getItem(key);
      // 如果没有返回初始值则解析储存的json
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // 如果报错了依旧返回初始值
      console.log(error);
      return initialValue;
    }
  }),
      storedValue = _useState[0],
      setStoredValue = _useState[1];

  // 返回useState的setter函数的包装版本，该函数将新的值保存到localstorage中


  var setValue = function setValue(value) {
    try {
      // 允许值是一个函数，这样我们就有了和useState一样的api
      var valueToStore = value instanceof Function ? value(storedValue) : value;
      // 保存state
      setStoredValue(valueToStore);
      // 保存到localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // 更高级实现的处理将会处理错误的情况
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
export default useLocalStorage;

/*
localstorage设置
// Usage
function App() {
  // 与useState相似，但是第一个参数是localstorage中的key值
  const [name, setName] = useLocalStorage('name', 'Bob');
 
  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
    </div>
  );
}

* */