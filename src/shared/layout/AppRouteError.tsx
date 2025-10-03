import { Button } from '@/shared/components/Button'
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom'

function getErrorMessage(error: unknown) {
  if (isRouteErrorResponse(error)) {
    return error.statusText || `Request failed with status ${error.status}`
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'An unexpected error occurred.'
}

export function AppRouteError() {
  const navigate = useNavigate()
  const error = useRouteError()
  const message = getErrorMessage(error)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-muted/20 p-8 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Something went wrong</h1>
        <p className="max-w-md text-balance text-sm text-muted-foreground">
          {message}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button onClick={() => navigate(0)}>Try again</Button>
        <Button variant="outline" onClick={() => navigate('/', { replace: true })}>
          Go back home
        </Button>
      </div>
    </div>
  )
}
