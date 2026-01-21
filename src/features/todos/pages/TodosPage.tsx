import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/Card'
import { useTodosQuery } from '../hooks/use-todos'

export function TodosPage() {
  const { t } = useTranslation()
  const todosQuery = useTodosQuery()

  if (todosQuery.isPending) {
    return (
      <section className="p-8" aria-busy>
        <p className="sr-only">{t('todos.loading')}</p>
        <div>Loading Todos...</div> {/* TODO: Replace with a skeleton loader */}
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

  const todos = todosQuery.data || []

  return (
    <section className="p-8">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold">{t('todos.title')}</h1>
        <p className="text-muted-foreground">
          {t('todos.subtitle')}
        </p>
      </header>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>{t('todos.listTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center justify-between border-b py-2 last:border-0"
                >
                  <span className={`${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {todo.title}
                  </span>
                  {todo.completed && (
                    <span className="text-sm text-green-500">{t('todos.completed')}</span>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}