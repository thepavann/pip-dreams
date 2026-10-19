# Project guidance

- This repository is a standalone React + TypeScript + TanStack Start application built with Vite and Tailwind CSS.
- Keep theme, sound, chaos, and status state in `src/lib/site-state.tsx`; route all audio through `src/lib/audio.ts` so the global mute control covers every sound.
- Keep pure rules (secret sequence, local visitor counter) in `src/lib/pip-logic.ts` and test them in `src/test/`.
- Keep Pip artwork local in `src/assets/`; do not introduce dependencies on editor-hosted asset URLs.
- Do not add platform-specific editor SDKs, telemetry hooks, or generated editor configuration.
- Before merging build-system changes, run `npm install`, `npm run build`, `npm test`, and `npm run lint`.
