````markdown
# Implementation Plan: Gherkin Todo (Minimal)

**Branch**: `001-gherkin-todo` | **Date**: 2026-01-28 | **Spec**: [spec.md](spec.md)

## Summary

Deliver a minimal static Next.js + TypeScript Todo app styled with Tailwind. Key features: add, list, toggle, edit, delete, persisted via a small `todoStore` adapter (backed by `localStorage`). Tests: unit + integration with >=80% coverage.

## Technical Context

- Language/Version: TypeScript (via Next.js app dir)
- Primary Dependencies: `next`, `react`, `react-dom`, `tailwindcss`
- Testing: `jest` + `ts-jest` + `@testing-library/react` (UI), node unit tests
-- Storage: `todoStore` adapter (localStorage-backed, browser-only) with testable hooks
- Target Platform: Static export / CDN-hosted assets (Next.js static generation)
- Performance Goals: Minimal bundle size for main page; images none (tiny app)
- Constraints: No backend; everything must work offline in browser session via `localStorage`.

## Constitution Check

All Feature gates satisfied per constitution: Test-First & Coverage (>=80%), Code Quality (lint/type), UX Consistency (Tailwind tokens), Performance (small bundle).

## Project Structure (selected)

``text
src/
├── app/                 # Next.js pages (or pages/ for pages-router)
│   └── page.tsx         # mounts TodoApp
├── components/
│   └── TodoApp.tsx     # UI: input, add button, items (existing)
├── context/
│   └── TodoContext.tsx  # add/update/toggle/delete + provider
├── lib/
│   └── todoStore.ts  # adapter and serialization helpers (existing)
└── styles/
    └── globals.css      # Tailwind imports
```

## Implementation Notes

- `Todo` type: `{ id: string; title: string; completed: boolean; createdAt?: string }`.
-- Keep UI in-component for simplicity; extract logic to `TodoContext` to enable testing and decouple persistence from the `todoStore`.
- `TodoContext` API: `add(title)`, `update(id, title)`, `toggle(id)`, `remove(id)`, `items`.
-- Use `useEffect` in provider to sync `items` → `todoStore` and initialize from `todoStore` on mount.
-- The `todoStore` adapter exposes `loadTodos(): Todo[]` and `saveTodos(items: Todo[])` and handles corrupt data gracefully. A small `TodoContext` wrapper will adapt `todoStore` to the context API.
- Styling: Tailwind utility classes for layout and accessibility (focus rings, spacing, colors). No CSS modules required.

## Testing Strategy

- Unit tests (Jest + ts-jest):
  - `lib/localStorage` — load/save, corrupt data fallback (node environment, mock `localStorage`).
  - `context/TodoContext` — verify add/update/toggle/remove behaviors and effect on `items` state using a mocked storage adapter.
  - Small component unit tests for stateless helpers if any.
- Integration tests (Jest + @testing-library/react, jsdom):
  - Render `TodoApp` with provider and exercise full flows: add → visible, toggle → checked state persists, edit → title updated, delete → removed.
  - Simulate reload by re-mounting provider using the same mocked `todoStore` to check persistence.
- Coverage: Enforce thresholds (>=80%) in `jest.config.cjs` and CI. Tests should fail locally/CI when below threshold.
- Mocks: Provide a simple in-memory `localStorage` mock for tests; prefer dependency injection of storage adapter into provider for easier mocking.

## Tasks (high-level)

-- T1: Create `Todo` type and `todoStore` adapter (unit-tested).
- T2: Implement `TodoContext` with full API and tests.
- T3: Implement `TodoList` component and mount in `app/page.tsx`.
- T4: Tailwind setup: `tailwind.config.js`, `postcss.config.js`, and `globals.css` imports.
- T5: Add Jest + ts-jest + RTL config and basic test harness (setup file).
- T6: Add CI workflow to run tests and enforce coverage.

## Deliverables

-- `src/components/TodoApp.tsx`, `src/context/TodoContext.tsx`, `src/lib/todoStore.ts`.
- Tests under `__tests__/` covering model, context, and UI flows.
- `jest.config.cjs` with coverage thresholds and `.github/workflows/ci.yml`.
- Tailwind config and `globals.css` with `@tailwind base; @tailwind components; @tailwind utilities;`.

## Timebox & Prioritization

- Day 0.5: Setup Tailwind + Next page and mount component.
- Day 0.5: Implement `TodoContext` and `localStorage` adapter with unit tests.
- Day 0.5: Implement UI and integration tests for add/list/toggle/edit/delete.
- Day 0.5: CI wiring, coverage threshold verification, polish.

````
