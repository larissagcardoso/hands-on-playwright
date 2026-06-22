export type User = {
  username: string;
  email: string;
  password: string;
};

export type AuthenticatedUser = User & {
  token: string;
};
