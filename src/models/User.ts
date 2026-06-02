import {
  DEMO_USER_DISPLAY_NAME,
  DEMO_USER_EMAIL,
  DEMO_USER_PASSWORD,
  EMPTY_USER_DISPLAY_NAME,
  EMPTY_USER_EMAIL,
  EMPTY_USER_PASSWORD,
} from '../env.config';

export interface User {
  email: string;
  password: string;
  displayName?: string;
}

export function getEmptyUser(overrides: Partial<User> = {}): User {
  return {
    email: overrides.email ?? EMPTY_USER_EMAIL,
    password: overrides.password ?? EMPTY_USER_PASSWORD,
    displayName: overrides.displayName ?? EMPTY_USER_DISPLAY_NAME,
  };
}

export function getDemoUser(overrides: Partial<User> = {}): User {
  return {
    email: overrides.email ?? DEMO_USER_EMAIL,
    password: overrides.password ?? DEMO_USER_PASSWORD,
    displayName: overrides.displayName ?? DEMO_USER_DISPLAY_NAME,
  };
}
