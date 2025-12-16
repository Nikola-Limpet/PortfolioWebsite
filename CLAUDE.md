# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
npm run dev      # Start development server (Vite)
npm run build    # Production build
npm run preview  # Preview production build locally
```

## Architecture Overview

This is a React portfolio website built with Vite, featuring 3D graphics and scroll-based animations.

### Tech Stack
- **React 18** with Vite
- **Tailwind CSS** for styling
- **Three.js** via @react-three/fiber and @react-three/drei for 3D graphics
- **Framer Motion** and **GSAP** for animations
- **EmailJS** for contact form

### Project Structure

```
src/
├── components/     # React components for each section (Hero, Projects, Skills, etc.)
├── hoc/            # SectionWrapper HOC for animation wrapping
├── data/           # Static content (navLinks, projects, certs, experiences)
├── assets/         # Images, logos, 3D models (.glb files in assets/3d/)
├── utils/          # motion.js - reusable Framer Motion animation variants
├── App.jsx         # Main app orchestrating all sections
├── styles.js       # Global styled component classes
└── index.css       # Tailwind directives and global styles
```

### Key Patterns

- **Section-based Layout**: App.jsx composes major sections (Hero, Projects, Certifications, Skills, Experience, Contact)
- **HOC for Animations**: `SectionWrapper` wraps components with Framer Motion viewport detection
- **Centralized Data**: All content arrays (projects, experiences, certs) live in `src/data/index.js`
- **Motion Utilities**: Reusable animation variants (textVariant, fadeIn, slideIn, zoomIn) in `src/utils/motion.js`

### 3D Integration

The Spaceman component (`src/components/Spaceman.jsx`) renders a 3D model that responds to scroll position. Uses React Three Fiber with custom lighting setup. 3D models are stored as `.glb` files in `src/assets/3d/`.

### Custom Tailwind Theme

Extended in `tailwind.config.cjs` with:
- Custom colors: primary (#011825), secondary (#F0EFEB), tertiary (#0D3056), quaternary (#1689C8)
- Custom breakpoints: xs (450px), 3xl (2160px)
- Custom animations: textRotate1, textRotate2
