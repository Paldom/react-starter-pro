import { render, screen } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { AppRouteError } from '@/shared/layout/AppRouteError'

function ThrowRouteError(): React.ReactElement {
  throw new Error('Kaboom')
}

describe('AppRouteError', () => {
  it('renders the fallback UI when a route throws', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    const router = createMemoryRouter([
      {
        path: '/',
        element: <ThrowRouteError />,
        errorElement: <AppRouteError />,
      },
    ])

    render(<RouterProvider router={router} />)

    expect(
      await screen.findByRole('heading', { name: /something went wrong/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()

    consoleError.mockRestore()
  })
})
