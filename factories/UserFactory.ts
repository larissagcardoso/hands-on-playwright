import type { User } from '../models/User';
import { randomId } from '../utils/random';

export class UserFactory {
  static create(overrides: Partial<User> = {}): User {
    const id = randomId('user');

    return {
      username: `qa_${id.replace(/-/g, '_')}`,
      email: `${id}@example.com`,
      password: 'Password123!',
      ...overrides
    };
  }
}
