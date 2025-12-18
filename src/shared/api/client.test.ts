import { beforeEach, describe, expect, it, vi } from 'vitest'

interface AxiosConfig {
  headers: Record<string, string | undefined>
  [key: string]: unknown
}

const { requestMock, interceptorRef } = vi.hoisted(() => ({
  requestMock: vi.fn(),
  interceptorRef: { current: undefined as ((config: AxiosConfig) => AxiosConfig) | undefined },
}))

vi.mock('axios', () => {
  const create = vi.fn(() => {
    const interceptors = {
      request: {
        use: (handler: (config: AxiosConfig) => AxiosConfig) => {
          interceptorRef.current = handler
          return handler
        },
      },
      response: {},
    }

    return {
      defaults: {},
      interceptors,
      request: requestMock,
    }
  })

  const axios = { create }

  return {
    __esModule: true,
    default: axios,
    create,
  }
})

// Import after mocks
import { customInstance } from './client'

describe('shared/api/client', () => {
  beforeEach(() => {
    requestMock.mockResolvedValue({ data: { ok: true } })
    localStorage.clear()
  })

  it('attaches bearer token from localStorage when present', () => {
    localStorage.setItem('authToken', 'token-123')
    const initialConfig: AxiosConfig = { headers: {} }
    const config = interceptorRef.current?.(initialConfig) ?? initialConfig

    expect(config.headers.Authorization).toBe('Bearer token-123')
  })

  it('leaves headers unchanged when no token exists', () => {
    const initialConfig: AxiosConfig = { headers: {} }
    const config = interceptorRef.current?.(initialConfig) ?? initialConfig

    expect(config.headers.Authorization).toBeUndefined()
  })

  it('delegates to the axios instance and returns response data', async () => {
    const response = await customInstance<{ ok: boolean }>({
      url: '/test',
      method: 'get',
    })

    expect(requestMock).toHaveBeenCalledWith({ url: '/test', method: 'get' })
    expect(response).toEqual({ ok: true })
  })
})
