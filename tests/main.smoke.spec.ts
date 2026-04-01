import { expect, test } from '@playwright/test';

const expectedData = {
  home: {
    title: /Rolnopol/,
  },
  login: {
    url: /login\.html/,
    subtitle: 'User Login & Account Access',
  },
  register: {
    url: /register\.html/,
    subtitle: 'Create Your User Account',
  },
  docs: {
    url: /docs\.html/,
    subtitle: 'Rolnopol System Guide & API Reference',
  },
  swagger: {
    url: /swagger\.html/,
    subtitle: 'API documentation for the Rolnopol service with versioning support',
  },
};

test(
  'should display Rolnopol in the page title',
  { tag: ['@smoke', '@p1'] }, async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(expectedData.home.title);
});

test(
  'login page should be visible and loaded',
  { tag: ['@smoke', '@p1', '@auth', '@login'] }, async ({ page }) => {
  await page.goto('/login.html');
  await page.waitForLoadState('load');
  await expect(page).toHaveURL(expectedData.login.url);
  await expect(page.locator('[data-testid="login-subtitle"]')).toHaveText(expectedData.login.subtitle);
});

test(
  'register page should be visible and loaded',
  { tag: ['@smoke', '@p1', '@auth', '@registration'] }, async ({ page }) => {
  await page.goto('/register.html');
  await page.waitForLoadState('load');
  await expect(page).toHaveURL(expectedData.register.url);
  await expect(page.locator('[data-testid="register-subtitle"]')).toHaveText(expectedData.register.subtitle);
});

test(
  'docs page should be visible and loaded',
  { tag: ['@smoke', '@p1'] }, async ({ page }) => {
  await page.goto('/docs.html');
  await page.waitForLoadState('load');
  await expect(page).toHaveURL(expectedData.docs.url);
  await expect(page.locator('.docs-header-subtitle')).toHaveText(expectedData.docs.subtitle);
});

test(
  'swagger page should be visible and loaded',
  { tag: ['@smoke', '@p1'] }, async ({ page }) => {
  await page.goto('/swagger.html');
  await page.waitForLoadState('load');
  await expect(page).toHaveURL(expectedData.swagger.url);
  await expect(page.frameLocator('#swagger-frame').locator('.info .description')).toHaveText(expectedData.swagger.subtitle);
});

