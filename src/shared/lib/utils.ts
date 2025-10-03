import { twJoin, twMerge, type ClassNameValue } from 'tailwind-merge'

export function cn(...inputs: ClassNameValue[]): string {
  return twMerge(twJoin(...inputs))
}

export function formatCurrency(value: number, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

export function formatNumber(value: number, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(value)
}
