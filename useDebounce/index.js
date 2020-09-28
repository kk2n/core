import { useEffect, useRef, useCallback } from 'react'

export function useDebounce(fn, delay) {
  var dep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : []

  var _useRef = useRef({ fn: fn, timer: null }),
    current = _useRef.current

  useEffect(
    function() {
      current.fn = fn
    },
    [fn]
  )

  return useCallback(function f() {
    var _this = this

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key]
    }

    if (current.timer) clearTimeout(current.timer)
    current.timer = setTimeout(function() {
      var _current$fn
      ;(_current$fn = current.fn).call.apply(_current$fn, [_this].concat(args))
    }, delay)
  }, dep)
}
