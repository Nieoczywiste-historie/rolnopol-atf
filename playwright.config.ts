import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  timeout: 10 * 1000,
  testDir: './tests',
  fullyParallel: true,

  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['html', { open: 'never' }]],
  
  use: {
    trace: 'on',
    baseURL: process.env.BASE_URL,
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
