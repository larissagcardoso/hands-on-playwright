import type { APIRequestContext } from '@playwright/test';

export class UserClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly token?: string
  ) {}

  async getCurrentUser(): Promise<unknown> {
    const response = await this.request.get('user', {
      headers: this.token ? { Authorization: `Token ${this.token}` } : {}
    });

    if (!response.ok()) {
      throw new Error(`Get current user failed: ${response.status()} ${await response.text()}`);
    }

    return response.json();
  }
}
