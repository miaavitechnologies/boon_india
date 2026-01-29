import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */

export default defineConfig({
  timeout: 60000,
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'https://www.boonindia.ai/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry', //Tracing is recorded ONLY during the first retry attempt (after the initial failure). If the test passes on the first run, no trace is saved.	This is the recommended default, as it captures the most likely failing scenario without generating large files for successful tests.
    //trace: 'on',  Tracing is recorded for every single test run. The trace is always saved.	You are actively debugging a new test or need full coverage of all runs.
    //trace: 'off', Tracing is disabled entirely. No trace files are generated.	You are running tests successfully and don't need debugging data.
    //trace: 'on-all-retries', Tracing is recorded for all retry attempts. If you set retries: 3, it will record traces for the first, second, and third retry attempts (after the initial run).	You suspect the failure is intermittent and want to analyze differences across multiple retries.
    //trace: 'retain-on-failure' Tracing is recorded for every test, but the trace file is ONLY saved if the test fails.	You want to minimize disk usage but ensure a trace is always available for failed tests.

    ignoreHTTPSErrors: true,
    headless: !!process.env.CI,
    navigationTimeout: 90000,
    launchOptions: {
      slowMo: process.env.CI ? 0 : 1000,
    },
    screenshot: 'only-on-failure',
  },

  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.boonindia.ai/',
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
