import * as React from 'react'
import { MessageSquare } from 'lucide-react'
import { useTranslation } from '@/i18n/client'
import { useUIStore } from '@/shared/store/ui'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

export function ChatSearchDialog() {
  const { t } = useTranslation()
  const { searchDialogOpen, setSearchDialogOpen, projects, setActiveChatId } =
    useUIStore()

  // Keyboard shortcut: Ctrl/Cmd + K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchDialogOpen(!searchDialogOpen)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [searchDialogOpen, setSearchDialogOpen])

  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId)
    setSearchDialogOpen(false)
  }

  return (
    <CommandDialog open={searchDialogOpen} onOpenChange={setSearchDialogOpen}>
      <CommandInput placeholder={t('chat.searchPlaceholder')} />
      <CommandList>
        <CommandEmpty>{t('chat.noResults')}</CommandEmpty>

        {projects.map((project) => (
          <CommandGroup key={project.id} heading={project.name}>
            {project.chats.map((chat) => (
              <CommandItem
                key={chat.id}
                value={`${chat.title} ${project.name}`}
                onSelect={() => handleSelectChat(chat.id)}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                <span className="truncate">{chat.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  )
}
