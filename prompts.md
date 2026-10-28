# Prompt library

Reusable prompts for agent tasks in this repo. Fill in the `<placeholders>`.
The agent also reads `AGENTS.md`, so prompts only need task-specific details.

## Templates

### New feature

```
Context: <where this fits in the app, related components/files>
Goal: <what the user can do after this change>
Constraints:
- Branch: feature/<name> from dev. One PR.
- Touch only: <files/folders>. State stays in App.
- No new dependencies.
Acceptance criteria (each one must be checkable by a test):
- <criterion 1>
- <criterion 2>
Examples:
- <input> -> <expected result>

Propose a plan first and wait for my approval before writing code.
```

### Bug fix

```
Context: <component/file, how it is used>
Bug: <what happens>
Expected: <what should happen>
Steps to reproduce:
1. <step>
2. <step>
Constraints:
- Branch: fix/<name> from dev.
- Fix the cause, not the symptom. Minimal diff.
- First write a test that reproduces the bug and fails; then make it pass.
Done when: the new test passes, all existing tests pass, and <manual check>.
```

### Refactor

```
Context: <file(s) to refactor>
Goal: <what should be better: readability, duplication, structure>
Constraints:
- Branch: chore/<name> from dev.
- No behaviour change. No changes to test files.
- No new dependencies.
Done when: all existing tests pass unchanged and the diff only touches <files>.
Show the plan first.
```

### Generate tests

```
Context: <file/component under test>
Goal: tests for <behaviour list>
Constraints:
- Branch: test/<name> from dev.
- Vitest + React Testing Library; select elements by role, label or data-cy, not CSS classes.
- Do not modify the code under test.
- Each test checks one behaviour and has a name that says what it checks.
- No snapshot tests, no tests that only check that something renders.
For each test, tell me what change in the source code would make it fail.
```

### Review diff

```
Review the diff of <branch> against dev (`git diff dev...<branch>`).
Check:
1. Does it run? (`npm run build`, `npx vitest run`)
2. Does it match the request: <link to task/prompt>?
3. Anything out of scope: unrelated changes, new dependencies, reformatting.
4. Bugs and edge cases: empty/invalid input, rounding, state updates.
5. Tests: does each test fail if the feature is broken?
Report findings as a list: file:line, problem, suggested fix. Don't change any code.
```

### Commit message

```
Write a commit message for the staged changes (`git diff --staged`).
- Subject: imperative mood, max 60 chars, no trailing period.
- Body (if needed): what and why, wrapped at 72 chars.
- No co-author or AI attribution lines.
```

## Feature prompt: Add expense

**Context**
Vite + React expense tracker, freshly scaffolded. `App.jsx` will own the list of expenses.
There are no components yet. Conventions and `data-cy` names are in `AGENTS.md`.

**Goal**
The user can add an expense with a title, an amount and a category through a form
(`src/components/ExpenseForm.jsx`). Valid expenses are added to the list in `App` state;
invalid input is rejected with an error message.

**Constraints**
- Branch `feature/expense-form` from `dev`, one PR into `dev`.
- State lives in `App`; `ExpenseForm` gets an `onAdd(expense)` callback and keeps only its
  field values locally.
- Validation is a pure function in `src/utils/validateExpense.js` that returns an error
  message, or `null` when the input is valid.
- No new dependencies. No changes outside `src/App.jsx`, `src/components/`, `src/utils/`.
- Elements use `data-cy`: `title`, `amount`, `category`, `add-expense`, `error`.

**Acceptance criteria**
1. The form has a title text input, an amount input and a category select with exactly
   the options `Food`, `Travel`, `Bills`, `Other`.
2. Submitting a valid expense calls `onAdd` once with
   `{ id, title, amount, category }`, where `title` is trimmed, `amount` is a `Number`
   and `id` is unique.
3. After a successful add, the title and amount fields are cleared.
4. An empty title, or one made only of spaces, is rejected: `onAdd` is not called and
   the `error` element is shown.
5. A non-numeric amount (e.g. `abc`, empty) is rejected the same way.
6. A zero or negative amount (`0`, `-5`) is rejected the same way.
7. After a rejected submit, the entered values stay in the fields.
8. `validateExpense` returns `null` for valid input and a non-empty string for each case
   in 4–6.

**Examples**

| Title | Amount | Category | Result |
|---|---|---|---|
| `Lunch` | `250` | Food | added: `{ title: "Lunch", amount: 250, category: "Food" }` |
| `  Cab  ` | `400.5` | Travel | added with title `Cab`, amount `400.5` |
| `` (empty) | `100` | Bills | rejected: title is required |
| `   ` | `100` | Other | rejected: title is required |
| `Rent` | `abc` | Bills | rejected: amount must be a number |
| `Rent` | `0` | Bills | rejected: amount must be greater than 0 |
| `Rent` | `-5` | Bills | rejected: amount must be greater than 0 |

Propose a plan first and wait for my approval before writing code.
