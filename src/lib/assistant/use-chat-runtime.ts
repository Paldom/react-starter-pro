import { useEffect, useRef } from 'react'
import {
  useLocalRuntime,
  type AssistantRuntime,
  type ThreadMessageLike,
} from '@assistant-ui/react'
import { useListChatMessages } from '@/shared/api/generated/chats/chats'
import type { ChatMessage } from '@/shared/api/generated/models'
import { chatModelAdapter } from './chat-model-adapter'

function toThreadMessages(messages: ChatMessage[]): ThreadMessageLike[] {
  return messages.map((message) => ({
    id: message.id,
    role: message.role,
    content: [{ type: 'text' as const, text: message.content }],
  }))
}

/**
 * Creates an AssistantRuntime powered by the custom ChatModelAdapter.
 * The adapter is a module-level singleton so React sees a stable reference.
 *
 * When `activeChatId` is set, the chat's persisted history is fetched and the
 * thread is reset with it; when it becomes null the thread is cleared.
 * Race guard: react-query keys the fetch by chat id, so a stale in-flight
 * response for a previously selected chat never reaches this hook (the
 * equivalent of a cancelled flag around a raw fetch). `hydratedChatIdRef`
 * ensures each chat is hydrated once per selection, so background refetches
 * don't wipe messages streamed during the session.
 */
export function useChatRuntime(activeChatId: string | null): AssistantRuntime {
  const runtime = useLocalRuntime(chatModelAdapter)

  const messagesQuery = useListChatMessages(activeChatId ?? '', {
    query: { enabled: !!activeChatId },
  })
  const history = messagesQuery.data?.data

  const hydratedChatIdRef = useRef<string | null>(null)

  useEffect(() => {
    let apply: (() => void) | undefined
    if (!activeChatId) {
      // Skip the initial mount (nothing to clear); only reset when a chat
      // was previously hydrated and the selection is cleared.
      if (hydratedChatIdRef.current !== null) {
        apply = () => {
          hydratedChatIdRef.current = null
          runtime.thread.reset()
        }
      }
    } else if (history && hydratedChatIdRef.current !== activeChatId) {
      apply = () => {
        hydratedChatIdRef.current = activeChatId
        runtime.thread.reset(toThreadMessages(history))
      }
    }
    if (!apply) return

    // The main thread initializes asynchronously; calling reset on the
    // placeholder throws. Defer until it is ready — the unsubscribe cleanup
    // acts as the cancelled flag if the selection changes meanwhile.
    if (!runtime.thread.getState().isLoading) {
      apply()
      return
    }
    const unsubscribe = runtime.thread.subscribe(() => {
      if (runtime.thread.getState().isLoading) return
      unsubscribe()
      apply?.()
      apply = undefined
    })
    return unsubscribe
  }, [activeChatId, history, runtime])

  return runtime
}
