import { Button } from '~/ui/Button'
import { EmptyState } from '~/ui/EmptyState'
import { Stack } from '~/ui/Stack'
import { Text } from '~/ui/Text'
import { translate } from '~/lib/i18n'
import type { SavedView } from '~/lib/types'

type SavedViewListProps = {
  views: readonly SavedView[]
  activeViewId: string | null
  onApply: (view: SavedView) => void
}

const SavedViewList = ({ views, activeViewId, onApply }: SavedViewListProps) => {
  if (views.length === 0) return <EmptyState message={translate('savedViews.empty')} />

  return (
    <Stack as="ul" gap="sm">
      {views.map((view) => (
        <Stack as="li" key={view.id} direction="row" align="between" gap="md">
          <Stack gap="sm">
            <Text weight="medium">{view.name}</Text>
            <Text size="sm" tone="muted">
              {translate('savedViews.columnSummary', { count: view.columnKeys.length })}
            </Text>
          </Stack>
          <Button
            variant={view.id === activeViewId ? 'primary' : 'secondary'}
            onClick={() => onApply(view)}
            aria-pressed={view.id === activeViewId}
          >
            {translate('savedViews.apply')}
          </Button>
        </Stack>
      ))}
    </Stack>
  )
}

export { SavedViewList }
export type { SavedViewListProps }
