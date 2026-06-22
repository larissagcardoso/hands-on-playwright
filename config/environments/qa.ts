import type { EnvironmentConfig } from './types';

export const qaConfig: EnvironmentConfig = {
  name: 'qa',
  baseUrl: process.env.BASE_URL ?? 'https://demo.realworld.show',
  apiUrl: process.env.API_URL ?? 'https://api.realworld.show/api',
  credentials: {
    defaultUser: {
      email: process.env.DEFAULT_USER_EMAIL ?? 'portfolio.qa@example.com',
      password: process.env.DEFAULT_USER_PASSWORD ?? 'Password123!'
    }
  },
  featureFlags: {
    enableArticleCleanup: true
  }
};
