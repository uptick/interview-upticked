import { useQuery } from '@tanstack/react-query'
import { fetchJson } from '~/lib/api-client'
import type { Task, TaskStatus } from '~/lib/types'

/** The shape the task list asks the API for — nothing wider. */
type TaskRow = Pick<Task, 'id' | 'title' | 'status' | 'priority' | 'dueDate' | 'position'>

const TASK_LIST_FIELDS = ['title', 'status', 'priority', 'dueDate', 'position'] as const

type TaskListFilters = {
  status?: TaskStatus
}

const taskQueryKeys = {
  forList: (listId: string, filters: TaskListFilters) =>
    ['tasks', 'list', listId, { status: filters.status }] as const,
}

const useTasks = (listId: string, filters: TaskListFilters = {}) =>
  useQuery({
    queryKey: taskQueryKeys.forList(listId, filters),
    queryFn: async () =>
      (
        await fetchJson<{ data: TaskRow[] }>(`/lists/${listId}/tasks`, {
          fields: TASK_LIST_FIELDS,
          searchParams: { status: filters.status },
        })
      ).data,
  })

export { TASK_LIST_FIELDS, taskQueryKeys, useTasks }
export type { TaskListFilters, TaskRow }
