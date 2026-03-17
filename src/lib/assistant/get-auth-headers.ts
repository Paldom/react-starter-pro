/**
 * Returns headers for the streaming fetch request.
 * Mirrors the auth logic from src/shared/api/client.ts
 * for use with native fetch instead of Axios.
 */
export function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (globalThis.window !== undefined) {
    const token = globalThis.localStorage.getItem('authToken')
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  }
  return headers
}
