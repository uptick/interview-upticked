# CLAUDE.md

Guidance for agents and humans working in this repository.

## What this is

Upticked is a small task-list product. A member belongs to lists; a list holds
tasks with a status, a priority, an assignee and a due date; a saved view is a
named set of columns and filters for a list.

## Stack

Vite, React 18.3.1, TypeScript, TanStack Router (file-based) and TanStack Query.
Styling is Tailwind with the `tw:` prefix. Tests are Vitest, Testing Library and
MSW. The package manager and runtime is `bun`.

There is no backend: `src/mocks/handlers.ts` is the API, served by MSW in the
browser and in tests.

## Commands

```bash
bun install
bun run dev         # http://localhost:5180
bun run typecheck
bun run test
bun run lint        # bun run lint:fix to apply
```

## Rules

1. **Server data is read through a shared query hook**, never a hand-rolled
   `useEffect` fetch. A query key names every input that changes the response.
2. **Every user-facing string goes through `translate()`** and is keyed in
   `src/lib/translations.ts`. No string literals in JSX.
3. **Named exports only**, grouped at the bottom of the file. Component files are
   `PascalCase.tsx`; every other module is `kebab-case.ts`.
4. **No abbreviated variable names.** `element`, not `el`. Single-character names
   are never acceptable.
5. **`tw:` utility classes are only allowed inside `src/ui/`.** The utility scan
   is scoped to that directory, so a `tw:` class written anywhere else generates
   no CSS and silently does nothing. Feature code composes `src/ui/` primitives.
6. **React is pinned at 18.3.1.** There is no compiler doing memoisation for you.
7. **Definition of done:** `bun run typecheck`, `bun run test` and `bun run lint`
   all pass, and the new behaviour has a test. Never reach green by weakening or
   deleting an existing assertion.

## Conventions

The detail behind those rules, with worked examples:

- [Data fetching](docs/conventions/data-fetching.md)
- [Permissions and sparse fieldsets](docs/conventions/permissions-and-fieldsets.md)
- [Saved views](docs/conventions/saved-views.md)
- [Dates](docs/conventions/dates.md)
- [Routing](docs/conventions/routing.md)
- [Testing](docs/conventions/testing.md)
- [Code style](docs/conventions/code-style.md)
- [Accessibility](docs/conventions/accessibility.md)

## Worked example

`src/routes/lists.$listId.tasks.tsx` is the reference page. It shows the page
registry, URL-held filters, a shared query hook, the column builder, saved views
and a permission-gated fieldset in one place. Read it before adding a page.
