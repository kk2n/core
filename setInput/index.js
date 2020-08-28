var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { useState } from 'react';
export var setInput = function setInput() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var otherFn = arguments[1];
  var by = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'value,onChange,onReset';

  var _useState = useState(initialState),
      value = _useState[0],
      setValue = _useState[1];

  var onChange = function onChange(event) {
    setValue(event.target.value);
    otherFn && otherFn(event.target.value);
  };
  var reset = function reset(newValue) {
    setValue(newValue || initialState);
    otherFn && otherFn(newValue);
  };
  return [value, onChange, reset].reduce(function (x, y, z) {
    var _ref;

    return _extends({}, x, by.split(',')[z] ? (_ref = {}, _ref[by.split(',')[z]] = y, _ref) : {});
  }, {});
};