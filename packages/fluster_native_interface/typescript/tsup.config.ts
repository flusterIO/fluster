import { defineConfig } from "tsup";
import path from "path";

const ensureEnv = (k: string): string => {
  let x = process.env[k];
  if (!x) {
    console.log(`Cannot continue without the ${k} variable`);
    process.exit(1);
  }
  return x;
};

const base_path = path.join(
  ensureEnv("FLUSTER_NATIVE_ROOT"),
    "packages",
    "fluster_native_interface",
    "typescript"
);


const _entry = path.join(
  base_path,
    "src",
  ensureEnv("FLUSTER_TS_IN"),
);

const _out = path.join(
    base_path,
    "dist",
  ensureEnv("FLUSTER_TS_OUT"),
);

export default defineConfig({
  format: ["cjs"],
  entry: [_entry],
  experimentalDts: false,
  outExtension: (ctx) => {
    return {
      dts: ".d.ts",
      js: ctx.format == "cjs" ? ".cjs" : ".mjs",
    };
  },
  outDir: _out,
  dts: true,
  shims: true,
  skipNodeModulesBundle: true,
  clean: true,
});
