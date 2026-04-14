import { type Locator, type Page } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly subtitle: Locator;
  readonly emailInput: Locator;
  readonly displayNameInput: Locator;
  readonly passwordInput: Locator;
  readonly createAccountButton: Locator;
  readonly successNotification: Locator;

  constructor(page: Page) {
    this.page = page;
    this.subtitle = page.getByTestId('register-subtitle');
    this.emailInput = page.getByTestId('email-input');
    this.displayNameInput = page.getByTestId('display-name-input');
    this.passwordInput = page.getByTestId('password-input');
    this.createAccountButton = page.getByTestId('register-submit-btn');
    this.successNotification = page.getByRole('alert').locator('.notification-message');
  }

  async goto() {
    await this.page.goto('/register.html');
    await this.page.waitForLoadState('load');
  }

  async register(email: string, password: string, displayName?: string) {
    await this.emailInput.fill(email);
    if (displayName) await this.displayNameInput.fill(displayName);
    await this.passwordInput.fill(password);
    await this.createAccountButton.click();
  }
}
