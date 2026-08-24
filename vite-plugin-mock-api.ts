import type { RequestHandler } from 'msw'
import type { Plugin, ViteDevServer } from 'vite'

const HANDLERS_MODULE = '/src/mocks/handlers.ts'

type ExpressLikeRequest = {
  headers: Record<string, string | string[] | undefined>
  protocol?: string
  get?: (name: string) => string | undefined
  header?: (name: string) => string | undefined
}

/** The middleware is written against Express; connect gives us less than that. */
const addExpressAccessors = (request: ExpressLikeRequest) => {
  const readHeader = (name: string) => {
    const value = request.headers[name.toLowerCase()]
    return Array.isArray(value) ? value[0] : value
  }
  request.protocol ??= 'http'
  request.get ??= readHeader
  request.header ??= readHeader
}

/**
 * Serves `src/mocks/handlers.ts` over HTTP while vite is running. There is no
 * backend: the same handlers answer the browser here and the test suite through
 * `msw/node`.
 */
const mockApiPlugin = (): Plugin => {
  const attach = async (server: ViteDevServer) => {
    // Imported lazily: the middleware pulls in express, which must not be
    // loaded when this config is read by the test runner.
    const { createMiddleware } = await import('@mswjs/http-middleware')
    const module = await server.ssrLoadModule(HANDLERS_MODULE)
    const middleware = createMiddleware(...(module.handlers as RequestHandler[]))

    server.middlewares.use((request, response, next) => {
      if (!request.url?.startsWith('/api/')) return next()
      addExpressAccessors(request as unknown as ExpressLikeRequest)
      return middleware(request, response, next)
    })
  }

  return {
    name: 'upticked:mock-api',
    // Only while a server is actually serving the app. The test suite mounts
    // the same handlers itself, through `msw/node`.
    apply: (_config, environment) => environment.command === 'serve' && !process.env.VITEST,
    configureServer: attach,
    configurePreviewServer: attach as unknown as Plugin['configurePreviewServer'],
  }
}

export { mockApiPlugin }
