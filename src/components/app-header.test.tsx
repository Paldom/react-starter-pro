import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { AppHeader } from './app-header'
import { SidebarProvider } from '@/components/ui/sidebar'
import { resetUIStore } from '@/test/utils'
import { useUIStore } from '@/shared/store/ui'

function renderHeader() {
  return render(
    <MemoryRouter>
      <SidebarProvider defaultOpen>
        <AppHeader />
      </SidebarProvider>
    </MemoryRouter>
  )
}

describe('AppHeader', () => {
  beforeEach(() => {
    resetUIStore()
    vi.stubGlobal('prompt', vi.fn())
    vi.stubGlobal('confirm', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('shows the app title when no active chat is selected', () => {
    resetUIStore({ activeChatId: null })
    renderHeader()

    expect(screen.getByText('Chat App')).toBeInTheDocument()
  })

  it('renames the active chat from the menu action', async () => {
    const user = userEvent.setup()
    const promptMock = vi.mocked(globalThis.prompt)
    promptMock.mockReturnValue('Updated title')

    renderHeader()

    await user.click(screen.getByRole('button', { name: /open menu/i }))
    await user.click(screen.getByText('Rename'))

    expect(promptMock).toHaveBeenCalledWith('Rename', 'Q1 metrics summary')

    const updatedChat = useUIStore
      .getState()
      .projects[0].chats.find((chat) => chat.id === 'c4')
    expect(updatedChat?.title).toBe('Updated title')
  })

  it('toggles the document sidebar from the add document button', async () => {
    const user = userEvent.setup()
    renderHeader()

    const button = screen.getByRole('button', { name: /add document/i })
    expect(button).toHaveAttribute('data-variant', 'outline')
    expect(useUIStore.getState().documentSidebarOpen).toBe(false)

    await user.click(button)

    expect(useUIStore.getState().documentSidebarOpen).toBe(true)
    expect(button).toHaveAttribute('data-variant', 'secondary')
  })

  it('duplicates and deletes the active chat from menu actions', async () => {
    const user = userEvent.setup()
    const confirmMock = vi.mocked(globalThis.confirm)
    confirmMock.mockReturnValue(true)

    renderHeader()

    await user.click(screen.getByRole('button', { name: /open menu/i }))
    await user.click(screen.getByText('Duplicate'))

    let state = useUIStore.getState()
    const duplicated = state.projects[0].chats.find((chat) =>
      chat.title.endsWith('(copy)')
    )
    expect(duplicated).toBeTruthy()
    expect(state.activeChatId).toBe(duplicated?.id)

    await user.click(screen.getByRole('button', { name: /open menu/i }))
    await user.click(screen.getByText('Delete'))

    state = useUIStore.getState()
    expect(
      state.projects[0].chats.some((chat) => chat.title.endsWith('(copy)'))
    ).toBe(false)
    expect(state.activeChatId).toBe('c5')
    expect(confirmMock).toHaveBeenCalledWith(
      'Are you sure you want to delete this chat?'
    )
  })
})
