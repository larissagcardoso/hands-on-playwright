import type { APIRequestContext } from '@playwright/test';
import type { Article, CreatedArticle } from '../../models/Article';

type ArticleResponse = {
  article: CreatedArticle;
};

export class ArticleClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly token?: string
  ) {}

  async create(article: Article): Promise<CreatedArticle> {
    const response = await this.request.post('articles', {
      headers: this.authHeaders(),
      data: { article }
    });

    if (!response.ok()) {
      throw new Error(`Article creation failed: ${response.status()} ${await response.text()}`);
    }

    const body = (await response.json()) as ArticleResponse;
    await this.waitUntilAvailable(body.article.slug);

    return body.article;
  }

  async get(slug: string): Promise<CreatedArticle> {
    const response = await this.request.get(`articles/${slug}`, {
      headers: this.authHeaders()
    });

    if (!response.ok()) {
      throw new Error(`Get article failed: ${response.status()} ${await response.text()}`);
    }

    const body = (await response.json()) as ArticleResponse;
    return body.article;
  }

  async favorite(slug: string): Promise<CreatedArticle> {
    const response = await this.request.post(`articles/${slug}/favorite`, {
      headers: this.authHeaders()
    });

    if (!response.ok()) {
      throw new Error(`Favorite article failed: ${response.status()} ${await response.text()}`);
    }

    const body = (await response.json()) as ArticleResponse;
    return body.article;
  }

  async delete(slug: string): Promise<void> {
    const response = await this.request.delete(`articles/${slug}`, {
      headers: this.authHeaders()
    });

    if (!response.ok()) {
      throw new Error(`Article deletion failed: ${response.status()} ${await response.text()}`);
    }
  }

  private authHeaders(): Record<string, string> {
    return this.token ? { Authorization: `Token ${this.token}` } : {};
  }

  private async waitUntilAvailable(slug: string): Promise<void> {
    const timeoutAt = Date.now() + 5_000;
    let lastError: unknown;

    while (Date.now() < timeoutAt) {
      try {
        await this.get(slug);
        return;
      } catch (error) {
        lastError = error;
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
    }

    throw lastError;
  }
}
