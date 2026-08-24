# Dates

A task due date is a **date-only** string, `YYYY-MM-DD`. It names a calendar day,
not an instant.

- **Never `new Date('2026-08-24')`.** That parses as UTC midnight, so anyone west
  of Greenwich renders the previous day. Use the helpers in `src/lib/dates.ts`.
- **Compare date-only strings directly.** They sort lexicographically, so
  `dueDate < today` is the whole comparison.
- **`todayAsDateOnly()` reads the viewer's local day.** Pass it in as an argument
  rather than reading the clock deep inside a helper, so the behaviour is
  testable.
- Fixtures anchor their due dates relative to today; tests pin exact strings.

Worked example: `src/lib/dates.ts` and `src/lib/dates.test.ts`.
