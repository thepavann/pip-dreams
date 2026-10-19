# Pip's Midnight Observatory

An interactive, story-driven portfolio experience starring Pip, a Junior Dream Engineer. Built for the haX.baby Track 1 with React, TypeScript, TanStack Start, Vite, and Tailwind CSS.

## Run locally

### Requirements
- Node.js 20 or newer
- npm

### Setup
```bash
git clone https://github.com/thepavann/pip-dreams.git
cd pip-dreams
npm install
npm run dev
```

Open the local URL printed by Vite.

## Scripts

- `npm run dev` — start the local development server
- `npm run build` — create a production build
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint
- `npm test` — run the test suite

## Project notes

- The four original Pip PNG assets are stored in `src/assets/`; the app does not depend on Lovable-hosted image URLs.
- Sound is synthesized with the Web Audio API, starts muted, and never autoplays.
- The dream visitor counter is a local demonstration stored in browser localStorage. It is not a global analytics count.
- There is no required Lovable account, editor, runtime, or hosted backend.

## Deployment

The project is a standard Node.js application and can be developed and deployed independently. Configure your host to install dependencies with `npm install` and run the production build with `npm run build`. Choose a deployment adapter/runtime compatible with TanStack Start's server output.

## Artwork credits

Pip artwork originates from the haX.baby Track 1 creator asset pack. See [IMAGE_ASSETS.md](./IMAGE_ASSETS.md) for the local asset list.
