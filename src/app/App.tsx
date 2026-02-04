import { RouterProvider } from 'react-router-dom'
import { AppProviders } from './providers/app-provider'
import { router } from './router/routes'
import { useLanguageEffect } from '@/app/hooks/useLanguageEffect'
import { useThemeEffect } from '@/app/hooks/useThemeEffect'

export function App() {
  useLanguageEffect()
  useThemeEffect()

  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  )
}
