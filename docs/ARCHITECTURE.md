# Architecture

## Overview

Pip's Midnight Observatory is a React application built with TypeScript and TanStack Start. TanStack Router provides route handling, Vite drives the development/build workflow, and Tailwind CSS provides utility-first styling.

The app is designed as a self-contained experience. The supplied Pip artwork is checked into the repository and loaded as local assets. Browser audio is generated through the Web Audio API rather than requiring pre-recorded audio files or an audio service.

## Runtime model

1. The browser requests the application from the configured deployment host.
2. TanStack Start and the route tree render the application shell and route content.
3. React components render the observatory experience and its interactive details.
4. Local image assets are bundled or served with the application.
5. Browser-only demonstration state, such as the visitor counter where present, is stored locally in the visitor's browser.

The local visitor counter is not a global analytics system. Clearing browser storage may reset locally persisted demonstration state.

## Main technologies

- **React** — component model and UI rendering.
- **TypeScript** — static type checking.
- **TanStack Start / Router** — application framework and routing.
- **Vite** — development server and production build.
- **Tailwind CSS** — styling utilities.
- **Web Audio API** — user-initiated synthesized sound.
- **Vitest / ESLint / Prettier** — testing, linting, and formatting tools.

## Design principles

- **Character first:** visuals and interactions should reinforce Pip's world.
- **Story before feature count:** each interactive element should support the narrative.
- **Respectful sound:** no autoplay; make sound state clear and user-controlled.
- **Local-first assets:** avoid relying on editor-hosted asset URLs.
- **Progressive enhancement:** the experience should remain understandable when sound is disabled.
- **Honest product claims:** describe only behavior that exists in the current build.

## Where to look

- `src/routes/` — route definitions and application shell.
- `src/assets/` — bundled character artwork.
- `public/` — static files.
- `package.json` — scripts and dependency manifest.
- `vite.config.ts` — Vite integration.
- `IMAGE_ASSETS.md` — artwork inventory and attribution.

The exact component tree may evolve; use the current source as the authority.
