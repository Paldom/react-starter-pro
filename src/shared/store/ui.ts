import { create } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'
import { type Project, type Chat, initialProjects } from '@/lib/chat-data'

type Theme = 'light' | 'dark'

export type DocumentStatus = 'pending' | 'ingested' | 'error'

export type Document = {
  id: string
  name: string
  size: number
  type: string
  status: DocumentStatus
  addedAt: number
}

function makeId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

const initialDocuments: Document[] = [
  {
    id: 'doc-1',
    name: 'Q1 Financial Report.pdf',
    size: 2457600,
    type: 'application/pdf',
    status: 'ingested',
    addedAt: Date.now() - 86400000 * 3,
  },
  {
    id: 'doc-2',
    name: 'Product Roadmap 2024.docx',
    size: 1048576,
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    status: 'ingested',
    addedAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'doc-3',
    name: 'Meeting Notes - Strategy.md',
    size: 24576,
    type: 'text/markdown',
    status: 'ingested',
    addedAt: Date.now() - 86400000,
  },
  {
    id: 'doc-4',
    name: 'API Documentation.pdf',
    size: 512000,
    type: 'application/pdf',
    status: 'pending',
    addedAt: Date.now() - 3600000,
  },
]

type UIState = {
  // Existing UI state
  sidebarCollapsed: boolean
  theme: Theme
  toggleSidebar: () => void
  setTheme: (theme: Theme) => void

  // Chat state
  projects: Project[]
  activeProjectId: string | null
  activeChatId: string | null
  searchDialogOpen: boolean
  settingsDialogOpen: boolean

  // Document sidebar state
  documentSidebarOpen: boolean
  documents: Document[]

  // Project actions
  setActiveProjectId: (projectId: string | null) => void
  createProject: () => void
  renameProject: (projectId: string, newName: string) => void
  deleteProject: (projectId: string) => void

  // Chat actions
  setActiveChatId: (chatId: string | null) => void
  setSearchDialogOpen: (open: boolean) => void
  setSettingsDialogOpen: (open: boolean) => void
  createNewChat: (projectId?: string) => void
  deleteChat: (chatId: string) => void
  renameChat: (chatId: string, newTitle: string) => void
  duplicateChat: (chatId: string) => void

  // Document actions
  setDocumentSidebarOpen: (open: boolean) => void
  toggleDocumentSidebar: () => void
  addDocument: (file: File) => void
  removeDocument: (documentId: string) => void
  updateDocumentStatus: (documentId: string, status: DocumentStatus) => void
}

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      subscribeWithSelector((set, get) => ({
      // Existing state
      sidebarCollapsed: false,
      theme: 'light',
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setTheme: (theme) => set({ theme }),

      // Chat state
      projects: initialProjects,
      activeProjectId: initialProjects[0]?.id ?? null,
      activeChatId: initialProjects[0]?.chats[0]?.id ?? null,
      searchDialogOpen: false,
      settingsDialogOpen: false,

      // Document sidebar state
      documentSidebarOpen: false,
      documents: initialDocuments,

      // Project actions
      setActiveProjectId: (projectId) => set({ activeProjectId: projectId }),

      createProject: () => {
        const { projects } = get()
        const newProject: Project = {
          id: makeId(),
          name: 'New project',
          chats: [],
        }
        set({ projects: [...projects, newProject] })
      },

      renameProject: (projectId, newName) => {
        const { projects } = get()
        set({
          projects: projects.map((p) =>
            p.id === projectId ? { ...p, name: newName } : p
          ),
        })
      },

      deleteProject: (projectId) => {
        const { projects, activeProjectId, activeChatId } = get()
        if (projects.length <= 1) return // Don't delete the last project

        const newProjects = projects.filter((p) => p.id !== projectId)
        let newActiveProjectId = activeProjectId
        let newActiveChatId = activeChatId

        // If we deleted the active project, switch to first project
        if (activeProjectId === projectId) {
          newActiveProjectId = newProjects[0]?.id ?? null
          newActiveChatId = newProjects[0]?.chats[0]?.id ?? null
        }

        // If the active chat was in the deleted project, clear it
        const deletedProject = projects.find((p) => p.id === projectId)
        if (deletedProject?.chats.some((c) => c.id === activeChatId)) {
          newActiveChatId = newProjects[0]?.chats[0]?.id ?? null
        }

        set({
          projects: newProjects,
          activeProjectId: newActiveProjectId,
          activeChatId: newActiveChatId,
        })
      },

      // Chat actions
      setActiveChatId: (chatId) => set({ activeChatId: chatId }),
      setSearchDialogOpen: (open) => set({ searchDialogOpen: open }),
      setSettingsDialogOpen: (open) => set({ settingsDialogOpen: open }),

      createNewChat: (projectId) => {
        const { projects, activeChatId } = get()

        // Find the project to add the chat to
        let targetProjectId = projectId
        if (!targetProjectId) {
          // Find which project the active chat belongs to, or use first project
          for (const project of projects) {
            if (project.chats.some((c) => c.id === activeChatId)) {
              targetProjectId = project.id
              break
            }
          }
          if (!targetProjectId) {
            targetProjectId = projects[0]?.id
          }
        }

        if (!targetProjectId) return

        const newChat: Chat = {
          id: makeId(),
          title: 'New chat',
        }

        set({
          projects: projects.map((p) =>
            p.id === targetProjectId
              ? { ...p, chats: [newChat, ...p.chats] }
              : p
          ),
          activeChatId: newChat.id,
        })
      },

      deleteChat: (chatId) => {
        const { projects, activeChatId } = get()
        let newActiveChatId = activeChatId

        const newProjects = projects.map((project) => {
          const filteredChats = project.chats.filter((c) => c.id !== chatId)
          if (filteredChats.length !== project.chats.length && chatId === activeChatId) {
            // Find next chat to select
            const chatIndex = project.chats.findIndex((c) => c.id === chatId)
            newActiveChatId =
              filteredChats[chatIndex]?.id ??
              filteredChats[chatIndex - 1]?.id ??
              null
          }
          return { ...project, chats: filteredChats }
        })

        set({ projects: newProjects, activeChatId: newActiveChatId })
      },

      renameChat: (chatId, newTitle) => {
        const { projects } = get()
        set({
          projects: projects.map((project) => ({
            ...project,
            chats: project.chats.map((chat) =>
              chat.id === chatId ? { ...chat, title: newTitle } : chat
            ),
          })),
        })
      },

      duplicateChat: (chatId) => {
        const { projects } = get()
        let duplicatedChatId: string | null = null

        const newProjects = projects.map((project) => {
          const chatIndex = project.chats.findIndex((c) => c.id === chatId)
          if (chatIndex === -1) return project

          const originalChat = project.chats[chatIndex]
          const newChat: Chat = {
            id: makeId(),
            title: `${originalChat.title} (copy)`,
          }
          duplicatedChatId = newChat.id

          const newChats = [...project.chats]
          newChats.splice(chatIndex + 1, 0, newChat)
          return { ...project, chats: newChats }
        })

        set({ projects: newProjects, activeChatId: duplicatedChatId })
      },

      // Document actions
      setDocumentSidebarOpen: (open) => set({ documentSidebarOpen: open }),
      toggleDocumentSidebar: () =>
        set((state) => ({ documentSidebarOpen: !state.documentSidebarOpen })),

      addDocument: (file) => {
        const { documents } = get()
        const newDocument: Document = {
          id: makeId(),
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'pending',
          addedAt: Date.now(),
        }
        set({ documents: [...documents, newDocument] })

        // Simulate ingestion process (in real app, this would be an API call)
        setTimeout(() => {
          const currentDocs = get().documents
          const doc = currentDocs.find((d) => d.id === newDocument.id)
          if (doc?.status === 'pending') {
            get().updateDocumentStatus(newDocument.id, 'ingested')
          }
        }, 2000 + Math.random() * 3000)
      },

      removeDocument: (documentId) => {
        const { documents } = get()
        set({ documents: documents.filter((d) => d.id !== documentId) })
      },

      updateDocumentStatus: (documentId, status) => {
        const { documents } = get()
        set({
          documents: documents.map((d) =>
            d.id === documentId ? { ...d, status } : d
          ),
        })
      },
      })),
      {
        name: 'ui-store',
        partialize: (state) => ({ theme: state.theme }),
      }
    ),
    { name: 'UIStore' }
  )
)
