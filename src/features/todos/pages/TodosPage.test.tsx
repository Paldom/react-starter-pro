import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TodosPage } from './TodosPage'
import * as useTodosHooks from '../hooks/use-todos'
import { Todo } from '@/shared/api/generated/models'

// Mock the use-todos hooks
const mockTodos: Todo[] = [
  { id: '1', title: 'Learn React', completed: false },
  { id: '2', title: 'Build Project', completed: true },
]

vi.mock('../hooks/use-todos', async (importOriginal) => {
  const actual = await importOriginal<typeof useTodosHooks>()
  return {
    ...actual,
    useTodosQuery: vi.fn(),
    useAddTodoMutation: vi.fn(),
    useUpdateTodoMutation: vi.fn(),
    useDeleteTodoMutation: vi.fn(),
  }
})

const useTodosQueryMock = vi.mocked(useTodosHooks.useTodosQuery)
const useAddTodoMutationMock = vi.mocked(useTodosHooks.useAddTodoMutation)
const useUpdateTodoMutationMock = vi.mocked(useTodosHooks.useUpdateTodoMutation)
const useDeleteTodoMutationMock = vi.mocked(useTodosHooks.useDeleteTodoMutation)

function createTestWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('TodosPage', () => {
  beforeEach(() => {
    // Reset mocks before each test
    useTodosQueryMock.mockReset()
    useAddTodoMutationMock.mockReset()
    useUpdateTodoMutationMock.mockReset()
    useDeleteTodoMutationMock.mockReset()

    // Default mock implementations
    useTodosQueryMock.mockReturnValue({
      data: mockTodos,
      isPending: false,
      isError: false,
      isSuccess: true,
    })
    useAddTodoMutationMock.mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    })
    useUpdateTodoMutationMock.mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    })
    useDeleteTodoMutationMock.mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    })
  })

  it('shows loading state initially', () => {
    useTodosQueryMock.mockReturnValue({ isPending: true, isError: false, isSuccess: false } as any)
    render(<TodosPage />, { wrapper: createTestWrapper() })
    expect(screen.getByText('Loading todos...')).toBeInTheDocument()
  })

  it('displays error message if query fails', () => {
    useTodosQueryMock.mockReturnValue({ isPending: false, isError: true, isSuccess: false } as any)
    render(<TodosPage />, { wrapper: createTestWrapper() })
    expect(screen.getByText('Error loading todos. Please try again later.')).toBeInTheDocument()
  })

  it('displays todos when successfully loaded', async () => {
    render(<TodosPage />, { wrapper: createTestWrapper() })
    await waitFor(() => {
      expect(screen.getByText('Learn React')).toBeInTheDocument()
      expect(screen.getByText('Build Project')).toBeInTheDocument()
    })
  })

  it('handles adding a new todo', async () => {
    const user = userEvent.setup()
    const addTodoMutate = vi.fn()
    useAddTodoMutationMock.mockReturnValue({
      mutate: addTodoMutate,
      isPending: false,
    } as any)

    render(<TodosPage />, { wrapper: createTestWrapper() })

    const input = screen.getByPlaceholderText('What needs to be done?')
    await user.type(input, 'New Task')
    await user.click(screen.getByRole('button', { name: /add/i }))

    expect(addTodoMutate).toHaveBeenCalledWith({ title: 'New Task', completed: false })
    expect(input).toHaveValue('')
  })

  it('handles toggling todo completion', async () => {
    const user = userEvent.setup()
    const updateTodoMutate = vi.fn()
    useUpdateTodoMutationMock.mockReturnValue({
      mutate: updateTodoMutate,
      isPending: false,
    } as any)

    render(<TodosPage />, { wrapper: createTestWrapper() })

    const checkbox = screen.getByLabelText('Learn React')
    await user.click(checkbox)

    expect(updateTodoMutate).toHaveBeenCalledWith({ todoId: '1', updateTodoPayload: { completed: true } })
  })

  it('handles deleting a todo', async () => {
    const user = userEvent.setup()
    const deleteTodoMutate = vi.fn()
    useDeleteTodoMutationMock.mockReturnValue({
      mutate: deleteTodoMutate,
      isPending: false,
    } as any)

    render(<TodosPage />, { wrapper: createTestWrapper() })

    // Find the delete button for the first todo
    const todoItem = screen.getByText('Learn React').closest('li')
    expect(todoItem).toBeInTheDocument()
    if (todoItem) {
      const deleteButton = within(todoItem).getByRole('button', { name: /delete/i })
      await user.click(deleteButton)
    }

    expect(deleteTodoMutate).toHaveBeenCalledWith('1')
  })

  it('handles editing a todo title', async () => {
    const user = userEvent.setup()
    const updateTodoMutate = vi.fn()
    useUpdateTodoMutationMock.mockReturnValue({
      mutate: updateTodoMutate,
      isPending: false,
    } as any)

    render(<TodosPage />, { wrapper: createTestWrapper() })

    const todoItem = screen.getByText('Learn React').closest('li')
    expect(todoItem).toBeInTheDocument()
    if (todoItem) {
      const editButton = within(todoItem).getByRole('button', { name: /edit/i })
      await user.click(editButton)
    }

    const editInput = screen.getByDisplayValue('Learn React')
    await user.clear(editInput)
    await user.type(editInput, 'Learn Advanced React')
    await user.tab() // Blur the input

    expect(updateTodoMutate).toHaveBeenCalledWith({ todoId: '1', updateTodoPayload: { title: 'Learn Advanced React' } })
  })

  it('displays "No todos yet" message when there are no todos', () => {
    useTodosQueryMock.mockReturnValue({
      data: [],
      isPending: false,
      isError: false,
      isSuccess: true,
    } as any)
    render(<TodosPage />, { wrapper: createTestWrapper() })
    expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument()
  })
})
