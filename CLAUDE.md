# Project guidance

Use `corepack pnpm dev`, `corepack pnpm build`, and `corepack pnpm test` for the Vite/React application. Node.js 22.12+ is required.

This is a sculptural studio portfolio. `src/App.jsx` composes semantic page sections. `src/data/index.js` owns factual project and experience records. `src/index.css` owns the responsive ivory, charcoal, and vermilion design.

`Studio.jsx` dynamically imports `src/lib/sculpture.js`. Keep continuous animation outside React state. Preserve pause, reduced motion, hidden-tab, offscreen, touch-scroll, keyboard, and WebGL fallback behavior. Dispose Three.js resources and all observers/listeners on unmount.

Project dialogs use native `<dialog>` with focus restoration. Preserve keyboard access and mobile layouts. Keep real project images in `public/projects`.

Contact uses the existing EmailJS service. Never send real messages during automated tests; intercept the EmailJS endpoint. `tests/portfolio.spec.js` covers desktop/mobile functionality and axe accessibility. See README.md for commands.
