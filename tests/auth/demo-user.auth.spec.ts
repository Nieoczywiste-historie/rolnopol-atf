import { expect, test } from '@playwright/test';
import { getDemoUser } from '../../src/models/User';
import { HomePage } from '../../src/pages/HomePage';
import { ProfilePage } from '../../src/pages/ProfilePage';

test(
  'authenticated DEMO_USER can access profile sections and logout',
  { tag: ['@p1', '@auth', '@login', '@logout'] },
  async ({ page }) => {
    // Arrange
    const profilePage = new ProfilePage(page);
    const homePage = new HomePage(page);

    // Act
    await page.goto(profilePage.url);

    // Assert
    await expect(page).toHaveURL(profilePage.url);
    await expect.soft(profilePage.profileInformationHeading).toBeVisible();
    await expect.soft(profilePage.updateProfileHeading).toBeVisible();
    await expect.soft(profilePage.dangerZoneHeading).toBeVisible();

    // Act
    await profilePage.logout();

    // Assert
    await expect(page).toHaveURL(homePage.url);
  }
);

test(
  'authenticated DEMO_USER profile page displays correct user information',
  { tag: ['@p1', '@auth', '@login'] },
  async ({ page }) => {
    // Arrange
    const user = getDemoUser();
    const profilePage = new ProfilePage(page);

    // Act
    await page.goto(profilePage.url);

    // Assert
    await expect(page).toHaveURL(profilePage.url);
    await expect.soft(profilePage.profileHeaderName).toHaveText(user.displayName!);
    await expect.soft(profilePage.profileHeaderEmail).toHaveText(user.email);
    await expect.soft(profilePage.accountStatus).toHaveText('Active');
    await expect.soft(profilePage.userId).not.toBeEmpty();
    await expect.soft(profilePage.displayedName).toHaveText(user.displayName!);
    await expect.soft(profilePage.emailValue).toHaveText(user.email);
    await expect.soft(profilePage.saveChangesButton).toBeVisible();
    await expect.soft(profilePage.deleteAccountButton).toBeVisible();
  }
);
