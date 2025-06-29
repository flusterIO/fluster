import path from "node:path";
import { createRequire } from "node:module";
import { defineConfig, normalizePath } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

const host = process.env.TAURI_DEV_HOST;
const require = createRequire(import.meta.url);
const pdfjsDistPath = path.dirname(require.resolve("pdfjs-dist/package.json"));
const cMapsDir = normalizePath(path.join(pdfjsDistPath, "cmaps"));

const rootDir = process.env.FLUSTER_NATIVE_ROOT;

if (!rootDir) {
    throw Error(
        "Cannot continue without the FLUSTER_NATIVE_ROOT environment variable set to the root of the monorepo"
    );
}

const publicDir = path.join(rootDir, "apps", "fluster", "public");

export default defineConfig({
    plugins: [
        tailwindcss(),
        react(),
        tsconfigPaths(),
        viteStaticCopy({
            targets: [
                {
                    src: cMapsDir,
                    dest: "",
                },
                // {
                //     src: publicDir,
                //     dest: "",
                // },
            ],
        }),
    ],
    clearScreen: false,
    assetsInclude: ["./public/**/*"],
    publicDir: "./public",
    // envPrefix: ["VITE_", "TAURI_ENV_*"],
    // build: {
    //     target:
    //         process.env.TAURI_ENV_PLATFORM == "windows" ? "chrome105" : "safari13",
    //     minify: !process.env.TAURI_ENV_DEBUG ? "esbuild" : false,
    //     sourcemap: !!process.env.TAURI_ENV_DEBUG,
    // },
    server: {
        port: 1420,
        strictPort: true,
        host: host || false,
        hmr: host
            ? {
                protocol: "ws",
                host,
                port: 1421,
            }
            : undefined,
        watch: {
            // 3. tell Vite to ignore watching `src-tauri`
            ignored: ["**/src-tauri/**"],
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src/core/"),
            "#": path.resolve(__dirname, "./src/features/"),
        },
    },
});
