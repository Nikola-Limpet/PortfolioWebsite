# Nikola Limpet | Portfolio

A React portfolio with five original imagegen artworks, a split editorial hero, a responsive project gallery, and sky blue / hot pink accents. Project facts, filters, credentials, and contact behavior are preserved. The default site uses optimized local images and needs no Unicorn subscription.

Artwork sources, generation prompts, and design decisions: `docs/design/imagegen-art-direction.md`.

## Develop

Requires Node.js 22.12+ and pnpm 10. If pnpm is not on PATH, use Corepack:

```sh
corepack pnpm install
corepack pnpm dev
corepack pnpm build
```

## Verify

```sh
corepack pnpm exec playwright install chromium
corepack pnpm test
corepack pnpm format:check
```

Tests cover desktop and mobile layouts, keyboard navigation, project filters and disclosures, project facts, contact validation and mocked delivery, scene failures, reduced motion, and WCAG accessibility. The default hero uses the local still artwork and does not load the Unicorn SDK. Optional live-scene checks load the published embed and need network access. EmailJS requests are intercepted; tests never send messages. Stop any existing server on port 4173 before running the suite, since Playwright can reuse that port.

## Edit content and presentation

- `src/data/index.js`: project facts, technologies, experience, credentials, and social links.
- `src/App.jsx`: hero text, profile, experience, contact, and page composition.
- `src/components/Work.jsx`: project filtering and native details disclosures.
- `src/components/ProjectArt.jsx`: responsive generated project cover images with descriptive alt text.
- `src/components/HeroScene.jsx`: loading, pause controls, cleanup, and reduced-motion fallback.
- `src/lib/unicorn.js`: pinned SDK loader and published scene configuration.
- `src/components/ContactForm.jsx`: the existing EmailJS integration.
- `src/index.css`: responsive layout, typography, and palette.
- `public/artwork/`: five original PNGs plus full-size and 768px WebP variants served by the site.
- `public/refraction-poster.jpg`: archived still from the earlier Unicorn direction.

## Optional Unicorn Studio scene

[Edit Nikola / Refraction](https://www.unicorn.studio/edit/uShIbHodHKM7PTyX7yzT?canvasId=71e0bc58-30a7-405a-b811-1d12f4ceea45&from=agent)

- Published project ID: `DosReY37TV4cLtWoFYsj`
- SDK: `2.4.3`, loaded asynchronously from jsDelivr.
- Published settings: flatten enabled; production CDN mode unavailable on the current account, which returned `production: false`.
- Editor performance rating: **Light**, effective cost **27.1** after reducing the soft ribbon layer's resolution.
- Host settings: 30 fps, scale 0.8, dpi 1. The SDK handles offscreen and document-visibility render gating.
- Reduced motion loads only the poster. A script/load failure or lost WebGL context keeps the poster and the rest of the page usable.

The generated hero artwork is the default, following the owner's decision not to purchase a plan. It has no Unicorn watermark and makes no Unicorn network requests. The optional live embed displays a tiled Unicorn watermark. [Unicorn's plan documentation](https://www.unicorn.studio/docs/pricing/) lists branded publishing on Free and watermark-free publishing on Legend. No plan was purchased. The whole portfolio has not been deployed.

To deliberately preview the branded live animation locally, opt in at startup:

```sh
VITE_UNICORN_ANIMATION=true corepack pnpm dev
```

To test the optional integration:

```sh
VITE_UNICORN_ANIMATION=true corepack pnpm exec playwright test -g 'animation setting|failed scene'
```

Leave `VITE_UNICORN_ANIMATION` unset for the default generated artwork. If the scene's publish mode changes later, update the actual returned settings in `src/lib/unicorn.js`.

To edit with MCP, open the design with the connected account and enable **Allow agents**. Publish the scene after editing; the embed then loads the updated artwork. The generated artwork remains the local fallback. The original scene design brief is in `docs/unicorn-portfolio-prompt.txt`.

Contact uses the existing EmailJS service/template and public client key. Tests verify request payloads and UI behavior with mocked responses; the account owner should verify real delivery. Maintain origin restrictions and abuse controls in EmailJS.
