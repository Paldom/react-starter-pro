import { FilePlus2, MoreHorizontal, Share2 } from 'lucide-react'
import { useTranslation } from '@/i18n/client'
import { useUIStore } from '@/shared/store/ui'
import { LanguageSwitcher } from '@/components/language-switcher'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

export function AppHeader() {
  const { t } = useTranslation()
  const {
    projects,
    activeChatId,
    renameChat,
    duplicateChat,
    deleteChat,
    toggleDocumentSidebar,
    documentSidebarOpen,
  } = useUIStore()

  // Find active chat and its project for breadcrumb
  const activeData = (() => {
    for (const project of projects) {
      const chat = project.chats.find((c) => c.id === activeChatId)
      if (chat) {
        return { project, chat }
      }
    }
    return null
  })()

  const handleRename = () => {
    if (!activeData) return
    const newTitle = globalThis.prompt(t('chat.rename'), activeData.chat.title)
    if (newTitle && newTitle !== activeData.chat.title) {
      renameChat(activeData.chat.id, newTitle)
    }
  }

  const handleDuplicate = () => {
    if (!activeData) return
    duplicateChat(activeData.chat.id)
  }

  const handleDelete = () => {
    if (!activeData) return
    if (globalThis.confirm(t('chat.confirmDelete'))) {
      deleteChat(activeData.chat.id)
    }
  }

  return (
    <header className="flex h-14 items-center justify-between border-b px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-6" />
        <Breadcrumb>
          <BreadcrumbList>
            {activeData ? (
              <>
                <BreadcrumbItem>{activeData.project.name}</BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="max-w-[28ch] truncate">
                    {activeData.chat.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbPage>{t('app.title')}</BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-2">
        <LanguageSwitcher />

        <Button
          variant={documentSidebarOpen ? 'secondary' : 'outline'}
          size="sm"
          onClick={toggleDocumentSidebar}
        >
          <FilePlus2 className="mr-2 h-4 w-4" />
          {t('document.addDocument')}
        </Button>

        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          {t('chat.share')}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">{t('common.openMenu')}</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleRename} disabled={!activeData}>
              {t('chat.rename')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDuplicate} disabled={!activeData}>
              {t('chat.duplicate')}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={handleDelete}
              disabled={!activeData}
            >
              {t('chat.delete')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
