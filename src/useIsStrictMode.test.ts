import * as React from "react";
import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useIsStrictMode } from "./useIsStrictMode";

describe("useIsStrictMode", () => {
  it("should return true if wrapped with StrictMode", () => {
    const { result } = renderHook(useIsStrictMode, {
      wrapper: React.StrictMode,
    });

    expect(result.current).toBe(true);
  });

  it("should return true if not wrapped with StrictMode", () => {
    const { result } = renderHook(useIsStrictMode);

    expect(result.current).toBe(false);
  });
});
