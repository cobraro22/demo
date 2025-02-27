import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from "dotenv";
// import path from "path";
// dotenv.config({ path: path.resolve(__dirname, ".env") });
import * as dotenv from "dotenv";
dotenv.config();
// require("dotenv").config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: "html",

  reporter: [
    // Use "dot" reporter on CI, "list" otherwise (Playwright default).
    process.env.CI ? ["dot"] : ["list", "html"],
    // Add Argos reporter.
    [
      "@argos-ci/playwright/reporter",
      {
        // Upload to Argos on CI only.
        uploadToArgos: !!process.env.CI,

        // Set your Argos token (required if not using GitHub Actions).
        // token: "ARGOS_TOKEN=argos_be61054edc572d547187d62fdf171207ba",
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  expect: {
    toMatchSnapshot: { maxDiffPixels: 500 },
  },
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "https://www.saucedemo.com/",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    testIdAttribute: "data-test",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "authorization",
      testMatch: "auth.setup.ts",
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: ".auth/authorization.json",
      },
      dependencies: ["authorization"],
    },
  ],
});
