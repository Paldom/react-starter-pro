import { afterEach, describe, expect, it, vi } from 'vitest'
import type {
  LangChainMessage,
  LangGraphStreamCallback,
} from '@assistant-ui/react-langgraph'

const { runtimeRef, useLangGraphRuntimeMock } = vi.hoisted(() => {
  const runtimeRef: {
    current: LangGraphStreamCallback<LangChainMessage> | null
  } = { current: null }
  const useLangGraphRuntimeMock = vi.fn(
    (options: { stream: LangGraphStreamCallback<LangChainMessage> }) => {
      runtimeRef.current = options.stream
      return options
    }
  )
  return { runtimeRef, useLangGraphRuntimeMock }
})

vi.mock('@assistant-ui/react-langgraph', () => ({
  useLangGraphRuntime: useLangGraphRuntimeMock,
}))

import { useAppRuntime } from './langgraph-runtime'

const originalEnv = {
  VITE_BACKEND_API_URL: process.env.VITE_LANGGRAPH_API_URL,
}

function resetEnv() {
  if (originalEnv.VITE_BACKEND_API_URL) {
    process.env.VITE_BACKEND_API_URL = originalEnv.VITE_BACKEND_API_URL
  } else {
    delete process.env.VITE_BACKEND_API_URL
  }
}

afterEach(() => {
  resetEnv()
  useLangGraphRuntimeMock.mockClear()
  runtimeRef.current = null
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe('langgraph runtime', () => {
  it('streams partial and complete messages from the mock stream', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-01-01T00:00:00Z'))
    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0.123456)
      .mockReturnValueOnce(0.654321)
      .mockReturnValue(0)

    useAppRuntime()
    const stream = runtimeRef.current
    expect(stream).toBeTruthy()

    const abortController = new AbortController()
    const initialize = vi
      .fn()
      .mockResolvedValue({ remoteId: 'remote', externalId: undefined })

    const events: Array<{
      event: string
      data: Array<{ id: string; content: string }>
    }> = []
    const consume = (async () => {
      const generator = await Promise.resolve(
        stream!([], {
          abortSignal: abortController.signal,
          initialize,
        } as Parameters<LangGraphStreamCallback<LangChainMessage>>[1])
      )
      for await (const event of generator) {
        events.push(
          event as {
            event: string
            data: Array<{ id: string; content: string }>
          }
        )
      }
    })()

    await vi.runAllTimersAsync()
    await consume

    expect(initialize).toHaveBeenCalled()
    expect(events.length).toBeGreaterThan(1)
    expect(events[0].event).toBe('messages/partial')

    const firstPartial = events.find(
      (event) => event.event === 'messages/partial'
    )
    expect(firstPartial?.data[0].content.length).toBeGreaterThan(0)

    const finalEvent = events[events.length - 1]
    expect(finalEvent.event).toBe('messages/complete')
    expect(finalEvent.data[0].content).toBe(
      "I understand you're looking for help. Let me assist you with that."
    )
    expect(finalEvent.data[0].id).toMatch(/^msg-\d{13}-[a-z0-9]{7}$/)
  })

  it('uses the random response index and per-character delay', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-01-01T00:00:00Z'))
    const timeoutSpy = vi.spyOn(globalThis, 'setTimeout')
    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0.9)
      .mockReturnValueOnce(0.123456)
      .mockReturnValue(1)

    useAppRuntime()
    const stream = runtimeRef.current
    expect(stream).toBeTruthy()

    const events: Array<{
      event: string
      data: Array<{ id: string; content: string }>
    }> = []
    const consume = (async () => {
      const generator = await Promise.resolve(
        stream!([], {
          abortSignal: new AbortController().signal,
          initialize: vi
            .fn()
            .mockResolvedValue({ remoteId: 'remote', externalId: undefined }),
        } as Parameters<LangGraphStreamCallback<LangChainMessage>>[1])
      )
      for await (const event of generator) {
        events.push(
          event as {
            event: string
            data: Array<{ id: string; content: string }>
          }
        )
      }
    })()

    await vi.runAllTimersAsync()
    await consume

    const finalEvent = events[events.length - 1]
    expect(finalEvent.data[0].content).toBe(
      'Let me think about this for a moment... I have some ideas that might help.'
    )
    expect(timeoutSpy.mock.calls.some((call) => call[1] === 100)).toBe(true)
    expect(timeoutSpy.mock.calls.some((call) => call[1] === 50)).toBe(true)
  })

  it('aborts the stream without yielding messages', async () => {
    vi.useFakeTimers()
    vi.spyOn(Math, 'random').mockReturnValue(0)

    useAppRuntime()
    const stream = runtimeRef.current
    expect(stream).toBeTruthy()

    const abortController = new AbortController()
    abortController.abort()

    const events: Array<{ event: string }> = []
    const consume = (async () => {
      const generator = await Promise.resolve(
        stream!([], {
          abortSignal: abortController.signal,
          initialize: vi
            .fn()
            .mockResolvedValue({ remoteId: 'remote', externalId: undefined }),
        } as Parameters<LangGraphStreamCallback<LangChainMessage>>[1])
      )
      for await (const event of generator) {
        events.push(event as { event: string })
      }
    })()

    await vi.runAllTimersAsync()
    await consume

    expect(events).toHaveLength(0)
  })

  it('stops streaming when aborted mid-response', async () => {
    vi.useFakeTimers()
    vi.spyOn(Math, 'random').mockReturnValue(0)

    useAppRuntime()
    const stream = runtimeRef.current
    expect(stream).toBeTruthy()

    const abortController = new AbortController()
    const events: Array<{ event: string }> = []

    const consume = (async () => {
      const iterator = await Promise.resolve(
        stream!([], {
          abortSignal: abortController.signal,
          initialize: vi
            .fn()
            .mockResolvedValue({ remoteId: 'remote', externalId: undefined }),
        } as Parameters<LangGraphStreamCallback<LangChainMessage>>[1])
      )
      for await (const event of iterator) {
        const typedEvent = event as { event: string }
        events.push(typedEvent)
        if (typedEvent.event === 'messages/partial') {
          abortController.abort()
        }
      }
    })()

    await vi.runAllTimersAsync()
    await consume

    expect(events.some((event) => event.event === 'messages/complete')).toBe(
      false
    )
  })

  it('uses real stream calling the backend when env is configured', async () => {
    delete process.env.VITE_BACKEND_API_URL

    useAppRuntime()
    const streamWithoutEnv = runtimeRef.current

    process.env.VITE_LANGGRAPH_API_URL = 'https://example.com/api'

    const mockResponse = {
      id: 42,
      text: 'Hello from the backend!',
      chat_session_id: 1,
    }
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    )

    useAppRuntime()
    const streamWithEnv = runtimeRef.current

    expect(streamWithoutEnv).toBeTruthy()
    expect(streamWithEnv).toBeTruthy()
    expect(streamWithEnv).not.toBe(streamWithoutEnv)

    const events: Array<{
      event: string
      data: Array<{ id: string; content: string }>
    }> = []
    const generator = await Promise.resolve(
      streamWithEnv!(
        [{ type: 'human', content: 'Hello' } as LangChainMessage],
        {
          abortSignal: new AbortController().signal,
          initialize: vi
            .fn()
            .mockResolvedValue({ remoteId: 'remote', externalId: undefined }),
        } as Parameters<LangGraphStreamCallback<LangChainMessage>>[1]
      )
    )
    for await (const event of generator) {
      events.push(
        event as { event: string; data: Array<{ id: string; content: string }> }
      )
    }

    expect(fetch).toHaveBeenCalledWith(
      'https://example.com/api/chat',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    )
    expect(events).toHaveLength(1)
    expect(events[0].event).toBe('messages/complete')
    expect(events[0].data[0].content).toBe('Hello from the backend!')
    expect(events[0].data[0].id).toBe('msg-42')
  })
})
