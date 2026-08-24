import { useQuery } from '@tanstack/react-query'
import { fetchJson } from '~/lib/api-client'

type CurrentMember = {
  id: string
  name: string
}

const currentMemberQueryKeys = {
  detail: () => ['current-member'] as const,
}

const useCurrentMember = () =>
  useQuery({
    queryKey: currentMemberQueryKeys.detail(),
    queryFn: () => fetchJson<CurrentMember>('/me'),
    staleTime: 5 * 60 * 1000,
  })

export { currentMemberQueryKeys, useCurrentMember }
export type { CurrentMember }
