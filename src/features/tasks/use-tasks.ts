import { useQuery } from '@tanstack/react-query'
import { fetchJson } from '~/lib/api-client'
import type { Task, TaskStatus } from '~/lib/types'

type TaskAssignee = {
  id: string
  name: string
  email: string
}

/** The shape the task list asks the API for — nothing wider. */
type TaskRow = Pick<Task, 'id' | 'title' | 'status' | 'priority' | 'dueDate'> & {
  assignee: TaskAssignee | null
}

const TASK_LIST_FIELDS = [
  'title',
  'status',
  'priority',
  'dueDate',
  'assignee.name',
  'assignee.email',
] as const

type TaskListFilters = {
  status?: TaskStatus
  assigneeId?: string
}

const taskQueryKeys = {
  forList: (listId: string, filters: TaskListFilters) =>
    ['tasks', 'list', listId, { status: filters.status }] as const,
}

const useTasks = (listId: string, filters: TaskListFilters = {}) =>
  useQuery({
    queryKey: taskQueryKeys.forList(listId, filters),
    // Rows change rarely, and holding them briefly keeps switching filters snappy.
    staleTime: 30_000,
    queryFn: async () =>
      (
        await fetchJson<{ data: TaskRow[] }>(`/lists/${listId}/tasks`, {
          fields: TASK_LIST_FIELDS,
          searchParams: { status: filters.status, assignee_id: filters.assigneeId },
        })
      ).data,
  })

export { TASK_LIST_FIELDS, taskQueryKeys, useTasks }
export type { TaskAssignee, TaskListFilters, TaskRow }
