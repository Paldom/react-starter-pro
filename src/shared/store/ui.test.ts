import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useUIStore } from './ui'
import { cloneProjects, resetUIStore } from '@/test/utils'

describe('useUIStore', () => {
  beforeEach(() => {
    resetUIStore()
  })

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

  it('toggles the document sidebar state', () => {
    const { setDocumentSidebarOpen, toggleDocumentSidebar } =
      useUIStore.getState()

    setDocumentSidebarOpen(true)
    expect(useUIStore.getState().documentSidebarOpen).toBe(true)

    toggleDocumentSidebar()
    expect(useUIStore.getState().documentSidebarOpen).toBe(false)
  })

  it('creates and renames projects', () => {
    const { createProject, renameProject } = useUIStore.getState()
    const initialCount = useUIStore.getState().projects.length
    const randomUUID =
      typeof globalThis.crypto !== 'undefined' &&
      'randomUUID' in globalThis.crypto
        ? vi
            .spyOn(globalThis.crypto, 'randomUUID')
            .mockReturnValue(
              'proj-id' as `${string}-${string}-${string}-${string}-${string}`
            )
        : null

    createProject()
    const projectsAfterCreate = useUIStore.getState().projects
    expect(projectsAfterCreate.length).toBe(initialCount + 1)
    const newProject = projectsAfterCreate[projectsAfterCreate.length - 1]
    expect(newProject.name).toBe('New project')
    expect(newProject.chats).toEqual([])
    if (randomUUID) {
      expect(newProject.id).toBe('proj-id')
      randomUUID.mockRestore()
    }

    renameProject(newProject.id, 'Launch')
    const renamed = useUIStore
      .getState()
      .projects.find((project) => project.id === newProject.id)
    expect(renamed?.name).toBe('Launch')
  })

  it('sets the active project id', () => {
    const { setActiveProjectId } = useUIStore.getState()
    setActiveProjectId('default')
    expect(useUIStore.getState().activeProjectId).toBe('default')
  })

  it('deletes projects and updates active ids when needed', () => {
    const { deleteProject } = useUIStore.getState()
    const initialCount = useUIStore.getState().projects.length

    useUIStore.setState({
      activeProjectId: 'client-a',
      activeChatId: 'c6',
    })

    deleteProject('client-a')
    const state = useUIStore.getState()
    expect(state.projects.some((project) => project.id === 'client-a')).toBe(
      false
    )
    expect(state.projects.length).toBe(initialCount - 1)
    expect(state.activeProjectId).toBe(state.projects[0]?.id ?? null)
    expect(state.activeChatId).toBe(state.projects[0]?.chats[0]?.id ?? null)
  })

  it('clears active chat when it belonged to a deleted project', () => {
    const { deleteProject } = useUIStore.getState()
    useUIStore.setState({
      activeProjectId: 'work',
      activeChatId: 'c6',
    })

    deleteProject('client-a')
    const state = useUIStore.getState()
    expect(state.activeProjectId).toBe('work')
    expect(state.activeChatId).toBe(state.projects[0]?.chats[0]?.id ?? null)
  })

  it('keeps active ids when deleting a different project', () => {
    const { deleteProject } = useUIStore.getState()
    useUIStore.setState({
      activeProjectId: 'default',
      activeChatId: 'c1',
    })

    deleteProject('client-a')
    const state = useUIStore.getState()
    expect(state.activeProjectId).toBe('default')
    expect(state.activeChatId).toBe('c1')
  })

  it('does not delete the last project', () => {
    const { deleteProject } = useUIStore.getState()
    const projects = cloneProjects().slice(0, 1)
    useUIStore.setState({
      projects,
      activeProjectId: projects[0]?.id ?? null,
      activeChatId: projects[0]?.chats[0]?.id ?? null,
    })

    deleteProject(projects[0].id)
    expect(useUIStore.getState().projects.length).toBe(1)
  })

  it('creates new chats and sets them active', () => {
    const { createNewChat } = useUIStore.getState()

    createNewChat('client-a')
    const state = useUIStore.getState()
    const clientProject = state.projects.find((p) => p.id === 'client-a')
    expect(clientProject?.chats[0]?.title).toBe('New chat')
    expect(state.activeChatId).toBe(clientProject?.chats[0]?.id)

    useUIStore.setState({ activeChatId: 'c4' })
    createNewChat()
    const workProject = useUIStore
      .getState()
      .projects.find((p) => p.id === 'work')
    expect(workProject?.chats[0]?.title).toBe('New chat')
    expect(useUIStore.getState().activeChatId).toBe(workProject?.chats[0]?.id)
  })

  it('adds a new chat to the active chat project when it is not the first', () => {
    const { createNewChat } = useUIStore.getState()
    useUIStore.setState({ activeChatId: 'c6' })

    createNewChat()
    const state = useUIStore.getState()
    const clientProject = state.projects.find((p) => p.id === 'client-a')
    const workProject = state.projects.find((p) => p.id === 'work')
    expect(clientProject?.chats[0]?.title).toBe('New chat')
    expect(workProject?.chats[0]?.title).toBe('Q1 metrics summary')
  })

  it('falls back to the first project when no active chat exists', () => {
    const { createNewChat } = useUIStore.getState()
    useUIStore.setState({ activeChatId: null })

    createNewChat()
    const state = useUIStore.getState()
    expect(state.projects[0].chats[0].title).toBe('New chat')
    expect(state.activeChatId).toBe(state.projects[0].chats[0].id)
  })

  it('ignores createNewChat when no projects exist', () => {
    const { createNewChat } = useUIStore.getState()
    useUIStore.setState({
      projects: [],
      activeProjectId: null,
      activeChatId: null,
    })

    createNewChat()
    expect(useUIStore.getState().projects).toEqual([])
    expect(useUIStore.getState().activeChatId).toBeNull()
  })

  it('renames, duplicates, and deletes chats with active selection rules', () => {
    const { renameChat, duplicateChat, deleteChat } = useUIStore.getState()

    renameChat('c1', 'Updated chat')
    let defaultProject = useUIStore
      .getState()
      .projects.find((p) => p.id === 'default')
    expect(defaultProject?.chats[0]?.title).toBe('Updated chat')

    duplicateChat('c1')
    defaultProject = useUIStore
      .getState()
      .projects.find((p) => p.id === 'default')
    const duplicated = defaultProject?.chats.find((chat) =>
      chat.title.endsWith('(copy)')
    )
    expect(duplicated).toBeTruthy()
    expect(useUIStore.getState().activeChatId).toBe(duplicated?.id)

    useUIStore.setState({ activeChatId: 'c2' })
    deleteChat('c2')
    const postDelete = useUIStore
      .getState()
      .projects.find((p) => p.id === 'default')
    const remainingIds = postDelete?.chats.map((chat) => chat.id) ?? []
    expect(remainingIds).not.toContain('c2')
    expect(useUIStore.getState().activeChatId).toBe('c3')
  })

  it('keeps the active chat when deleting a different chat', () => {
    const { deleteChat } = useUIStore.getState()
    useUIStore.setState({ activeChatId: 'c1' })

    deleteChat('c2')
    expect(useUIStore.getState().activeChatId).toBe('c1')
  })

  it('adds documents and updates status after ingestion', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-01-01T00:00:00Z'))
    const randomMock = vi.spyOn(Math, 'random').mockReturnValue(0)
    const randomUUID =
      typeof globalThis.crypto !== 'undefined' &&
      'randomUUID' in globalThis.crypto
        ? vi
            .spyOn(globalThis.crypto, 'randomUUID')
            .mockReturnValue(
              'doc-id' as `${string}-${string}-${string}-${string}-${string}`
            )
        : null

    const { addDocument } = useUIStore.getState()
    const file = new File(['hello'], 'notes.txt', { type: 'text/plain' })
    addDocument(file)

    const pendingDoc = useUIStore
      .getState()
      .documents.find((doc) => doc.name === 'notes.txt')
    expect(pendingDoc).toBeTruthy()
    expect(pendingDoc?.status).toBe('pending')
    expect(pendingDoc?.addedAt).toBe(new Date('2024-01-01T00:00:00Z').getTime())
    if (randomUUID) {
      expect(pendingDoc?.id).toBe('doc-id')
      randomUUID.mockRestore()
    }

    vi.advanceTimersByTime(2000)

    const ingestedDoc = useUIStore
      .getState()
      .documents.find((doc) => doc.name === 'notes.txt')
    expect(ingestedDoc?.status).toBe('ingested')

    randomMock.mockRestore()
    vi.useRealTimers()
  })

  it('updates and removes documents', () => {
    const { updateDocumentStatus, removeDocument } = useUIStore.getState()

    updateDocumentStatus('doc-1', 'error')
    const updated = useUIStore
      .getState()
      .documents.find((doc) => doc.id === 'doc-1')
    expect(updated?.status).toBe('error')

    removeDocument('doc-1')
    expect(
      useUIStore.getState().documents.some((doc) => doc.id === 'doc-1')
    ).toBe(false)
  })
})
