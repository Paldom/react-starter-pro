'use client'

import { memo } from 'react'
import { Menu, User } from 'lucide-react'
import { useTranslation } from '@/i18n/client'
import { Button } from '@/shared/components/Button'
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher'
import { useUIStore } from '@/shared/store/ui'

export const Header = memo(() => {
  const toggleSidebar = useUIStore((state) => state.toggleSidebar)
  const { t } = useTranslation()

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" aria-hidden />
        </Button>
        <h1 className="text-xl font-semibold">{t('app.title')}</h1>
      </div>

      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <div className="flex items-center gap-2">
          <User className="h-5 w-5" aria-hidden />
          <span className="text-sm font-medium">John Doe</span>
        </div>
      </div>
    </header>
  )
})

Header.displayName = 'Header'