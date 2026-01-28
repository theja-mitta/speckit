## Implementation Plan: Revamp Todo UI (002-revamp-todo-ui)

Summary
- Goal: Redesign the existing Todo app UI, add drag-and-drop reordering and cross-section movement (Active ⇄ Completed), preserve order & membership in `localStorage`, and improve visual polish and accessibility.
- Assumes: Next.js + TypeScript + Tailwind are in use (matches repo). Recommended DnD lib: `@dnd-kit/core` (small, accessible) — alternatives: `react-beautiful-dnd` (deprecated), HTML5 drag (manual).

Phases & Tasks

Note: `tasks.md` uses Phase numbers starting at Phase 1. The plan's Phase 0..8 map to `tasks.md` Phase 1..9 respectively (plan Phase0 == tasks Phase1). Consider aligning numbering when implementing.

Phase 0 — Setup (dev minutes: 15–30)
- Add chosen DnD dependency and light animation helper (if needed).
- Confirm Tailwind tokens and responsive breakpoints.
- Tasks: `package.json` updates, `npm install`, update `postcss` if needed.

Phase 1 — Data model & persistence (dev hours: 0.5)
- Extend `TodoItem` with `order: number` and keep `completed: boolean`.
- Update `src/lib/todoStore.ts` to persist an ordered array and return items sorted by `order`.
- Acceptance: Saving order persists across reload; unit tests for store.

Phase 2 — Context API & adapter (dev hours: 1)
- Add context methods: `move(itemId, toIndex, toSection?)`, `reorder(section, fromIndex, toIndex)` and expose `itemsBySection()`.
- Ensure context writes final state to `todoStore` once drag completes.
- Acceptance: calling `move` updates `items` and persists; unit tests for context logic.

Phase 3 — Drag-and-drop infra (dev hours: 2–4)
- Implement `DraggableList` and `DroppableSection` using `@dnd-kit/core` with sensible sensors for mouse/touch/keyboard.
- Provide keyboard move controls (move up/down, move to other section) as ARIA-friendly buttons when focused.
- Acceptance: manual drag + keyboard reordering works; integration tests simulate DnD operations (react-testing-library + fireEvent or dnd-kit testing utilities).

Phase 4 — UI redesign (dev hours: 2–4)
- New layout: two sections (`Active`, `Completed`) shown side-by-side on wide screens and stacked on narrow screens; each todo is a card with checkbox, title (editable), drag handle, and delete.
- Add subtle motion (tailwind transitions) for reorder and move animations.
- Acceptance: responsive layout verified at 320/768/1280 widths and visual checks for animations.

Phase 5 — Accessibility & keyboard (dev hours: 1–2)
- Add ARIA roles: `list`, `listitem`, `button` for move controls, `aria-grabbed`/`aria-dropeffect` where applicable.
- Ensure focus order, visible focus rings, and screen reader announcements on move/complete.
- Acceptance: keyboard-only users can reorder and move items.

Phase 6 — Tests (dev hours: 2–4)
- Unit tests: `todoStore` save/load + order; `TodoContext` move/reorder logic; edge cases (invalid indices, empty title).
- Integration tests: render `TodoApp` and exercise add → drag reorder → move section → reload (re-mount) to assert persisted order.
- Coverage: aim for global >= 80% (Jest config already in repo).

Phase 7 — CI & build verification (dev minutes: 30)
- Update `.github/workflows/ci.yml` to run tests and `npm run build` (already present; ensure new deps installed in CI and `npm ci` succeeds).
- CI MUST also run `npm run lint` and `npm run type-check` (or equivalent), and run a lightweight Lighthouse/performance audit on the main page with a configurable threshold (recommend Lighthouse >= 90). The workflow should fail the gate if lint/type-check fail or the performance threshold is not met.
- Acceptance: CI shows green for lint + type-check + tests + build + perf audit; coverage enforced.

Phase 8 — Polish & docs (dev hours: 1)
- Add `specs/002-revamp-todo-ui/README.md` with feature notes and how to run locally.
- Add small visual regression snapshots if desired; add screenshot in PR.

Deliverables
- Updated components: `src/components/TodoApp.tsx`, `src/components/DraggableList.tsx`, `src/components/DroppableSection.tsx`.
- Persisted ordering in `src/lib/todoStore.ts` and `src/context/TodoContext.tsx` methods for `move`/`reorder`.
- Tests under `__tests__/` covering model, context, and integration DnD flows.
- CI workflow verifying tests + `npm run build`.

Risks & Mitigations
- Performance for very large lists: consider virtualization (e.g., `react-virtuoso`) if we see slow re-renders.
- DnD accessibility: prefer `@dnd-kit` for keyboard sensors; add explicit keyboard controls as fallback.
- React/Next compatibility: keep deps conservative to avoid peer conflicts (use `--legacy-peer-deps` in CI only if necessary; prefer aligning React versions if feasible).

Estimate & Order
- MVP: Phases 0–4 (approx. 6–10 hours). Accessibility, tests and CI follow (additional 4–6 hours). Adjust based on feedback.
