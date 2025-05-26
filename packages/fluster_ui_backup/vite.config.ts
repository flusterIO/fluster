import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

const host = process.env.TAURI_DEV_HOST;

// https://vite.dev/config/
export default defineConfig(() => ({
    plugins: [tailwindcss(), react(), tsconfigPaths()],
    build: {
        lib: {
            entry: resolve(__dirname, "lib/index.js"),
            name: "fluster",
            // the proper extensions will be added
            fileName: "ui",
        },
    },
    rollupOptions: {
        external: ["react"],
        output: {
            globals: {
                react: "React",
            },
        },
    },

    // build: {
    //     lib: {
    //         entry: resolve(__dirname, "lib/main.ts"),
    //         formats: ["es"],
    //     },
    // },
    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    //
    // 1. prevent Vite from obscuring rust errors
    clearScreen: false,
    // 2. tauri expects a fixed port, fail if that port is not available
    server: {
        port: 3000,
        strictPort: true,
        host: host || false,
        hmr: host
            ? {
                protocol: "ws",
                host,
                port: 3001,
            }
            : undefined,
        watch: {
            // 3. tell Vite to ignore watching `src-tauri`
            ignored: ["**/src-tauri/**"],
        },
    },
    resolve: {
        alias: {
            "#": resolve(__dirname, "./src/"),
        },
    },
}));
