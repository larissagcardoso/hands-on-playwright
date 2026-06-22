import type { Locator, Page } from '@playwright/test';
import type { Article } from '../../models/Article';

export class ArticlePage {
  readonly titleInput: Locator;
  readonly descriptionInput: Locator;
  readonly bodyInput: Locator;
  readonly tagsInput: Locator;
  readonly publishButton: Locator;
  readonly favoriteButton: Locator;
  readonly deleteButton: Locator;

  constructor(private readonly page: Page) {
    this.titleInput = page.getByPlaceholder('Article Title');
    this.descriptionInput = page.getByPlaceholder("What's this article about?");
    this.bodyInput = page.getByPlaceholder('Write your article (in markdown)');
    this.tagsInput = page.getByPlaceholder('Enter tags');
    this.publishButton = page.getByRole('button', { name: 'Publish Article' });
    this.favoriteButton = page.getByRole('button', { name: /favorite/i }).first();
    this.deleteButton = page.getByRole('button', { name: /delete article/i }).first();
  }

  async create(article: Article): Promise<void> {
    await this.titleInput.fill(article.title);
    await this.descriptionInput.fill(article.description);
    await this.bodyInput.fill(article.body);

    for (const tag of article.tagList) {
      await this.tagsInput.fill(tag);
      await this.tagsInput.press('Enter');
    }

    await Promise.all([
      this.page.waitForURL('**/article/**', { waitUntil: 'domcontentloaded' }),
      this.publishButton.click()
    ]);
  }

  async favorite(): Promise<void> {
    await this.favoriteButton.click();
  }

  async delete(): Promise<void> {
    await this.deleteButton.click();
  }
}
