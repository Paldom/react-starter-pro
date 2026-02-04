import {
  useLangGraphRuntime as useAssistantLangGraphRuntime,
  type LangChainMessage,
  type LangGraphStreamCallback,
  type LangGraphMessagesEvent,
  type LangGraphSendMessageConfig,
} from '@assistant-ui/react-langgraph'

const MOCK_RESPONSES = [
  "I understand you're looking for help. Let me assist you with that.",
  "That's a great question! Here's what I can tell you about it.",
  "I'd be happy to help you with this task. Let me break it down for you.",
  "Based on your input, here are some suggestions I can provide.",
  "Let me think about this for a moment... I have some ideas that might help.",
]

function getRandomResponse(): string {
  return MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)]
}

function generateId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

// Mock stream function that simulates LangGraph streaming
const createMockStream: LangGraphStreamCallback<LangChainMessage> = async function* (
  _messages: LangChainMessage[],
  config: LangGraphSendMessageConfig & {
    abortSignal: AbortSignal
    initialize: () => Promise<{ remoteId: string; externalId: string | undefined }>
  }
): AsyncGenerator<LangGraphMessagesEvent<LangChainMessage>> {
  const { abortSignal, initialize } = config

  // Initialize the stream
  await initialize()

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  if (abortSignal.aborted) return

  const responseText = getRandomResponse()
  const assistantMessageId = generateId()
  let accumulatedText = ''

  // Simulate streaming response character by character
  for (const char of responseText) {
    if (abortSignal.aborted) return

    await new Promise((resolve) => setTimeout(resolve, 30 + Math.random() * 20))

    if (abortSignal.aborted) return

    accumulatedText += char

    // Yield the message update event
    yield {
      event: 'messages/partial' as const,
      data: [
        {
          id: assistantMessageId,
          type: 'ai' as const,
          content: accumulatedText,
        },
      ],
    }
  }

  // Yield final complete message
  yield {
    event: 'messages/complete' as const,
    data: [
      {
        id: assistantMessageId,
        type: 'ai' as const,
        content: accumulatedText,
      },
    ],
  }
}

const mockStreamWrapper: LangGraphStreamCallback<LangChainMessage> =
  async function* (...args) {
    const generator = await Promise.resolve(createMockStream(...args))
    yield* generator
  }

// Hook that returns the appropriate runtime based on environment
export function useAppLangGraphRuntime() {
  const processEnv = typeof process === 'undefined' ? undefined : process.env
  const apiUrl =
    (import.meta.env.VITE_LANGGRAPH_API_URL as string | undefined) ??
    processEnv?.VITE_LANGGRAPH_API_URL
  const assistantId =
    (import.meta.env.VITE_LANGGRAPH_ASSISTANT_ID as string | undefined) ??
    processEnv?.VITE_LANGGRAPH_ASSISTANT_ID

  // If API URL and assistant ID are configured, use real LangGraph
  // Otherwise, use mock stream
  const stream: LangGraphStreamCallback<LangChainMessage> =
    apiUrl && assistantId
      ? createRealStream(apiUrl, assistantId)
      : createMockStream

  return useAssistantLangGraphRuntime({
    stream,
  })
}

// Placeholder for real LangGraph stream implementation
function createRealStream(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _apiUrl: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _assistantId: string
): LangGraphStreamCallback<LangChainMessage> {
  // Placeholder for real LangGraph stream when the backend is ready.
  // For now, wrap the mock stream to keep a distinct reference for tests.
  return mockStreamWrapper
}
