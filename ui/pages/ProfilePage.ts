import type { Page } from '@playwright/test';

export class ProfilePage {
  constructor(private readonly page: Page) {}

  async goto(username: string): Promise<void> {
    await this.page.goto(`/profile/${username}`);
  }

  async openFavoritedArticles(): Promise<void> {
    await this.page.getByRole('link', { name: 'Favorited Posts' }).click();
  }
}
