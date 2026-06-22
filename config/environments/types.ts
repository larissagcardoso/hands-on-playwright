export type EnvironmentName = 'dev' | 'qa' | 'staging' | 'prod';

export type EnvironmentConfig = {
  name: EnvironmentName;
  baseUrl: string;
  apiUrl: string;
  credentials: {
    defaultUser: {
      email: string;
      password: string;
    };
  };
  featureFlags: {
    enableArticleCleanup: boolean;
  };
};
