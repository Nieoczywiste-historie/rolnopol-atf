---
name: sync-test-plan
description: Focused one-shot review of TEST_PLAN alignment with current implemented tests.
---

<!-- Tip: Use /create-prompt in chat to generate content with agent assistance -->

Review `TEST_PLAN.md` and verify that it matches the current implemented tests.
Inspect `tests/**`, `playwright.config.ts`, and `.github/workflows/**` as needed.
If some requirements are only partially implemented, split them into separate parts.

