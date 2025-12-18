// @ts-nocheck
import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { DashboardSkeleton } from './DashboardSkeleton'

describe('DashboardSkeleton', () => {
  it('renders skeleton cards', () => {
    const { container } = render(<DashboardSkeleton />)
    const skeletonCards = container.querySelectorAll('.animate-pulse')
    expect(skeletonCards.length).toBeGreaterThan(0)
  })

  it('renders 4 stat card skeletons', () => {
    const { container } = render(<DashboardSkeleton />)
    const statCardSkeletons = container.querySelectorAll('.h-32')
    expect(statCardSkeletons).toHaveLength(4)
  })

  it('renders chart skeleton', () => {
    const { container } = render(<DashboardSkeleton />)
    const chartSkeleton = container.querySelector('.h-64')
    expect(chartSkeleton).toBeInTheDocument()
  })
})