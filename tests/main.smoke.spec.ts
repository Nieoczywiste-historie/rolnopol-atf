import { expect, test } from '@playwright/test';

test(
  'should display Rolnopol in the page title', 
  { tag: ['@smoke', '@p1'] }, async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Rolnopol/);
});

