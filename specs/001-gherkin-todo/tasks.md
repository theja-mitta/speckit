---
description: "Task list for 001-gherkin-todo"
---

# Tasks: Gherkin Todo (001-gherkin-todo)

**Input**: Design documents from `specs/001-gherkin-todo/` (spec.md, plan.md)

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 [P] Create Tailwind config and global styles in `tailwind.config.js` and `src/app/globals.css`
- [ ] T002 [P] Ensure test scripts and devDependencies present in `package.json` (jest, ts-jest, @testing-library/react)
- [ ] T003 [P] Add Jest config and setup files: `jest.config.cjs`, `jest.setup.ts`
- [ ] T004 [P] Add CI workflow to run tests and coverage in `.github/workflows/ci.yml`

---

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T005 Create `todoStore` adapter `src/lib/todoStore.ts` (loadTodos / saveTodos) and unit tests in `__tests__/todo.model.unit.ts`
- [ ] T006 [P] Define `Todo` type in `src/types/todo.ts` (id, title, completed, createdAt?)
- [ ] T007 Create `src/context/TodoContext.tsx` implementing provider and API: `add`, `update`, `toggle`, `remove`, `items`
- [ ] T008 Create test harness for `TodoContext` unit tests in `__tests__/todo.context.unit.tsx`
- [ ] T009 Create or verify component shell `src/components/TodoApp.tsx` (input, add button, list container) and mount in `src/app/page.tsx`

**Checkpoint**: Foundational components and tests exist so user stories can be implemented independently

---

## Phase 3: User Story 1 - Create & Persist Todos (Priority: P1) 🎯 MVP

**Goal**: Allow adding a non-empty todo via text input + Add and persist to `localStorage`.

**Independent Test**: Add an item, reload (re-mount) app, item remains.

- [ ] T010 [US1] Write unit tests for create behavior in `__tests__/todo.create.unit.ts`
- [ ] T011 [US1] Implement `add(title)` in `src/context/TodoContext.tsx` (depends on T005, T006)
- [ ] T012 [US1] Implement input + Add button wiring in `src/components/TodoList.tsx` (depends on T011)
- [ ] T013 [US1] Add integration test for add + persistence in `__tests__/todo.ui.ui.tsx` (tests re-mount to simulate reload)

**Checkpoint**: At this point, creating and persisting todos should be independently verifiable

---

## Phase 4: User Story 2 - Toggle Complete (Priority: P1)

**Goal**: Toggle todo completed state; persist toggled state.

**Independent Test**: Toggle checkbox and reload; completed state persists.

- [ ] T014 [US2] Implement `toggle(id)` in `src/context/TodoContext.tsx` (depends on T007)
- [ ] T015 [US2] Add checkbox wiring in `src/components/TodoList.tsx` to call `toggle` (depends on T014)
- [ ] T016 [US2] Add integration test verifying toggle + persistence in `__tests__/todo.ui.ui.tsx`

---

## Phase 5: User Story 3 - Edit Title (Priority: P2)

**Goal**: Edit title inline; changes persist.

**Independent Test**: Change title input and reload; new title persists.

- [ ] T017 [US3] Implement `update(id, title)` in `src/context/TodoContext.tsx`
- [ ] T018 [US3] Add inline editable title inputs in `src/components/TodoList.tsx` wired to `update` (depends on T017)
- [ ] T019 [US3] Add integration test for edit flow in `__tests__/todo.ui.ui.tsx`

---

## Phase 6: User Story 4 - Delete Item (Priority: P2)

**Goal**: Remove items from the list; removal persists.

**Independent Test**: Delete an item and reload; item does not reappear.

- [ ] T020 [US4] Implement `remove(id)` in `src/context/TodoContext.tsx`
- [ ] T021 [US4] Add Delete button wiring in `src/components/TodoList.tsx` (depends on T020)
- [ ] T022 [US4] Add integration test for delete flow in `__tests__/todo.ui.ui.tsx`

---

## Phase N: Polish & Cross-Cutting Concerns

- [ ] T023 [P] Add accessibility attributes and keyboard support for core flows in `src/components/TodoList.tsx`
- [ ] T024 [P] Add README and usage instructions in `specs/001-gherkin-todo/README.md`
- [ ] T025 [P] Run bundle-size/lightweight Lighthouse check locally and document results in `specs/001-gherkin-todo/quickstart.md`
- [ ] T026 [P] Finalize CI: ensure `.github/workflows/ci.yml` blocks merges when Jest coverage threshold fails

---

## Dependencies & Execution Order

- **Setup (Phase 1)**: Can start immediately and is parallelizable.
- **Foundational (Phase 2)**: Blocks user stories — must complete before Phase 3.
- **User Stories (Phase 3+)**: Each story depends on Foundational. Stories can be implemented in parallel after Foundational completes.

## Parallel Execution Examples

- While T005/T006/T007/T009 are implemented, T001/T002/T003 can run in parallel.
- After Foundational completes, implementers A/B/C can work on US1/US2/US3 concurrently on different files.

## Implementation Strategy

- MVP first: Complete Phase 1 and Phase 2, then implement User Story 1 (T010–T013). Validate and demo before adding toggles, edits, and delete.
- Incrementally add tests before implementation: write unit tests first where practical, then integration tests that fail, implement code to pass tests, refactor.
