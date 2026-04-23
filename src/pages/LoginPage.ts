import { type Locator, type Page } from '@playwright/test';
import { URLs } from '../urls';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly url = URLs.login;
  readonly subtitle: Locator;

  constructor(page: Page) {
    super(page);
    this.subtitle = page.getByTestId('login-subtitle');
  }
}
