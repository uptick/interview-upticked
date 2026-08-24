import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '~/ui/Button'
import { Card } from '~/ui/Card'
import { DataTable } from '~/ui/DataTable'
import { EmptyState } from '~/ui/EmptyState'
import { PageHeader } from '~/ui/PageHeader'
import { Select } from '~/ui/Select'
import { Stack } from '~/ui/Stack'
import { Text } from '~/ui/Text'
import { TextLink } from '~/ui/TextLink'
import { useList } from '~/features/lists/use-lists'
import { canSeeMemberContactDetails } from '~/features/members/permissions'
import { useListMembers } from '~/features/members/use-list-members'
import { clearAll } from '~/features/saved-views/saved-view-store'
import { SavedViewList } from '~/features/saved-views/SavedViewList'
import { useSavedViews } from '~/features/saved-views/use-saved-views'
import { AssigneeFilter } from '~/features/tasks/AssigneeFilter'
import { DEFAULT_TASK_COLUMN_KEYS, buildTaskColumns } from '~/features/tasks/task-columns'
import { useTasks } from '~/features/tasks/use-tasks'
import { translate } from '~/lib/i18n'
import type { MemberRole, SavedView, TaskStatus } from '~/lib/types'

const TASK_STATUSES = ['todo', 'doing', 'done'] as const

const ROLE_LABEL_KEYS = {
  owner: 'role.owner',
  member: 'role.member',
  guest: 'role.guest',
} as const satisfies Record<MemberRole, string>

const STATUS_FILTER_OPTIONS = [
  { value: '', label: translate('tasks.filter.allStatuses') },
  { value: 'todo', label: translate('status.todo') },
  { value: 'doing', label: translate('status.doing') },
  { value: 'done', label: translate('status.done') },
] as const

/** Filters live in the URL so a task list is always shareable and reloadable. */
type TaskListSearch = {
  status?: TaskStatus
  view?: string
}

const isTaskStatus = (candidate: unknown): candidate is TaskStatus =>
  typeof candidate === 'string' && (TASK_STATUSES as readonly string[]).includes(candidate)

const TaskListPage = () => {
  const { listId } = Route.useParams()
  const { status, view: activeViewId } = Route.useSearch()
  const navigate = Route.useNavigate()
  const [assigneeId, setAssigneeId] = useState('')

  const { data: list } = useList(listId)
  const { data: members } = useListMembers(listId, {
    includeContactDetails: canSeeMemberContactDetails(list?.viewerRole),
  })
  const { data: savedViews, refetch: refetchSavedViews } = useSavedViews(listId)
  const { data: tasks, isPending } = useTasks(listId, { status, assigneeId })

  const activeView = savedViews?.find((savedView) => savedView.id === activeViewId) ?? null
  const columns = buildTaskColumns(activeView?.columnKeys ?? DEFAULT_TASK_COLUMN_KEYS)

  const applyView = (savedView: SavedView) => {
    navigate({ search: { status: savedView.filters.status, view: savedView.id } })
  }

  const resetSavedViews = () => {
    clearAll()
    refetchSavedViews()
  }

  return (
    <>
      <PageHeader
        title={list?.name ?? translate('tasks.heading')}
        actions={
          <Stack direction="row" gap="md" align="center">
            <Select
              label={translate('tasks.filter.status')}
              value={status ?? ''}
              options={STATUS_FILTER_OPTIONS}
              onChange={(value) =>
                navigate({
                  search: { status: isTaskStatus(value) ? value : undefined, view: activeViewId },
                })
              }
            />
            <AssigneeFilter listId={listId} value={assigneeId} onChange={setAssigneeId} />
          </Stack>
        }
      />

      <Stack gap="lg">
        <Card>
          {isPending ? (
            <Text tone="muted">{translate('common.loading')}</Text>
          ) : tasks?.length ? (
            <DataTable
              caption={translate('tasks.heading')}
              columns={columns}
              rows={tasks}
              getRowKey={(task) => task.id}
            />
          ) : (
            <EmptyState message={translate('tasks.empty')} />
          )}
        </Card>

        <Card>
          <Stack gap="md">
            <Stack direction="row" align="between" gap="md">
              <Text as="h2" size="lg" weight="semibold">
                {translate('savedViews.heading')}
              </Text>
              <Button variant="secondary" onClick={resetSavedViews}>
                {translate('savedViews.reset')}
              </Button>
            </Stack>
            <SavedViewList views={savedViews ?? []} activeViewId={activeViewId ?? null} onApply={applyView} />
          </Stack>
        </Card>

        <Card>
          <Stack gap="md">
            <Text as="h2" size="lg" weight="semibold">
              {translate('members.heading')}
            </Text>
            <Stack as="ul" gap="sm">
              {(members ?? []).map((member) => (
                <Stack as="li" key={member.id} direction="row" gap="sm" align="center">
                  <Text>{member.name}</Text>
                  <Text size="sm" tone="muted">
                    {translate(ROLE_LABEL_KEYS[member.role])}
                  </Text>
                  {member.email ? (
                    <TextLink href={`mailto:${member.email}`}>
                      {translate('members.emailLink', { name: member.name })}
                    </TextLink>
                  ) : null}
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </>
  )
}

const Route = createFileRoute('/lists/$listId/tasks')({
  component: TaskListPage,
  validateSearch: (search: Record<string, unknown>): TaskListSearch => ({
    status: isTaskStatus(search.status) ? search.status : undefined,
    view: typeof search.view === 'string' ? search.view : undefined,
  }),
})

export { Route }
