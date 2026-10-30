import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  build: {
    outDir: "docs",
    rollupOptions: {
      input: [
        "index.html",
        "about.html",
        "products.html",
        "cart.html",
        "events.html",
        "join-our-team.html",
        "packaging.html",
      ],
    },
  },
});
