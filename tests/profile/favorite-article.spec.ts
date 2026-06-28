import { test, expect } from '../../fixtures/browser.fixture';

test.describe('Profile', () => {
  test('favorites an article and displays it in the profile', async ({
    authenticatedUser,
    authenticatedArticleClient,
    loginPage,
    profilePage,
    page
  }) => {
    const articles = await authenticatedArticleClient.listGlobal();
    const article = articles[0];

    expect(article, 'Expected at least one article in the global feed').toBeTruthy();

    await authenticatedArticleClient.favorite(article.slug);
    await authenticatedArticleClient.waitUntilFavorited(article.slug, authenticatedUser.username);

    await loginPage.goto();
    await loginPage.login(authenticatedUser.email, authenticatedUser.password);
    await profilePage.goto(authenticatedUser.username);
    await profilePage.openFavoritedArticles();

    await expect(page.getByText(article.title)).toBeVisible();
  });
});
