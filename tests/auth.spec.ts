import { expect, test } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { LoginPage } from '../src/pages/LoginPage';
import { ProfilePage } from '../src/pages/ProfilePage';

const testCredentials = {
  email: 'emptyuser@rolnopol.demo.pl',
  password: 'demoPass123',
};

test(
  'login with valid credentials, verify profile sections, and logout',
  { tag: ['@p1', '@auth', '@login', '@logout', '@smoke'] },
  async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const profilePage = new ProfilePage(page);
    const homePage = new HomePage(page);

    await loginPage.goto();

    // Act - Login
    await loginPage.login(testCredentials.email, testCredentials.password);

    // Assert - Login successful and redirected to profile page
    await expect(page).toHaveURL(profilePage.url);

    // Assert - Profile sections are visible
    await expect(profilePage.profileInformationHeading).toBeVisible();
    await expect(profilePage.updateProfileHeading).toBeVisible();
    await expect(profilePage.dangerZoneHeading).toBeVisible();

    // Act - Logout
    await profilePage.logout();

    // Assert - Redirected to home page after logout
    await expect(page).toHaveURL(homePage.url);
  }
);
