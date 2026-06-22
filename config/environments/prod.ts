import type { EnvironmentConfig } from './types';

export const prodConfig: EnvironmentConfig = {
  name: 'prod',
  baseUrl: process.env.BASE_URL ?? 'https://demo.realworld.show',
  apiUrl: process.env.API_URL ?? 'https://api.realworld.show/api',
  credentials: {
    defaultUser: {
      email: process.env.DEFAULT_USER_EMAIL ?? 'portfolio.prod@example.com',
      password: process.env.DEFAULT_USER_PASSWORD ?? 'Password123!'
    }
  },
  featureFlags: {
    enableArticleCleanup: false
  }
};
