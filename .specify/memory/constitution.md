<!--
Sync Impact Report

- Version change: none → 0.1.0
- Modified principles: (new) Code Quality, Test-First & Coverage, UX Consistency,
	Performance & Size Budget, Simplicity & Observability
- Added sections: Constraints & Non-Functional Requirements; Development Workflow & Quality Gates
- Removed sections: none
- Templates validated: ✅ .specify/templates/plan-template.md
										✅ .specify/templates/spec-template.md
										✅ .specify/templates/tasks-template.md
- Follow-up TODOs: RATIFICATION_DATE (deferred - provide original adoption date)
-->

# Speckit Constitution

## Core Principles

### I. Code Quality (NON-NEGOTIABLE)
All production code MUST be reviewed and pass automated linting and type checks.
Pull requests SHOULD be small and focused (single purpose) and MUST include a
clear changelog entry when behavior changes. No commented-out code in main
branches. Dependencies MUST be justified and vetted for size, security, and
maintenance. Rationale: maintainability and predictable reviews.

### II. Test-First & Coverage (NON-NEGOTIABLE)
Tests MUST be authored before or alongside implementation for any user-visible
behavior. Unit tests cover logic; integration tests cover cross-component
flows; visual or E2E tests cover critical user journeys. Critical modules
MUST maintain at least 80% unit coverage; coverage targets for the app are a
project-level decision but MUST be measurable in CI. Rationale: prevent
regressions and enable safe refactoring.

### III. UX Consistency (MANDATORY)
User-facing components MUST follow shared design tokens and the centralized
component library. Visual regressions for core pages MUST be run in CI for
P1 flows. Accessibility requirements: core pages MUST meet WCAG AA where
feasible; interactive elements MUST be keyboard-navigable and labelled. Rationale:
ensure a reliable, accessible experience across releases.

### IV. Performance & Size Budget (MANDATORY)
Each published page or route MUST adhere to a measurable size and performance
budget: production page bundles SHOULD be <= 300 KB gzipped, and critical
pages MUST meet the CI Lighthouse performance target of >= 90 (desktop) or a
project-agreed equivalent. Images and assets MUST be optimized and lazy-loaded
where appropriate. Rationale: fast load times improve UX and reduce churn.

### V. Simplicity & Observability (STRONG PREFERENCE)
Favor simple, explicit solutions over complex abstractions. Instrument
observable errors and key UX metrics (synthetic checks) so regressions are
detectable in CI or monitoring. Error handling MUST provide actionable logs
and minimal user-facing error text. Rationale: simplicity speeds iteration and
observability reduces mean time to detect/resolve issues.

## Constraints & Non-Functional Requirements

- Project type: simple static web app (static export / CDN-hosted assets).
- Primary stack: framework-approved static export (e.g., Next.js static
generation) and plain CDN hosting; avoid server runtime unless explicitly
	required and approved.
- Privacy: avoid collecting PII by default; any telemetry requires opt-in and a
	documented data retention policy.
- Accessibility: core flows MUST target WCAG AA compliance.

## Development Workflow & Quality Gates

- All changes MUST go through pull requests and pass CI checks: linting,
	type-checking, unit tests, integration tests (where applicable), and
	visual/regression tests for P1 pages.
- Merge criteria: at least one approving review from a maintainer plus green CI.
- Performance gate: CI MUST run a lightweight Lighthouse check for core pages;
	significant regressions (>= 10 point drop) MUST be addressed before merge.
- Release process: deploy from main only after CI passes and release notes are
	produced documenting user-visible changes.

## Governance

Amendments to this constitution MUST be proposed as a repository PR that:

- Documents the change and rationale.
- Includes a migration plan for affected repositories or templates.
- Obtains approval from two maintainers (or a majority of the active core
	maintainers when more than two exist).

Versioning policy:

- Follow semantic versioning for constitution updates: MAJOR for breaking
	governance changes, MINOR for added principles or material guidance, PATCH
	for clarifications and typos.
- The `Last Amended` date MUST be updated to the commit date for changes.

Compliance review:

- Projects SHOULD run a constitution compliance check at least every 6 months.
- Non-compliance for critical principles (Test-First, Code Quality, UX,
	Performance) MUST be escalated for remediation.

**Version**: 0.1.0 | **Ratified**: TODO(RATIFICATION_DATE): provide original adoption date | **Last Amended**: 2026-01-28
