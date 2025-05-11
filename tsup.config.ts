import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts", "./src/bin/sub-converter.ts"],
  minify: true,
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
});
