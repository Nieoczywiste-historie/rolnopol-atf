import { type Locator, type Page } from '@playwright/test';
import { URLs } from '../urls';
import { BasePage } from './BasePage';

export class SwaggerPage extends BasePage {
  readonly url = URLs.swagger;
  readonly apiDescription: Locator;

  constructor(page: Page) {
    super(page);
    this.apiDescription = page.frameLocator('#swagger-frame').locator('.info .description');
  }
}
