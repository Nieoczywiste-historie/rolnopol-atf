import { expect, test } from '@playwright/test';
import { getEmptyUser } from '../src/models/User';
import { HomePage } from '../src/pages/HomePage';
import { LoginPage } from '../src/pages/LoginPage';
import { ProfilePage } from '../src/pages/ProfilePage';

test(
  'login with valid credentials, verify profile sections, and logout',
  { tag: ['@p1', '@auth', '@login', '@logout', '@smoke'] },
  async ({ page }) => {
    // Arrange
    const user = getEmptyUser();
    const loginPage = new LoginPage(page);
    const profilePage = new ProfilePage(page);
    const homePage = new HomePage(page);

    await loginPage.goto();

    // Act - Login
    await loginPage.login(user.email, user.password);

    // Assert - Login successful and redirected to profile page
    await expect(page).toHaveURL(profilePage.url);

    // Assert - Profile sections are visible
    await expect.soft(profilePage.profileInformationHeading).toBeVisible();
    await expect.soft(profilePage.updateProfileHeading).toBeVisible();
    await expect.soft(profilePage.dangerZoneHeading).toBeVisible();

    // Act - Logout
    await profilePage.logout();

    // Assert - Redirected to home page after logout
    await expect(page).toHaveURL(homePage.url);
  }
);

test(
  'profile page displays correct user information after login',
  { tag: ['@p1', '@auth', '@login'] },
  async ({ page }) => {
    // Arrange
    const user = getEmptyUser();
    const loginPage = new LoginPage(page);
    const profilePage = new ProfilePage(page);

    await loginPage.goto();

    // Act
    await loginPage.login(user.email, user.password);

    // Assert - Redirected to profile page
    await expect(page).toHaveURL(profilePage.url);

    // Assert - Profile header shows user data
    await expect.soft(profilePage.profileHeaderName).toHaveText(user.displayName!);
    await expect.soft(profilePage.profileHeaderEmail).toHaveText(user.email);
    await expect.soft(profilePage.accountStatus).toHaveText('Active');

    // Assert - Profile Information section shows correct details
    await expect.soft(profilePage.userId).not.toBeEmpty();
    await expect.soft(profilePage.displayedName).toHaveText(user.displayName!);
    await expect.soft(profilePage.emailValue).toHaveText(user.email);

    // Assert - Action buttons are visible
    await expect.soft(profilePage.saveChangesButton).toBeVisible();
    await expect.soft(profilePage.deleteAccountButton).toBeVisible();
  }
);
