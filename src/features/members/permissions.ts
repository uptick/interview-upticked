import type { MemberRole } from '~/lib/types'

/**
 * Guests are outside collaborators. They can see the work on a list but not who
 * the other members are beyond a display name — no contact details, ever.
 * See docs/conventions/permissions-and-fieldsets.md.
 */
const canSeeMemberContactDetails = (role: MemberRole | undefined) => role === 'owner' || role === 'member'

const canManageList = (role: MemberRole | undefined) => role === 'owner'

export { canManageList, canSeeMemberContactDetails }
