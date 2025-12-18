// @ts-nocheck
import React from 'react'
import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

const handlerRef: { current?: (lng: string) => void } = {}
const on = vi.fn((event: string, cb: (lng: string) => void) => {
  if (event === 'languageChanged') {
    handlerRef.current = cb
  }
})
const off = vi.fn()

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      resolvedLanguage: 'hu',
      dir: vi.fn(() => 'rtl'),
      on,
      off,
    },
  }),
}))

import { useLanguageEffect } from './useLanguageEffect'

function TestComponent() {
  useLanguageEffect()
  return null
}

describe('useLanguageEffect', () => {
  it('applies document language/dir and manages listeners', () => {
    const { unmount } = render(<TestComponent />)

    expect(document.documentElement.lang).toBe('hu')
    expect(document.documentElement.dir).toBe('rtl')
    expect(on).toHaveBeenCalledWith('languageChanged', expect.any(Function))

    unmount()
    expect(off).toHaveBeenCalledWith('languageChanged', handlerRef.current)
  })
})
