import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import { App } from './app'
import { resetUIStore } from '@/test/utils'

describe('App', () => {
  beforeEach(() => {
    resetUIStore()
  })

  it('renders assistant thread empty state by default', async () => {
    render(<App />)

    await waitFor(() => {
      expect(
        screen.getByText('Start a conversation by typing a message below.')
      ).toBeInTheDocument()
    })
  })

  it('renders active project and chat in the header breadcrumb', async () => {
    render(<App />)

    await waitFor(() => {
      const breadcrumb = screen.getByLabelText('breadcrumb')
      expect(within(breadcrumb).getByText('Work')).toBeInTheDocument()
      expect(
        within(breadcrumb).getByText('Q1 metrics summary')
      ).toBeInTheDocument()
    })
  })
})
