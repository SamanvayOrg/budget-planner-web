# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The React single-page frontend for **citybudgets.in** — a municipal (ULB) budget-planning app built for CEPT by Samanvay Foundation. It talks to one backend over `/api` and uses **Auth0** for login. Sibling repos:

- `budget-planner-web` — this app (React 18 on Create React App)
- `../budget-planner-server` — Spring Boot REST API (the only backend this app calls)
- `../budget-planner-infra` — Ansible deployment (serves this app's build as static files via Nginx)

## Commands

| Task | Command |
|------|---------|
| Install deps | `make deps` (`npm install --legacy-peer-deps` — the `--legacy-peer-deps` flag is required; plain `npm install` fails on peer conflicts) |
| Dev server | `npm start` / `make start` — CRA on `:3000`, proxies `/api` → `http://localhost:8080` (`proxy` in `package.json`) |
| Production build | `npm run build` / `make build-app` → `build/` |
| Build deploy artifact | `make build-and-zip` → `budget-planner-web.zip` (zips the `build/` dir; this zip is what infra deploys) |
| Tests | `npm test` (react-scripts / Jest + Testing Library) |
| Single test | `npm test -- src/path/file.test.js` or `npm test -- -t "name pattern"` |
| Storybook | `npm run storybook` (`:6006`) |

`.nvmrc` pins Node to `lts/*`. There is **no `.env` in the repo** — Auth0 values are injected at build time.

## Configuration / Auth0

`src/config.js` reads `REACT_APP_AUTH0_DOMAIN_ID`, `REACT_APP_AUTH0_CLIENT_ID`, and `REACT_APP_AUTH0_AUDIENCE` (audience defaults to `https://api.budget-planner` in code). `src/index.js` composes the app root: `<Provider store>` (Redux) wrapping `<Auth0Provider>` with `scope: "openid profile use:app"`, `redirectUri: window.location.origin`, `cacheLocation: 'localstorage'`. The API base is relative — the dev `proxy` forwards `/api` to the server; in prod the app and API are same-origin (Nginx).

## Architecture

CRA app (`react-scripts` 5), state in **Redux Toolkit**, routing with **React Router 6 (HashRouter)**, UI in **MUI 5**, i18n via **i18next**, HTTP via **axios**. The budget grid is **`react-spreadsheet`**. Note: `react-admin` / `ra-data-json-server` are in `package.json` but effectively unused for the main flows — pages are hand-rolled MUI (no Formik/RHF); don't assume react-admin is load-bearing.

### Auth & RBAC flow
Auth0's `getAccessTokenSilently()` → token stored in `localStorage['authToken']` → decoded with `jwt-decode` → the `permissions` array lands in Redux (the `currentUser` slice). `src/routes/Routing.js` gates routes by role using `_.includes(permissions, role)`; the roles are `superAdmin`, `admin`, and regular user. These permission names match the server's `@PreAuthorize` authorities.

### API layer
`src/api/api.js` holds thin axios wrappers (budget, municipality, user, translation, report calls). **Every call takes a `token` argument and sends `Authorization: Bearer <token>`**, with relative `/api/...` URLs. Errors are returned to callers (`.catch` → response) rather than thrown — callers inspect `.status`.

### State
`src/store/` has one Redux Toolkit slice per domain concern (auth, currentUser, budget, budgetDashboard, allBudgets, municipalityDetails, metadata, allUsers, translations, `i18Lang`, cityClasses, state, reports).

### Budget model (mirrors the server)
`src/domain/` transforms between the server's shape and the UI:
- `fromContract` / `toContract` — hierarchical client model ↔ flat `budgetLines` payload
- `getBudgetView` — model → react-spreadsheet array-of-arrays
- `validateBudget` — enforces budget ≥ actuals, revenue income ≥ revenue expense, capital income ≥ capital expense

The hierarchy mirrors the backend: `Budget` → major-head-groups ("Revenue Receipt" / "Expenses" / "Assets (Capital Expenditure)" / "Liability (Capital Income)") → major heads → budget lines (with budgeted / 8-month / 4-month-probable / prior-year figures).

### i18n
Static JSON catalogs `src/i18n/translations/en.json` and `mr.json` (English, Marathi). Selected language persists to `localStorage['language']`.

### Folder conventions
`views/Admin/` and `views/superAdmin/` hold role-specific pages; `components/` holds reusable UI. Auth token and language both live in `localStorage`.
