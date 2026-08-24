# Permissions and sparse fieldsets

The API serialises only the fields the caller asks for, via `?fields=`. That
makes the fieldset a privacy control, not an optimisation.

- **Ask for the narrowest fieldset that renders the screen.** A field you do not
  render is a field you must not request. Anything that arrives in a response is
  in the browser, in the devtools network tab, and in the query cache —
  regardless of whether a component displays it.
- **Widening a fieldset is a permission decision.** Gate it on a predicate from
  `src/features/members/permissions.ts` and pass the result into the hook, so
  the request itself narrows for viewers who are not allowed the data.
- **Roles are per list, not global.** The API returns `viewerRole` on a list, and
  a member can be an owner of one list and a guest on another.
- **Guests never see contact details.** They are outside collaborators: they can
  see the work, and the display names of the people on it, and nothing more.

```ts
const { data: members } = useListMembers(listId, {
  includeContactDetails: canSeeMemberContactDetails(list?.viewerRole),
})
```

Worked example: `src/routes/lists.$listId.tasks.tsx` with
`src/features/members/use-list-members.ts`.
