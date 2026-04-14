# Coding Standards

## Page Object Pattern

### Structure

Each Page Object class must follow this structure:

```ts
export class ExamplePage {
  readonly page: Page;
  readonly someElement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.someElement = page.getByTestId('some-element');
  }

  async goto() { ... }

  async performAction(...) { ... }
}
```

### Rules

**1. No assertions inside Page Objects.**
Page Objects must not contain `expect()` calls. All verifications belong in test files.

**2. Expose locators as public readonly properties.**
Declare all locators in the constructor so tests can assert on them directly.

**3. Methods perform actions only.**
Each method should represent a single user interaction or a logical sequence of interactions — nothing more.

**4. Use `data-testid` attributes as the primary selector strategy.**
Fall back to `getByRole` or `getByText` only when `data-testid` is unavailable.

**5. Navigation belongs in `goto()`.**
Every page that requires a direct URL visit must expose a `goto()` method that calls `page.goto()` and waits for the page to load.

## Test Tagging

Every test must include tags matching the scenario from `TEST_PLAN.md` section 9.

**Available tags**:
- Priority: `@p1`, `@p2`
- Area: `@auth`, `@rbac`, `@farm`, `@marketplace`, `@finance`, `@health`
- Type: `@smoke`, `@negative`, `@registration`, `@login`, `@logout`, `@assignment`

**Rules**:
- Apply all tags listed in the `Tags` column for the matching scenario ID
- Use Playwright's `test.tag()` or inline tag syntax: `test('scenario @p1 @auth @smoke', ...)`
- When adding a new scenario, add it to `TEST_PLAN.md` first, then reference its tags in the test
- Keep tags in sync: any change to scenario tags in `TEST_PLAN.md` must be reflected in the test file

**Example**:
```ts
test('login with valid credentials @p1 @auth @login @smoke', async ({ page }) => { ... });
```

## Arrange Act Assert

Every test body must use `// Arrange`, `// Act`, `// Assert` comments separated by blank lines. Omit `// Arrange` if there is no setup.

**Example**:
```ts
test('register a new user with valid data', { tag: ['@p1', '@auth', '@registration'] }, async ({ page }) => {
  // Arrange
  const uniqueEmail = `testuser_${Date.now()}@example.com`;

  await page.goto('/register.html');
  await page.waitForLoadState('load');

  // Act
  await page.getByPlaceholder('Enter your email (e.g., john@example.com)').fill(uniqueEmail);
  await page.getByPlaceholder('Enter your display name (e.g., John Doe)').fill('ATF Test User');
  await page.getByPlaceholder('Enter your password').fill('Test123!');
  await page.getByRole('button', { name: 'Create Account' }).click();

  // Assert
  await expect(page.getByRole('alert').locator('.notification-message')).toHaveText('Registration successful!');
  await expect(page).toHaveURL(/login\.html/);
});
```
