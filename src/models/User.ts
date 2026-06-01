import { USER_DISPLAY_NAME, USER_EMAIL, USER_PASSWORD } from '../env.config';

export interface User {
  email: string;
  password: string;
  displayName?: string;
}

export function createUser(overrides: Partial<User> = {}): User {
  return {
    email: overrides.email ?? USER_EMAIL,
    password: overrides.password ?? USER_PASSWORD,
    displayName: overrides.displayName ?? USER_DISPLAY_NAME,
  };
}
