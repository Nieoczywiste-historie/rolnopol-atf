import { expect, test } from '@playwright/test';
import { RegisterPage } from '../src/pages/RegisterPage';
import { generateUniqueEmail } from '../src/helpers/email';

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
  // Act
  await page.goto('/');

  // Assert
  await expect(page).toHaveTitle(expectedData.home.title);
});

test(
  'login page should be visible and loaded',
  { tag: ['@smoke', '@p1', '@auth', '@login'] }, async ({ page }) => {
  // Act
  await page.goto('/login.html');
  await page.waitForLoadState('load');

  // Assert
  await expect(page).toHaveURL(expectedData.login.url);
  await expect(page.locator('[data-testid="login-subtitle"]')).toHaveText(expectedData.login.subtitle);
});

test(
  'register page should be visible and loaded',
  { tag: ['@smoke', '@p1', '@auth', '@registration'] }, async ({ page }) => {
  const registerPage = new RegisterPage(page);

  // Act
  await registerPage.goto();

  // Assert
  await expect(page).toHaveURL(expectedData.register.url);
  await expect(registerPage.subtitle).toHaveText(expectedData.register.subtitle);
});

test(
  'register a new user with valid data',
  { tag: ['@p1', '@auth', '@registration'] }, async ({ page }) => {
  // Arrange
  const registerPage = new RegisterPage(page);
  const uniqueEmail = generateUniqueEmail();

  await registerPage.goto();

  // Act
  await registerPage.register(uniqueEmail, 'Test123!', 'ATF Test User');

  // Assert
  await expect(registerPage.successNotification).toHaveText('Registration successful!');
  await expect(page).toHaveURL(expectedData.login.url);
});

test(
  'docs page should be visible and loaded',
  { tag: ['@smoke', '@p1'] }, async ({ page }) => {
  // Act
  await page.goto('/docs.html');
  await page.waitForLoadState('load');

  // Assert
  await expect(page).toHaveURL(expectedData.docs.url);
  await expect(page.locator('.docs-header-subtitle')).toHaveText(expectedData.docs.subtitle);
});

test(
  'swagger page should be visible and loaded',
  { tag: ['@smoke', '@p1'] }, async ({ page }) => {
  // Act
  await page.goto('/swagger.html');
  await page.waitForLoadState('load');

  // Assert
  await expect(page).toHaveURL(expectedData.swagger.url);
  await expect(page.frameLocator('#swagger-frame').locator('.info .description')).toHaveText(expectedData.swagger.subtitle);
});

