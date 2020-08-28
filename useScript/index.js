import { useState, useEffect } from 'react';
import useToggle from '../useToggle';

// Hook
var cachedScripts = [];
export function useScript(src) {
  // 持续跟踪script加载完成和失败的状态
  var _useState = useState({
    loaded: false,
    error: false
  }),
      state = _useState[0],
      setState = _useState[1];

  useEffect(function () {
    // 如果cachedScripts数组中存在这个src则代表另一个hook的实例加载了这个script，所以不需要再加载一遍
    if (cachedScripts.includes(src)) {
      setState({
        loaded: true,
        error: false
      });
    } else {
      cachedScripts.push(src);
      // 创建script标签
      var script = document.createElement('script');
      script.src = src;
      script.async = true;
      // Script事件监听方法
      var onScriptLoad = function onScriptLoad() {
        setState({
          loaded: true,
          error: false
        });
      };

      var onScriptError = function onScriptError() {
        // 当失败时，将cachedScripts中移除，这样我们可以重新尝试加载
        var index = cachedScripts.indexOf(src);
        if (index >= 0) cachedScripts.splice(index, 1);
        script.remove();

        setState({
          loaded: true,
          error: true
        });
      };

      script.addEventListener('load', onScriptLoad);
      script.addEventListener('error', onScriptError);

      // 将script添加到文档中
      document.body.appendChild(script);

      // 在cleanup回调中清除事件监听
      return function () {
        script.removeEventListener('load', onScriptLoad);
        script.removeEventListener('error', onScriptError);
      };
    }
  }, [src] // 只有当src改变时才会重新运行
  );

  return [state.loaded, state.error];
}
export default useScript;
/*
加载第三方js
用法
// Usage
function App() {
  const [loaded, error] = useScript(
    'https://pm28k14qlj.codesandbox.io/test-external-script.js'
  );
 
  return (
    <div>
      <div>
        Script loaded: <b>{loaded.toString()}</b>
      </div>
      {loaded && !error && (
        <div>
          Script function call response: <b>{TEST_SCRIPT.start()}</b>
        </div>
      )}
    </div>
  );


* */