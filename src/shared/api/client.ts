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

export const customInstance = <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  return instance
    .request<T>({
      url,
      method: options?.method as AxiosRequestConfig['method'],
      data: options?.body,
      headers: options?.headers as AxiosRequestConfig['headers'],
      signal: options?.signal as AxiosRequestConfig['signal'],
    })
    .then(({ data }) => data)
}
