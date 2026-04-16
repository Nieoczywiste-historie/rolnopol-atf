import { type Page } from '@playwright/test';
import { URLs } from '../urls';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly url = URLs.home;

  constructor(page: Page) {
    super(page);
  }
}
