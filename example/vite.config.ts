import { solidStart } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  // The app is a static SPA loaded by the Tauri webview; there is no server runtime.
  // Nitro's static preset prerenders index.html into `.output/public` (tauri.conf.json frontendDist).
  plugins: [solidStart({ ssr: false }), nitro(), tailwindcss()],
  nitro: {
    preset: "static",
    prerender: {
      routes: ["/"],
    },
  },

  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  // 1. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      // 2. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
  // 3. to make use of `TAURI_DEBUG` and other env variables
  // https://v2.tauri.app/reference/environment-variables/
  envPrefix: ["VITE_", "TAURI_"],
});
