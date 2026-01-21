import { useTranslation } from 'react-i18next'
import { PlusCircle, Loader2, Edit, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/Card'
import { Button } from '@/shared/components/Button'
import { Input } from '@/shared/components/Input'
import { Checkbox } from '@/components/ui/checkbox' // Assuming shadcn checkbox component
import {
  useTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from '../hooks/use-todos'
import { Todo } from '@/shared/api/generated/models' // Assuming Todo type is generated here

export function TodosPage() {
  const { t } = useTranslation()
  const [newTodoTitle, setNewTodoTitle] = useState('')
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null)
  const [editingTodoTitle, setEditingTodoTitle] = useState('')

  const todosQuery = useTodosQuery()
  const addTodoMutation = useAddTodoMutation()
  const updateTodoMutation = useUpdateTodoMutation()
  const deleteTodoMutation = useDeleteTodoMutation()

  const handleAddTodo = () => {
    if (newTodoTitle.trim()) {
      addTodoMutation.mutate({ title: newTodoTitle, completed: false })
      setNewTodoTitle('')
    }
  }

  const handleToggleComplete = (todo: Todo) => {
    updateTodoMutation.mutate({ todoId: todo.id, updateTodoPayload: { completed: !todo.completed } })
  }

  const handleStartEditing = (todo: Todo) => {
    setEditingTodoId(todo.id)
    setEditingTodoTitle(todo.title)
  }

  const handleSaveEdit = (todoId: string) => {
    if (editingTodoTitle.trim()) {
      updateTodoMutation.mutate({ todoId, updateTodoPayload: { title: editingTodoTitle } })
      setEditingTodoId(null)
      setEditingTodoTitle('')
    }
  }

  const handleCancelEdit = () => {
    setEditingTodoId(null)
    setEditingTodoTitle('')
  }

  const handleDeleteTodo = (todoId: string) => {
    deleteTodoMutation.mutate(todoId)
  }

  if (todosQuery.isPending) {
    return (
      <section className="p-8" aria-busy>
        <p className="sr-only">{t('todos.loading')}</p>
        <div className="flex justify-center items-center h-48">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </section>
    )
  }

  if (todosQuery.isError) {
    return (
      <section className="p-8">
        <div role="alert" className="rounded-md border border-destructive bg-destructive/10 p-4 text-destructive">
          {t('todos.error')}
        </div>
      </section>
    )
  }

  const todos: Todo[] = todosQuery.data || []

  return (
    <section className="p-8">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold">{t('todos.title')}</h1>
        <p className="text-muted-foreground">{t('todos.subtitle')}</p>
      </header>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{t('todos.addTodo')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder={t('todos.newTodoPlaceholder')}
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddTodo()
                }
              }}
              disabled={addTodoMutation.isPending}
            />
            <Button onClick={handleAddTodo} disabled={addTodoMutation.isPending}>
              {addTodoMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <PlusCircle className="mr-2 h-4 w-4" />
              )}
              {t('todos.add')}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('todos.myTodos')}</CardTitle>
        </CardHeader>
        <CardContent>
          {todos.length === 0 ? (
            <p className="text-muted-foreground">{t('todos.noTodos')}</p>
          ) : (
            <ul className="space-y-4">
              {todos.map((todo) => (
                <li key={todo.id} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id={`todo-${todo.id}`}
                      checked={todo.completed}
                      onCheckedChange={() => handleToggleComplete(todo)}
                      disabled={updateTodoMutation.isPending && editingTodoId !== todo.id}
                    />
                    {editingTodoId === todo.id ? (
                      <Input
                        value={editingTodoTitle}
                        onChange={(e) => setEditingTodoTitle(e.target.value)}
                        onBlur={() => handleSaveEdit(todo.id)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleSaveEdit(todo.id)
                          }
                          if (e.key === 'Escape') {
                            handleCancelEdit()
                          }
                        }}
                        autoFocus
                        disabled={updateTodoMutation.isPending}
                        className="text-lg"
                      />
                    ) : (
                      <label
                        htmlFor={`todo-${todo.id}`}
                        className={`text-lg font-medium ${todo.completed ? 'line-through text-muted-foreground' : ''
                          }`}
                      >
                        {todo.title}
                      </label>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {editingTodoId === todo.id ? (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleSaveEdit(todo.id)}
                          disabled={updateTodoMutation.isPending}
                        >
                          {updateTodoMutation.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Edit className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleCancelEdit}
                          disabled={updateTodoMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4" /> {/* Using Trash2 for cancel icon for now */}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="ghost" size="icon" onClick={() => handleStartEditing(todo)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteTodo(todo.id)}
                          disabled={deleteTodoMutation.isPending}
                        >
                          {deleteTodoMutation.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
