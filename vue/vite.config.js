import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === "user-card" || tag.startsWith("ui-"),
        },
      },
    }),
  ],
  server: {
    proxy: { "/api": "http://localhost:8000" },
  },
});
