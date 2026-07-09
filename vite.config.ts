import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // Bundle CommonJS deps into the SSR output so the prerender script can import
  // it cleanly (avoids "named export not found" from CJS modules under Node ESM).
  ssr: {
    noExternal: ["react-helmet-async", "react-fast-compare", "invariant", "shallowequal"],
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            manualChunks: {
              motion: ["framer-motion"],
              router: ["react-router-dom"],
            },
          },
        },
  },
}));
