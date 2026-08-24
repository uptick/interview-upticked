# Testing

Vitest, Testing Library, and MSW. `src/mocks/handlers.ts` is the only API; a test
that hits an unhandled URL fails rather than falling through to the network.

- **Mount the real route tree** with `renderRoute('/some/path')` from
  `src/test-utils/render-route.tsx`, and drive it the way a person does: find by
  role, name, and label; click and type with `userEvent`.
- **Assert what the user sees**, not what the code called. No assertions on
  request payloads, hook internals, or render counts.
- **A failing test is a finding.** When a change breaks an existing test, the
  test has told you the change altered behaviour something depended on. Work out
  which behaviour, and decide deliberately: either the change is wrong, or the
  old expectation is genuinely obsolete and the new one replaces it explicitly.
  Deleting the assertion, loosening the matcher, or skipping the case to get to
  green destroys the finding.
- Definition of done: `bun run typecheck`, `bun run test` and `bun run lint` all
  pass, and the new behaviour has a test.
