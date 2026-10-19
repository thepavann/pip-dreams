# Contributing

Thank you for helping improve Pip's Midnight Observatory.

This is a small, character-led creative project. Contributions should preserve the sense of wonder while keeping the application usable, maintainable, and technically honest.

## Before opening a pull request

- Search existing issues and pull requests to avoid duplicate work.
- For substantial changes, open an issue or discussion first to explain the proposal.
- Keep each pull request focused on one topic.
- Never commit passwords, API keys, private tokens, or personal data.

## Development setup

See [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) for setup and local commands.

Before submitting a pull request, run:

```bash
npm run lint
npm test
npm run build
```

If a check cannot be run, say so clearly in the pull request.

## Pull request checklist

- [ ] The change has a clear purpose.
- [ ] The story and character direction remain coherent.
- [ ] Responsive behavior has been checked.
- [ ] Interactive controls are keyboard-accessible and clearly labeled.
- [ ] Sound remains user-controlled and does not autoplay.
- [ ] Tests, lint, and build were run, or any skipped checks are explained.
- [ ] Screenshots or a short recording are included for visible UI changes.
- [ ] Asset credits and documentation are updated when needed.

## Style

Follow the conventions already present in the codebase. Prefer readable components and descriptive names over clever abstractions. Avoid adding dependencies for functionality that can be implemented clearly with the existing stack.

## Reporting bugs

Include the browser and operating system, steps to reproduce, expected behavior, actual behavior, and relevant console or terminal output. Remove tokens and private information before sharing logs.

## Artwork and third-party materials

Do not add artwork, fonts, audio, or other assets unless their origin and permitted use are understood. Update the relevant attribution documentation whenever assets are added or replaced.
