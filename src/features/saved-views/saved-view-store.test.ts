import { beforeEach, describe, expect, it } from 'vitest'
import { clearAll, load, loadForList, saveForList } from '~/features/saved-views/saved-view-store'
import type { SavedView } from '~/lib/types'

const view: SavedView = {
  id: 'view-local',
  listId: 'list-platform',
  name: 'My due dates',
  columnKeys: ['title', 'dueDate'],
  filters: { status: 'todo' },
  ownerId: 'mem-ada',
}

describe('saved view store', () => {
  beforeEach(clearAll)

  it('round-trips a view for one list without touching the others', () => {
    saveForList('list-platform', [view])
    saveForList('list-home', [])

    expect(loadForList('list-platform')).toEqual([view])
    expect(loadForList('list-home')).toEqual([])
  })

  it('returns an empty list when nothing has been stored', () => {
    expect(load()).toEqual({})
    expect(loadForList('list-platform')).toEqual([])
  })

  it('discards entries that are not recognisable views', () => {
    window.localStorage.setItem(
      'upticked.saved-views.v1',
      JSON.stringify({ 'list-platform': [view, { id: 'broken' }] }),
    )

    expect(loadForList('list-platform')).toEqual([view])
  })
})
