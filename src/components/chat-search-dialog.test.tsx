
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { ChatSearchDialog } from './chat-search-dialog'
import { resetUIStore } from '@/test/utils'
import { useUIStore } from '@/shared/store/ui'

describe('ChatSearchDialog', () => {
  beforeEach(() => {
    resetUIStore()
  })

  it('opens with the keyboard shortcut', () => {
    render(<ChatSearchDialog />)

    fireEvent.keyDown(document, { key: 'k', metaKey: true })
    expect(useUIStore.getState().searchDialogOpen).toBe(true)
  })

  it('selects a chat and closes the dialog', async () => {
    const user = userEvent.setup()
    resetUIStore({ searchDialogOpen: true })
    render(<ChatSearchDialog />)

    const chatItem = await screen.findByText('Kickoff notes')
    await user.click(chatItem)

    const state = useUIStore.getState()
    expect(state.activeChatId).toBe('c6')
    expect(state.searchDialogOpen).toBe(false)
  })
})
