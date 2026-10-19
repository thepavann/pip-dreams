# Development Guide

This guide covers a local development workflow for Pip's Midnight Observatory.

## Requirements

- Node.js 20 or newer; a current Node.js LTS release is recommended.
- npm.
- Git.

## First run

```bash
git clone https://github.com/thepavann/pip-dreams.git
cd pip-dreams
npm install
npm run dev
```

Open the local URL printed by the development server.

## Useful commands

```bash
npm run dev          # development server
npm run lint         # ESLint
npm test             # one test run
npm run test:watch   # watch tests
npm run build        # production build
npm run preview      # preview the production build
npm run format       # format supported files with Prettier
```

Run lint, tests, and a production build before proposing a change. If a command fails, include the relevant error and environment details in the issue or pull request rather than reporting the check as passed.

## Working on a change

1. Start from the latest intended base branch.
2. Create a focused branch, for example `docs/clarify-audio-controls`.
3. Keep changes small and consistent with the existing component and styling patterns.
4. Test keyboard, pointer, and narrow-screen behavior for UI changes.
5. Confirm audio remains user-controlled and never autoplays.
6. Run `npm run lint`, `npm test`, and `npm run build`.
7. Open a pull request with a concise summary, rationale, and screenshots for visual changes.

## UI and accessibility checklist

- Interactive controls have clear labels and visible focus states.
- The interface can be explored without enabling sound.
- Do not communicate important information through color alone.
- Check responsive layouts at mobile and desktop widths.
- Respect reduced-motion preferences where animations are introduced.
- Avoid unnecessary animation or audio that interrupts the story.

## Asset changes

Keep imported local assets in the appropriate source or public directory. Update `IMAGE_ASSETS.md` and `NOTICE.md` whenever asset inventory or attribution changes. Do not assume that an image being present in the challenge pack grants unrestricted rights outside the challenge's terms.

## Troubleshooting

### Dependencies fail to install

- Confirm your Node.js and npm versions.
- Remove no lockfiles as a first step; use the committed lockfile for reproducible installs.
- Read the first actionable error rather than focusing only on warnings.

### The page fails to start or build

- Check the terminal output for the first error.
- Verify that installed dependencies match the lockfile.
- Run `npm run lint` and `npm test` to identify related issues.
- Record the command, Node.js version, and complete relevant error when asking for help.

### Sound is unavailable

Browser audio may require a user gesture before an AudioContext can run. Check the browser console and confirm the user has explicitly enabled the sound control.
