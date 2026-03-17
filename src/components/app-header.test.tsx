import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { AppHeader } from './app-header'
import { SidebarProvider } from '@/components/ui/sidebar'
import { resetUIStore, TestQueryWrapper } from '@/test/utils'
import { useUIStore } from '@/shared/store/ui'

function renderHeader() {
  return render(
    <TestQueryWrapper>
      <MemoryRouter>
        <SidebarProvider defaultOpen>
          <AppHeader />
        </SidebarProvider>
      </MemoryRouter>
    </TestQueryWrapper>
  )
}

describe('AppHeader', () => {
  beforeEach(() => {
    resetUIStore()
  })

  it('shows the app title when no active chat is selected', () => {
    resetUIStore({ activeChatId: null })
    renderHeader()

    expect(screen.getByText('Chat App')).toBeInTheDocument()
  })

  it('toggles the document sidebar from the add document button', async () => {
    const user = userEvent.setup()
    renderHeader()

    const button = screen.getByRole('button', { name: /add document/i })
    expect(useUIStore.getState().documentSidebarOpen).toBe(false)

    await user.click(button)

    expect(useUIStore.getState().documentSidebarOpen).toBe(true)
  })
})
