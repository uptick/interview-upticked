import { setupServer } from 'msw/node'
import { handlers } from '~/mocks/handlers'

const mockServer = setupServer(...handlers)

export { mockServer }
