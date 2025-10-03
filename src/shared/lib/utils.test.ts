import { describe, expect, it } from 'vitest'
import { cn, formatCurrency, formatNumber } from './utils'

describe('cn', () => {
  it('merges class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes', () => {
    const condition = false
    expect(cn('foo', condition && 'bar', 'baz')).toBe('foo baz')
  })

  it('handles tailwind class conflicts', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })
})

describe('formatCurrency', () => {
  it('formats currency correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56')
  })

  it('handles zero', () => {
    expect(formatCurrency(0)).toBe('$0.00')
  })

  it('handles negative values', () => {
    expect(formatCurrency(-1234.56)).toBe('-$1,234.56')
  })
})

describe('formatNumber', () => {
  it('formats numbers correctly', () => {
    expect(formatNumber(1234567)).toBe('1,234,567')
  })

  it('handles zero', () => {
    expect(formatNumber(0)).toBe('0')
  })

  it('handles negative values', () => {
    expect(formatNumber(-1234)).toBe('-1,234')
  })
})