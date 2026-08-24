import { describe, expect, it } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen, waitFor, within } from '@testing-library/react'
import { renderRoute } from '~/test-utils/render-route'

const TASKS_PATH = '/lists/list-platform/tasks'

const taskTitles = async () => {
  const table = await screen.findByRole('table')
  const rows = within(table).getAllByRole('row').slice(1)
  return rows.map((row) => within(row).getAllByRole('cell')[0]?.textContent)
}

describe('task list', () => {
  it('shows the tasks on the list with the default columns', async () => {
    renderRoute(TASKS_PATH)

    expect(await screen.findByRole('heading', { name: 'Platform team' })).toBeVisible()

    const table = await screen.findByRole('table')
    expect(
      within(table)
        .getAllByRole('columnheader')
        .map((header) => header.textContent),
    ).toEqual(['Task', 'Status', 'Due', 'Assignee', 'Priority'])
    expect(await taskTitles()).toContain('Retire the legacy export job')
  })

  it('narrows the rows when the status filter changes', async () => {
    renderRoute(TASKS_PATH)
    await screen.findByRole('table')

    await userEvent.selectOptions(screen.getByLabelText('Status'), 'doing')

    await waitFor(async () => {
      expect(await taskTitles()).toEqual(['Retire the legacy export job'])
    })
  })

  it('filters the tasks by assignee', async () => {
    renderRoute(TASKS_PATH)
    await screen.findByRole('table')

    await userEvent.selectOptions(screen.getByDisplayValue('All assignees'), 'mem-owen')

    expect(await screen.findByRole('table')).toBeVisible()
  })

  it('applies the columns and filters of a saved view', async () => {
    renderRoute(TASKS_PATH)
    await screen.findByRole('table')

    const savedViewsPanel = screen.getByRole('heading', { name: 'Saved views' }).closest('section')
    if (!savedViewsPanel) throw new Error('Saved views panel not found')

    const dueSoonView = within(savedViewsPanel).getByText('Due soon').closest('li')
    if (!dueSoonView) throw new Error('Saved view "Due soon" not found')

    await userEvent.click(within(dueSoonView).getByRole('button', { name: 'Apply' }))

    await waitFor(async () => {
      const table = await screen.findByRole('table')
      expect(
        within(table)
          .getAllByRole('columnheader')
          .map((header) => header.textContent),
      ).toEqual(['Task', 'Due', 'Priority'])
    })
    expect(await taskTitles()).not.toContain('Retire the legacy export job')
  })

  it('does not offer contact details to a guest on the list', async () => {
    renderRoute('/lists/list-onboarding/tasks')

    expect(await screen.findByRole('heading', { name: 'Client onboarding' })).toBeVisible()
    const membersPanel = screen.getByRole('heading', { name: 'Shared with' }).closest('section')
    if (!membersPanel) throw new Error('Members panel not found')

    await waitFor(() => expect(within(membersPanel).getByText('Noor Haddad')).toBeVisible())
    expect(within(membersPanel).queryByRole('link', { name: /^Email / })).not.toBeInTheDocument()
  })
})
