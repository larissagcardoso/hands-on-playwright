import { expect } from '@playwright/test';
import type { AuthenticatedUser } from '../../models/User';

export class UserValidator {
  static shouldBeAuthenticated(user: AuthenticatedUser): void {
    expect(user.email).toContain('@');
    expect(user.username).toBeTruthy();
    expect(user.token).toBeTruthy();
  }
}
