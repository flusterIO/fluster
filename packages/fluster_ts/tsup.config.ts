import { defineConfig } from "tsup";
import { globSync } from "glob";

const getRoot = (): string => {
    let x = process.env.FLUSTER_NATIVE_ROOT;
    if (!x) {
        throw new Error(
            "Cannot continue without FLUSTER_NATIVE_ROOT environment variable.",
        );
    }
    return x.endsWith("/") ? x : `${x}/`;
};

export default defineConfig({
    format: ["cjs", "esm"],
    entry: globSync(`${getRoot()}packages/fluster_ts/src/**/*.ts`, {
        ignore: ["node_modules", "tsup.config.ts"],
        absolute: true,
    }),
    dts: true,
    shims: true,
    skipNodeModulesBundle: true,
    clean: true,
});
