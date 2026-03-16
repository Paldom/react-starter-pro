/** Events streamed from the backend as NDJSON lines. */
export type ChatStreamEvent =
  | { type: 'text-delta'; delta: string }
  | { type: 'tool-call-begin'; tool_call_id: string; tool_name: string }
  | { type: 'tool-call-delta'; tool_call_id: string; args_delta: string }
  | { type: 'done'; finish_reason: 'stop' | 'length' | 'error' }
  | { type: 'error'; message: string; code?: string }

/** Request body sent to POST /api/chat/stream. */
export type ChatStreamRequest = {
  thread_id: string | undefined
  messages: ChatStreamMessage[]
  run_config?: Record<string, unknown>
}

/** Simplified message shape for the wire protocol (v1: text only). */
export type ChatStreamMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}
