import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/shared/layout/AppLayout'
import { AppRouteError } from '@/shared/layout/AppRouteError'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <AppRouteError />,
    children: [
      {
        index: true,
        lazy: async () => {
          const { DashboardPage } = await import('@/features/dashboard/pages/DashboardPage')
          return { Component: DashboardPage }
        },
        errorElement: <AppRouteError />,
      },
      {
        path: 'settings',
        lazy: async () => {
          const { SettingsPage } = await import('@/features/settings/pages/SettingsPage')
          return { Component: SettingsPage }
        },
        errorElement: <AppRouteError />,
      },
    ],
  },
])
