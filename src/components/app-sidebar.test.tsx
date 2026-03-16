import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { AppSidebar } from './app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { resetUIStore } from '@/test/utils'
import { useUIStore } from '@/shared/store/ui'

function renderSidebar() {
  return render(
    <MemoryRouter>
      <SidebarProvider defaultOpen>
        <AppSidebar />
      </SidebarProvider>
    </MemoryRouter>
  )
}

describe('AppSidebar', () => {
  beforeEach(() => {
    resetUIStore()
  })

  it('renders app info, projects, and can add project/search', async () => {
    const user = userEvent.setup()
    renderSidebar()

    expect(screen.getByText('React Starter Pro')).toBeInTheDocument()
    expect(screen.getByText('Enterprise')).toBeInTheDocument()
    expect(screen.getByText('Work')).toBeInTheDocument()

    const activeChat = screen.getByRole('button', {
      name: /q1 metrics summary/i,
    })
    expect(activeChat).toHaveAttribute('data-active', 'true')

    await user.click(screen.getByRole('button', { name: /add project/i }))
    expect(screen.getByText('New project')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /search chats/i }))
    expect(useUIStore.getState().searchDialogOpen).toBe(true)
  })

  it('opens settings from the user menu', async () => {
    const user = userEvent.setup()
    renderSidebar()

    await user.click(screen.getByRole('button', { name: /alex johnson/i }))
    await user.click(await screen.findByText('Settings'))

    expect(useUIStore.getState().settingsDialogOpen).toBe(true)
  })

  it('edits and removes a project via the menu actions', async () => {
    const user = userEvent.setup()
    const { container } = renderSidebar()

    const triggers = container.querySelectorAll(
      '[data-slot="dropdown-menu-trigger"]'
    )
    await user.click(triggers[0])
    await user.click(screen.getByText('Edit name'))

    const input = screen.getByRole('textbox')
    await user.clear(input)
    await user.type(input, 'Renamed{enter}')
    expect(screen.getByText('Renamed')).toBeInTheDocument()

    const updatedTriggers = container.querySelectorAll(
      '[data-slot="dropdown-menu-trigger"]'
    )
    await user.click(updatedTriggers[0])
    await user.click(screen.getByText('Remove'))

    expect(screen.queryByText('Renamed')).not.toBeInTheDocument()
  })

  it('disables project removal when only one project exists', async () => {
    const user = userEvent.setup()
    const projects = useUIStore.getState().projects.slice(0, 1)
    useUIStore.setState({
      projects,
      activeProjectId: projects[0]?.id ?? null,
      activeChatId: projects[0]?.chats[0]?.id ?? null,
    })

    const { container } = renderSidebar()
    const triggers = container.querySelectorAll(
      '[data-slot="dropdown-menu-trigger"]'
    )
    await user.click(triggers[0])

    const removeItem = screen.getByText('Remove')
    expect(removeItem.closest('[data-disabled]')).toBeTruthy()
  })
})
