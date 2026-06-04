import { expect, test } from '@playwright/test';
import { StaffFieldsMainPage } from '../../src/pages/StaffFieldsMainPage';

test(
  'authenticated user can add a new field in Staff & Fields view',
  { tag: ['@p1', '@farm'] },
  async ({ page }) => {
    // Arrange
    const staffFieldsPage = new StaffFieldsMainPage(page);
    const fieldName = `ATF Field ${Date.now()}`;
    const fieldArea = '10';

    await staffFieldsPage.goto();

    // Act
    await staffFieldsPage.openAddFieldModal();
    await staffFieldsPage.fillFieldForm(fieldName, fieldArea);
    await staffFieldsPage.submitAddField();

    // Assert
    await expect(staffFieldsPage.searchFieldsInput).toBeVisible();
    await staffFieldsPage.searchFieldsInput.fill(fieldName);

    const createdField = staffFieldsPage.getFieldByName(fieldName);
    await expect(createdField).toBeVisible();
    await expect.soft(createdField.locator('strong')).toHaveText(fieldName);
    await expect.soft(createdField).toContainText(`${fieldArea} ha`);
  }
);
