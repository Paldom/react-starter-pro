
import { MemoryRouter } from 'react-router-dom'
import { render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { ChatShell } from './chat-shell'
import { resetUIStore } from '@/test/utils'

describe('ChatShell', () => {
  beforeEach(() => {
    resetUIStore()
  })

  it('renders the assistant thread and active breadcrumb', () => {
    render(
      <MemoryRouter>
        <ChatShell />
      </MemoryRouter>
    )

    expect(
      screen.getByText('Start a conversation by typing a message below.')
    ).toBeInTheDocument()
    const breadcrumb = screen.getByLabelText('breadcrumb')
    expect(within(breadcrumb).getByText('Work')).toBeInTheDocument()
    expect(within(breadcrumb).getByText('Q1 metrics summary')).toBeInTheDocument()
  })

  it('renders the document sidebar and resize handle when open', () => {
    resetUIStore({ documentSidebarOpen: true })

    const { container } = render(
      <MemoryRouter>
        <ChatShell />
      </MemoryRouter>
    )

    expect(screen.getByText('Documents')).toBeInTheDocument()
    expect(container.querySelector('[data-separator]')).toBeTruthy()
  })
})
