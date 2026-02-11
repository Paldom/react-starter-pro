export type SSETextChunkEvent = {
  type: 'text_chunk'
  content: string
  metadata?: {
    id?: string
  }
}

export type SSECompleteEvent = {
  type: 'complete'
  metadata?: {
    chat_session_id?: number
  }
}

export type SSEErrorEvent = {
  type: 'error'
  content: string
}

export type SSEEvent = SSETextChunkEvent | SSECompleteEvent | SSEErrorEvent

export async function* fetchSSEStream(
  url: string,
  body: { message: string; chat_session_id: number | null },
  signal: AbortSignal
): AsyncGenerator<SSEEvent> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal,
  })

  if (!res.ok) throw new Error(`HTTP ${res.status}`)

  const reader = res.body?.getReader()
  if (!reader) throw new Error('No response stream')

  const decoder = new TextDecoder()
  let buffer = ''

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })

      const lines = buffer.split('\n\n')

      buffer = lines.pop() || ''

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const event = JSON.parse(line.slice(6)) as SSEEvent
            yield event
          } catch (err) {
            console.error('Failed to parse SSE event:', err)
          }
        }
      }
    }

    // Handle final data in buffer
    if (buffer && buffer.startsWith('data: ')) {
      try {
        const event = JSON.parse(buffer.slice(6)) as SSEEvent
        yield event
      } catch (err) {
        console.error('Failed to parse final SSE event:', err)
      }
    }
  } finally {
    reader.releaseLock()
  }
}
