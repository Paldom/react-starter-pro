import { type ReactNode } from 'react'
import {
  AssistantRuntimeProvider,
  ThreadPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
} from '@assistant-ui/react'
import { useAppLangGraphRuntime } from '@/lib/langgraph-runtime'
import { cn } from '@/lib/utils'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

function ThreadMessages() {
  return (
    <ThreadPrimitive.Messages
      components={{
        UserMessage: UserMessage,
        AssistantMessage: AssistantMessage,
      }}
    />
  )
}

function UserMessage() {
  return (
    <MessagePrimitive.Root className="flex justify-end py-2">
      <div className="max-w-[80%] rounded-lg bg-primary px-4 py-2 text-primary-foreground">
        <MessagePrimitive.Content />
      </div>
    </MessagePrimitive.Root>
  )
}

function AssistantMessage() {
  return (
    <MessagePrimitive.Root className="flex justify-start py-2">
      <div className="max-w-[80%] rounded-lg bg-muted px-4 py-2">
        <MessagePrimitive.Content />
      </div>
    </MessagePrimitive.Root>
  )
}

function Composer() {
  return (
    <ComposerPrimitive.Root className="flex items-end gap-2 border-t bg-background p-4">
      <ComposerPrimitive.Input
        placeholder="Type a message..."
        className="flex-1 resize-none rounded-lg border bg-transparent px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        autoFocus
      />
      <ComposerPrimitive.Send asChild>
        <Button size="icon" className="shrink-0">
          <Send className="h-4 w-4" />
        </Button>
      </ComposerPrimitive.Send>
    </ComposerPrimitive.Root>
  )
}

function ThreadEmpty() {
  return (
    <ThreadPrimitive.Empty>
      <div className="flex h-full items-center justify-center">
        <p className="text-center text-sm text-muted-foreground">
          Start a conversation by typing a message below.
        </p>
      </div>
    </ThreadPrimitive.Empty>
  )
}

// Provider component - should be placed high in the tree to persist state
type AssistantProviderProps = Readonly<{ children: ReactNode }>

export function AssistantProvider({ children }: AssistantProviderProps) {
  const runtime = useAppLangGraphRuntime()

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  )
}

// Thread UI component - can be mounted/unmounted without losing state
type AssistantThreadProps = Readonly<{ className?: string }>

export function AssistantThread({ className }: AssistantThreadProps) {
  return (
    <ThreadPrimitive.Root className={cn('flex h-full flex-col', className)}>
      <ThreadPrimitive.Viewport className="flex-1 overflow-y-auto p-4">
        <ThreadEmpty />
        <ThreadMessages />
      </ThreadPrimitive.Viewport>
      <Composer />
    </ThreadPrimitive.Root>
  )
}
