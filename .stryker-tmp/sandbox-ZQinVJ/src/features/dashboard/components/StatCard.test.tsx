// @ts-nocheck
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BarChart } from 'lucide-react'
import { StatCard } from './StatCard'

describe('StatCard', () => {
  it('renders title and value correctly', () => {
    render(<StatCard title="Total Revenue" value="$125,000" icon={BarChart} />)

    expect(screen.getByText('Total Revenue')).toBeInTheDocument()
    expect(screen.getByText('$125,000')).toBeInTheDocument()
  })

  it('renders icon', () => {
    const { container } = render(
      <StatCard title="Sales" value="5,678" icon={BarChart} />
    )

    const icon = container.querySelector('svg')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute('aria-hidden', 'true')
  })
})