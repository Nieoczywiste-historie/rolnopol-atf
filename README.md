# rolnopol-atf

Automated test framework for the **Rolnopol** web application — an agricultural management platform. Built with [Playwright](https://playwright.dev/) and TypeScript, it covers E2E flows for authentication, farm management, marketplace, and finance features.

## Requirements

- Node.js `^20.19.0 || ^22.13.0 || >=24`
- Rolnopol app running locally at `http://localhost:3000`

## Installation

```bash
npm install
npx playwright install
```

`npm install` also runs the `prepare` script, which sets up Husky hooks.

## Static Analysis and Quality Gate

```bash
# Local quality run (mutating)
npm run check

# CI-equivalent quality run (non-mutating)
npm run check:ci

# Individual commands
npm run format
npm run format:check
npm run lint
npm run lint:fix
npm run tsc:check
```

### Pre-commit guardrails

- Husky runs `.husky/pre-commit`.
- `lint-staged` formats and lints staged files.
- A full `tsc` check runs before each commit.
- Import sorting is enforced by ESLint (`eslint-plugin-simple-import-sort`).

## Running Tests

```bash
# Run all tests (headless)
npm test

# Run all tests (headed)
npm run test:headed

# Run unit tests only
npm run test -- --project=unit-tests
```

Reports are saved to `playwright-report/`. Traces are always captured.

## Project Structure

```
src/
  urls.ts          # Centralised URL constants
  helpers/         # Shared utilities (e.g. email generation)
  pages/           # Page Object classes (one per page)
tests/
  *.spec.ts        # Test files
playwright.config.ts
```

## Further Reading

- [CODING_STANDARDS.md](CODING_STANDARDS.md) — Page Object conventions, tagging rules, and test structure
- [TEST_PLAN.md](TEST_PLAN.md) — Scope, test scenarios, and entry/exit criteria
