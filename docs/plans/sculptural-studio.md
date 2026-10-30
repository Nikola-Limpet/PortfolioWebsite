# Sculptural studio portfolio

## Design

Replace the space portfolio with an editorial studio for prospective clients and hiring teams. Use warm ivory, near-black type, vermilion accents, large sans-serif headlines with a serif accent, and a custom interactive Three.js sculpture. Design variance 8, motion 6, density 3. Preserve factual portfolio content and contact destinations; replace all presentation code and remove obsolete assets.

The hero pairs an introduction with an architectural sculpture on a studio plinth. Pointer dragging and keyboard rotation let visitors explore it; pause, reduced motion, offscreen suspension, and WebGL fallback protect usability. The work section has category filters, real project screenshots, and accessible native project dialogs. About, experience, credentials, and a working contact form complete the page.

## Implementation

1. Add Playwright behavior tests and verify the new experience is absent. Create a new branch incorporating main. Keep the existing EmailJS service and mock all sends in tests.
2. Replace App, CSS, data, navigation, project browsing, contact form, and scene. Lazy-load Three.js; use native HTML for core content and dialogs. Remove legacy components, unused images/models, and space generation scripts. Update metadata and docs.
3. Run production build and desktop/mobile tests, including reduced motion, WebGL failure, keyboard navigation, filtering, and mocked contact success/error. Inspect rendered screenshots and run accessibility checks. Fix findings.
4. Obtain an independent code review, commit and push, create a PR against main, link it to the thread, check remote status and merge when clear.

## Review focus

- Scene teardown must release renderer, geometry, materials, observers, and listeners.
- Scene must stop animating while hidden, offscreen, paused, or under reduced motion.
- Touch dragging must preserve vertical page scrolling.
- Dialogs must close with Escape and return focus to the initiating project.
- Email success only follows a successful response; tests cannot send real email.

User requested autonomous execution and authorized replacement, PR creation, error fixes, and merge. Execute without approval checkpoints.

## Verification record

- Production build succeeds; 22 Playwright checks pass against production output across desktop and mobile.
- axe reports no WCAG A/AA violations on the page and project dialog.
- Viewport sweep from 320px through 1920px reports no horizontal overflow.
- Actual canvas screenshots confirm pause stability and keyboard/pointer rotation.
- WebGL absence and context loss retain a usable static page; cleanup regression confirms both observers and the visibility listener are removed.
- Contact requests are intercepted; assertions cover template payload fields, success, failure, preserved input, and browser validation.
- Independent review found missing disposal on context loss and a shadow render target leak. Both were fixed before merge.
- Formatting and whitespace checks pass. Full dependency audit reports zero known vulnerabilities after updating transitive packages.
