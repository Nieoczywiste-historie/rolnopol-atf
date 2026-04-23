import { type Locator, type Page } from '@playwright/test';
import { URLs } from '../urls';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {
  readonly url = URLs.register;
  readonly subtitle: Locator;
  readonly emailInput: Locator;
  readonly displayNameInput: Locator;
  readonly passwordInput: Locator;
  readonly createAccountButton: Locator;
  readonly successNotification: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;

  constructor(page: Page) {
    super(page);
    this.subtitle = page.getByTestId('register-subtitle');
    this.emailInput = page.getByTestId('email-input');
    this.displayNameInput = page.getByTestId('display-name-input');
    this.passwordInput = page.getByTestId('password-input');
    this.createAccountButton = page.getByTestId('register-submit-btn');
    this.successNotification = page.getByRole('alert').locator('.notification-message');
    this.emailError = page.getByTestId('email-input').locator('..').getByRole('alert');
    this.passwordError = page.getByTestId('password-input').locator('..').getByRole('alert');
  }

  async register(email: string, password: string, displayName?: string) {
    await this.emailInput.fill(email);
    if (displayName) await this.displayNameInput.fill(displayName);
    await this.passwordInput.fill(password);
    await this.createAccountButton.click();
  }
}
