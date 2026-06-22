import { test, expect } from '../../fixtures/browser.fixture';

test.describe('Profile', () => {
  test('favorites an article and displays it in the profile', async ({
    authenticatedUser,
    loginPage,
    homePage,
    articlePage,
    profilePage,
    page
  }) => {
    await loginPage.goto();
    await loginPage.login(authenticatedUser.email, authenticatedUser.password);
    await homePage.goto();
    await homePage.openGlobalFeed();
    const articleTitle = await homePage.openFirstArticle();
    await articlePage.favorite();
    await profilePage.goto(authenticatedUser.username);
    await profilePage.openFavoritedArticles();

    await expect(page.getByText(articleTitle)).toBeVisible();
  });
});
