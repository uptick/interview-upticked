import type { TranslationKey } from '~/lib/i18n'

/**
 * Every page in the app is declared here. The route file provides the
 * component; the registry provides the title and the navigation entry. A route
 * that is not registered still resolves, but it has no title and never appears
 * in the sidebar. See docs/conventions/routing.md.
 */
type PageDefinition = {
  id: string
  path: string
  titleKey: TranslationKey
  /** Present when the page should appear in the sidebar. */
  navLabelKey?: TranslationKey
}

const pageRegistry: readonly PageDefinition[] = [
  { id: 'lists', path: '/', titleKey: 'lists.heading', navLabelKey: 'nav.lists' },
  { id: 'list-tasks', path: '/lists/$listId/tasks', titleKey: 'tasks.heading' },
]

const navigationPages = pageRegistry.filter(
  (page): page is PageDefinition & { navLabelKey: TranslationKey } => Boolean(page.navLabelKey),
)

const findPage = (id: string) => {
  const page = pageRegistry.find((candidate) => candidate.id === id)
  if (!page) throw new Error(`Page "${id}" is not registered in the page registry`)
  return page
}

export { findPage, navigationPages, pageRegistry }
export type { PageDefinition }
