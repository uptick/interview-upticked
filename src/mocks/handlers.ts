import { HttpResponse, http } from 'msw'
import { CURRENT_MEMBER_ID, listMemberships, lists, members, savedViews, tasks } from '~/mocks/fixtures'
import type { Task } from '~/lib/types'

type JsonRecord = Record<string, unknown>

const parseFields = (url: URL) => {
  const raw = url.searchParams.get('fields')
  return raw
    ? raw
        .split(',')
        .map((field) => field.trim())
        .filter(Boolean)
    : null
}

const findMember = (memberId: string | null) =>
  memberId ? (members.find((member) => member.id === memberId) ?? null) : null

/**
 * Serialises a task against a sparse fieldset. A field the caller did not ask
 * for is not in the response at all — including anything under `assignee.`.
 */
const projectTask = (task: Task, fields: string[] | null): JsonRecord => {
  const list = lists.find((candidate) => candidate.id === task.listId)
  const assignee = findMember(task.assigneeId)
  const allFields = fields ?? ['listId', 'title', 'status', 'priority', 'dueDate', 'assigneeId', 'position']

  const projected: JsonRecord = { id: task.id }
  for (const field of allFields) {
    if (field.startsWith('assignee.')) {
      const attribute = field.slice('assignee.'.length)
      if (!assignee) {
        projected.assignee = null
        continue
      }
      const existing = (projected.assignee as JsonRecord | undefined) ?? { id: assignee.id }
      existing[attribute] = assignee[attribute as 'name' | 'email' | 'role']
      projected.assignee = existing
      continue
    }
    if (field.startsWith('list.')) {
      const attribute = field.slice('list.'.length)
      const existing = (projected.list as JsonRecord | undefined) ?? { id: task.listId }
      existing[attribute] = list?.[attribute as 'name']
      projected.list = existing
      continue
    }
    projected[field] = task[field as keyof Task]
  }
  return projected
}

const membershipsFor = (memberId: string) =>
  Object.entries(listMemberships)
    .map(([listId, memberships]) => ({
      listId,
      role: memberships.find((membership) => membership.memberId === memberId)?.role,
    }))
    .filter((membership): membership is { listId: string; role: 'owner' | 'member' | 'guest' } =>
      Boolean(membership.role),
    )

/** The API always tells the caller which role they themselves hold. */
const withViewerRole = (listId: string) => {
  const list = lists.find((candidate) => candidate.id === listId)
  const viewerRole = listMemberships[listId]?.find(
    (membership) => membership.memberId === CURRENT_MEMBER_ID,
  )?.role
  if (!list || !viewerRole) return null
  return { ...list, viewerRole }
}

const handlers = [
  http.get('/api/me', () => {
    const currentMember = findMember(CURRENT_MEMBER_ID)
    return HttpResponse.json({ id: currentMember?.id, name: currentMember?.name })
  }),

  http.get('/api/lists', () => {
    const data = membershipsFor(CURRENT_MEMBER_ID)
      .map((membership) => withViewerRole(membership.listId))
      .filter(Boolean)
    return HttpResponse.json({ data })
  }),

  http.get('/api/lists/:listId', ({ params }) => {
    const list = withViewerRole(String(params.listId))
    if (!list) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(list)
  }),

  http.get('/api/lists/:listId/members', ({ params, request }) => {
    const memberships = listMemberships[String(params.listId)]
    if (!memberships) return new HttpResponse(null, { status: 404 })
    const fields = parseFields(new URL(request.url)) ?? ['name', 'role']
    const data = memberships.map(({ memberId, role }) => {
      const member = findMember(memberId)
      const projected: JsonRecord = { id: memberId }
      for (const field of fields) {
        projected[field] = field === 'role' ? role : member?.[field as 'name' | 'email']
      }
      return projected
    })
    return HttpResponse.json({ data })
  }),

  http.get('/api/lists/:listId/tasks', ({ params, request }) => {
    const url = new URL(request.url)
    const status = url.searchParams.get('status')
    const assigneeId = url.searchParams.get('assignee_id')
    const fields = parseFields(url)

    const matching = tasks
      .filter((task) => task.listId === params.listId)
      .filter((task) => (status ? task.status === status : true))
      .filter((task) => (assigneeId ? task.assigneeId === assigneeId : true))
      .sort((left, right) => left.position - right.position)

    return HttpResponse.json({ data: matching.map((task) => projectTask(task, fields)) })
  }),

  http.get('/api/tasks', ({ request }) => {
    const url = new URL(request.url)
    const status = url.searchParams.get('status')
    const assigneeId = url.searchParams.get('assignee_id')
    const fields = parseFields(url)

    const matching = tasks
      .filter((task) => (status ? task.status === status : true))
      .filter((task) => (assigneeId ? task.assigneeId === assigneeId : true))

    return HttpResponse.json({ data: matching.map((task) => projectTask(task, fields)) })
  }),

  http.get('/api/saved-views', ({ request }) => {
    const listId = new URL(request.url).searchParams.get('list_id')
    const data = savedViews.filter((view) => (listId ? view.listId === listId : true))
    return HttpResponse.json({ data })
  }),
]

export { handlers }
