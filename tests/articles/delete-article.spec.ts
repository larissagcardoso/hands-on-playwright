import { test, expect } from '../../fixtures/browser.fixture';
import { ArticleFactory } from '../../factories/ArticleFactory';

test.describe('Articles', () => {
  test('deletes an article through the UI', async ({
    authenticatedUser,
    loginPage,
    homePage,
    articlePage,
    page
  }) => {
    const article = ArticleFactory.create();

    await loginPage.goto();
    await loginPage.login(authenticatedUser.email, authenticatedUser.password);
    await homePage.openNewArticle();
    await articlePage.create(article);
    await expect(page.getByRole('heading', { name: article.title })).toBeVisible();
    await articlePage.delete();

    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByText(article.title)).toBeHidden();
  });
});
