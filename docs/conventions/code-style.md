# Code style

## Exports

Named exports only, grouped in a single `export { ... }` statement at the bottom
of the file. Types are exported separately with `export type { ... }`. No default
exports (enforced by Biome, except in `vite.config.ts`).

## Names

- **No abbreviations.** `element`, not `el`. `checkbox`, not `cb`. `container`,
  not `cont`. Single-character names are never acceptable, including in
  callbacks: `(task) => task.id`, never `(t) => t.id`.
- Files that export a component are `PascalCase.tsx`, matching the component.
  Every other module is `kebab-case.ts`.
- Hooks are `use-<thing>.ts` and live with their feature.

## Strings

Every user-facing string goes through `translate()` from `src/lib/i18n.ts`, keyed
in `src/lib/translations.ts` as `<area>.<name>`. No string literals in JSX. This
includes `aria-label`s, table captions and empty states — anything a person or a
screen reader reads.

## Styling

`tw:`-prefixed Tailwind utilities are **only allowed inside `src/ui/`**. The
utility scan in `src/styles/app.css` is scoped to that directory
(`@source '../ui/**/*.{ts,tsx}'`), so a `tw:` class written anywhere else
generates no CSS at all: the class lands in the DOM, nothing is styled, and
nothing warns.

Feature and route code composes the primitives in `src/ui/` (`Stack`, `Text`,
`Card`, `Button`, `DataTable`, …). If a layout needs something those cannot
express, add a primitive to `src/ui/` rather than reaching for a utility class at
the call site.

## Comments

Comments explain why, not what. Keep them short.
