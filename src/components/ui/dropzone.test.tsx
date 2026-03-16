import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Dropzone } from './dropzone'

describe('ui/dropzone', () => {
  it('accepts allowed files on drop', () => {
    const onFilesAdded = vi.fn()
    render(<Dropzone onFilesAdded={onFilesAdded} accept=".pdf" />)

    const dropzone = screen.getByText(/drag & drop/i)
      .parentElement as HTMLElement
    const file = new File(['data'], 'report.pdf', { type: 'application/pdf' })

    fireEvent.drop(dropzone, { dataTransfer: { files: [file] } })

    expect(onFilesAdded).toHaveBeenCalledTimes(1)
    expect(onFilesAdded.mock.calls[0][0]).toEqual([file])
  })

  it('rejects files that do not match accept or maxSize', () => {
    const onFilesAdded = vi.fn()
    render(<Dropzone onFilesAdded={onFilesAdded} accept=".pdf" maxSize={3} />)

    const dropzone = screen.getByText(/drag & drop/i)
      .parentElement as HTMLElement
    const wrongType = new File(['hello'], 'notes.txt', { type: 'text/plain' })
    const tooLarge = new File(['large-file'], 'report.pdf', {
      type: 'application/pdf',
    })

    fireEvent.drop(dropzone, { dataTransfer: { files: [wrongType] } })
    fireEvent.drop(dropzone, { dataTransfer: { files: [tooLarge] } })

    expect(onFilesAdded).not.toHaveBeenCalled()
  })

  it('respects multiple=false and disabled state', () => {
    const onFilesAdded = vi.fn()
    const { rerender } = render(
      <Dropzone onFilesAdded={onFilesAdded} accept=".pdf" multiple={false} />
    )

    const dropzone = screen.getByText(/drag & drop/i)
      .parentElement as HTMLElement
    const fileA = new File(['a'], 'a.pdf', { type: 'application/pdf' })
    const fileB = new File(['b'], 'b.pdf', { type: 'application/pdf' })

    fireEvent.drop(dropzone, { dataTransfer: { files: [fileA, fileB] } })
    expect(onFilesAdded).toHaveBeenCalledWith([fileA])

    onFilesAdded.mockClear()
    rerender(<Dropzone onFilesAdded={onFilesAdded} disabled />)
    const disabledZone = screen.getByText(/drag & drop/i)
      .parentElement as HTMLElement

    fireEvent.drop(disabledZone, { dataTransfer: { files: [fileA] } })
    expect(onFilesAdded).not.toHaveBeenCalled()
  })

  it('shows drag active label and accepted hint', () => {
    render(
      <Dropzone
        onFilesAdded={() => undefined}
        accept=".pdf"
        labels={{
          idle: 'Drop files',
          active: 'Release to upload',
          accepted: 'PDF only',
        }}
      />
    )

    const dropzone = screen.getByText('Drop files').parentElement as HTMLElement
    expect(screen.getByText('PDF only')).toBeInTheDocument()

    fireEvent.dragOver(dropzone)
    expect(screen.getByText('Release to upload')).toBeInTheDocument()
  })
})
