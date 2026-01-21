import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getTodos,
  createTodo,
  getTodoById,
  updateTodoById,
  deleteTodoById,
} from '@/shared/api/generated/todos/todos'
import { CreateTodoPayload, UpdateTodoPayload } from '@/shared/api/generated/models'

const queryKeys = {
  todos: ['todos'],
  todo: (todoId: string) => ['todos', todoId],
}

export function useTodosQuery() {
  return useQuery({
    queryKey: queryKeys.todos,
    queryFn: getTodos,
  })
}

export function useTodoQuery(todoId: string) {
  return useQuery({
    queryKey: queryKeys.todo(todoId),
    queryFn: () => getTodoById(todoId),
    enabled: !!todoId,
  })
}

export function useAddTodoMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (newTodo: CreateTodoPayload) => createTodo(newTodo),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.todos })
    },
  })
}

export function useUpdateTodoMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ todoId, updateTodoPayload }: { todoId: string; updateTodoPayload: UpdateTodoPayload }) =>
      updateTodoById(todoId, updateTodoPayload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.todos })
    },
  })
}

export function useDeleteTodoMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (todoId: string) => deleteTodoById(todoId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.todos })
    },
  })
}