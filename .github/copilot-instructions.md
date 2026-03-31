# Copilot Instructions

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
