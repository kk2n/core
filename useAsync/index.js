var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { useEffect, useState } from 'react';

export var useAsync = function useAsync(effect, destroy) {
  var depend = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var hasDestroy = typeof destroy === 'function';
  var myDepend = (hasDestroy ? depend : destroy) || [];

  var _useState = useState(null),
      res = _useState[0],
      setRes = _useState[1];

  var asyncFn = function asyncFn() {
    var mounted = true;
    var result = null;
    var creatInt = void 0;
    if (mounted) {
      // eslint-disable-next-line no-undef
      Promise.resolve(effect(function () {
        return mounted;
      })).then(function (value) {
        result = value;
        creatInt = setInterval(function () {
          return setRes(value);
        }, 1000);
      });
    }
    return function () {
      clearInterval(creatInt);
      hasDestroy && destroy(result);
      return mounted = false;
    };
  };
  useEffect(asyncFn, myDepend);
  return _extends({ asyncFn: asyncFn }, res);
};

/*
   let { data } = useAsync(() => {
     return API.get('/biz/auth/detail/staff', {})
   })

  useAsync(async () => {
    let { data } = await API.get('/biz/auth/detail/staff', {})
    await m.bbUp(data)
  })
* */

/*
useAsync(
  () => API.get('/biz/auth/detail/staff', {}),
  res => {
    console.log('unmunt22ff444', res)
  },
  []
)

useAsync(
  () => {
    return API.get('/biz/auth/detail/staff', {})
  },
  res => {
    console.log('unmunt22ff444', res)
  },
  []
)

* */