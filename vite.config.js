import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "js",
    emptyOutDir: false,
    target: "es2020",
    lib: {
      entry: "js/src/main.js",
      formats: ["es"],
      fileName: () => "main.js",
    },
  },
});
