import type { Page } from '@playwright/test';

export class Sidebar {
  constructor(private readonly page: Page) {}

  async selectTag(tag: string): Promise<void> {
    await this.page.getByRole('link', { name: tag }).click();
  }
}
