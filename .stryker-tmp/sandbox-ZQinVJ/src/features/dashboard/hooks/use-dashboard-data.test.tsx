// @ts-nocheck
import { type ReactNode } from 'react'
import { describe, expect, it } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useDashboardStatsQuery, useDashboardChartQuery } from './use-dashboard-data'

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('useDashboardStatsQuery', () => {
  it('fetches dashboard stats successfully', async () => {
    const { result } = renderHook(() => useDashboardStatsQuery(), {
      wrapper: createWrapper(),
    })

    expect(result.current.isPending).toBe(true)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual({
      totalRevenue: 125000,
      subscriptions: 1234,
      sales: 5678,
      activeUsers: 2345,
    })
  })
})

describe('useDashboardChartQuery', () => {
  it('fetches dashboard chart data successfully', async () => {
    const { result } = renderHook(() => useDashboardChartQuery(), {
      wrapper: createWrapper(),
    })

    expect(result.current.isPending).toBe(true)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual([
      { name: 'Jan', value: 4000 },
      { name: 'Feb', value: 3000 },
      { name: 'Mar', value: 5000 },
      { name: 'Apr', value: 4500 },
      { name: 'May', value: 6000 },
      { name: 'Jun', value: 5500 },
    ])
  })
})