import { useQuery } from '@tanstack/react-query'
import { fetchJson } from '~/lib/api-client'
import { loadForList } from '~/features/saved-views/saved-view-store'
import type { SavedView } from '~/lib/types'

const savedViewQueryKeys = {
  forList: (listId: string) => ['saved-views', 'list', listId] as const,
}

/** Shared views come from the API; the member's own views are stored locally. */
const useSavedViews = (listId: string) =>
  useQuery({
    queryKey: savedViewQueryKeys.forList(listId),
    queryFn: async () => {
      const shared = (
        await fetchJson<{ data: SavedView[] }>('/saved-views', { searchParams: { list_id: listId } })
      ).data
      return [...shared, ...loadForList(listId)]
    },
  })

export { savedViewQueryKeys, useSavedViews }
