import 'dotenv/config';

export interface User {
  email: string;
  password: string;
  displayName?: string;
}

export function createUser(overrides: Partial<User> = {}): User {
  return {
    email: overrides.email ?? process.env.USER_EMAIL!,
    password: overrides.password ?? process.env.USER_PASSWORD!,
    displayName: overrides.displayName ?? process.env.USER_DISPLAY_NAME,
  };
}
