import { initialProjects } from '@/lib/chat-data'
import { useUIStore } from '@/shared/store/ui'

const initialDocumentsSnapshot = useUIStore
  .getState()
  .documents.map((doc) => ({ ...doc }))

export function cloneProjects() {
  return initialProjects.map((project) => ({
    ...project,
    chats: project.chats.map((chat) => ({ ...chat })),
  }))
}

export function cloneDocuments() {
  return initialDocumentsSnapshot.map((doc) => ({ ...doc }))
}

export function resetUIStore(
  overrides: Partial<ReturnType<typeof useUIStore.getState>> = {}
) {
  const projects = cloneProjects()
  const documents = cloneDocuments()
  useUIStore.persist?.clearStorage?.()
  useUIStore.setState({
    sidebarCollapsed: false,
    theme: 'light',
    projects,
    activeProjectId: projects[0]?.id ?? null,
    activeChatId: projects[0]?.chats[0]?.id ?? null,
    searchDialogOpen: false,
    settingsDialogOpen: false,
    documentSidebarOpen: false,
    documents,
    ...overrides,
  })
}
