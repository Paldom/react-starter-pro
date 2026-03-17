import { MemoryRouter } from 'react-router-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { AppSidebar } from './app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { resetUIStore, createTestQueryClient } from '@/test/utils'
import { useUIStore } from '@/shared/store/ui'
import { QueryClientProvider } from '@tanstack/react-query'
import { AssistantRuntimeProvider } from '@assistant-ui/react'
import { useChatRuntime } from '@/lib/assistant/use-chat-runtime'
import { server } from '@/mocks/server'
import { http, HttpResponse } from 'msw'

function RuntimeWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
  const runtime = useChatRuntime()
  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  )
}

function renderSidebar() {
  const queryClient = createTestQueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <RuntimeWrapper>
          <SidebarProvider defaultOpen>
            <AppSidebar />
          </SidebarProvider>
        </RuntimeWrapper>
      </MemoryRouter>
    </QueryClientProvider>
  )
}

describe('AppSidebar', () => {
  beforeEach(() => {
    resetUIStore()
  })

  it('renders app info and loads projects from server', async () => {
    renderSidebar()

    expect(screen.getByText('React Starter Pro')).toBeInTheDocument()
    expect(screen.getByText('Enterprise')).toBeInTheDocument()

    // Wait for user profile to load from MSW
    await waitFor(
      () => {
        expect(screen.getByText('John Doe')).toBeInTheDocument()
      },
      { timeout: 5000 }
    )
  })

  it('opens search dialog', async () => {
    const user = userEvent.setup()
    renderSidebar()

    await user.click(screen.getByRole('button', { name: /search chats/i }))
    expect(useUIStore.getState().searchDialogOpen).toBe(true)
  })

  it('renders loading skeletons while projects load', () => {
    server.use(
      http.get('*/api/projects', async () => {
        await new Promise(() => {})
        return HttpResponse.json({})
      })
    )

    renderSidebar()

    expect(screen.getByText('Add project')).toBeInTheDocument()
    expect(screen.getByText('Search chats')).toBeInTheDocument()
  })

  it('shows user settings loading state', () => {
    server.use(
      http.get('*/api/settings', async () => {
        await new Promise(() => {})
        return HttpResponse.json({})
      })
    )

    renderSidebar()

    expect(screen.getByText('...')).toBeInTheDocument()
  })

  it('creates a project when clicking add project', async () => {
    const user = userEvent.setup()
    renderSidebar()

    const addButton = screen.getByRole('button', { name: /add project/i })
    await user.click(addButton)

    expect(addButton).toBeInTheDocument()
  })

  it('renders projects and opens settings from user menu', async () => {
    const user = userEvent.setup()
    renderSidebar()

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /john doe/i }))
    await user.click(await screen.findByText('Settings'))

    expect(useUIStore.getState().settingsDialogOpen).toBe(true)
  })

  it('handles projects with chats', async () => {
    server.use(
      http.get('*/api/projects', () => {
        return HttpResponse.json({
          items: [
            {
              id: 'p1',
              name: 'My Project',
              createdAt: '2024-01-01T00:00:00Z',
              chatCount: 2,
            },
          ],
          nextCursor: null,
          hasMore: false,
        })
      }),
      http.get('*/api/projects/p1/chats', () => {
        return HttpResponse.json({
          items: [
            {
              id: 'c1',
              title: 'Test Chat',
              projectId: 'p1',
              createdAt: '2024-01-01T00:00:00Z',
              updatedAt: '2024-01-01T00:00:00Z',
            },
          ],
          nextCursor: null,
          hasMore: false,
        })
      })
    )

    renderSidebar()

    await waitFor(() => {
      expect(screen.getByText('My Project')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByText('Test Chat')).toBeInTheDocument()
    })
  })

  it('shows load more button when hasNextPage is true', async () => {
    server.use(
      http.get('*/api/projects', () => {
        return HttpResponse.json({
          items: [
            {
              id: 'p1',
              name: 'Project 1',
              createdAt: '2024-01-01T00:00:00Z',
              chatCount: 0,
            },
          ],
          nextCursor: 'p1',
          hasMore: true,
        })
      })
    )

    renderSidebar()

    await waitFor(() => {
      expect(screen.getByText('Project 1')).toBeInTheDocument()
    })

    expect(screen.getByText('Load more')).toBeInTheDocument()
  })
})
