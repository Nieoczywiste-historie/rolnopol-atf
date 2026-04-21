# Rolnopol - Simple Test Plan

## 1. Goal
The goal of testing is a quick verification of the most important Rolnopol system features described in the official documentation: `http://localhost:3000/docs.html`.

## 2. Scope
The plan includes E2E and API tests for key areas:
- Registration, login, and logout
- Permissions and resource access (RBAC)
- Farm resource management (fields, animals, staff, assignments)
- Marketplace (listing creation and purchase)
- Financial operations (balance, transaction history, no overdraft)
- System health check

## 3. Out Of Scope
- Performance and load testing
- Security penetration testing
- Cross-browser compatibility beyond the default Playwright configuration

## 4. Test Strategy
- UI layer: E2E scenarios in Playwright
- API layer: key endpoints via API Explorer (`/swagger.html`) or Playwright API requests
- Risk-based approach: critical business flows first

## 5. Environment And Tools
- Application: `http://localhost:3000`
- Documentation: `http://localhost:3000/docs.html`
- API Explorer: `http://localhost:3000/swagger.html`
- Framework: Playwright (`@playwright/test`)

## 6. Test Data
- Use demo accounts from documentation
- At least 2 different farmer accounts for marketplace transaction tests
- 1 admin account for permission tests
- Negative data: invalid email/password, insufficient balance, resource assigned to a field

## 7. Entry Criteria
- Application is running locally and available at `http://localhost:3000`
- API endpoints are available
- Test accounts are ready to use

## 8. Exit Criteria
- All critical tests (P1) are completed
- No open blockers for login, purchase, and settlement flows
- Test report and bug list are delivered

## 9. Simple Test Scenarios

| ID | Priority | Area | Scenario | Expected Result | Tags | Status |
|---|---|---|---|---|---|---|
| TP-01 | P1 | Auth | Register a new user | Account created, success notification shown, redirected to login | `@p1` `@auth` `@registration` | Implemented |
| TP-02 | P1 | Auth | Login with valid credentials | Token/cookies set, access to protected resources | `@p1` `@auth` `@login` `@smoke` | Not Implemented |
| TP-03 | P1 | Auth | Login with invalid credentials | Error message shown, no session created | `@p1` `@auth` `@login` `@negative` | Not Implemented |
| TP-04 | P1 | Auth | Logout | Session removed, no access to protected resources | `@p1` `@auth` `@logout` | Not Implemented |
| TP-05 | P1 | RBAC | Farmer tries to access admin endpoint | Access denied (401/403) | `@p1` `@rbac` | Not Implemented |
| TP-06 | P1 | Farm | Add field, animal, and staff member | Records saved and visible on dashboard | `@p1` `@farm` | Not Implemented |
| TP-07 | P2 | Farm | Assign worker/animal to a field | Assignment created and data remains consistent | `@p2` `@farm` `@assignment` | Not Implemented |
| TP-08 | P1 | Marketplace | List an unassigned resource | Offer has `active` status | `@p1` `@marketplace` | Not Implemented |
| TP-09 | P1 | Marketplace | Try to list an assigned resource | Offer has `unavailable` status or operation is blocked | `@p1` `@marketplace` `@negative` | Not Implemented |
| TP-10 | P1 | Marketplace+Finance | Purchase active offer by another user | Ownership changes, `sold` status, financial transactions created | `@p1` `@marketplace` `@finance` | Not Implemented |
| TP-11 | P1 | Finance | Attempt purchase with insufficient balance | Purchase blocked, `Insufficient funds` error | `@p1` `@finance` `@negative` | Not Implemented |
| TP-12 | P2 | Health | Check health/db status endpoint | Endpoint returns OK status | `@p2` `@health` | Not Implemented |
| TP-13 | P1 | Smoke | Documentation page is visible and loaded | URL matches `/docs.html`, subtitle is visible | `@p1` `@smoke` | Implemented |
| TP-14 | P1 | Smoke | API Explorer page is visible and loaded | URL matches `/swagger.html`, API description is visible | `@p1` `@smoke` | Implemented |
| TP-15 | P1 | Smoke | Home page title is displayed | Page title contains 'Rolnopol' | `@p1` `@smoke` | Implemented |
| TP-16 | P1 | Smoke | Login page is visible and loaded | URL matches `/login.html`, subtitle is visible | `@p1` `@smoke` `@auth` `@login` | Implemented |
| TP-17 | P1 | Smoke | Register page is visible and loaded | URL matches `/register.html`, subtitle is visible | `@p1` `@smoke` `@auth` `@registration` | Implemented |

## 10. Risks And Notes
- Documentation indicates demo-only security aspects (for example plain text passwords) and these should not be treated as production security criteria.
- Dependencies between areas (marketplace and finance) may cause cascading defects.
- Marketplace tests require precise data reset or stable demo data.

## 11. Minimal Execution Plan
1. Run smoke test (home/title, login).
2. Execute P1 tests in order: Auth -> RBAC -> Farm -> Marketplace -> Finance.
3. Finally run P2 tests and summarize the report.
