import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  root: ".",
  build: {
    outDir: "dist",
    minify: "esbuild",
    sourcemap: true,
  },
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      "@capacitor-community/contacts": path.resolve(
        __dirname,
        "src/contacts-mock.ts"
      ),
    },
  },
});
