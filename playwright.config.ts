import { defineConfig, devices } from '@playwright/test';
import { BASE_URL } from './src/env.config';

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
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
