import { HomePage } from '../ui/pages/HomePage';
import { ArticlePage } from '../ui/pages/ArticlePage';
import { ProfilePage } from '../ui/pages/ProfilePage';
import { SettingsPage } from '../ui/pages/SettingsPage';
import { test as base } from './auth.fixture';

type BrowserFixtures = {
  homePage: HomePage;
  articlePage: ArticlePage;
  profilePage: ProfilePage;
  settingsPage: SettingsPage;
};

export const test = base.extend<BrowserFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  articlePage: async ({ page }, use) => {
    await use(new ArticlePage(page));
  },

  profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  },

  settingsPage: async ({ page }, use) => {
    await use(new SettingsPage(page));
  }
});

export { expect } from '@playwright/test';
