import { Suspense, type ReactNode } from 'react'
import { QueryClientProviderWithClient } from './query-client-provider'

export type AppProvidersProps = {
  readonly children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProviderWithClient>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <p>Loading application...</p>
          </div>
        }
      >
        {children}
      </Suspense>
    </QueryClientProviderWithClient>
  )
}