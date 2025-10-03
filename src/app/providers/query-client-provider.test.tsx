import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClientProviderWithClient } from './query-client-provider'

describe('QueryClientProviderWithClient', () => {
  it('renders children correctly', () => {
    render(
      <QueryClientProviderWithClient>
        <div>Test content</div>
      </QueryClientProviderWithClient>
    )
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })
})