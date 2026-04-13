# Copilot Instructions

## Testing Framework

This project uses the **Playwright Test** framework for end-to-end testing.

- Always review `playwright.config.ts` before creating new tests — it defines base URL, browsers, timeouts, reporters, and other settings that tests must align with.

## Conventional Commits

Use this format for commit messages:

```
<type>(<scope>): <subject>
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `ci`, `chore`

**Rules**:
- Use imperative mood (e.g., "add" not "added")
- No period at the end
- Max 50 characters
- Scope is optional

**Examples**:
- `feat(auth): add password reset`
- `fix(api): correct endpoint check`
- `docs: update README`
- `test: add unit tests for auth`

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
