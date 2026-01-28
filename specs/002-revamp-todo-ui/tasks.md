---
description: "Task list for 002-revamp-todo-ui"
---

# Tasks: Revamp Todo UI (002-revamp-todo-ui)

Feature input: redesign UI, draggable todos, Active/Completed sections, improved styling and accessibility.

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 [P] Add DnD dependency and animation helper in `package.json` (locked choice: `@dnd-kit/core`, `@dnd-kit/sortable`, optional `framer-motion`) and run `npm install` (update lockfile). Update project README with chosen library decision.
- [ ] T002 [P] Update Tailwind config and global styles in `tailwind.config.cjs` and `src/app/globals.css` (tokens, breakpoints)
- [ ] T003 [P] Verify PostCSS config in `postcss.config.cjs` and ensure Tailwind plugins are present
- [ ] T004 [P] Ensure test harness supports DnD tests: update `jest.config.cjs` and add any test-utils under `__tests__/utils/`

---

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T005 [P] Extend `Todo` type and model: add `order: number` to `src/lib/todoStore.ts` and/or `src/types/todo.ts`
- [ ] T006 [P] Update persistence adapter `src/lib/todoStore.ts` to store an ordered array and restore order on load
- [ ] T007 Update `src/context/TodoContext.tsx` to expose ordering APIs: `move(itemId, toIndex, toSection?)`, `reorder(section, fromIndex, toIndex)` (no story label)
- [ ] T008 [P] Add unit tests for store behavior in `__tests__/todo.store.unit.ts` (save/load/order edge cases)
- [ ] T009 [P] Add unit tests for context ordering logic in `__tests__/todo.context.unit.tsx`

Checkpoint: Foundational components (types, store, context) implemented and unit-tested so stories can be built independently.

---

## Phase 3: User Story 1 — Core CRUD & Persistence (Priority: P1)

Goal: Ensure create, edit, toggle, delete flows continue to work and persist with ordering fields present.

- [ ] T010 [US1] Update `src/components/TodoApp.tsx` to support editable titles and to consume new context ordering APIs
- [ ] T011 [US1] Ensure add/edit/toggle/delete call into `src/context/TodoContext.tsx` and persist via `src/lib/todoStore.ts`
- [ ] T012 [US1] Add integration tests for core flows in `__tests__/todo.core.ui.tsx` (add → edit → toggle → delete → reload)

Independent test: Add a todo, edit its title, toggle completed, delete it, then reload and verify persistence.

---

## Phase 4: User Story 2 — Drag & Drop & Reordering (Priority: P1)

Goal: Allow reordering within sections and moving between sections via drag-and-drop and keyboard controls.

- [ ] T013 [US2] Implement DnD core components: `src/components/DraggableList.tsx` and `src/components/DroppableSection.tsx` using `@dnd-kit/core` and `@dnd-kit/sortable`
- [ ] T014 [US2] Add drag handles, proper aria attributes, and integrate `move`/`reorder` with `src/context/TodoContext.tsx`
- [ ] T015 [US2] Add keyboard move controls and ARIA announcements in `src/components/DraggableList.tsx` (fallback for non-pointer users)
- [ ] T016 [US2] Add integration tests for DnD flows in `__tests__/todo.dnd.ui.tsx` (reorder within section, move across sections, persist after remount)

Independent test: Drag item to reorder within Active; drag item to Completed; remount app and verify new order and section membership persist.

---

## Phase 5: User Story 3 — Visual Redesign & Responsiveness (Priority: P2)

Goal: Provide an appealing layout with visible sections, cards, and responsive behavior.

- [ ] T017 [US3] Create `src/components/TodoLayout.tsx` implementing side-by-side sections on wide screens and stacked sections on mobile
- [ ] T018 [US3] Style todo cards with accessible focus rings, transitions, and touch targets in `src/app/globals.css` or component styles
- [ ] T019 [US3] Add small motion/transition helpers (use `framer-motion` or CSS transitions) in `src/components/*` for reorder/move
- [ ] T020 [US3] Add visual regression snapshots or screenshots under `specs/002-revamp-todo-ui/` for demo

Independent test: Validate layout and interactions at 320px, 768px, and 1280px widths.

---

## Phase 6: Polish & Cross-cutting Concerns

- [ ] T021 [P] Accessibility audit and fixes: keyboard-only flows, roles/labels, announcements — modify `src/components/*` and `src/context/*` accordingly
- [ ] T022 [P] Add/update tests to reach combined coverage >=80%: update test files in `__tests__/` and Jest thresholds in `jest.config.cjs`
- [ ] T023 [P] Update CI workflow `.github/workflows/ci.yml` to run `npm ci`, `npm run build`, and `npm test --coverage`
- [ ] T024 [P] Documentation: add `specs/002-revamp-todo-ui/README.md` with run instructions and feature notes

---

## Remediation Tasks (safety & governance)

- [ ] T025 [P] Add CI steps for `lint` and `type-check`: update `.github/workflows/ci.yml` to run `npm run lint` and `npm run type-check` before tests/build.
- [ ] T026 [P] Add CI Lighthouse/perf check: add a lightweight audit on the main page (Lighthouse or `lighthouse-ci`) with threshold >= 90 (desktop) and fail the job if threshold not met.
- [ ] T027 [P] Enforce test-first guidance for P1 flows: add a developer note in `specs/002-revamp-todo-ui/README.md` and a task in each P1 story reminding implementers to author tests before implementation.
- [ ] T028 [P] Create canonical type file `src/types/todo.ts` and update T005/T006 references to use it; add task to implement and export `TodoItem` type.
- [ ] T029 [P] Record DnD library decision in repo README and `package.json` (already set in T001) so future contributors use `@dnd-kit/core`.
- [ ] T030 [P] Remove template boilerplate from `specs/002-revamp-todo-ui/spec.md` (done) and add this as a documented change in the feature README.

---

## Dependencies & Execution Order

- Foundation (Phase 2) MUST complete before Phase 4 (DnD) and Phase 3 (core UI updates that rely on ordering). Phase 1 can be done in parallel with Phase 2.
- Order: Phase 1 → Phase 2 → Phase 3 (US1) → Phase 4 (US2) → Phase 5 (US3) → Phase 6 (polish/CI)

## Parallel Execution Examples

- Implementers A/B: A works on `src/lib/todoStore.ts` + unit tests (T005/T008) while B adds Tailwind tokens and globals (T002).
- After foundational work, C implements `DraggableList` (T013) while D updates `TodoApp` wiring (T010) — these can proceed in parallel if `TodoContext` API is stable.

## Implementation Strategy

- MVP first: deliver Phase 1 + Phase 2 + Phase 3 so users have reliable CRUD with ordering stored. Then implement Phase 4 DnD and Phase 5 redesign.
- Test-First where practical: Add unit tests for `todoStore` and `TodoContext` before implementing DnD to make logic easier to validate.

## Validation Checklist

- Each User Story phase contains: tests → model changes → context changes → UI wiring → integration test.
- All tasks include exact file targets so a contributor or LLM can implement them without additional context.

## Files created/updated (examples referenced in tasks)

- `package.json`
- `tailwind.config.cjs`, `postcss.config.cjs`, `src/app/globals.css`
- `src/types/todo.ts` (optional), `src/lib/todoStore.ts`
- `src/context/TodoContext.tsx`
- `src/components/TodoApp.tsx`, `src/components/DraggableList.tsx`, `src/components/DroppableSection.tsx`, `src/components/TodoLayout.tsx`
- `__tests__/todo.store.unit.ts`, `__tests__/todo.context.unit.tsx`, `__tests__/todo.dnd.ui.tsx`, `__tests__/todo.core.ui.tsx`
- CI: `.github/workflows/ci.yml`

---

Generated: `specs/002-revamp-todo-ui/tasks.md`
