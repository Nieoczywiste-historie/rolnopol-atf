import { defineConfig, devices } from '@playwright/test';
import { BASE_URL } from './src/env.config';

const DEMO_USER_STORAGE_STATE = 'playwright/.auth/user.json';

export default defineConfig({
  timeout: 10 * 1000,
  testDir: './tests',
  fullyParallel: true,

  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['html', { open: 'never' }]],
  
  use: {
    trace: 'on',
    baseURL: BASE_URL,
  },
  
  projects: [
    {
      name: 'setup',
      testMatch: 'tests/auth/setup.demo-user.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'smoke-tests',
      testMatch: 'tests/**/*.smoke.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'farm-tests',
      testMatch: 'tests/farm/**/*.spec.ts',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: DEMO_USER_STORAGE_STATE,
      },
    },
    {
      name: 'demo-user',
      testMatch: 'tests/auth/**/*.spec.ts',
      dependencies: ['setup', 'farm-tests'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: DEMO_USER_STORAGE_STATE,
      },
    },
  ],
});
