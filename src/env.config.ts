import 'dotenv/config';

const requiredVars = [
  'BASE_URL',
  'EMPTY_USER_EMAIL',
  'EMPTY_USER_PASSWORD',
  'DEMO_USER_EMAIL',
  'DEMO_USER_PASSWORD',
] as const;

type RequiredVar = (typeof requiredVars)[number];

export function validateEnv(): Record<RequiredVar, string> {
  const missing: string[] = [];

  for (const name of requiredVars) {
    const value = process.env[name];
    if (!value || value.trim() === '') {
      missing.push(name);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing or empty environment variables:\n${missing.map((v) => `  - ${v}`).join('\n')}`
    );
  }

  return Object.fromEntries(requiredVars.map((name) => [name, process.env[name]!])) as Record<
    RequiredVar,
    string
  >;
}

const env = validateEnv();

export const BASE_URL = env.BASE_URL;
export const EMPTY_USER_EMAIL = env.EMPTY_USER_EMAIL;
export const EMPTY_USER_PASSWORD = env.EMPTY_USER_PASSWORD;
export const EMPTY_USER_DISPLAY_NAME = process.env.EMPTY_USER_DISPLAY_NAME;

export const DEMO_USER_EMAIL = env.DEMO_USER_EMAIL;
export const DEMO_USER_PASSWORD = env.DEMO_USER_PASSWORD;
export const DEMO_USER_DISPLAY_NAME = process.env.DEMO_USER_DISPLAY_NAME;
