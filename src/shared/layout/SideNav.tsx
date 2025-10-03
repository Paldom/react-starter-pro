import { memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Settings } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/lib/utils'
import { useUIStore } from '@/shared/store/ui'

export const SideNav = memo(() => {
  const { t } = useTranslation()
  const location = useLocation()
  const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed)

  const navItems = [
    { to: '/', label: t('nav.dashboard'), icon: LayoutDashboard },
    { to: '/settings', label: t('nav.settings'), icon: Settings },
  ] as const

  return (
    <aside
      className={cn(
        'flex flex-col border-r bg-background transition-all duration-300',
        sidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <nav className="flex-1 space-y-1 p-4" aria-label="Main navigation">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to
          const Icon = item.icon

          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" aria-hidden />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
})

SideNav.displayName = 'SideNav'