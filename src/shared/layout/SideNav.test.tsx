import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { SideNav } from './SideNav'
import { useUIStore } from '@/shared/store/ui'

function renderWithRouter(ui: React.ReactElement, { initialEntries = ['/'] } = {}) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>
  )
}

describe('SideNav', () => {
  it('renders navigation links when expanded', () => {
    useUIStore.setState({ sidebarCollapsed: false })
    renderWithRouter(<SideNav />)

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('highlights active route', () => {
    useUIStore.setState({ sidebarCollapsed: false })
    renderWithRouter(<SideNav />, { initialEntries: ['/'] })

    const dashboardLink = screen.getByRole('link', { name: /dashboard/i })
    expect(dashboardLink).toHaveAttribute('aria-current', 'page')
  })

  it('hides labels when collapsed', () => {
    useUIStore.setState({ sidebarCollapsed: true })
    renderWithRouter(<SideNav />)

    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument()
    expect(screen.queryByText('Settings')).not.toBeInTheDocument()
  })

  it('highlights settings route when active', () => {
    useUIStore.setState({ sidebarCollapsed: false })
    renderWithRouter(<SideNav />, { initialEntries: ['/settings'] })

    const settingsLink = screen.getByRole('link', { name: /settings/i })
    expect(settingsLink).toHaveAttribute('aria-current', 'page')
  })
})