import { test, expect } from '../../fixtures/browser.fixture';

test.describe('Authentication', () => {
  test('registers a user through API and logs in through UI @smoke', async ({
    authenticatedUser,
    loginPage,
    page
  }) => {
    await loginPage.goto();
    await loginPage.login(authenticatedUser.email, authenticatedUser.password);

    await expect(page.getByRole('link', { name: authenticatedUser.username })).toBeVisible();
  });
});
