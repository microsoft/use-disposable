import * as React from "react";

export const getCurrentOwner = () =>
  // @ts-ignore - using react internals
  React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner
    .current;

const REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");

/**
 * Traverses up the React fiber tree to find the the strict mode component.
 * Note: This only detects strict mode from React >= 18
 * https://github.com/reactwg/react-18/discussions/19
 * @returns If strict mode is being used in the React tree
 */
export const useIsStrictMode = (): boolean => {
  const isStrictMode = React.useRef<boolean | undefined>(undefined);
  const reactMajorVersion = React.useMemo(() => {
    return Number(React.version.split(".")[0]);
  }, [React.version]);

  if (isNaN(reactMajorVersion) || reactMajorVersion < 18) {
    return false;
  }

  if (isStrictMode.current === undefined) {
    let currentOwner = getCurrentOwner();
    while (currentOwner.return) {
      currentOwner = currentOwner.return;
      if (
        currentOwner.type === REACT_STRICT_MODE_TYPE ||
        currentOwner.elementType === REACT_STRICT_MODE_TYPE
      ) {
        isStrictMode.current = true;
      }
    }
  }

  return !!isStrictMode.current;
};
