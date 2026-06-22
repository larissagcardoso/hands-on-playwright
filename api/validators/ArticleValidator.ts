import { expect } from '@playwright/test';
import type { CreatedArticle } from '../../models/Article';

export class ArticleValidator {
  static shouldMatchCreatedArticle(article: CreatedArticle): void {
    expect(article.slug).toBeTruthy();
    expect(article.title).toBeTruthy();
    expect(article.description).toBeTruthy();
    expect(article.body).toBeTruthy();
  }
}
