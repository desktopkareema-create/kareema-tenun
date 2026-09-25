import { fileURLToPath, URL } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

/**
 * Vitest configuration for the frontend suite.
 *
 * The `test` script passes `--environment jsdom` explicitly, so the DOM
 * environment is configured in two places on purpose: the script is what the
 * root `test` gate runs, and this file is what a bare `vitest` invocation
 * picks up. Keeping both means neither entry point silently runs the DOM
 * tests under Node.
 *
 * `vite.config.js` is deliberately not reused: it loads `vite-plugin-environment`
 * and reads `DFX_NETWORK`/`II_URL` at import time, which the test run does not
 * need and which would make the suite depend on deployment environment.
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "declarations",
        replacement: fileURLToPath(new URL("../declarations", import.meta.url)),
      },
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
    dedupe: ["@icp-sdk/core"],
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    restoreMocks: true,
    // Pin the forks pool bounds explicitly. The sandbox exports conflicting
    // `VITEST_MIN_FORKS`/`VITEST_MAX_FORKS` (or the thread equivalents), which
    // Vitest forwards to tinypool as `minThreads`/`maxThreads`; when the
    // inherited minimum exceeds the maximum, tinypool throws
    // `RangeError: options.minThreads and options.maxThreads must not conflict`
    // before a single test file is collected. Config values take precedence
    // over the environment, so stating both bounds here makes the run
    // independent of whatever the host exports.
    pool: "forks",
    poolOptions: {
      forks: {
        minForks: 1,
        maxForks: 1,
      },
    },
  },
});
