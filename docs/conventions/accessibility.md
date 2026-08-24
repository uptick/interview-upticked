# Accessibility

The app is built out of `src/ui/` primitives, which carry most of this — but the
call site still has to get it right.

- **Every control has an accessible name.** `Select` renders a real `<label>`
  bound by `htmlFor`; a button's name is its text. An icon-only control needs an
  `aria-label`, translated like any other string.
- **Tables are tables.** `DataTable` emits `<caption>`, `<th scope="col">` and
  one row per record, so tests and screen readers can both navigate by role.
- **Toggle state is announced**, not just coloured: `aria-pressed` on the applied
  saved view, not a background colour alone.
- **Headings are a hierarchy.** One `h1` per page (`PageHeader`), `h2` for the
  panels within it.
- **Don't use colour alone** to convey a status. An overdue task carries the word
  "Overdue", not just a red badge.
