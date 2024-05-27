import { describe, it, vi, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import * as React from "react";
import { useDisposable } from "./useDisposable";
import { useStrictEffect } from "./useStrictEffect";
import { useStrictMemo } from "./useStrictMemo";

vi.mock("./useStrictMemo.ts");
vi.mock("./useStrictEffect.ts");

describe("useDisposable", () => {
  describe("in strict mode", () => {
    it("should not call strict effect or memo", () => {
      const factory = vi.fn().mockReturnValue(["foo", vi.fn()]);
      renderHook(() => useDisposable(factory, []), {
        wrapper: React.StrictMode,
      });

      expect(useStrictEffect).not.toHaveBeenCalled();
      expect(useStrictMemo).not.toHaveBeenCalled();
    });
  });

  describe("not strict mode", () => {
    it("should not call strict effect or memo", () => {
      const factory = vi.fn().mockReturnValue(["foo", vi.fn()]);
      renderHook(() => useDisposable(factory, []));

      expect(useStrictEffect).not.toHaveBeenCalled();
      expect(useStrictMemo).not.toHaveBeenCalled();
    });
  });
});
