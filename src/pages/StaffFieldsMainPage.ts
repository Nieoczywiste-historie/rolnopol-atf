import { type Locator, type Page } from '@playwright/test';
import { URLs } from '../urls';
import { BasePage } from './BasePage';

export class StaffFieldsMainPage extends BasePage {
  readonly url = URLs.staffFieldsMain;
  readonly heading: Locator;
  readonly fieldsCount: Locator;
  readonly addFieldButton: Locator;
  readonly fieldNameInput: Locator;
  readonly districtSelect: Locator;
  readonly areaInput: Locator;
  readonly submitAddFieldButton: Locator;
  readonly fieldsList: Locator;
  readonly searchFieldsInput: Locator;
  readonly fieldAddedNotification: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Staff & Fields Management', level: 1 });
    this.fieldsCount = page.locator('.stat-card').filter({ hasText: 'Fields' }).locator('.stat-number');
    this.addFieldButton = page.getByRole('button', { name: '+ Add Field' }).first();
    this.fieldNameInput = page.getByRole('textbox', { name: 'Field Name' });
    this.districtSelect = page.getByRole('combobox', { name: 'District (optional)' });
    this.areaInput = page.getByRole('spinbutton', { name: 'Area (ha)' });
    this.submitAddFieldButton = page.locator('#addFieldForm').getByRole('button', { name: '+ Add Field' });
    this.fieldsList = page.locator('.fields-list');
    this.searchFieldsInput = page.getByPlaceholder('Search fields...');
    this.fieldAddedNotification = page.getByText('Field added!');
  }

  async openAddFieldModal() {
    await this.addFieldButton.click();
    await this.fieldNameInput.waitFor({ state: 'visible' });
  }

  async fillFieldForm(name: string, area: string, district?: string) {
    await this.fieldNameInput.fill(name);
    if (district) {
      await this.districtSelect.selectOption({ label: district });
    }
    await this.areaInput.fill(area);
  }

  async submitAddField() {
    await this.submitAddFieldButton.click();
    await this.fieldNameInput.waitFor({ state: 'hidden' });
  }

  getFieldByName(name: string): Locator {
    return this.page.locator('li').filter({ has: this.page.locator('strong', { hasText: name }) });
  }
}
