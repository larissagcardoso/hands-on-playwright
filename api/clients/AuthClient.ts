import type { APIRequestContext } from '@playwright/test';
import type { AuthenticatedUser, User } from '../../models/User';

type AuthResponse = {
  user: {
    email: string;
    username: string;
    token: string;
  };
};

export class AuthClient {
  constructor(private readonly request: APIRequestContext) {}

  async register(user: User): Promise<AuthenticatedUser> {
    const response = await this.request.post('users', {
      data: {
        user: {
          username: user.username,
          email: user.email,
          password: user.password
        }
      }
    });

    if (!response.ok()) {
      throw new Error(`User registration failed: ${response.status()} ${await response.text()}`);
    }

    const body = (await response.json()) as AuthResponse;

    return {
      ...user,
      username: body.user.username,
      email: body.user.email,
      token: body.user.token
    };
  }

  async login(email: string, password: string): Promise<AuthenticatedUser> {
    const response = await this.request.post('users/login', {
      data: {
        user: {
          email,
          password
        }
      }
    });

    if (!response.ok()) {
      throw new Error(`User login failed: ${response.status()} ${await response.text()}`);
    }

    const body = (await response.json()) as AuthResponse;

    return {
      username: body.user.username,
      email: body.user.email,
      password,
      token: body.user.token
    };
  }
}
