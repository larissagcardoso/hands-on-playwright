import { test, expect } from '../../fixtures/browser.fixture';
import { ArticleFactory } from '../../factories/ArticleFactory';

test.describe('Profile', () => {
  test('favorites an article and displays it in the profile', async ({
    authenticatedUser,
    authenticatedArticleClient,
    loginPage,
    profilePage,
    page
  }) => {
    const article = await authenticatedArticleClient.create(ArticleFactory.create());
    await authenticatedArticleClient.favorite(article.slug);
    await authenticatedArticleClient.waitUntilFavorited(article.slug, authenticatedUser.username);

    await loginPage.goto();
    await loginPage.login(authenticatedUser.email, authenticatedUser.password);
    await profilePage.goto(authenticatedUser.username);
    await profilePage.openFavoritedArticles();

    await expect(page.getByText(article.title)).toBeVisible();
  });
});
