import * as React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { stub } from "./stub";

describe("stub", () => {
  it("stub test", () => {
    const { container } = render(<div>{stub}</div>);
    expect(container.textContent).toBe("stub");
  });
});
