import type { Locator, Page } from '@playwright/test';

export class ProfilePage {
  readonly favoritedArticlesLink: Locator;

  constructor(private readonly page: Page) {
    this.favoritedArticlesLink = page.getByRole('link', { name: /favorited (posts|articles)/i });
  }

  async goto(username: string): Promise<void> {
    await this.page.goto(`/profile/${username}`);
    await this.favoritedArticlesLink.waitFor({ state: 'visible' });
  }

  async openFavoritedArticles(): Promise<void> {
    await Promise.all([
      this.page.waitForURL(/\/profile\/.+\/favorites/),
      this.favoritedArticlesLink.click()
    ]);
  }
}
