/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
import { Button } from '@/shared/components/Button'
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom'

export function AppRouteError() {
  const navigate = useNavigate()
  const error = useRouteError()

  let message = 'An unexpected error occurred.'

  if (isRouteErrorResponse(error)) {
    message = error.statusText || `Request failed with status ${error.status}`
  } else if (error instanceof Error) {
    message = error.message
  }

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
