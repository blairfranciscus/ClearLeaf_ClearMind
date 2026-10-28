import { defineConfig } from "@playwright/test";
import config from "./playwright.config";
export default defineConfig({
  ...config,
  use: { ...config.use, baseURL: "http://127.0.0.1:4173/ClearLeaf_ClearMind/" },
  webServer: {
    command: "npm run preview -- --port 4173 --base /ClearLeaf_ClearMind/",
    url: "http://127.0.0.1:4173/ClearLeaf_ClearMind/",
    reuseExistingServer: false,
  },
});
