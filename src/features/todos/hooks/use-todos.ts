import { useGetTodos } from '@/shared/api/generated/todos/todos'

export function useTodosQuery() {
  return useGetTodos()
}
