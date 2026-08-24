const API_ROOT = '/api'

class ApiError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

type RequestOptions = {
  /**
   * Sparse fieldset. The API only serialises the fields asked for, so requests
   * stay narrow and no unrequested field can leak into a response.
   * See docs/conventions/permissions-and-fieldsets.md.
   */
  fields?: readonly string[]
  searchParams?: Record<string, string | undefined>
}

const buildUrl = (path: string, options: RequestOptions = {}) => {
  const url = new URL(`${API_ROOT}${path}`, window.location.origin)
  if (options.fields?.length) {
    url.searchParams.set('fields', options.fields.join(','))
  }
  for (const [name, value] of Object.entries(options.searchParams ?? {})) {
    if (value !== undefined && value !== '') url.searchParams.set(name, value)
  }
  return url
}

const fetchJson = async <TResponse>(path: string, options: RequestOptions = {}) => {
  const response = await fetch(buildUrl(path, options), {
    headers: { Accept: 'application/json' },
  })
  if (!response.ok) {
    throw new ApiError(response.status, `Request to ${path} failed with ${response.status}`)
  }
  return (await response.json()) as TResponse
}

export { ApiError, buildUrl, fetchJson }
export type { RequestOptions }
