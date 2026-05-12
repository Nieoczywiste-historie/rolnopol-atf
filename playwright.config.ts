import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 10 * 1000,
  testDir: './tests',
  fullyParallel: true,

  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['html', { open: 'never' }]],
  
  use: {
    trace: 'on',
    baseURL: 'http://localhost:3000',
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
