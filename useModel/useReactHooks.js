import React from 'react';
var useState = React.useState,
    useEffect = React.useEffect;

import { subScribe, unSubScribe } from './pub';
export default (function (name) {
  var _useState = useState(),
      setState = _useState[1];

  useEffect(function () {
    subScribe(name, setState);
    return function () {
      return unSubScribe(name, setState);
    };
  }, []);
});