import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Header } from './Header'
import { useUIStore } from '@/shared/store/ui'

describe('Header', () => {
  it('renders header with title', () => {
    render(<Header />)
    expect(screen.getByText('React Advanced App')).toBeInTheDocument()
  })

  it('renders user information', () => {
    render(<Header />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('toggles sidebar when menu button is clicked', async () => {
    const user = userEvent.setup()
    const initialState = useUIStore.getState().sidebarCollapsed

    render(<Header />)
    const menuButton = screen.getByRole('button', {
      name: /toggle sidebar/i,
    })

    await user.click(menuButton)

    expect(useUIStore.getState().sidebarCollapsed).toBe(!initialState)
  })

  it('has accessible menu button', () => {
    render(<Header />)
    const menuButton = screen.getByRole('button', {
      name: /toggle sidebar/i,
    })
    expect(menuButton).toBeInTheDocument()
  })
})