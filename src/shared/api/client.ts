import axios, { type AxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 10000,
})

instance.interceptors.request.use((config) => {
  // Only access localStorage on the client side
  if (globalThis.window !== undefined) {
    const token = globalThis.localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

/**
 * Custom Orval mutator.
 * Orval-generated response types wrap in { data, status, headers }.
 * We match that shape so TypeScript types align with runtime values.
 */
export const customInstance = <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  return instance
    .request({
      url,
      method: options?.method,
      data: options?.body,
      headers: options?.headers as AxiosRequestConfig['headers'],
      signal: options?.signal as AxiosRequestConfig['signal'],
    })
    .then(
      (response) =>
        ({
          data: response.data as unknown,
          status: response.status,
          headers: response.headers,
        }) as T
    )
}
