// @ts-nocheck
import { describe, expect, it } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { App } from './App'

describe('App', () => {
  it('renders dashboard page by default', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
    })
  })

  it('renders application header', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('React Advanced App')).toBeInTheDocument()
    })
  })
})