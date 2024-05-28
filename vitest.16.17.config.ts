/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["**/*.16.17.test.ts"],
  },
  resolve: {
    alias: {
      "@testing-library/react": "@testing-library/react-hooks",
    },
  },
});
