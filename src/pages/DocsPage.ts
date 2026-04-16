import { type Locator, type Page } from '@playwright/test';

export class DocsPage {
  readonly page: Page;
  readonly subtitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.subtitle = page.locator('.docs-header-subtitle');
  }

  async goto() {
    await this.page.goto('/docs.html');
    await this.page.waitForLoadState('load');
  }
}
