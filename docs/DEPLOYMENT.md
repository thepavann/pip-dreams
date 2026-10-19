# Deployment Guide

Pip's Midnight Observatory is intended to be developed as a standalone application.

## Before deploying

From a clean checkout, install dependencies and validate the application:

```bash
npm ci
npm run lint
npm test
npm run build
```

Use `npm install` if your environment does not have a compatible npm lockfile workflow. Resolve build or test errors before publishing.

## Hosting requirements

The project uses TanStack Start. Choose a host and adapter/runtime compatible with the current TanStack Start output. Do not assume that a generic static host can run server-rendered or server-backed output without the appropriate configuration.

Recommended release workflow:

1. Connect the repository to the chosen hosting provider.
2. Configure the supported TanStack Start deployment preset or adapter for that provider.
3. Set Node.js to a supported version.
4. Configure the install command and production build command.
5. Deploy a preview and test it before promoting it.
6. Test direct navigation, refresh behavior, assets, audio controls, and responsive layouts on the deployed URL.

## Build and preview

```bash
npm run build
npm run preview
```

The preview command checks the production build locally. Follow the hosting provider's instructions for the final start command and output directory; these depend on the selected deployment adapter.

## Environment variables

Do not commit secrets. If a future integration needs credentials, configure them in the hosting provider's environment-variable settings and document only variable names and purpose—not values.

## Post-deployment smoke test

- The home page loads without a console-breaking error.
- Direct URL access and refresh work.
- Local images and favicon load.
- Interactive elements respond on desktop and mobile.
- Sound remains off until enabled by the visitor.
- The hidden constellation or other Easter egg behaves as described.
- Browser-local demo state is not described as global analytics.
- No secrets or development-only diagnostics are exposed.

## Deployment status

The existence of this guide is not evidence that a production deployment has been verified. Add a public demo URL to the README only after it is live and has passed the smoke test.
