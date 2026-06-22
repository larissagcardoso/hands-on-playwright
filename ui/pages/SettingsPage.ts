import type { Locator, Page } from '@playwright/test';

export class SettingsPage {
  readonly logoutButton: Locator;
  readonly signInLink: Locator;

  constructor(private readonly page: Page) {
    this.logoutButton = page.getByRole('button', { name: 'Click here to logout.' });
    this.signInLink = page.getByRole('link', { name: 'Sign in' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/settings');
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();
    await this.signInLink.waitFor({ state: 'visible' });
  }
}
