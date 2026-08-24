# Task list — assignee filter, new columns, and guest sharing

Closes UP-98, UP-101, UP-106.

## What changed

- **Assignee column.** The task list now shows who owns each task, with a mail link so you
  can chase it without leaving the page.
- **Assignee filter.** Sits next to the status filter and narrows the table to one person's
  work. The API already supported `assignee_id`, so this is mostly wiring.
- **Due date column key.** Renamed from `dueDate` to `due_date` so the column key matches the
  field name the API serialises. The saved views in the fixtures were updated to match.
- **Reset saved views.** A small escape hatch while we iterate on the column set — clears the
  views stored in the browser so you can start again.
- **Due date hint.** Upcoming dates now read "31 Aug 2026 · in 6 days".

## Why

Support keeps asking "who is this one on?" and today the only way to answer is to open every
task. Two customers have also asked to bring an outside collaborator into a list without
handing over the whole workspace, which is what the guest role is for.

## Notes for the reviewer

- Guests still only see member names — the contact-details gate on the "Shared with" panel is
  unchanged, so nothing new is exposed there.
- The task query holds its rows for 30 seconds. Switching filters felt sluggish without it.
- `position` came out of the requested fieldset: the API returns tasks in position order and
  nothing on the client reads the field.
- `bun run lint`, `bun run typecheck` and `bun run test` are green — 13 tests, one new.

## Testing

- Added a test covering the assignee filter.
- Updated the default-columns test for the new Assignee column.
- Checked the page as a guest on **Client onboarding** and as an owner on **Platform team**.
