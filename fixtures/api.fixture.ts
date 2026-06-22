import { request as playwrightRequest, test as base } from '@playwright/test';
import { ArticleClient } from '../api/clients/ArticleClient';
import { AuthClient } from '../api/clients/AuthClient';
import { UserClient } from '../api/clients/UserClient';
import { loadConfig } from '../utils/config-loader';

type ApiFixtures = {
  authClient: AuthClient;
  articleClient: ArticleClient;
  userClient: UserClient;
};

export const test = base.extend<ApiFixtures>({
  authClient: async ({}, use) => {
    const config = loadConfig();
    const request = await playwrightRequest.newContext({ baseURL: config.apiUrl });
    await use(new AuthClient(request));
    await request.dispose();
  },

  articleClient: async ({}, use) => {
    const config = loadConfig();
    const request = await playwrightRequest.newContext({ baseURL: config.apiUrl });
    await use(new ArticleClient(request));
    await request.dispose();
  },

  userClient: async ({}, use) => {
    const config = loadConfig();
    const request = await playwrightRequest.newContext({ baseURL: config.apiUrl });
    await use(new UserClient(request));
    await request.dispose();
  }
});

export { expect } from '@playwright/test';
