# Copilot Instructions

## Coding Standards

All code quality rules, test structure patterns, and naming conventions are defined in [`CODING_STANDARDS.md`](../CODING_STANDARDS.md). Always follow those rules when writing or reviewing code.

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
