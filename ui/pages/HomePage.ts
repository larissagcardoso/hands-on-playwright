import type { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly newArticleLink: Locator;
  readonly globalFeedTab: Locator;
  readonly firstArticleTitle: Locator;

  constructor(private readonly page: Page) {
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.globalFeedTab = page.getByRole('button', { name: 'Global Feed' }).or(page.getByText('Global Feed'));
    this.firstArticleTitle = page.locator('.article-preview h1').first();
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async openNewArticle(): Promise<void> {
    await this.newArticleLink.click();
  }

  async openArticle(title: string): Promise<void> {
    await this.page.getByRole('link', { name: title }).first().click();
  }

  async openGlobalFeed(): Promise<void> {
    await this.globalFeedTab.click();
  }

  async openFirstArticle(): Promise<string> {
    const title = (await this.firstArticleTitle.innerText()).trim();
    await this.firstArticleTitle.click();

    return title;
  }
}
