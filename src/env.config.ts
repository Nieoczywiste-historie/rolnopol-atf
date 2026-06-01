import 'dotenv/config';

const requiredVars = ['BASE_URL', 'USER_EMAIL', 'USER_PASSWORD'] as const;

type RequiredVar = (typeof requiredVars)[number];

function validateEnv(): Record<RequiredVar, string> {
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
export const USER_EMAIL = env.USER_EMAIL;
export const USER_PASSWORD = env.USER_PASSWORD;
export const USER_DISPLAY_NAME = process.env.USER_DISPLAY_NAME;
