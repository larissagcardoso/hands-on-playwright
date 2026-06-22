import 'dotenv/config';
import { devConfig } from '../config/environments/dev';
import { prodConfig } from '../config/environments/prod';
import { qaConfig } from '../config/environments/qa';
import { stagingConfig } from '../config/environments/staging';
import type { EnvironmentConfig, EnvironmentName } from '../config/environments/types';

const configs: Record<EnvironmentName, EnvironmentConfig> = {
  dev: devConfig,
  qa: qaConfig,
  staging: stagingConfig,
  prod: prodConfig
};

export function loadConfig(env = process.env.ENV ?? 'qa'): EnvironmentConfig {
  const normalizedEnv = env.toLowerCase() as EnvironmentName;
  const config = configs[normalizedEnv];

  if (!config) {
    throw new Error(`Unsupported ENV "${env}". Expected one of: ${Object.keys(configs).join(', ')}`);
  }

  return {
    ...config,
    apiUrl: ensureTrailingSlash(config.apiUrl)
  };
}

function ensureTrailingSlash(url: string): string {
  return url.endsWith('/') ? url : `${url}/`;
}
