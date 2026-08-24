import { Badge } from '~/ui/Badge'
import type { Column } from '~/ui/DataTable'
import { bucketByDueDate, formatDate, todayAsDateOnly } from '~/lib/dates'
import { translate } from '~/lib/i18n'
import type { TaskRow } from '~/features/tasks/use-tasks'
import type { TaskPriority, TaskStatus } from '~/lib/types'

const STATUS_LABEL_KEYS = {
  todo: 'status.todo',
  doing: 'status.doing',
  done: 'status.done',
} as const satisfies Record<TaskStatus, string>

const PRIORITY_LABEL_KEYS = {
  low: 'priority.low',
  medium: 'priority.medium',
  high: 'priority.high',
} as const satisfies Record<TaskPriority, string>

const PRIORITY_TONES = { low: 'neutral', medium: 'info', high: 'danger' } as const

const DueDateCell = ({ task }: { task: TaskRow }) => {
  if (!task.dueDate) return <span>{translate('tasks.noDueDate')}</span>

  const bucket = bucketByDueDate(task.dueDate, todayAsDateOnly())
  if (bucket === 'overdue') {
    return (
      <Badge tone="danger">
        {translate('tasks.overdue')} · {formatDate(task.dueDate)}
      </Badge>
    )
  }
  if (bucket === 'today') {
    return <Badge tone="warning">{translate('tasks.dueToday')}</Badge>
  }
  return <span>{formatDate(task.dueDate)}</span>
}

const TASK_COLUMNS: readonly Column<TaskRow>[] = [
  { key: 'title', header: translate('tasks.column.title'), render: (task) => task.title },
  {
    key: 'status',
    header: translate('tasks.column.status'),
    render: (task) => translate(STATUS_LABEL_KEYS[task.status]),
  },
  {
    key: 'dueDate',
    header: translate('tasks.column.dueDate'),
    render: (task) => <DueDateCell task={task} />,
  },
  {
    key: 'priority',
    header: translate('tasks.column.priority'),
    render: (task) => (
      <Badge tone={PRIORITY_TONES[task.priority]}>{translate(PRIORITY_LABEL_KEYS[task.priority])}</Badge>
    ),
  },
]

const DEFAULT_TASK_COLUMN_KEYS = TASK_COLUMNS.map((column) => column.key)

/** Picks and orders the task columns a saved view asks for. */
const buildTaskColumns = (columnKeys: readonly string[]) =>
  columnKeys
    .map((columnKey) => TASK_COLUMNS.find((column) => column.key === columnKey))
    .filter((column): column is Column<TaskRow> => Boolean(column))

export { buildTaskColumns, DEFAULT_TASK_COLUMN_KEYS, TASK_COLUMNS }
