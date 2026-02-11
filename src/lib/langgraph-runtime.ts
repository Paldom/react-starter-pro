import { fetchSSEStream } from './fetch-sse'
import {
  AssistantRuntime,
  ChatModelAdapter,
  ChatModelRunOptions,
  useLocalRuntime,
} from '@assistant-ui/react'

const MOCK_RESPONSES = [
  "I understand you're looking for help. Let me assist you with that.",
  "That's a great question! Here's what I can tell you about it.",
  "I'd be happy to help you with this task. Let me break it down for you.",
  'Based on your input, here are some suggestions I can provide.',
  'Let me think about this for a moment... I have some ideas that might help.',
]

function getRandomResponse(): string {
  return MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)]
}

const mockAdapter: ChatModelAdapter = {
  async *run({ abortSignal }: ChatModelRunOptions) {
    await new Promise((resolve) => setTimeout(resolve, 100))

    if (abortSignal.aborted) return

    const responseText = getRandomResponse()
    let accumulatedText = ''

    for (const char of responseText) {
      if (abortSignal.aborted) return

      await new Promise((resolve) =>
        setTimeout(resolve, 30 + Math.random() * 20)
      )

      accumulatedText += char

      yield {
        content: [{ type: 'text' as const, text: accumulatedText }],
      }
    }
  },
}

function createRealAdapter(apiUrl: string): ChatModelAdapter {
  let chatSessionId: number | null = null

  return {
    async *run({ messages, abortSignal }: ChatModelRunOptions) {
      const lastUserMessage = [...messages]
        .reverse()
        .find((m) => m.role === 'user')

      if (!lastUserMessage) return

      const messageText = lastUserMessage.content
        .filter((c) => c.type === 'text')
        .map((c) => c.text)
        .join('\n')

      let accumulatedContent = ''

      try {
        for await (const event of fetchSSEStream(
          `${apiUrl}/chat/stream`,
          {
            message: messageText,
            chat_session_id: chatSessionId,
          },
          abortSignal
        )) {
          if (event.type === 'text_chunk') {
            accumulatedContent += event.content
            yield {
              content: [{ type: 'text' as const, text: accumulatedContent }],
            }
          } else if (event.type === 'complete') {
            chatSessionId = event.metadata?.chat_session_id ?? chatSessionId
            yield {
              content: [{ type: 'text' as const, text: accumulatedContent }],
              status: { type: 'complete' as const, reason: 'stop' as const },
            }
            accumulatedContent = ''
          } else if (event.type === 'error') {
            throw new Error(event.content)
          }
        }
      } catch (err) {
        if (!(err instanceof Error && err.name === 'AbortError')) {
          throw err
        }
      }
    },
  }
}

// Hook that returns the appropriate runtime based on environment
export function useAppRuntime(): AssistantRuntime {
  const processEnv = typeof process === 'undefined' ? undefined : process.env
  const apiUrl =
    (import.meta.env.VITE_BACKEND_API_URL as string | undefined) ??
    processEnv?.VITE_BACKEND_API_URL

  // If API URL is configured, use real backend
  // Otherwise, use mock stream
  const adapter = apiUrl ? createRealAdapter(apiUrl) : mockAdapter

  return useLocalRuntime(adapter)
}
