import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createMemoryHistory, createRouter } from '@tanstack/react-router'
import { render } from '@testing-library/react'
import { routeTree } from '~/route-tree.gen'

/**
 * Mounts the real route tree at a path, with a query client that fails fast.
 * Tests drive the app the way a person does — through the URL and the DOM.
 * See docs/conventions/testing.md.
 */
const renderRoute = (initialPath: string) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
  })
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [initialPath] }),
  })

  const result = render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  )

  return { ...result, router, queryClient }
}

export { renderRoute }
