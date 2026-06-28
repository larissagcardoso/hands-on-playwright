import type { APIRequestContext } from '@playwright/test';
import type { Article, CreatedArticle } from '../../models/Article';

type ArticleResponse = {
  article: CreatedArticle;
};

type ArticlesResponse = {
  articles: CreatedArticle[];
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
    const timeoutAt = Date.now() + 30_000;
    let lastError: unknown;

    while (Date.now() < timeoutAt) {
      const response = await this.request.post(`articles/${slug}/favorite`, {
        headers: this.authHeaders()
      });

      if (response.ok()) {
        const body = (await response.json()) as ArticleResponse;
        return body.article;
      }

      const message = `Favorite article failed: ${response.status()} ${await response.text()}`;

      if (response.status() !== 404) {
        throw new Error(message);
      }

      lastError = new Error(message);
      await new Promise((resolve) => setTimeout(resolve, 250));
    }

    throw lastError;
  }

  async listGlobal(limit = 10): Promise<CreatedArticle[]> {
    const response = await this.request.get(`articles?limit=${limit}`, {
      headers: this.authHeaders()
    });

    if (!response.ok()) {
      throw new Error(`List articles failed: ${response.status()} ${await response.text()}`);
    }

    const body = (await response.json()) as ArticlesResponse;
    return body.articles;
  }

  async listByFavorited(username: string): Promise<CreatedArticle[]> {
    const response = await this.request.get(`articles?favorited=${encodeURIComponent(username)}`, {
      headers: this.authHeaders()
    });

    if (!response.ok()) {
      throw new Error(`List favorited articles failed: ${response.status()} ${await response.text()}`);
    }

    const body = (await response.json()) as ArticlesResponse;
    return body.articles;
  }

  async waitUntilFavorited(slug: string, username: string): Promise<void> {
    const timeoutAt = Date.now() + 30_000;

    while (Date.now() < timeoutAt) {
      const articles = await this.listByFavorited(username);

      if (articles.some((article) => article.slug === slug)) {
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 250));
    }

    throw new Error(`Article ${slug} was not listed as favorited by ${username}`);
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
    const timeoutAt = Date.now() + 30_000;
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
