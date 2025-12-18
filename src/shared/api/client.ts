import axios, { type AxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  timeout: 10000,
})

instance.interceptors.request.use((config) => {
  // Only access localStorage on the client side
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  return instance.request<T>(config).then(({ data }) => data)
}