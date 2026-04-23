import { expect, test } from '@playwright/test';
import { generateUniqueEmail } from '../src/helpers/email';
import { DocsPage } from '../src/pages/DocsPage';
import { HomePage } from '../src/pages/HomePage';
import { LoginPage } from '../src/pages/LoginPage';
import { RegisterPage } from '../src/pages/RegisterPage';
import { SwaggerPage } from '../src/pages/SwaggerPage';

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
  // Arrange
  const homePage = new HomePage(page);

  // Act
  await homePage.goto();

  // Assert
  await expect(page).toHaveTitle(expectedData.home.title);
});

test(
  'login page should be visible and loaded',
  { tag: ['@smoke', '@p1', '@auth', '@login'] }, async ({ page }) => {
  // Arrange
  const loginPage = new LoginPage(page);

  // Act
  await loginPage.goto();

  // Assert
  await expect(page).toHaveURL(expectedData.login.url);
  await expect(loginPage.subtitle).toHaveText(expectedData.login.subtitle);
});

test(
  'register page should be visible and loaded',
  { tag: ['@smoke', '@p1', '@auth', '@registration'] }, async ({ page }) => {
  // Arrange
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
  'register with invalid email and valid password shows email validation error',
  { tag: ['@p1', '@auth', '@registration', '@negative'] }, async ({ page }) => {
  // Arrange
  const registerPage = new RegisterPage(page);

  await registerPage.goto();

  // Act
  await registerPage.register('notanemail', 'Test123!');

  // Assert
  await expect(registerPage.emailError).toHaveText('Please enter a valid email address');
  await expect(page).toHaveURL(expectedData.register.url);
});

test(
  'register with valid email and too-short password shows password validation error',
  { tag: ['@p1', '@auth', '@registration', '@negative'] }, async ({ page }) => {
  // Arrange
  const registerPage = new RegisterPage(page);

  await registerPage.goto();

  // Act
  await registerPage.register('valid@example.com', 'ab');

  // Assert
  await expect(registerPage.passwordError).toHaveText('Password must be at least 3 characters');
  await expect(page).toHaveURL(expectedData.register.url);
});

test(
  'docs page should be visible and loaded',
  { tag: ['@smoke', '@p1'] }, async ({ page }) => {
  // Arrange
  const docsPage = new DocsPage(page);

  // Act
  await docsPage.goto();

  // Assert
  await expect(page).toHaveURL(expectedData.docs.url);
  await expect(docsPage.subtitle).toHaveText(expectedData.docs.subtitle);
});

test(
  'swagger page should be visible and loaded',
  { tag: ['@smoke', '@p1'] }, async ({ page }) => {
  // Arrange
  const swaggerPage = new SwaggerPage(page);

  // Act
  await swaggerPage.goto();

  // Assert
  await expect(page).toHaveURL(expectedData.swagger.url);
  await expect(swaggerPage.apiDescription).toHaveText(expectedData.swagger.subtitle);
});

