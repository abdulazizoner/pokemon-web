import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/visual",
  workers: 1,
  reporter: "line",
  webServer: {
    command: "pnpm preview --host 127.0.0.1 --port 4321",
    url: "http://127.0.0.1:4321",
    reuseExistingServer: false,
  },
  use: {
    baseURL: "http://127.0.0.1:4321",
    contextOptions: {
      reducedMotion: "reduce",
    },
  },
});
