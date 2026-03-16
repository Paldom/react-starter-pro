/**
 * Yields parsed JSON objects from an NDJSON ReadableStream.
 * Handles lines split across chunk boundaries, skips blank lines,
 * and logs malformed lines without crashing.
 */
export async function* parseNDJSON<T>(
  stream: ReadableStream<Uint8Array>,
  signal?: AbortSignal,
): AsyncGenerator<T, void, undefined> {
  const reader = stream.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  try {
    while (true) {
      if (signal?.aborted) return

      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop()!

      for (const line of lines) {
        const trimmed = line.trim()
        if (trimmed === '') continue
        try {
          yield JSON.parse(trimmed) as T
        } catch {
          console.warn('[ndjson] malformed line:', trimmed)
        }
      }
    }

    // Flush remaining buffer
    const trimmed = buffer.trim()
    if (trimmed !== '') {
      try {
        yield JSON.parse(trimmed) as T
      } catch {
        console.warn('[ndjson] malformed final line:', trimmed)
      }
    }
  } finally {
    reader.releaseLock()
  }
}
