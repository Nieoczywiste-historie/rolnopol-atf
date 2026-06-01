import { EMPTY_USER_DISPLAY_NAME, EMPTY_USER_EMAIL, EMPTY_USER_PASSWORD } from '../env.config';

export interface User {
  email: string;
  password: string;
  displayName?: string;
}

export function createUser(overrides: Partial<User> = {}): User {
  return {
    email: overrides.email ?? EMPTY_USER_EMAIL,
    password: overrides.password ?? EMPTY_USER_PASSWORD,
    displayName: overrides.displayName ?? EMPTY_USER_DISPLAY_NAME,
  };
}
