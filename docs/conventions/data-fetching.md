# Data fetching

All server data is read through TanStack Query, from a hook that lives with the
feature it belongs to (`src/features/<area>/use-<thing>.ts`).

- **Never fetch in a `useEffect`.** A hand-rolled effect has no cache, no
  deduplication, no retry policy and no shared loading state, and it will race
  itself the moment two components ask for the same thing.
- **Every hook exports its query keys** as a `*QueryKeys` object next to the
  hook, so invalidation from elsewhere doesn't have to guess the shape.
- **A query key names every input that changes the response.** If an argument
  reaches the request URL, it belongs in the key. A key that omits an input
  serves one filter's results under another filter's cache entry, and the UI
  shows stale rows with no error anywhere.
- **Handle all three states.** Pending, error (with a way to retry), and empty
  are part of the feature, not polish to add later.

```ts
const taskQueryKeys = {
  forList: (listId: string, filters: TaskListFilters) =>
    ['tasks', 'list', listId, { status: filters.status }] as const,
}
```

Worked example: `src/features/tasks/use-tasks.ts`.
