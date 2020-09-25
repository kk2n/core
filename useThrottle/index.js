import { useEffect, useRef, useCallback } from 'react';

export function useThrottle(fn, delay) {
  var dep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var _useRef = useRef({ fn: fn, timer: null }),
      current = _useRef.current;

  useEffect(function () {
    current.fn = fn;
  }, [fn]);

  return useCallback(function f() {
    if (!current.timer) {
      var _current$fn;

      current.timer = setTimeout(function () {
        delete current.timer;
      }, delay);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (_current$fn = current.fn).call.apply(_current$fn, [this].concat(args));
    }
  }, dep);
}