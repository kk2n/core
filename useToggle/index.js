import { useState } from 'react';
export function useToggle() {
  var defaultOnValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  var _useState = useState(defaultOnValue),
      istoggledOn = _useState[0],
      setIsToggledOn = _useState[1];

  function clickHandler() {
    setIsToggledOn(function (prevState) {
      return !prevState;
    });
  }
  return [istoggledOn, clickHandler];
}

export default useToggle;