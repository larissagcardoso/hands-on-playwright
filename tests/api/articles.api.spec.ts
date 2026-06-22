import { test, expect } from '../../fixtures/auth.fixture';
import { ArticleFactory } from '../../factories/ArticleFactory';
import { ArticleValidator } from '../../api/validators/ArticleValidator';

test.describe('Articles API', () => {
  test('creates, favorites, and deletes an article through API @smoke', async ({
    authenticatedArticleClient
  }) => {
    const createdArticle = await authenticatedArticleClient.create(ArticleFactory.create());
    ArticleValidator.shouldMatchCreatedArticle(createdArticle);

    const favoritedArticle = await authenticatedArticleClient.favorite(createdArticle.slug);
    expect(favoritedArticle.slug).toBe(createdArticle.slug);

    await authenticatedArticleClient.delete(createdArticle.slug);
  });
});
