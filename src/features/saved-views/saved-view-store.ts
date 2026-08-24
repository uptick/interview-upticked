import type { SavedView } from '~/lib/types'

// Views the member has created locally are persisted in the browser. The stored
// payload is versioned by key; anything written by an older shape is dropped
// rather than half-read. See docs/conventions/saved-views.md.
const STORAGE_KEY = 'upticked.saved-views.v1'

type StoredSavedViews = Record<string, SavedView[]>

const isSavedView = (candidate: unknown): candidate is SavedView => {
  if (typeof candidate !== 'object' || candidate === null) return false
  const view = candidate as Partial<SavedView>
  return (
    typeof view.id === 'string' &&
    typeof view.listId === 'string' &&
    typeof view.name === 'string' &&
    Array.isArray(view.columnKeys)
  )
}

const load = (): StoredSavedViews => {
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return {}
  try {
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return {}
    return Object.fromEntries(
      Object.entries(parsed as Record<string, unknown>).map(([listId, views]) => [
        listId,
        Array.isArray(views) ? views.filter(isSavedView) : [],
      ]),
    )
  } catch {
    return {}
  }
}

const save = (views: StoredSavedViews) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(views))
}

const loadForList = (listId: string) => load()[listId] ?? []

const saveForList = (listId: string, views: SavedView[]) => {
  save({ ...load(), [listId]: views })
}

const clearAll = () => {
  window.localStorage.removeItem(STORAGE_KEY)
}

export { clearAll, load, loadForList, save, saveForList, STORAGE_KEY }
export type { StoredSavedViews }
