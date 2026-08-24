import { useQuery } from '@tanstack/react-query'
import { fetchJson } from '~/lib/api-client'
import type { List } from '~/lib/types'

const listQueryKeys = {
  all: () => ['lists'] as const,
  detail: (listId: string) => ['lists', 'detail', listId] as const,
}

const useLists = () =>
  useQuery({
    queryKey: listQueryKeys.all(),
    queryFn: async () => (await fetchJson<{ data: List[] }>('/lists')).data,
  })

const useList = (listId: string) =>
  useQuery({
    queryKey: listQueryKeys.detail(listId),
    queryFn: () => fetchJson<List>(`/lists/${listId}`),
  })

export { listQueryKeys, useList, useLists }
