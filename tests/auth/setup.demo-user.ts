import { expect, test } from '@playwright/test';
import { getDemoUser } from '../../src/models/User';
import { LoginPage } from '../../src/pages/LoginPage';
import { ProfilePage } from '../../src/pages/ProfilePage';

const DEMO_USER_STORAGE_STATE = 'playwright/.auth/user.json';

test(
  'authenticate DEMO_USER and save session state',
  { tag: ['@p1', '@auth', '@login'] },
  async ({ page }) => {
    // Arrange
    const user = getDemoUser();
    const loginPage = new LoginPage(page);
    const profilePage = new ProfilePage(page);

    await loginPage.goto();

    // Act
    await loginPage.login(user.email, user.password);

    // Assert
    await expect(page).toHaveURL(profilePage.url);

    await page.context().storageState({ path: DEMO_USER_STORAGE_STATE });
  }
);
