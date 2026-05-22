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

  constructor(page: Page) {
    super(page);
    this.subtitle = page.getByTestId('profile-subtitle');
    this.profileInformationHeading = page.getByRole('heading', { name: 'Profile Information' });
    this.updateProfileHeading = page.getByRole('heading', { name: 'Update Profile' });
    this.dangerZoneHeading = page.getByRole('heading', { name: 'Danger Zone' });
    this.logoutButton = page.getByTestId('header-component').getByTestId('logout-btn');
  }

  async logout() {
    await this.logoutButton.click();
  }
}
