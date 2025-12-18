// @ts-nocheck
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import { SideNav } from './SideNav'
import { useUIStore } from '@/shared/store/ui'

const mockUsePathname = vi.mocked(usePathname)

describe('SideNav', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/')
  })

  afterEach(() => {
    mockUsePathname.mockReset()
  })

  it('renders navigation links when expanded', () => {
    useUIStore.setState({ sidebarCollapsed: false })
    render(<SideNav />)

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('highlights active route', () => {
    useUIStore.setState({ sidebarCollapsed: false })
    mockUsePathname.mockReturnValue('/')
    render(<SideNav />)

    const dashboardLink = screen.getByRole('link', { name: /dashboard/i })
    expect(dashboardLink).toHaveAttribute('aria-current', 'page')
  })

  it('hides labels when collapsed', () => {
    useUIStore.setState({ sidebarCollapsed: true })
    render(<SideNav />)

    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument()
    expect(screen.queryByText('Settings')).not.toBeInTheDocument()
  })

  it('highlights settings route when active', () => {
    useUIStore.setState({ sidebarCollapsed: false })
    mockUsePathname.mockReturnValue('/settings')
    render(<SideNav />)

    const settingsLink = screen.getByRole('link', { name: /settings/i })
    expect(settingsLink).toHaveAttribute('aria-current', 'page')
  })
})
