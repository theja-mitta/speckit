# Feature Specification: Gherkin Todo (Minimal)

**Feature Branch**: `001-gherkin-todo`  
**Created**: 2026-01-28  
**Status**: Draft  
**Input**: User description: "Build a minimal Gherkin-style Todo app with add, list, toggle, edit, and delete. UI: text input, add button, list items showing title and completed state. Persist with localStorage. Acceptance: add shows in list; toggle marks complete; edit updates title; delete removes; UI persists on reload. Testing: unit tests for model, service/context, and storage; integration tests for UI flow; aim for >=80% coverage."

## Clarifications

### Session 2026-01-28

- Q: CI enforcement for coverage target (>=80%)? → A: Option A — CI fails merges when overall coverage < 80% (strict gate).


## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

## User Stories & Testing (prioritized)

### User Story 1 - Create & Persist Todos (Priority: P1)

As a user, I can add a todo using a text input and an Add button so that the new item appears in the visible list and remains after a page reload.

**Why this priority**: Core value — creating and seeing todos is the fundamental user task.

**Independent Test**: Add a todo and reload the page; the item must remain in the list.

**Acceptance Scenarios**:

1. **Given** the app is open with an empty list, **When** I enter "Buy milk" in the input and click Add, **Then** the list shows an item titled "Buy milk".
2. **Given** the list contains items, **When** I reload the page, **Then** previously added items are still present.

---

### User Story 2 - Toggle Complete (Priority: P1)

As a user, I can toggle a todo between completed and not-completed so I can track progress.

**Why this priority**: Immediate feedback about task state is essential for usability.

**Independent Test**: Toggle the checkbox for an item and reload; the completed state persists.

**Acceptance Scenarios**:

1. **Given** an item titled "Task" exists and is not completed, **When** I click its checkbox, **Then** the item is marked completed and the state persists after reload.

---

### User Story 3 - Edit Title (Priority: P2)

As a user, I can edit a todo title inline so I can correct or refine tasks.

**Why this priority**: Improves data quality and reduces friction to correct mistakes.

**Independent Test**: Edit the title input for an item and assert the new text is shown and persists.

**Acceptance Scenarios**:

1. **Given** an item titled "Old", **When** I change its title to "New", **Then** the list shows "New" and the change persists after reload.

---

### User Story 4 - Delete Item (Priority: P2)

As a user, I can delete a todo so I can remove completed or irrelevant tasks.

**Why this priority**: Keeps the list manageable and supports core lifecycle.

**Independent Test**: Click Delete for an item and assert it no longer appears and does not return after reload.

**Acceptance Scenarios**:

1. **Given** an item titled "DeleteMe", **When** I click Delete, **Then** the item is removed from the list and does not reappear after reload.

---

### Edge Cases

- Adding an empty or whitespace-only title: app MUST ignore or show validation and not create an item.
- Extremely long titles: app SHOULD truncate display or wrap; storage must preserve full string.
- Corrupt/malformed data in localStorage: app SHOULD fall back to an empty list and not crash.
- Duplicate ids (unlikely with timestamp ids): app behavior MUST be deterministic (new item overrides older id only if ids collide).
- localStorage quota exceeded: app SHOULD surface a non-blocking error and keep in-memory list functional.

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->


### Functional Requirements

- **FR-001**: The UI MUST allow creating a todo with a non-empty title via a single-line text input and an Add button (or Enter key).
- **FR-002**: The UI MUST show a list of todos with each item displaying its title and completed state.
- **FR-003**: Users MUST be able to toggle an item's completed state; the UI MUST reflect the change immediately.
- **FR-004**: Users MUST be able to edit an item's title inline and save the change without creating a new item.
- **FR-005**: Users MUST be able to delete an item; the removal must be immediate and persistent.
- **FR-006**: The app MUST persist todos in `localStorage` under a single key and restore them on page load.
- **FR-007**: The UI MUST be keyboard-accessible (focusable input, Enter for add, tab navigation for controls).
- **FR-008**: The app MUST gracefully handle corrupted or missing localStorage data by falling back to an empty list and not throwing uncaught exceptions.

- **FR-009**: Continuous integration MUST enforce a coverage gate: merges to the main branch are blocked when overall test coverage is below 80%.
- **FR-009**: Continuous integration MUST enforce a coverage gate: merges to the main branch are blocked when the combined global test coverage reported by Jest (overall coverage aggregation across all projects) is below 80%.

### Key Entities

- **TodoItem**: Represents a single todo with attributes: `id` (string), `title` (string), `completed` (boolean), optional `createdAt` (ISO timestamp).


## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: A newly added todo appears in the visible list within 1 second of the Add action in a local development environment.
- **SC-002**: Toggling an item updates its completed state and the change persists after a full page reload.
- **SC-003**: Editing an item's title updates the list immediately and the updated title persists after reload.
- **SC-004**: Deleting an item removes it immediately and it does not reappear after reload.
- **SC-005**: Unit and integration tests achieve at least 80% code coverage measured by CI coverage reports.
- **SC-006**: Basic accessibility checks for P1 flows (add/list/toggle) pass keyboard navigation and label presence verification.

