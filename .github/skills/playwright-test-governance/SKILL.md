---
name: playwright-test-governance
description: "Review and synchronize Playwright test governance artifacts. Use for TEST_PLAN-to-test coverage audits, tag consistency checks, Playwright project and workflow alignment, partial implementation splits, and keeping test docs, tests, and CI in sync."
argument-hint: "Audit scope, current mismatch or goal, and whether to report only or apply changes"
user-invocable: true
disable-model-invocation: false
---
# Playwright Test Governance

Use this skill when the task is not writing one specific test, but checking or synchronizing the repository's test governance surfaces.

This skill is for repository-level consistency across:
- `TEST_PLAN.md`
- `tests/**`
- `playwright.config.ts`
- `.github/workflows/**`
- test tags, scenario status, and project routing

## When to Use

Use this skill when the user asks things like:
- "review whether the test plan matches the implemented tests"
- "sync TEST_PLAN with Playwright tests"
- "check whether our scenario tags are consistent"
- "find missing or partially implemented scenarios"
- "verify Playwright projects and workflows still match the test suite"
- "audit whether CI is running the right tests"
- "split partially implemented requirements into separate test-plan entries"

## When Not to Use

Do not use this skill for:
- creating or debugging a single test case without governance changes
- broad static-analysis or lint setup work
- general repo instructions that should stay always-on

Use the `ui-test-automation` custom agent when the main task is implementing or maintaining Playwright tests.
Use `.github/copilot-instructions.md` for always-on project rules.

## Goals

This skill should help produce a repository state that is:
- consistent between documentation and implementation
- explicit about test coverage and gaps
- aligned on tags, priorities, and areas
- aligned between Playwright project routing and test locations
- aligned between local test organization and CI execution

## Required Inputs

Before making conclusions, inspect the current versions of:
- `.github/copilot-instructions.md`
- `CODING_STANDARDS.md`
- `TEST_PLAN.md`
- `playwright.config.ts`
- `package.json`
- `.github/workflows/**`
- relevant files under `tests/**`

## Workflow

### 1. Establish the authority order

Use this order when evaluating disagreements:
1. direct user request
2. repository rules in `.github/copilot-instructions.md`
3. standards in `CODING_STANDARDS.md`
4. declared scenarios in `TEST_PLAN.md`
5. current implemented tests and project routing

If two sources disagree, report the mismatch explicitly instead of guessing.

### 2. Map the declared scenarios

Read the scenario table in `TEST_PLAN.md` and extract, for each row when relevant:
- scenario ID
- priority
- area
- scenario description
- expected result
- tags
- status

When requirements are compound, note that they may need to be split into separate entries.

### 3. Map the implemented suite

Inspect the current tests and identify:
- which scenarios are implemented
- which tags are used in each test
- whether tags match the plan
- whether the scenario appears fully implemented, partially implemented, or missing
- whether setup files or shared auth flows hide coverage assumptions

Include unit tests when they represent documented requirements rather than pure implementation details.

### 4. Check Playwright routing

Inspect `playwright.config.ts` and verify:
- project names match the intended suite structure
- `testMatch` patterns still select the right files
- dependencies between setup and dependent projects are coherent
- the current suite organization does not leave tests orphaned or duplicated

### 5. Check CI and workflow alignment

Inspect `.github/workflows/**` and verify:
- the workflow runs the intended quality gates
- the workflow runs the intended Playwright command(s)
- new or moved tests are still covered by CI execution
- required environment variables and setup assumptions are reflected in CI

### 6. Classify mismatches

Classify findings into one of these buckets:
- missing implementation: planned scenario has no matching test
- undocumented implementation: test exists but the plan does not reflect it
- partial implementation: only part of a requirement is covered
- tag drift: test tags do not match the plan
- routing drift: Playwright config no longer matches test organization
- workflow drift: CI no longer matches the intended suite

### 7. Apply the smallest consistent fix

If the user asks for changes, prefer the smallest consistent update set.

Typical fixes include:
- updating `TEST_PLAN.md` statuses or splitting scenarios
- correcting test tags
- adjusting `playwright.config.ts` project matching
- updating workflow commands or assumptions

Do not rewrite unrelated tests or documentation.

### 8. Validate

After making changes, run the narrowest useful validation available:
- targeted search checks for tags, paths, or scenario IDs
- focused test execution when behavior changed
- focused lint or typecheck when config changed

If no executable validation is available, state that clearly.

## Expected Output

When reviewing, report in this order:
1. findings, ordered by severity
2. open questions or assumptions
3. concise summary of the affected governance surfaces

When applying changes, also include:
- which files were updated
- what was validated
- any remaining gaps that were intentionally left unchanged

## Practical Heuristics

- Prefer identifying coverage truth from user-observable tests, not helper names.
- Treat setup/auth bootstrap tests separately from business-scenario coverage.
- A scenario with mismatched tags is not fully synchronized, even if behavior exists.
- A passing `npm test` run does not guarantee the plan and workflow are synchronized.
- If a scenario bundles multiple assertions or outcomes, consider whether the plan should be split for traceability.