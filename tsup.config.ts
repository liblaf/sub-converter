import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/client/sing-box/index.ts",
    "src/filter/index.ts",
    "src/provider/index.ts",
    "src/utils/index.ts",
  ],
  minify: true,
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
});
