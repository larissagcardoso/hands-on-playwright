import { test, expect } from '../../fixtures/browser.fixture';
import { ArticleFactory } from '../../factories/ArticleFactory';

test.describe('Articles', () => {
  test('deletes an article through the UI', async ({
    authenticatedUser,
    authenticatedArticleClient,
    loginPage,
    articlePage,
    page
  }) => {
    const article = await authenticatedArticleClient.create(ArticleFactory.create());

    await loginPage.goto();
    await loginPage.login(authenticatedUser.email, authenticatedUser.password);
    await page.goto(`/article/${article.slug}`);
    await articlePage.delete();

    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByText(article.title)).toBeHidden();
  });
});
