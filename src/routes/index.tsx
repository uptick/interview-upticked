import { Link, createFileRoute } from '@tanstack/react-router'
import { Card } from '~/ui/Card'
import { EmptyState } from '~/ui/EmptyState'
import { PageHeader } from '~/ui/PageHeader'
import { Stack } from '~/ui/Stack'
import { Text } from '~/ui/Text'
import { LINK_CLASS_NAME } from '~/ui/TextLink'
import { useLists } from '~/features/lists/use-lists'
import { translate } from '~/lib/i18n'
import { findPage } from '~/pages/page-registry'

const ListsIndexPage = () => {
  const { data: lists, isPending, isError } = useLists()

  return (
    <>
      <PageHeader title={translate(findPage('lists').titleKey)} />
      {isPending ? <Text tone="muted">{translate('common.loading')}</Text> : null}
      {isError ? <Text tone="muted">{translate('tasks.loadFailed')}</Text> : null}
      {lists?.length === 0 ? <EmptyState message={translate('lists.empty')} /> : null}
      {lists?.length ? (
        <Stack gap="md">
          {lists.map((list) => (
            <Card key={list.id}>
              <Stack direction="row" align="between" gap="md">
                <Stack gap="sm">
                  <Text weight="semibold" size="lg">
                    {list.name}
                  </Text>
                  <Text size="sm" tone="muted">
                    {translate('lists.taskCount', { count: list.taskCount })} ·{' '}
                    {translate('lists.memberCount', { count: list.memberCount })}
                  </Text>
                </Stack>
                <Link to="/lists/$listId/tasks" params={{ listId: list.id }} className={LINK_CLASS_NAME}>
                  {translate('lists.open')}
                </Link>
              </Stack>
            </Card>
          ))}
        </Stack>
      ) : null}
    </>
  )
}

const Route = createFileRoute('/')({ component: ListsIndexPage })

export { Route }
