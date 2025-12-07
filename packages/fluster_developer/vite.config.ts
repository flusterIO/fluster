import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        /* @ts-expect-error -- Not sure what it's complaining about... it works. */
        dts({
            insertTypesEntry: true,
            copyDtsFiles: true,
        }),
    ],
    clearScreen: false,
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            formats: ["es"],
            name: "fluster",
            fileName: (c) => `index.${c}.js`,
            cssFileName: "themes",
        },
        commonjsOptions: { transformMixedEsModules: true },
        rollupOptions: {
            external: ["react", "react-dom", "tailwindcss"],
        },
        sourcemap: true,
        emptyOutDir: false,
    },
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: "./tests/setup.js",
    },
});
