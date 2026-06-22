import { request as playwrightRequest, type APIRequestContext } from '@playwright/test';
import { ArticleClient } from '../api/clients/ArticleClient';
import { AuthClient } from '../api/clients/AuthClient';
import { LoginPage } from '../ui/pages/LoginPage';
import { UserFactory } from '../factories/UserFactory';
import type { AuthenticatedUser } from '../models/User';
import { loadConfig } from '../utils/config-loader';
import { test as base } from './api.fixture';

type AuthFixtures = {
  authenticatedUser: AuthenticatedUser;
  authenticatedArticleClient: ArticleClient;
  createArticleClientForUser: (token: string) => Promise<ArticleClient>;
  loginPage: LoginPage;
};

export const test = base.extend<AuthFixtures>({
  authenticatedUser: async ({}, use) => {
    const config = loadConfig();
    const request = await playwrightRequest.newContext({ baseURL: config.apiUrl });
    const authClient = new AuthClient(request);
    const user = await authClient.register(UserFactory.create());

    await use(user);
    await request.dispose();
  },

  authenticatedArticleClient: async ({ authenticatedUser }, use) => {
    const config = loadConfig();
    const request = await playwrightRequest.newContext({ baseURL: config.apiUrl });
    await use(new ArticleClient(request, authenticatedUser.token));
    await request.dispose();
  },

  createArticleClientForUser: async ({}, use) => {
    const config = loadConfig();
    const contexts: APIRequestContext[] = [];

    await use(async (token: string) => {
      const request = await playwrightRequest.newContext({ baseURL: config.apiUrl });
      contexts.push(request);
      return new ArticleClient(request, token);
    });

    await Promise.all(contexts.map((context) => context.dispose()));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  }
});

export { expect } from '@playwright/test';
