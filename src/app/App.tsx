/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { RouterProvider } from 'react-router-dom'
import { AppProviders } from './providers/app-provider'
import { router } from './router/routes'
import { useLanguageEffect } from '@/shared/hooks/useLanguageEffect'

export function App() {
  useLanguageEffect()

  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  )
}