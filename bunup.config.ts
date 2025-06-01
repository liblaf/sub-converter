import { defineConfig } from "bunup";
import { exports } from "bunup/plugins";

export default defineConfig({
  entry: ["src/index.ts", "src/bin/sub-converter.ts"],
  format: ["esm"],
  minify: true,
  dts: true,
  target: "bun",
  sourcemap: "linked",
  plugins: [exports()],
});
