<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Theme, sound, chaos and status live in one React context (`src/lib/site-state.tsx`); all audio goes through the singleton in `src/lib/audio.ts` so the global mute covers every sound.
- Pure rules (secret sequence, local visitor counter) live in `src/lib/pip-logic.ts` with tests in `src/test/` — keep logic there so it stays testable.
