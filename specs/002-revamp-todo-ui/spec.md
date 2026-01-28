# Feature Specification: Revamp Todo UI

**Feature Branch**: `002-revamp-todo-ui`
**Created**: 2026-01-28
**Status**: Draft
**Input**: User description: "Improve existing todos app with complete new design revamping, make todos draggable and provide different sections for different tasks like completed, active and make UI more appealing to end users"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Core task flows (Priority: P1)

As an end user I want to add, edit, toggle and delete todos so I can manage my tasks.

**Why this priority**: These are the primary actions users expect from a todo app and must work before any cosmetic changes.

**Independent Test**: Create a todo, edit its title, toggle completion, delete it, and verify persistence across reload (localStorage).

**Acceptance Scenarios**:
1. **Given** an empty list, **When** the user types a non-empty title and presses Add, **Then** a new todo appears in the Active section.
2. **Given** an existing todo, **When** the user toggles its checkbox, **Then** it moves to the Completed section and persists on reload.
3. **Given** a todo, **When** the user edits the title inline and confirms, **Then** the new title is shown and persists.
4. **Given** a todo, **When** the user deletes it, **Then** it is removed and does not reappear after reload.

---

### User Story 2 - Drag & Drop and organization (Priority: P1)

As an end user I want to drag todos to reorder them and move them between sections (Active ↔ Completed) so I can prioritize and organize tasks quickly.

**Why this priority**: Drag-and-drop is a core interaction requested and directly improves productivity.

**Independent Test**: Drag an item within Active to change its order; drag an item from Active to Completed; reload and verify order and section membership persist.

**Acceptance Scenarios**:
1. **Given** multiple Active todos, **When** the user drags one to a different position within Active, **Then** the new order is saved and persists on reload.
2. **Given** an Active todo, **When** the user drags it to the Completed area, **Then** it appears under Completed and persists on reload.
3. **Given** accessibility mode, **When** the user uses keyboard drag/move affordances, **Then** they can reorder and move items without a pointer.

---

### User Story 3 - Visual redesign & responsive layout (Priority: P2)

As an end user I want an appealing, clear and responsive UI (cards, spacing, subtle animations) so the app is pleasant and usable across devices.

**Why this priority**: Improves adoption and satisfaction after core features are reliable.

**Independent Test**: Verify layout and styles at a set of breakpoints (mobile/desktop); ensure visual feedback on interactions (add/delete/drag).

**Acceptance Scenarios**:
1. **Given** the app on mobile width (≤480px), **When** the page is loaded, **Then** the layout adapts (stacked sections, touch-friendly targets).
2. **Given** the app on desktop width, **When** the page is loaded, **Then** sections are presented side-by-side with clear affordances for dragging.

---

### Edge Cases

- Large lists (1000+ items): UI remains usable; virtualization or pagination is considered if performance degrades. Define threshold (e.g., >500 items) that triggers virtualization or pagination in implementation and tests.
- Very long titles: titles wrap or truncate with tooltip to avoid layout breakage.
- Offline browser storage full or unavailable: app falls back gracefully and warns user when persistence fails.
- Dragging while app is offline should still reorder locally; sync/persist attempt occurs when possible.
- Keyboard-only users and screen reader users must be able to perform all primary flows.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST allow users to add, edit, toggle (complete/uncomplete) and delete todos via the UI.
- **FR-002**: The UI MUST expose separate visual sections: `Active` and `Completed` (visible simultaneously on wide screens and stacked on narrow screens).
- **FR-003**: Users MUST be able to reorder todos within a section via drag-and-drop.
- **FR-004**: Users MUST be able to move todos between `Active` and `Completed` via drag-and-drop.
- **FR-005**: Order and section membership MUST persist across page reloads using browser storage (localStorage) as primary persistence.
- **FR-006**: Drag-and-drop interactions MUST include keyboard-accessible alternatives (focus + move controls) and expose ARIA roles/state for assistive tech. Specify keyboard interactions: while a todo is focused, users MUST be able to reorder it with keyboard controls — e.g., `Ctrl+ArrowUp` / `Ctrl+ArrowDown` to move within the section and `Ctrl+M` to move the item to the other section. Implementations MUST expose an `aria-live` announcement summarizing the new position and section (e.g., "Moved to position 2 in Active"). These keys are implementation defaults and may be configurable.
- **FR-007**: The redesigned UI MUST be responsive and provide touch-friendly targets for mobile devices.
- **FR-008**: The app MUST include basic animations/visual feedback for add/delete/drag to improve perceived polish.
- **FR-009**: Automated tests (unit + integration) MUST cover primary flows; the combined test coverage MUST be >= 80%.
- **FR-010**: Performance: the main page MUST meet a measurable performance target. Implementations SHOULD aim for a Lighthouse performance score >= 90 (desktop) or an equivalent agreed measurement; CI will run a lightweight performance audit to validate this requirement.

### Key Entities

- **TodoItem**: id, title, completed (bool), order index, createdAt (ISO string)
- **Section**: `active` | `completed` (presentation grouping, not separate persistence objects)
- **UIState**: order arrays and transient drag state (not persisted beyond page reload except for final order)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can perform create → edit → toggle → delete flows end-to-end and persistence is verified by automated tests (pass/fail).
- **SC-002**: Drag-and-drop moves items between sections and reordering persists after reload; validated by integration tests that re-mount the app.
- **SC-003**: The UI is responsive: core task flows (add/toggle/delete/drag) complete at screen widths between 320px and 1920px without layout breakage (manual verification + visual regression snapshots).
- **SC-004**: Accessibility: keyboard-only users can move an item between sections and reorder within a section (testable via automated keyboard-event tests).
- **SC-005**: Combined automated test coverage is >= 80% before merging.
- **SC-006**: No runtime errors during local `npm run dev` and production `npm run build` (verified by CI/build step).

---

## Assumptions

- This feature will use the existing client-side persistence (`localStorage`) as requested; no backend migration is required for this scope.
- Use of a lightweight drag-and-drop helper library is allowed (e.g., built-in HTML5 drag or small utility) but selection of a specific library is an implementation decision.
- Visual design changes are constrained to CSS/Tailwind and small animations; no design system overhaul required.

## Deliverables

- Updated UI components: redesigned `TodoApp`, split sections, drag-and-drop handlers, keyboard move affordances.
- `src/lib/todoStore.ts` persistence updates to preserve ordering and section membership.
- Integration tests exercising drag-and-drop and persistence across reloads.
- Updated specs and task list under `specs/002-revamp-todo-ui/`.
