import { type ReactNode } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  useTodosQuery,
  useTodoQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from './use-todos'
import * as todosApi from '@/shared/api/generated/todos/todos' // Import all exports from the API file
import { Todo } from '@/shared/api/generated/models'

// Mock the API calls
vi.mock('@/shared/api/generated/todos/todos', () => ({
  getTodos: vi.fn(() => Promise.resolve([])),
  createTodo: vi.fn(() => Promise.resolve({} as Todo)),
  getTodoById: vi.fn(() => Promise.resolve({} as Todo)),
  updateTodoById: vi.fn(() => Promise.resolve({} as Todo)),
  deleteTodoById: vi.fn(() => Promise.resolve(undefined)),
}))

const mockGetTodos = vi.mocked(todosApi.getTodos)
const mockCreateTodo = vi.mocked(todosApi.createTodo)
const mockGetTodoById = vi.mocked(todosApi.getTodoById)
const mockUpdateTodoById = vi.mocked(todosApi.updateTodoById)
const mockDeleteTodoById = vi.mocked(todosApi.deleteTodoById)

function createTestWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('useTodosQuery', () => {
  beforeEach(() => {
    mockGetTodos.mockResolvedValue([
      { id: '1', title: 'Test Todo 1', completed: false },
      { id: '2', title: 'Test Todo 2', completed: true },
    ])
  })

  it('fetches todos successfully', async () => {
    const { result } = renderHook(() => useTodosQuery(), { wrapper: createTestWrapper() })

    expect(result.current.isPending).toBe(true)
    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual([
      { id: '1', title: 'Test Todo 1', completed: false },
      { id: '2', title: 'Test Todo 2', completed: true },
    ])
    expect(mockGetTodos).toHaveBeenCalledTimes(1)
  })
})

describe('useTodoQuery', () => {
  beforeEach(() => {
    mockGetTodoById.mockResolvedValue({ id: '1', title: 'Single Todo', completed: false })
  })

  it('fetches a single todo successfully', async () => {
    const { result } = renderHook(() => useTodoQuery('1'), { wrapper: createTestWrapper() })

    expect(result.current.isPending).toBe(true)
    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual({ id: '1', title: 'Single Todo', completed: false })
    expect(mockGetTodoById).toHaveBeenCalledWith('1')
  })

  it('does not fetch if todoId is not provided', async () => {
    const { result } = renderHook(() => useTodoQuery(''), { wrapper: createTestWrapper() })

    expect(result.current.isIdle).toBe(true) // or isPaused
    expect(result.current.data).toBeUndefined()
    expect(mockGetTodoById).not.toHaveBeenCalled()
  })
})

describe('useAddTodoMutation', () => {
  it('adds a new todo successfully', async () => {
    const newTodo = { title: 'New Todo', completed: false }
    const createdTodo = { id: '3', ...newTodo }
    mockCreateTodo.mockResolvedValue(createdTodo)

    const { result } = renderHook(() => useAddTodoMutation(), { wrapper: createTestWrapper() })

    result.current.mutate(newTodo)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(mockCreateTodo).toHaveBeenCalledWith(newTodo)
  })
})

describe('useUpdateTodoMutation', () => {
  it('updates an existing todo successfully', async () => {
    const updatedTodo = { title: 'Updated Todo', completed: true }
    mockUpdateTodoById.mockResolvedValue({ id: '1', ...updatedTodo })

    const { result } = renderHook(() => useUpdateTodoMutation(), { wrapper: createTestWrapper() })

    result.current.mutate({ todoId: '1', updateTodoPayload: updatedTodo })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(mockUpdateTodoById).toHaveBeenCalledWith('1', updatedTodo)
  })
})

describe('useDeleteTodoMutation', () => {
  it('deletes a todo successfully', async () => {
    mockDeleteTodoById.mockResolvedValue(undefined)

    const { result } = renderHook(() => useDeleteTodoMutation(), { wrapper: createTestWrapper() })

    result.current.mutate('1')

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(mockDeleteTodoById).toHaveBeenCalledWith('1')
  })
})
