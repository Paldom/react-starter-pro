import '@testing-library/jest-dom/vitest'
import React from 'react'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { vi } from 'vitest'
import { server } from '@/mocks/server'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Initialize i18next for tests
void i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  resources: {
    en: {
      common: {
        app: { title: 'React Advanced App' },
        nav: { dashboard: 'Dashboard', settings: 'Settings' },
        dashboard: {
          title: 'Dashboard',
          subtitle: 'Welcome back! Here is your overview.',
          loading: 'Loading dashboard data...',
          error: 'Error loading dashboard data. Please try again later.',
          totalRevenue: 'Total Revenue',
          subscriptions: 'Subscriptions',
          sales: 'Sales',
          activeUsers: 'Active Users',
          monthlyOverview: 'Monthly Overview',
        },
        settings: {
          title: 'Settings',
          subtitle: 'Manage your account settings and preferences.',
          loading: 'Loading settings...',
          error: 'Error loading settings. Please try again later.',
          profileSettings: 'Profile Settings',
          name: 'Name',
          email: 'Email',
          notifications: 'Enable notifications',
          validation: {
            nameRequired: 'Name is required',
            emailInvalid: 'Invalid email address',
          },
          updateSuccess: 'Settings updated successfully!',
          updateError: 'Failed to update settings. Please try again.',
          saveChanges: 'Save Changes',
          saving: 'Saving...',
        },
        common: {
          loading: 'Loading...',
          error: 'An error occurred',
        },
      },
    },
  },
  interpolation: { escapeValue: false },
})

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}))

vi.mock('next/link', () => {
  return {
    __esModule: true,
    default: React.forwardRef<
      HTMLAnchorElement,
      React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
    >(({ href, ...props }, ref) => React.createElement('a', { ref, href, ...props })),
  }
})

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())