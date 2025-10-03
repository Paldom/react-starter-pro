import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AppProviders } from './app-provider'

describe('AppProviders', () => {
  it('renders children correctly', () => {
    render(
      <AppProviders>
        <div>Test content</div>
      </AppProviders>
    )
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })
})