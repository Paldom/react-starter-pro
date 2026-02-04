import { type ReactNode } from 'react'
import { useThemeEffect } from '@/app/hooks/useThemeEffect'

export type ThemeProviderProps = {
  readonly children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  useThemeEffect()

  return <>{children}</>
}
