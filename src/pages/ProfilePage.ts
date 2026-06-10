import { type Locator, type Page } from '@playwright/test';

import { URLs } from '../urls';
import { BasePage } from './BasePage';

export class ProfilePage extends BasePage {
  readonly url = URLs.profile;
  readonly subtitle: Locator;
  readonly profileInformationHeading: Locator;
  readonly updateProfileHeading: Locator;
  readonly dangerZoneHeading: Locator;
  readonly logoutButton: Locator;
  readonly userId: Locator;
  readonly displayedName: Locator;
  readonly emailValue: Locator;
  readonly profileHeaderName: Locator;
  readonly profileHeaderEmail: Locator;
  readonly accountStatus: Locator;
  readonly deleteAccountButton: Locator;
  readonly saveChangesButton: Locator;

  constructor(page: Page) {
    super(page);
    this.subtitle = page.getByTestId('profile-subtitle');
    this.profileInformationHeading = page.getByRole('heading', { name: 'Profile Information' });
    this.updateProfileHeading = page.getByRole('heading', { name: 'Update Profile' });
    this.dangerZoneHeading = page.getByRole('heading', { name: 'Danger Zone' });
    this.logoutButton = page.getByTestId('header-component').getByTestId('logout-btn');
    this.userId = page.getByTestId('user-id');
    this.displayedName = page.getByTestId('displayed-name');
    this.emailValue = page.getByTestId('email-value');
    this.profileHeaderName = page.locator('#profileName');
    this.profileHeaderEmail = page.locator('#profileEmail');
    this.accountStatus = page.locator('#statusText');
    this.deleteAccountButton = page.getByTestId('delete-account-btn');
    this.saveChangesButton = page.getByTestId('update-profile-submit-btn');
  }

  async logout() {
    await this.logoutButton.click();
  }
}
