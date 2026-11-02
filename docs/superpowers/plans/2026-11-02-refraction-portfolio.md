# Refraction portfolio implementation plan

> Execute inline using superpowers:executing-plans. The user has authorized the redesign and asked to continue.

**Goal:** Create an original Unicorn Studio hero and rebuild the portfolio around the supplied blue, white, and pink palette.

**Architecture:** Keep factual content in `src/data/index.js`. Replace the presentation with semantic React sections and a separately managed Unicorn scene with a static fallback.

**Tech stack:** React 18, Vite, CSS, Unicorn Studio, Playwright.

**Spec:** `docs/unicorn-portfolio-prompt.txt`.

## Constraints

- Use only existing text, factual content, links, and necessary behavior; do not reuse existing visuals or screenshots.
- Palette: #0593C6, #FCFFFF, #D83095 with dark blue ink for contrast.
- Do not fabricate Unicorn project IDs, metrics, credentials, or availability.
- Keep website deployment out of this local implementation.

## Review focus

- Scene load failure: text, navigation, and project actions remain usable.
- Reduced motion and pause: no ambient animation continues against the visitor's preference.
- Narrow screens: navigation and long names fit without horizontal overflow.
- Keyboard: mobile menu closes with Escape and project details are native accessible disclosures.
- Contact failure: entered text survives and the direct email link remains available.

## Task 1: Create scene

- [x] Connect an open editor; inspect templates for suitable effects.
- [x] Create a separate original scene with refracted blue/pink light and quiet space for HTML text.
- [x] Inspect the compiled preview, commit, and obtain actual embed/export details.
- [x] Save scene metadata and a matching fallback in the repository.

## Task 2: Rebuild presentation

Files: replace `src/App.jsx`, `src/components/Navigation.jsx`, `src/components/Work.jsx`, and `src/index.css`; add `src/components/HeroScene.jsx` and scene integration under `src/lib`; update `index.html` and `public/logo.svg`.

- [x] Replace obsolete sculpture tests with user-facing tests for project disclosures, filters, responsive navigation, motion preference, fallback, contact delivery, and accessibility.
- [x] Run focused new tests and confirm they fail on missing behavior.
- [x] Build the new hero, navigation, original project graphics, project disclosures, profile, experience, credentials, and contact sections.
- [x] Integrate the real scene with cleanup, loading/error fallback, visibility pause, and reduced motion.
- [x] Retain existing contact submission behavior, with new styling and markup as needed.

## Task 3: Verify

- [x] Run `node node_modules/vite/bin/vite.js build`.
- [x] Run `node node_modules/@playwright/test/cli.js test` for desktop/mobile functional and accessibility checks.
- [x] Run the repository formatting check using the local Prettier binary.
- [x] Review the final diff and resolve functional or accessibility issues.
- [x] Report the actual scene/export state, checks, and any unresolved constraint.

## Execution ledger

- Initial connection: OAuth authenticated, MCP tools loaded, editor tab not yet connected. User was asked to enable Allow agents; local implementation can proceed independently.
- Ruling: Preserve contact behavior and facts, replace the sculpture and modal project presentation with native disclosures and original CSS/SVG artwork. This follows the user's instruction to discard the current UI.
- Ruling: Work in the supplied workspace, with no deployment or unrelated branch integration.

- Task 1 complete: Created and published `Nikola / Refraction`, project `DosReY37TV4cLtWoFYsj`, Light rating 27.1. Saved local poster.
- Task 2 complete: Rebuilt all page presentation, retained factual data and contact transport, removed unused Three.js viewer and dependency.
- Independent review: restored all metrics, corrected project link accessible names, and made the skip link bypass navigation. Regression checks demonstrated failures before fixes.
- Ruling after owner declined a paid plan: use the watermark-free local still artwork by default. The live branded embed remains available only via `VITE_UNICORN_ANIMATION=true`; no subscription purchase and no site deployment.
- Verification: production build, desktop/mobile functional and axe checks, real live-scene rendering and pause, and formatting. The live pause screenshot initially differed only inside the button's CSS hover transition; disabling CSS transitions in the screenshot comparison confirmed the WebGL frame stayed fixed.
