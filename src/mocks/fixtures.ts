import { addDays, todayAsDateOnly } from '~/lib/dates'
import type { List, Member, SavedView, Task } from '~/lib/types'

// Due dates are anchored to the day the fixtures are read so the app always has
// something overdue and something upcoming. Tests freeze the clock instead.
const relativeDueDate = (dayOffset: number) => addDays(todayAsDateOnly(), dayOffset)

const CURRENT_MEMBER_ID = 'mem-ada'

const members: Member[] = [
  { id: 'mem-ada', name: 'Ada Bell', email: 'ada.bell@example.com', role: 'owner' },
  { id: 'mem-owen', name: 'Owen Marsh', email: 'owen.marsh@example.com', role: 'member' },
  { id: 'mem-rae', name: 'Rae Iyer', email: 'rae.iyer@example.com', role: 'member' },
  { id: 'mem-noor', name: 'Noor Haddad', email: 'noor.haddad@example.com', role: 'owner' },
]

const lists: Omit<List, 'viewerRole'>[] = [
  { id: 'list-platform', name: 'Platform team', taskCount: 6, memberCount: 3 },
  { id: 'list-home', name: 'Home', taskCount: 3, memberCount: 1 },
  { id: 'list-onboarding', name: 'Client onboarding', taskCount: 5, memberCount: 3 },
]

// The role a member holds is per list, not global. The current member is an
// owner of two lists and only a guest on the third.
const listMemberships: Record<string, { memberId: string; role: Member['role'] }[]> = {
  'list-platform': [
    { memberId: 'mem-ada', role: 'owner' },
    { memberId: 'mem-owen', role: 'member' },
    { memberId: 'mem-rae', role: 'member' },
  ],
  'list-home': [{ memberId: 'mem-ada', role: 'owner' }],
  'list-onboarding': [
    { memberId: 'mem-noor', role: 'owner' },
    { memberId: 'mem-owen', role: 'member' },
    { memberId: 'mem-ada', role: 'guest' },
  ],
}

const tasks: Task[] = [
  {
    id: 'task-1',
    listId: 'list-platform',
    title: 'Retire the legacy export job',
    status: 'doing',
    priority: 'high',
    dueDate: relativeDueDate(-4),
    assigneeId: 'mem-ada',
    position: 0,
  },
  {
    id: 'task-2',
    listId: 'list-platform',
    title: 'Add rate limiting to the public API',
    status: 'todo',
    priority: 'high',
    dueDate: relativeDueDate(0),
    assigneeId: 'mem-ada',
    position: 1,
  },
  {
    id: 'task-3',
    listId: 'list-platform',
    title: 'Document the deploy runbook',
    status: 'todo',
    priority: 'medium',
    dueDate: relativeDueDate(3),
    assigneeId: 'mem-owen',
    position: 2,
  },
  {
    id: 'task-4',
    listId: 'list-platform',
    title: 'Upgrade the build toolchain',
    status: 'todo',
    priority: 'low',
    dueDate: relativeDueDate(21),
    assigneeId: 'mem-ada',
    position: 3,
  },
  {
    id: 'task-5',
    listId: 'list-platform',
    title: 'Fix flaky snapshot test',
    status: 'done',
    priority: 'medium',
    dueDate: relativeDueDate(-9),
    assigneeId: 'mem-rae',
    position: 4,
  },
  {
    id: 'task-6',
    listId: 'list-platform',
    title: 'Triage the error backlog',
    status: 'todo',
    priority: 'medium',
    dueDate: null,
    assigneeId: null,
    position: 5,
  },

  {
    id: 'task-7',
    listId: 'list-home',
    title: 'Book the annual service',
    status: 'todo',
    priority: 'medium',
    dueDate: relativeDueDate(-1),
    assigneeId: 'mem-ada',
    position: 0,
  },
  {
    id: 'task-8',
    listId: 'list-home',
    title: 'Replace the smoke alarm battery',
    status: 'todo',
    priority: 'high',
    dueDate: relativeDueDate(0),
    assigneeId: 'mem-ada',
    position: 1,
  },
  {
    id: 'task-9',
    listId: 'list-home',
    title: 'Sort out the garage',
    status: 'todo',
    priority: 'low',
    dueDate: null,
    assigneeId: 'mem-ada',
    position: 2,
  },

  {
    id: 'task-10',
    listId: 'list-onboarding',
    title: 'Collect brand assets',
    status: 'done',
    priority: 'medium',
    dueDate: relativeDueDate(-12),
    assigneeId: 'mem-noor',
    position: 0,
  },
  {
    id: 'task-11',
    listId: 'list-onboarding',
    title: 'Confirm the data migration window',
    status: 'doing',
    priority: 'high',
    dueDate: relativeDueDate(2),
    assigneeId: 'mem-ada',
    position: 1,
  },
  {
    id: 'task-12',
    listId: 'list-onboarding',
    title: 'Schedule the training session',
    status: 'todo',
    priority: 'medium',
    dueDate: relativeDueDate(6),
    assigneeId: 'mem-owen',
    position: 2,
  },
  {
    id: 'task-13',
    listId: 'list-onboarding',
    title: 'Write the handover summary',
    status: 'todo',
    priority: 'low',
    dueDate: relativeDueDate(30),
    assigneeId: 'mem-ada',
    position: 3,
  },
  {
    id: 'task-14',
    listId: 'list-onboarding',
    title: 'Close the onboarding checklist',
    status: 'todo',
    priority: 'low',
    dueDate: null,
    assigneeId: 'mem-noor',
    position: 4,
  },
]

const savedViews: SavedView[] = [
  {
    id: 'view-due-soon',
    listId: 'list-platform',
    name: 'Due soon',
    columnKeys: ['title', 'due_date', 'priority'],
    filters: { status: 'todo' },
    ownerId: 'mem-ada',
  },
  {
    id: 'view-in-flight',
    listId: 'list-platform',
    name: 'In flight',
    columnKeys: ['title', 'status', 'due_date'],
    filters: { status: 'doing' },
    ownerId: 'mem-ada',
  },
]

export { CURRENT_MEMBER_ID, listMemberships, lists, members, savedViews, tasks }
