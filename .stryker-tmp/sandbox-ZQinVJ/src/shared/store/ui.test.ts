// @ts-nocheck
import { describe, expect, it } from 'vitest'
import { useUIStore } from './ui'

describe('useUIStore', () => {
  it('has default state', () => {
    const state = useUIStore.getState()
    expect(state.sidebarCollapsed).toBe(false)
    expect(state.theme).toBe('light')
  })

  it('toggles sidebar', () => {
    const { toggleSidebar } = useUIStore.getState()
    toggleSidebar()
    expect(useUIStore.getState().sidebarCollapsed).toBe(true)
    toggleSidebar()
    expect(useUIStore.getState().sidebarCollapsed).toBe(false)
  })

  it('sets theme', () => {
    const { setTheme } = useUIStore.getState()
    setTheme('dark')
    expect(useUIStore.getState().theme).toBe('dark')
    setTheme('light')
    expect(useUIStore.getState().theme).toBe('light')
  })
})