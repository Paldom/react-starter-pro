import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'

describe('Input', () => {
  it('renders with placeholder', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('accepts user input', async () => {
    const user = userEvent.setup()
    render(<Input placeholder="Enter text" />)

    const input = screen.getByPlaceholderText('Enter text')
    await user.type(input, 'Hello')

    expect(input).toHaveValue('Hello')
  })

  it('calls onChange handler', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<Input placeholder="Enter text" onChange={handleChange} />)

    const input = screen.getByPlaceholderText('Enter text')
    await user.type(input, 'A')

    expect(handleChange).toHaveBeenCalled()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeDisabled()
  })

  it('renders with custom type', () => {
    render(<Input type="email" placeholder="Enter email" />)
    const input = screen.getByPlaceholderText('Enter email')
    expect(input).toHaveAttribute('type', 'email')
  })

  it('applies custom className', () => {
    render(<Input className="custom" placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toHaveClass('custom')
  })

  it('renders with default type text', () => {
    render(<Input placeholder="Enter text" />)
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toHaveAttribute('type', 'text')
  })
})