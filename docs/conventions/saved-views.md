# Saved views

A saved view is a named set of column keys and filters for a task list. Shared
views come from the API; a member's own views are persisted in
`localStorage` by `src/features/saved-views/saved-view-store.ts`.

- **A persisted column key is a public contract.** It is written into browser
  storage and into API records, so renaming one is a data migration, not a
  refactor. Views persisted under the old key will silently stop resolving that
  column — `buildTaskColumns` drops keys it does not recognise rather than
  throwing, so the failure surfaces as a missing column, not an error.
- **If a key has to change, bump `STORAGE_KEY` and translate the old payload**
  in `load()`. Dropping the old shape without a migration loses the member's
  views.
- **The active view lives in the URL** (`?view=`), so a configured list is
  shareable.
