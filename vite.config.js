import { cpSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const STATIC = [
  "assets",
  "css",
  "legal",
  "brand",
  "wallpapers",
  "404.html",
  "robots.txt",
  "sitemap.xml",
];

function copyStatic() {
  return {
    name: "copy-static",
    apply: "build",
    closeBundle() {
      const root = process.cwd();
      const out = resolve(root, "dist");
      for (const item of STATIC) {
        const from = resolve(root, item);
        if (existsSync(from)) cpSync(from, resolve(out, item), { recursive: true });
      }
    },
  };
}

export default defineConfig({
  base: "./",
  publicDir: false,
  css: { postcss: {} },
  plugins: [
    viteSingleFile({
      useRecommendedBuildConfig: false,
      removeViteModuleLoader: true,
    }),
    copyStatic(),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    assetsDir: "",
    cssCodeSplit: false,
    assetsInlineLimit: 0,
    rollupOptions: {
      input: resolve(process.cwd(), "index.html"),
    },
  },
});
