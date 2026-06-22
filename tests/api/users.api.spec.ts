import { test, expect } from '../../fixtures/api.fixture';
import { UserFactory } from '../../factories/UserFactory';
import { UserValidator } from '../../api/validators/UserValidator';

test.describe('Users API', () => {
  test('registers and authenticates a user @smoke', async ({ authClient }) => {
    const createdUser = await authClient.register(UserFactory.create());
    const loggedUser = await authClient.login(createdUser.email, createdUser.password);

    UserValidator.shouldBeAuthenticated(loggedUser);
    expect(loggedUser.email).toBe(createdUser.email);
  });
});
