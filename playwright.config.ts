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

  outputDir: "test-results",

  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],

  projects: [
    {
      name: "api",
      testMatch: /.*\.api\.spec\.ts$/,
      use: {
        baseURL: "http://localhost:3000",
      },
    },

    {
      name: "e2e-desktop",
      testMatch: /.*\.e2e\.spec\.ts$/,
      outputDir: "test-results/e2e-desktop",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "http://localhost:3000",
        viewport: { width: 1280, height: 720 },
        trace: "retain-on-failure",
        video: "retain-on-failure",
        screenshot: "only-on-failure",
      },
    },

    {
      name: "e2e-mobile",
      testMatch: /.*\.e2e\.spec\.ts$/,
      outputDir: "test-results/e2e-mobile",
      use: {
        ...devices["Pixel 7"],
        baseURL: "http://localhost:3000",
        trace: "retain-on-failure",
        video: "retain-on-failure",
        screenshot: "only-on-failure",
      },
    },

    {
      name: "visual",
      testMatch: /.*\.visual\.spec\.ts$/,
      outputDir: "test-results/visual",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "http://localhost:3000",
        viewport: { width: 1280, height: 720 },
        screenshot: "only-on-failure",
        trace: "off",
        video: "off",
      },
    },
  ],
})
