import { describe, expect, it } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SettingsPage } from './SettingsPage'
import { http, HttpResponse } from 'msw'
import { server } from '@/mocks/server'

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('SettingsPage', () => {
  it('shows loading state initially', () => {
    render(<SettingsPage />, { wrapper: createWrapper() })
    expect(screen.getByText('Loading settings...')).toBeInTheDocument()
  })

  it('displays settings form after loading', async () => {
    render(<SettingsPage />, { wrapper: createWrapper() })

    await waitFor(() => {
      expect(screen.getByText('Settings')).toBeInTheDocument()
    })

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/enable notifications/i)).toBeInTheDocument()
  })

  it('populates form with existing data', async () => {
    render(<SettingsPage />, { wrapper: createWrapper() })

    await waitFor(() => {
      const nameInput = screen.getByLabelText<HTMLInputElement>(/name/i)
      expect(nameInput.value).toBe('John Doe')
    })

    const emailInput = screen.getByLabelText<HTMLInputElement>(/email/i)
    expect(emailInput.value).toBe('john@example.com')
  })

  it('submits form with updated data', async () => {
    const user = userEvent.setup()
    render(<SettingsPage />, { wrapper: createWrapper() })

    await waitFor(() => {
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    })

    const nameInput = screen.getByLabelText(/name/i)
    await user.clear(nameInput)
    await user.type(nameInput, 'Jane Doe')

    const submitButton = screen.getByRole('button', { name: /save changes/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(
        screen.getByText('Settings updated successfully!')
      ).toBeInTheDocument()
    })
  })

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup()
    render(<SettingsPage />, { wrapper: createWrapper() })

    // Wait for form to load with data
    await waitFor(() => {
      expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument()
    })

    const emailInput = screen.getByLabelText(/email/i)
    await user.clear(emailInput)
    await user.type(emailInput, 'notanemail')

    const submitButton = screen.getByRole('button', { name: /save changes/i })
    await user.click(submitButton)

    // Validation error should appear and prevent submission
    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeInTheDocument()
    })

    // Success message should NOT appear since form didn't submit
    expect(screen.queryByText('Settings updated successfully!')).not.toBeInTheDocument()
  })

  it('disables submit button while saving', async () => {
    const user = userEvent.setup()
    render(<SettingsPage />, { wrapper: createWrapper() })

    await waitFor(() => {
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    })

    const submitButton = screen.getByRole('button', { name: /save changes/i })
    await user.click(submitButton)

    expect(submitButton).toBeDisabled()
  })

  it('shows error alert when update fails', async () => {
    server.use(
      http.put('*/settings', () =>
        HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 })
      )
    )

    const user = userEvent.setup()
    render(<SettingsPage />, { wrapper: createWrapper() })

    await waitFor(() => {
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    })

    const submitButton = screen.getByRole('button', { name: /save changes/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(
        screen.getByText('Failed to update settings. Please try again.')
      ).toBeInTheDocument()
    })

    expect(
      screen.queryByText('Settings updated successfully!')
    ).not.toBeInTheDocument()
  })
})
