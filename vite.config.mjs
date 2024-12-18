// https://github.com/aleclarson/vite-tsconfig-paths
// https://vitest.dev/guide/common-errors.html#cannot-find-module-relative-path
import { config } from "dotenv";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    env: config({ path: ".env" }).parsed,
  },
});
