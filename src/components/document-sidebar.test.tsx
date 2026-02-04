import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { DocumentSidebar } from './document-sidebar'
import { resetUIStore } from '@/test/utils'
import { useUIStore } from '@/shared/store/ui'

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

describe('DocumentSidebar', () => {
  beforeEach(() => {
    resetUIStore({ documentSidebarOpen: true })
  })

  it('renders the document list with count and sizes', () => {
    const { documents } = useUIStore.getState()
    render(<DocumentSidebar />)

    expect(screen.getByText('Documents')).toBeInTheDocument()
    expect(
      screen.getByText(`Added documents (${documents.length})`)
    ).toBeInTheDocument()

    documents.forEach((doc) => {
      expect(screen.getByText(doc.name)).toBeInTheDocument()
    })

    const firstDoc = documents[0]
    expect(screen.getByText(formatFileSize(firstDoc.size))).toBeInTheDocument()
  })

  it('removes a document from the list', async () => {
    const user = userEvent.setup()
    const { documents } = useUIStore.getState()
    const target = documents[0]

    render(<DocumentSidebar />)

    const removeButtons = screen.getAllByRole('button', {
      name: /remove document/i,
    })
    await user.click(removeButtons[0])

    expect(
      useUIStore.getState().documents.some((doc) => doc.id === target.id)
    ).toBe(false)
    expect(screen.queryByText(target.name)).not.toBeInTheDocument()
  })

  it('adds documents through the dropzone input', async () => {
    const user = userEvent.setup()
    const { container } = render(<DocumentSidebar />)

    const input = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement
    const file = new File(['hello'], 'notes.txt', { type: 'text/plain' })

    await user.upload(input, file)

    expect(screen.getByText('notes.txt')).toBeInTheDocument()
    expect(
      useUIStore.getState().documents.some((doc) => doc.name === 'notes.txt')
    ).toBe(true)
  })
})
