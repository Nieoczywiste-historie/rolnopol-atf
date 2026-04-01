import { expect, test } from '@playwright/test';

test(
  'should display Rolnopol in the page title', 
  { tag: ['@smoke', '@p1'] }, async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Rolnopol/);
});

test(
  'login page should be visible and loaded',
  { tag: ['@smoke', '@p1', '@auth', '@login'] }, async ({ page }) => {
  await page.goto('/login.html');
  await page.waitForLoadState('load');
  await expect(page).toHaveURL(/login\.html/);
  await expect(page.locator('body')).toBeVisible();
  await expect(page.locator('form')).toBeVisible();
});

test(
  'register page should be visible and loaded',
  { tag: ['@smoke', '@p1', '@auth', '@registration'] }, async ({ page }) => {
  await page.goto('/register.html');
  await page.waitForLoadState('load');
  await expect(page).toHaveURL(/register\.html/);
  await expect(page.locator('body')).toBeVisible();
  await expect(page.locator('form')).toBeVisible();
});

