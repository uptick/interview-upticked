# Routing

Routes are file-based (TanStack Router). A file in `src/routes/` becomes a route;
`src/route-tree.gen.ts` is generated — never edit it by hand.

- **Every page is declared in `src/pages/page-registry.ts`.** The route file
  supplies the component; the registry supplies the page title and, when the
  page belongs in the sidebar, its navigation label. An unregistered route still
  resolves, but it has no title and never appears in the navigation.
- **Filters and view state live in the URL search params**, validated by
  `validateSearch`, so any screen state a person can reach is a link they can
  share and a page they can reload.
- **Get params and search from the route**, via `Route.useParams()` and
  `Route.useSearch()` — not by parsing `window.location`.

Worked example: `src/routes/lists.$listId.tasks.tsx`.
