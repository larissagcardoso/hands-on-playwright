import { defineConfig } from '@playwright/test';
import { getBrowserStackProjects } from './config/browsers/browserstack.projects';
import { localProjects } from './config/browsers/local.projects';
import { loadConfig } from './utils/config-loader';

const envConfig = loadConfig();
const projects = process.env.TEST_TARGET === 'browserstack' ? getBrowserStackProjects() : localProjects;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 4 : undefined,
  timeout: 45_000,
  expect: {
    timeout: 10_000
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
    ['junit', { outputFile: 'reports/junit/results.xml' }]
  ],
  use: {
    baseURL: envConfig.baseUrl,
    extraHTTPHeaders: {
      Accept: 'application/json'
    },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    actionTimeout: 15_000,
    navigationTimeout: 30_000
  },
  metadata: {
    environment: envConfig.name,
    apiUrl: envConfig.apiUrl
  },
  projects,
  outputDir: 'test-results'
});
