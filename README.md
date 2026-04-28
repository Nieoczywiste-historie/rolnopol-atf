# rolnopol-atf

Automated test framework for the **Rolnopol** web application — an agricultural management platform. Built with [Playwright](https://playwright.dev/) and TypeScript, it covers E2E flows for authentication, farm management, marketplace, and finance features.

## Requirements

- Node.js 18+
- Rolnopol app running locally at `http://localhost:3000`

## Installation

```bash
npm install
npx playwright install
```

## Running Tests

```bash
# Run all tests (headless)
npm test

# Run all tests (headed)
npm run test:headed
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
