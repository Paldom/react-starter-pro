import { describe, expect, it } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import {
  AssistantRuntimeProvider,
  type AssistantRuntime,
} from '@assistant-ui/react'
import { delay, http, HttpResponse } from 'msw'
import { server } from '@/mocks/server'
import { createTestQueryClient } from '@/test/utils'
import type { ChatMessage } from '@/shared/api/generated/models'
import { useChatRuntime } from './use-chat-runtime'

const chatAMessages: ChatMessage[] = [
  {
    id: 'msg-a1',
    role: 'user',
    content: 'Question from chat A',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'msg-a2',
    role: 'assistant',
    content: 'Answer from chat A',
    createdAt: '2024-01-15T10:01:00Z',
  },
]

const chatBMessages: ChatMessage[] = [
  {
    id: 'msg-b1',
    role: 'user',
    content: 'Question from chat B',
    createdAt: '2024-02-01T09:00:00Z',
  },
  {
    id: 'msg-b2',
    role: 'assistant',
    content: 'Answer from chat B',
    createdAt: '2024-02-01T09:01:00Z',
  },
]

/**
 * Probe rendered inside AssistantRuntimeProvider: assistant-ui 0.14 only
 * initializes the main thread once the provider mounts the runtime's
 * internal render component, so a bare renderHook never becomes ready.
 */
function renderRuntime(initialChatId: string | null) {
  const queryClient = createTestQueryClient()
  const captured: { current: AssistantRuntime | null } = { current: null }

  function Probe({ chatId }: Readonly<{ chatId: string | null }>) {
    const runtime = useChatRuntime(chatId)
    captured.current = runtime
    return (
      <AssistantRuntimeProvider runtime={runtime}>
        {null}
      </AssistantRuntimeProvider>
    )
  }

  const view = render(
    <QueryClientProvider client={queryClient}>
      <Probe chatId={initialChatId} />
    </QueryClientProvider>
  )
  return {
    runtime: captured,
    setChatId: (chatId: string | null) => {
      view.rerender(
        <QueryClientProvider client={queryClient}>
          <Probe chatId={chatId} />
        </QueryClientProvider>
      )
    },
  }
}

function getThreadTexts(runtime: AssistantRuntime | null): string[] {
  if (!runtime) return []
  return runtime.thread
    .getState()
    .messages.flatMap((message) =>
      message.content.filter((part) => part.type === 'text')
    )
    .map((part) => part.text)
}

describe('useChatRuntime', () => {
  it('returns a truthy runtime without an active chat', () => {
    const { runtime } = renderRuntime(null)
    expect(runtime.current).toBeTruthy()
    expect(runtime.current?.thread.getState().messages).toHaveLength(0)
  })

  it('hydrates the thread with the fetched chat history', async () => {
    server.use(
      http.get('*/api/chats/chat-a/messages', () =>
        HttpResponse.json(chatAMessages)
      )
    )

    const { runtime } = renderRuntime('chat-a')

    await waitFor(() => {
      expect(runtime.current?.thread.getState().messages).toHaveLength(2)
    })
    expect(getThreadTexts(runtime.current)).toEqual([
      'Question from chat A',
      'Answer from chat A',
    ])
    const messages = runtime.current?.thread.getState().messages ?? []
    expect(messages[0]?.role).toBe('user')
    expect(messages[1]?.role).toBe('assistant')
  })

  it('does not apply stale results when switching chats mid-fetch', async () => {
    server.use(
      http.get('*/api/chats/chat-a/messages', async () => {
        await delay(150)
        return HttpResponse.json(chatAMessages)
      }),
      http.get('*/api/chats/chat-b/messages', () =>
        HttpResponse.json(chatBMessages)
      )
    )

    const { runtime, setChatId } = renderRuntime('chat-a')

    // Switch to chat B while chat A's fetch is still in flight.
    setChatId('chat-b')

    await waitFor(() => {
      expect(getThreadTexts(runtime.current)).toEqual([
        'Question from chat B',
        'Answer from chat B',
      ])
    })

    // Let chat A's delayed response settle; it must not overwrite the thread.
    await new Promise((resolve) => setTimeout(resolve, 200))
    expect(getThreadTexts(runtime.current)).toEqual([
      'Question from chat B',
      'Answer from chat B',
    ])
  })

  it('clears the thread when the active chat is deselected', async () => {
    server.use(
      http.get('*/api/chats/chat-a/messages', () =>
        HttpResponse.json(chatAMessages)
      )
    )

    const { runtime, setChatId } = renderRuntime('chat-a')

    await waitFor(() => {
      expect(runtime.current?.thread.getState().messages).toHaveLength(2)
    })

    setChatId(null)

    await waitFor(() => {
      expect(runtime.current?.thread.getState().messages).toHaveLength(0)
    })
  })
})
