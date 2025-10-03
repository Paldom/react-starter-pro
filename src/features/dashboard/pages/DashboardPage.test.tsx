import { describe, expect, it } from 'vitest'
import { act, render, screen, waitFor, within } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DashboardPage } from './DashboardPage'
import i18n from 'i18next'

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('DashboardPage', () => {
  it('shows loading state initially', () => {
    render(<DashboardPage />, { wrapper: createWrapper() })
    expect(screen.getByText('Loading dashboard data...')).toBeInTheDocument()
  })

  it('displays dashboard data after loading', async () => {
    render(<DashboardPage />, { wrapper: createWrapper() })

    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
    })

    expect(screen.getByText('$125,000.00')).toBeInTheDocument()
    expect(screen.getByText('1,234')).toBeInTheDocument()
    expect(screen.getByText('5,678')).toBeInTheDocument()
    expect(screen.getByText('2,345')).toBeInTheDocument()
  })

  it('formats values using the active locale', async () => {
    const enResources = i18n.getResourceBundle('en', 'common') as Record<string, unknown>
    if (!i18n.hasResourceBundle('hu', 'common')) {
      i18n.addResourceBundle('hu', 'common', enResources, true, true)
    }

    await act(async () => {
      await i18n.changeLanguage('hu')
    })

    expect(i18n.resolvedLanguage).toBe('hu')

    try {
      render(<DashboardPage />, { wrapper: createWrapper() })

      await waitFor(() => {
        expect(screen.getByText('Dashboard')).toBeInTheDocument()
      })

      expect(
        screen.getByText(/125(?:\s|\u00A0)000,00(?:\s|\u00A0)USD/)
      ).toBeInTheDocument()

      const subscriptionsCard = screen
        .getByText('Subscriptions')
        .closest('div')
      expect(subscriptionsCard).not.toBeNull()
      if (subscriptionsCard) {
        expect(within(subscriptionsCard).getByText('1234')).toBeInTheDocument()
        expect(
          within(subscriptionsCard).queryByText('1,234')
        ).not.toBeInTheDocument()
      }
    } finally {
      await act(async () => {
        await i18n.changeLanguage('en')
      })
    }
  })

  it('displays monthly overview chart', async () => {
    render(<DashboardPage />, { wrapper: createWrapper() })

    await waitFor(() => {
      expect(screen.getByText('Monthly Overview')).toBeInTheDocument()
    })

    expect(screen.getByText('Jan')).toBeInTheDocument()
    expect(screen.getByText('4,000')).toBeInTheDocument()
  })

  it('displays welcome message', async () => {
    render(<DashboardPage />, { wrapper: createWrapper() })

    await waitFor(() => {
      expect(
        screen.getByText('Welcome back! Here is your overview.')
      ).toBeInTheDocument()
    })
  })
})