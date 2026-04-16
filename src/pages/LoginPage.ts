import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly url = '/login.html';
  readonly subtitle: Locator;

  constructor(page: Page) {
    super(page);
    this.subtitle = page.getByTestId('login-subtitle');
  }
}
