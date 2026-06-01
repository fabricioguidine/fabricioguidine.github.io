// @ts-check
const { defineConfig, devices } = require('@playwright/test');

const PORT = 8080;
const BASE_URL = `http://localhost:${PORT}`;

module.exports = defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  timeout: 30_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    // -c-1 disables caching so each run gets fresh content; runs identically on
    // Linux/macOS/Windows because it is pure Node.
    command: `npx http-server . -p ${PORT} -c-1 -s`,
    url: BASE_URL,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
