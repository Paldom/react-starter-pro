// @ts-nocheck
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card, CardHeader, CardTitle, CardContent } from './Card'

describe('Card', () => {
  it('renders children correctly', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Card className="custom">Content</Card>)
    expect(screen.getByText('Content')).toHaveClass('custom')
  })
})

describe('CardHeader', () => {
  it('renders children correctly', () => {
    render(<CardHeader>Header content</CardHeader>)
    expect(screen.getByText('Header content')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<CardHeader className="custom">Content</CardHeader>)
    expect(screen.getByText('Content')).toHaveClass('custom')
  })
})

describe('CardTitle', () => {
  it('renders children correctly', () => {
    render(<CardTitle>Title content</CardTitle>)
    expect(screen.getByText('Title content')).toBeInTheDocument()
  })

  it('renders as h3 element', () => {
    render(<CardTitle>Title</CardTitle>)
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<CardTitle className="custom">Content</CardTitle>)
    expect(screen.getByText('Content')).toHaveClass('custom')
  })
})

describe('CardContent', () => {
  it('renders children correctly', () => {
    render(<CardContent>Content text</CardContent>)
    expect(screen.getByText('Content text')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<CardContent className="custom">Content</CardContent>)
    expect(screen.getByText('Content')).toHaveClass('custom')
  })
})