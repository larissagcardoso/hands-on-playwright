import { devices, type PlaywrightTestConfig } from '@playwright/test';

export const localProjects: PlaywrightTestConfig['projects'] = [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] }
  },
  {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] }
  },
  {
    name: 'webkit',
    use: { ...devices['Desktop Safari'] }
  },
  {
    name: 'mobile-chrome',
    use: { ...devices['Pixel 7'] }
  },
  {
    name: 'mobile-safari',
    use: { ...devices['iPhone 14'] }
  }
];
