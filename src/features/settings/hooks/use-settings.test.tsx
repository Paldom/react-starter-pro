import { type ReactNode } from 'react'
import { describe, expect, it } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useUserSettingsQuery, useUpdateUserSettingsMutation } from './use-settings'

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('useUserSettingsQuery', () => {
  it('fetches user settings successfully', async () => {
    const { result } = renderHook(() => useUserSettingsQuery(), {
      wrapper: createWrapper(),
    })

    expect(result.current.isPending).toBe(true)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual({
      name: 'John Doe',
      email: 'john@example.com',
      notifications: true,
    })
  })
})

describe('useUpdateUserSettingsMutation', () => {
  it('updates user settings successfully', async () => {
    const { result } = renderHook(() => useUpdateUserSettingsMutation(), {
      wrapper: createWrapper(),
    })

    const newSettings = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      notifications: false,
    }

    result.current.mutate(newSettings)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual(newSettings)
  })
})