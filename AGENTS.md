# AGENTS.md

Instructions for coding agents working in this repo. Read this before any task.

## Project

Small React expense tracker: add an expense (title, amount, category), validate input,
list expenses, filter by category, delete, show a running total and the visible count.

## Stack

- Node.js 20+ (developed on 24), npm
- Vite + React (JavaScript, `.jsx`)
- Vitest + React Testing Library + jsdom: unit and component tests
- Cypress: end-to-end tests
- oxlint: linting

## Folder layout

```
src/
  App.jsx              # owns all expense state
  main.jsx             # entry point
  components/          # one component per file, e.g. ExpenseForm.jsx
  utils/               # pure logic (validation, totals, formatting), no React
  **/*.test.{js,jsx}   # unit/component tests, next to the file they test
cypress/
  e2e/                 # *.cy.js end-to-end specs
prompts.md             # prompt templates for agent tasks
```

## Commands

| Task | Command |
|---|---|
| Install | `npm install` |
| Dev server | `npm run dev` (http://localhost:5173) |
| Build | `npm run build` |
| Lint | `npm run lint` |
| Unit/component tests (watch) | `npm test` |
| Unit/component tests (once) | `npx vitest run` |
| Coverage | `npx vitest run --coverage` |
| Cypress (interactive) | `npm run cy:open` (needs `npm run dev` running) |
| Cypress (headless) | `npm run cy:run` (needs `npm run dev` running) |

Test and Cypress scripts are added in their own PRs; if a script is missing, say so instead of inventing one.

## Conventions

- One component per file in `src/components/`, file name = component name (PascalCase).
- State lives in `App`. Child components get data and callbacks through props and keep
  only local UI state (e.g. form field values before submit).
- Business logic (validation, total calculation, formatting) goes into pure functions in
  `src/utils/` so it can be unit-tested without React.
- Every kept component has a short comment above it describing its props and state.
- Interactive and asserted elements get a `data-cy` attribute. Tests select by `data-cy`,
  never by CSS class. Reserved names:
  `title`, `amount`, `category`, `add-expense`, `error`, `expense-item`, `delete`,
  `filter`, `total`, `count`.
- Money is shown with exactly 2 decimal places (`650.00`).
- Categories are exactly: `Food`, `Travel`, `Bills`, `Other`. Filter adds `All`.

## Rules

- **No new dependencies without asking.** Propose the package and why; wait for approval.
- **Plan first.** For every task, propose a short plan and wait for approval before writing code.
- **Work on a branch.** Never commit to `dev` or `main` directly (both are protected).
  - Branch from `dev`: `feature/<name>`, `fix/<name>`, `test/<name>`, `chore/<name>`, `docs/<name>`.
  - One task = one branch = one PR into `dev`.
  - Releases are PRs from `dev` into `main`.
- **Stay in scope.** Change only what the task needs; no drive-by refactors or reformatting.
- **Tests must be meaningful.** A test must fail when the feature it covers is broken.
  Never edit a test to make it pass unless the task says so.
- **Summarise changes for the PR**: what changed, why, how it was tested, anything left out.
- Commit messages: imperative mood, short subject (`Add ExpenseForm with validation`).
  No co-author / AI attribution trailers.
- Never commit secrets or `.env` files.
