# Upticked

A small task-list app: lists, tasks, saved views.

```bash
bun install
bun run dev
```

The app runs against MSW — `src/mocks/handlers.ts` is the API and
`src/mocks/fixtures.ts` is the data. No server to start.

| Command | |
| --- | --- |
| `bun run dev` | Dev server on http://localhost:5180 |
| `bun run test` | Vitest |
| `bun run typecheck` | `tsc --noEmit` |
| `bun run lint` | Biome (`lint:fix` to apply) |
| `bun run build` | Production build |

Conventions live in [`CLAUDE.md`](CLAUDE.md) and
[`docs/conventions/`](docs/conventions).
