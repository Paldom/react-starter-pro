import * as React from 'react'
import {
  Check,
  ChevronDown,
  ChevronUp,
  FolderPlus,
  LogOut,
  MessageSquare,
  MoreHorizontal,
  Pencil,
  Search,
  Settings,
  SquarePen,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTranslation } from '@/i18n/client'
import { useUIStore } from '@/shared/store/ui'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Link } from 'react-router-dom'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

// Mock user data - in a real app this would come from auth context
const user = {
  name: 'Alex Johnson',
  email: 'alex@example.com',
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? '')
    .join('')
}

export function AppSidebar() {
  const { t } = useTranslation()
  const {
    projects,
    activeChatId,
    setActiveChatId,
    setSearchDialogOpen,
    setSettingsDialogOpen,
    createProject,
    createNewChat,
    renameProject,
    deleteProject,
  } = useUIStore()

  const [editingProjectId, setEditingProjectId] = React.useState<string | null>(
    null
  )
  const [editingName, setEditingName] = React.useState('')

  const handleStartEdit = (projectId: string, currentName: string) => {
    setEditingProjectId(projectId)
    setEditingName(currentName)
  }

  const handleSaveEdit = () => {
    if (editingProjectId && editingName.trim()) {
      renameProject(editingProjectId, editingName.trim())
    }
    setEditingProjectId(null)
    setEditingName('')
  }

  const handleCancelEdit = () => {
    setEditingProjectId(null)
    setEditingName('')
  }

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <img
                    src="/logo.svg"
                    alt={t('app.logoAlt')}
                    className="size-4 invert"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {t('app.name')}
                  </span>
                  <span className="truncate text-xs">{t('app.edition')}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => createProject()}>
              <FolderPlus />
              <span>{t('project.addProject')}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => setSearchDialogOpen(true)}>
              <Search />
              <span>{t('chat.searchChats')}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {projects.map((project) => (
          <Collapsible
            key={project.id}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              {/* Project Header Row */}
              <SidebarGroupLabel className="h-8 pr-0">
                <div className="flex w-full items-center gap-1">
                  {/* Chevron trigger */}
                  <CollapsibleTrigger className="flex items-center">
                    <ChevronDown className="h-3 w-3 shrink-0 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>

                  {editingProjectId === project.id ? (
                    /* Edit mode */
                    <div className="flex flex-1 items-center gap-1">
                      <Input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveEdit()
                          if (e.key === 'Escape') handleCancelEdit()
                        }}
                        className="h-6 flex-1 text-xs"
                        autoFocus
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 shrink-0"
                        onClick={handleSaveEdit}
                      >
                        <Check className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 shrink-0"
                        onClick={handleCancelEdit}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    /* Normal mode */
                    <>
                      {/* Project name */}
                      <span className="flex-1 truncate">{project.name}</span>

                      {/* Context menu */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 shrink-0 opacity-0 group-hover/collapsible:opacity-100"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          <DropdownMenuItem
                            onClick={() =>
                              handleStartEdit(project.id, project.name)
                            }
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            {t('project.editName')}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => deleteProject(project.id)}
                            disabled={projects.length <= 1}
                          >
                            <X className="mr-2 h-4 w-4" />
                            {t('project.remove')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      {/* Add new chat button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 shrink-0 opacity-0 group-hover/collapsible:opacity-100"
                        onClick={() => createNewChat(project.id)}
                      >
                        <SquarePen className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </SidebarGroupLabel>

              {/* Chat List */}
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {project.chats.map((chat) => (
                      <SidebarMenuItem key={chat.id}>
                        <SidebarMenuButton
                          isActive={chat.id === activeChatId}
                          onClick={() => setActiveChatId(chat.id)}
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span className="truncate">{chat.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>

                  <span className="flex min-w-0 flex-col text-left leading-tight">
                    <span className="truncate text-sm font-medium">
                      {user.name}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </span>

                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side="top"
                align="start"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem onClick={() => setSettingsDialogOpen(true)}>
                  <Settings className="mr-2 h-4 w-4" />
                  {t('user.settings')}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('user.logOut')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
