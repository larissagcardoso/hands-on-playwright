import type { PlaywrightTestConfig } from '@playwright/test';

type BrowserStackProject = {
  name: string;
  browser: 'chrome' | 'playwright-firefox' | 'playwright-webkit';
  browserVersion?: string;
  os: string;
  osVersion: string;
};

const browserStackProjectMatrix: BrowserStackProject[] = [
  {
    name: 'browserstack-chrome-windows',
    browser: 'chrome',
    os: 'Windows',
    osVersion: '11'
  },
  {
    name: 'browserstack-firefox-windows',
    browser: 'playwright-firefox',
    os: 'Windows',
    osVersion: '11'
  },
  {
    name: 'browserstack-webkit-osx',
    browser: 'playwright-webkit',
    os: 'OS X',
    osVersion: 'Ventura'
  }
];

export function getBrowserStackProjects(): PlaywrightTestConfig['projects'] {
  return browserStackProjectMatrix.map((project) => ({
    name: project.name,
    use: {
      browserName: mapBrowserName(project.browser),
      connectOptions: {
        wsEndpoint: createBrowserStackEndpoint(project)
      }
    }
  }));
}

function createBrowserStackEndpoint(project: BrowserStackProject): string {
  const username = process.env.BROWSERSTACK_USERNAME;
  const accessKey = process.env.BROWSERSTACK_ACCESS_KEY;

  if (!username || !accessKey) {
    throw new Error('BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY are required for TEST_TARGET=browserstack');
  }

  const capabilities = {
    browser: project.browser,
    browser_version: project.browserVersion ?? 'latest',
    os: project.os,
    os_version: project.osVersion,
    name: project.name,
    build: process.env.BROWSERSTACK_BUILD_NAME ?? `hands-on-playwright-${process.env.GITHUB_RUN_ID ?? 'local'}`,
    project: 'hands-on-playwright',
    'browserstack.username': username,
    'browserstack.accessKey': accessKey,
    'browserstack.local': process.env.BROWSERSTACK_LOCAL ?? 'false',
    'client.playwrightVersion': process.env.npm_package_devDependencies__playwright_test ?? '1.49.1'
  };

  return `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(capabilities))}`;
}

function mapBrowserName(browser: BrowserStackProject['browser']): 'chromium' | 'firefox' | 'webkit' {
  if (browser === 'playwright-firefox') {
    return 'firefox';
  }

  if (browser === 'playwright-webkit') {
    return 'webkit';
  }

  return 'chromium';
}
