import { describe, expect, it } from 'vitest'
import { useUIStore } from './ui'
import { initialProjects } from '@/lib/chat-data'

describe('useUIStore initial state', () => {
  it('matches the seeded defaults', () => {
    const state = useUIStore.getState()

    expect(state.sidebarCollapsed).toBe(false)
    expect(state.theme).toBe('light')
    expect(state.searchDialogOpen).toBe(false)
    expect(state.settingsDialogOpen).toBe(false)
    expect(state.documentSidebarOpen).toBe(false)

    expect(state.activeProjectId).toBe(initialProjects[0]?.id ?? null)
    expect(state.activeChatId).toBe(initialProjects[0]?.chats[0]?.id ?? null)

    expect(state.projects).toEqual(initialProjects)

    const now = Date.now()
    expect(state.documents.length).toBeGreaterThan(0)
    expect(state.documents.some((doc) => doc.status === 'pending')).toBe(true)
    expect(state.documents.some((doc) => doc.status === 'ingested')).toBe(true)
    state.documents.forEach((doc) => {
      expect(doc.addedAt).toBeLessThanOrEqual(now)
    })
  })
})
