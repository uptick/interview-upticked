import { useQuery } from '@tanstack/react-query'
import { fetchJson } from '~/lib/api-client'
import type { MemberRole } from '~/lib/types'

type ListMember = {
  id: string
  name: string
  role: MemberRole
  /** Only present when the viewer is allowed to see contact details. */
  email?: string
}

type ListMemberOptions = {
  /** Widens the fieldset. Pass the result of `canSeeMemberContactDetails`. */
  includeContactDetails?: boolean
}

const memberFields = (includeContactDetails: boolean) =>
  includeContactDetails ? (['name', 'role', 'email'] as const) : (['name', 'role'] as const)

const memberQueryKeys = {
  forList: (listId: string, includeContactDetails: boolean) =>
    ['members', 'list', listId, { includeContactDetails }] as const,
}

const useListMembers = (listId: string, { includeContactDetails = false }: ListMemberOptions = {}) =>
  useQuery({
    queryKey: memberQueryKeys.forList(listId, includeContactDetails),
    queryFn: async () =>
      (
        await fetchJson<{ data: ListMember[] }>(`/lists/${listId}/members`, {
          fields: memberFields(includeContactDetails),
        })
      ).data,
  })

export { memberFields, memberQueryKeys, useListMembers }
export type { ListMember, ListMemberOptions }
