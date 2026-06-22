import { test, expect } from '../../fixtures/api.fixture';
import { UserFactory } from '../../factories/UserFactory';
import { UserValidator } from '../../api/validators/UserValidator';

test.describe('Registration API setup', () => {
  test('registers a unique test user through the backend @smoke', async ({ authClient }) => {
    const user = await authClient.register(UserFactory.create());

    UserValidator.shouldBeAuthenticated(user);
    expect(user.email).toContain('@example.com');
  });
});
