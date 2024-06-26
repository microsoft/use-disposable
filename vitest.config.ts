/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    environment: "jsdom",
    exclude: ["src/**/*.16.17.test.ts", "node_modules/**"],
  },
});
