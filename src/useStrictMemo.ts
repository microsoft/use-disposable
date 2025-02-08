import * as React from "react";
import { getCurrentOwner } from "./useIsStrictMode";

// we know strict mode will render useMemo facory twice
// keep a weak set to detect when the second render happens
const memoSet = new WeakSet();

export function useStrictMemo<TMemoized>(
  factory: () => any,
  deps: React.DependencyList | undefined,
): TMemoized | null {
  const factoryResultRef = React.useRef(null);
  const reactMajorVersion = React.useMemo(() => {
    return Number(React.version.split(".")[0]);
  }, [React.version]);

  return React.useMemo(() => {
    const currentOwner = getCurrentOwner();
    if (!memoSet.has(currentOwner)) {
      memoSet.add(currentOwner);

      if (reactMajorVersion < 19) {
        return null;
      }

      factoryResultRef.current = factory();
      return factoryResultRef.current;
    }

    return reactMajorVersion < 19 ? factory() : factoryResultRef.current;
  }, deps);
}
