import { MemoryRouter } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { ChatShell } from './chat-shell'
import { resetUIStore, TestQueryWrapper } from '@/test/utils'
import { useUIStore } from '@/shared/store/ui'
import { db } from '@/mocks/data/seed'

describe('ChatShell', () => {
  beforeEach(() => {
    resetUIStore()
  })

  it('renders the assistant thread', async () => {
    render(
      <TestQueryWrapper>
        <MemoryRouter>
          <ChatShell />
        </MemoryRouter>
      </TestQueryWrapper>
    )

    // assistant-ui 0.14 initializes the thread asynchronously (isLoading on
    // first render), so the empty state appears after a tick.
    expect(
      await screen.findByText('Start a conversation by typing a message below.')
    ).toBeInTheDocument()
  })

  it('hydrates the thread with the seeded history of the active chat', async () => {
    const chat = db.allChats[0]!
    const seededMessages = db.chatMessages.get(chat.id) ?? []
    expect(seededMessages.length).toBeGreaterThan(0)
    resetUIStore({ activeChatId: chat.id })

    render(
      <TestQueryWrapper>
        <MemoryRouter>
          <ChatShell />
        </MemoryRouter>
      </TestQueryWrapper>
    )

    expect(
      await screen.findByText(seededMessages[0]!.content)
    ).toBeInTheDocument()
    expect(
      await screen.findByText(seededMessages[1]!.content)
    ).toBeInTheDocument()
  })

  it('renders the document sidebar when open', () => {
    resetUIStore({ documentSidebarOpen: true })

    const { container } = render(
      <TestQueryWrapper>
        <MemoryRouter>
          <ChatShell />
        </MemoryRouter>
      </TestQueryWrapper>
    )

    expect(screen.getByText('Documents')).toBeInTheDocument()
    expect(container.querySelector('[data-separator]')).toBeTruthy()
  })

  it('updates sidebarCollapsed in the store when the sidebar trigger is clicked', () => {
    const { container } = render(
      <TestQueryWrapper>
        <MemoryRouter>
          <ChatShell />
        </MemoryRouter>
      </TestQueryWrapper>
    )

    const trigger = container.querySelector('[data-sidebar="trigger"]')
    expect(trigger).toBeTruthy()
    expect(useUIStore.getState().sidebarCollapsed).toBe(false)

    fireEvent.click(trigger as Element)
    expect(useUIStore.getState().sidebarCollapsed).toBe(true)

    fireEvent.click(trigger as Element)
    expect(useUIStore.getState().sidebarCollapsed).toBe(false)
  })
})
