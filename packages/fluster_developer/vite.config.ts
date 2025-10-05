import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import { treatAsCommonjs } from "vite-plugin-treat-umd-as-commonjs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    treatAsCommonjs(),
    dts({
      insertTypesEntry: true,
      copyDtsFiles: true,
    }),
    {
      name: "raw-css-as-string",
      enforce: "pre",
      async resolveId(source, importer) {
        if (source.endsWith(".raw.css") && !source.includes("?raw")) {
          // rewrite import to append ?raw query
          const resolved = await this.resolve(source + "?raw", importer, {
            skipSelf: true,
          });
          if (resolved) return resolved.id;
          return null;
        }
        return null;
      },
    },
    {
      name: "fix-text-query",
      enforce: "pre",
      async resolveId(source, importer) {
        if (source.includes("?text")) {
          const fixed = source.replace("?text", "?raw");
          const resolved = await this.resolve(fixed, importer, {
            skipSelf: true,
          });
          if (resolved) {
            return resolved.id;
          }
          return fixed;
        }
        return null;
      },
    },
  ],
  clearScreen: false,
  resolve: {
    alias: [
      {
        find: /^~(.*)$/,
        replacement: "$1",
      },
    ],
  },
  assetsInclude: ["**/*.whl", "**/*.raw.css"],
  worker: {
    format: "es",
  },
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
      output: {
        assetFileNames: (assetInfo) => {
          if (/pypi\//.test(assetInfo.name)) {
            return "pypi/[name][extname]";
          }
          return "assets/[name][extname]";
        },
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          tailwindcss: "tailwindcss",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: false,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.js",
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".whl": "text",
      },
    },
  },
});
