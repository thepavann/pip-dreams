# Pip's Midnight Observatory

<p align="center">
  <strong>A tiny dream engineer. A universe of bedtime magic.</strong><br />
  An interactive, story-driven character experience created for <a href="https://hax.baby">haX.baby</a> Track 1.
</p>

<p align="center">
  <a href="https://github.com/thepavann/pip-dreams"><img alt="Repository" src="https://img.shields.io/badge/source-GitHub-181717?logo=github" /></a>
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111827" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" />
  <img alt="License" src="https://img.shields.io/badge/license-see%20NOTICE-informational" />
</p>

---

## The idea

What if a character's website was not just a page about them, but a place visitors could step into?

**Pip's Midnight Observatory** imagines Pip as a Junior Dream Engineer who works after dark, preparing dreams in a quiet observatory above a sleeping town. The experience brings that story to life through a character-led interface, dream inventions, atmospheric details, browser-generated sound, and small discoveries for curious visitors.

The goal is to make the website feel like a world to explore—not a conventional portfolio.

## Explore Pip's world

- **The Observatory** — enter Pip's midnight world and discover the character behind it.
- **Lullaby Lab** — explore the idea of turning nighttime sounds into part of Pip's dream-making process.
- **Dream Delivery** — follow the story of dreams being prepared and sent into the sleeping world.
- **Nightlight Collection** — discover another part of Pip's imaginative workshop.
- **Hidden discovery** — look closely for the constellation Easter egg.
- **Sound with user control** — browser-generated audio uses the Web Audio API and does not autoplay.

> Some interactions may evolve during development. Use the live deployment, when linked, as the source of truth for what is currently available.

## Technology

| Area | Technology |
| --- | --- |
| UI | React 19 |
| Language | TypeScript |
| Application framework | TanStack Start / TanStack Router |
| Build tooling | Vite |
| Styling | Tailwind CSS |
| Audio | Web Audio API |
| Quality tools | ESLint, Prettier, Vitest |

The original Pip PNG artwork is stored locally in `src/assets/`. The application is being maintained as a standalone codebase rather than depending on an editor-hosted runtime.

## Run locally

### Prerequisites

- Node.js 20 or newer (use a current LTS release where possible)
- npm
- Git

### Setup

```bash
git clone https://github.com/thepavann/pip-dreams.git
cd pip-dreams
npm install
npm run dev
```

Open the local URL printed in the terminal.

### Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the built application |
| `npm run lint` | Run ESLint |
| `npm run format` | Format files with Prettier |
| `npm test` | Run the test suite once |
| `npm run test:watch` | Run tests in watch mode |

Before submitting changes, run at least:

```bash
npm run lint
npm test
npm run build
```

A command listed here is not a claim that it has passed in every environment; check the output locally before release.

## Project structure

The repository is organized around the application source and its static assets. Important locations include:

- `src/assets/` — original Pip image assets used by the interface
- `src/routes/` — TanStack route and application shell
- `src/` — application components, styling, and supporting code
- `public/` — static files served directly by the application
- `IMAGE_ASSETS.md` — asset inventory and attribution notes
- `docs/` — development, architecture, deployment, and contribution guidance

Exact filenames can change as the project evolves; consult the repository tree for the current implementation.

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Development guide](docs/DEVELOPMENT.md)
- [Deployment guide](docs/DEPLOYMENT.md)
- [Contributing](CONTRIBUTING.md)
- [Asset credits](IMAGE_ASSETS.md)
- [Project notice](NOTICE.md)
- [Security policy](SECURITY.md)

## Privacy and implementation notes

- The dream visitor counter, where present, is a browser-local demonstration stored in `localStorage`; it is not a shared analytics service or a global visitor count.
- Sound does not autoplay; visitors retain control over whether to enable it.
- No backend service is required for the local demonstration features described above.
- Do not add API keys, passwords, private tokens, or personal data to source control.

## Credits

Pip's artwork originates from the official haX.baby Track 1 creator asset pack. See [IMAGE_ASSETS.md](IMAGE_ASSETS.md) and [NOTICE.md](NOTICE.md) for attribution and usage notes. The project uses open-source libraries listed in `package.json` and the npm lockfile.

## Status

This is a solo-builder hackathon project by **Pavan Tungala**. The codebase and experience are being refined as development continues. Build, test, deployment, and interaction status should be verified against the current branch before relying on them.

- Repository: https://github.com/thepavann/pip-dreams
- Challenge: https://hax.baby

---

<p align="center">Made with curiosity, code, and a little midnight magic.</p>
