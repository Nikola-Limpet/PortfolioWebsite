# Nikola Limpet | Sculptural Studio

A portfolio built with React, native CSS, and an interactive Three.js project viewer. Warm ivory, vermilion, editorial typography, and actual product screenshots replace the former space experience.

## Develop

Requires Node.js 22.12+ and pnpm 10. If pnpm is not on PATH, use `corepack pnpm`.

```sh
corepack pnpm install
corepack pnpm dev
corepack pnpm build
```

## Verify

```sh
corepack pnpm exec playwright install chromium
corepack pnpm test
```

Playwright checks desktop/mobile rendering, project filtering and dialogs, navigation, contact validation and mocked delivery, reduced motion, WebGL fallback, and WCAG accessibility with axe. Tests intercept EmailJS requests and never send real messages. Tests build the app and run against the production output. Playwright may reuse a local server on port 4173, so stop any existing dev server there before running the suite.

## Edit

- `src/App.jsx`: page composition, introduction, about, experience, and contact.
- `src/data/index.js`: projects, experience, credentials, and social destinations.
- `src/components/Studio.jsx`: scene lifecycle and accessible controls.
- `src/lib/sculpture.js`: 3D project display, cached screenshot textures, lighting, pointer input, and resource cleanup.
- `src/components/Work.jsx`: categories and native project dialogs.
- `src/components/ContactForm.jsx`: existing EmailJS service/template, validation, and delivery status. The public client key is intentionally public; configure origin restrictions and abuse controls in EmailJS.
- `src/index.css`: design tokens and responsive layouts.
- `public/projects`: optimized project screenshots in two sizes.

The scene loads separately from the page, requires no models or CDN assets, caps pixel density at 1.5, and renders at approximately 30 fps. Continuous rendering stops when paused, outside the viewport, in a hidden tab, or under reduced motion. Visitors can browse four real projects in the 3D display, open their details, and rotate the display with dragging, arrow buttons, or keyboard arrows. Home or Reset view restores the original angle. Vertical touch scrolling remains available. WebGL or module failures show a static illustration while the complete portfolio remains usable.

The contact form retains the account’s existing EmailJS service and template. Automated tests verify the request and UI with mocked responses; account delivery should be verified by its owner.
