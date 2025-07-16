import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  use: {
    baseURL: "http://localhost:3000",
  },

  webServer: {
    command: "npm run dev",
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },

  projects: [
    {
      name: "api",
      testMatch: /.*\.api\.spec\.ts$/,
      use: {
        baseURL: "http://localhost:3000",
      },
    },

    {
      name: "e2e",
      testMatch: /.*\.e2e\.spec\.ts$/,
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "http://localhost:3000",
        viewport: { width: 1280, height: 720 },
      },
    },

    {
      name: "visual",
      testMatch: /.*\.visual\.spec\.ts$/,
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "http://localhost:3000",
        viewport: { width: 1280, height: 720 },
      },
    },
  ],
})
