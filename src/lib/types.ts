type MemberRole = 'owner' | 'member' | 'guest'

type Member = {
  id: string
  name: string
  email: string
  role: MemberRole
}

type List = {
  id: string
  name: string
  taskCount: number
  memberCount: number
  /** The role the signed-in member holds on this list. */
  viewerRole: MemberRole
}

type TaskStatus = 'todo' | 'doing' | 'done'
type TaskPriority = 'low' | 'medium' | 'high'

type Task = {
  id: string
  listId: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string | null
  assigneeId: string | null
  position: number
}

type SavedView = {
  id: string
  listId: string
  name: string
  columnKeys: string[]
  filters: { status?: TaskStatus }
  ownerId: string
}

export type { List, Member, MemberRole, SavedView, Task, TaskPriority, TaskStatus }
