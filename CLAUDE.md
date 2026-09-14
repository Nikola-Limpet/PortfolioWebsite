# Project guidance

Use `pnpm dev`, `pnpm build`, and `pnpm preview` for the Vite application.

React 18 renders the portfolio. Three.js and React Three Fiber render an lazy-loaded continuous scroll journey. Manrope is self-hosted through Fontsource. CSS and IntersectionObserver handle page transitions; there is no smooth-scroll hijacking or global animation framework.

Page composition is in `src/App.jsx`; reusable interactive components are in `src/components`. `src/data/index.js` owns portfolio records, and `src/index.css` owns the design tokens and responsive layouts. `src/hooks/useMotionPreference.js` tracks the system preference.

Keep continuous animation values out of React state. Preserve the scene's hidden-tab, pause, reduced-motion, and WebGL-failure behavior. Use optimized assets in `public/space` and `public/projects`. Original unused assets remain available in `src/assets`.

The contact form uses the existing EmailJS service. Do not send real messages while testing unless specifically authorized. See README.md for asset regeneration and verification notes.
