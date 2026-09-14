# Nikola Limpet's portfolio

A React portfolio with a custom orbital scene, selected project previews, experience disclosures, credentials, and an EmailJS contact form.

## Development

```sh
pnpm install
pnpm dev
pnpm build
pnpm preview
```

## Editing the portfolio

- `src/App.jsx` composes the page and contains the introduction, about, and contact copy.
- `src/data/index.js` contains project links, credentials, and experience.
- `src/index.css` defines the typography, colors, layouts, and responsive behavior.
- `src/components/SpaceJourney.jsx` owns the continuous Three.js scroll journey.
- `src/components/ContactForm.jsx` retains the existing EmailJS service and template. Test delivery with your account before publishing.

## Scene and assets

Scrolling moves the camera through planets, an asteroid field, an animated astronaut, a satellite, and an orbital gate. The planet and rings are real 3D geometry with custom lighting shaders. The planet's cloud texture is baked once to avoid recalculating procedural noise for every pixel on every frame. `scripts/bake-planet.py` regenerates it and requires Python, NumPy, and Pillow. These tools are not required to build or run the site.

`public/space/deep-field.webp` is an AI-generated backdrop. Project previews have full-size and 600px WebP versions. The astronaut model loads as the first project approaches. Original project images and other previous models remain in the repository for reuse.

The scene renders at 30 fps, caps pixel density, and stops rendering when paused, or in a hidden tab. System reduced-motion preferences disable continuous motion and scroll transitions. Devices without WebGL receive a static CSS fallback. The page and its navigation work independently of the scene.

## Verification

Run `pnpm build` and review desktop, tablet, and mobile layouts. Check the mobile navigation, experience disclosures, certificate disclosure, motion control, keyboard focus, and contact validation. A valid contact submission sends an actual email; do not use it for automated smoke tests without mocking the EmailJS endpoint.
