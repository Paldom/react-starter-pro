import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Trash2,
  X,
  FileText,
} from 'lucide-react'
import { useTranslation } from '@/i18n/client'
import {
  useUIStore,
  type Document,
  type DocumentStatus,
} from '@/shared/store/ui'
import { Button } from '@/components/ui/button'
import { Dropzone } from '@/components/ui/dropzone'
import { cn } from '@/lib/utils'
import type { TFunction } from 'i18next'

function formatFileSize(bytes: number, t: TFunction): string {
  if (bytes === 0) return `0 ${t('common.units.byte')}`
  const k = 1024
  const sizes = [
    t('common.units.byte'),
    t('common.units.kilobyte'),
    t('common.units.megabyte'),
    t('common.units.gigabyte'),
  ]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

type StatusIconProps = Readonly<{ status: DocumentStatus }>

function StatusIcon({ status }: StatusIconProps) {
  switch (status) {
    case 'pending':
      return <Clock className="h-4 w-4 animate-pulse text-yellow-500" />
    case 'ingested':
      return <CheckCircle2 className="h-4 w-4 text-green-500" />
    case 'error':
      return <AlertCircle className="h-4 w-4 text-destructive" />
  }
}

type DocumentItemProps = Readonly<{
  document: Document
  formatSize: (bytes: number) => string
  removeLabel: string
}>

function DocumentItem({
  document,
  formatSize,
  removeLabel,
}: DocumentItemProps) {
  const { removeDocument } = useUIStore()

  return (
    <div className="group flex items-center gap-3 rounded-md border bg-card p-3">
      <FileText className="h-5 w-5 shrink-0 text-muted-foreground" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{document.name}</p>
        <p className="text-xs text-muted-foreground">
          {formatSize(document.size)}
        </p>
      </div>
      <StatusIcon status={document.status} />
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
        onClick={() => removeDocument(document.id)}
      >
        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
        <span className="sr-only">{removeLabel}</span>
      </Button>
    </div>
  )
}

export function DocumentSidebar() {
  const { t } = useTranslation()
  const {
    documents,
    documentSidebarOpen,
    setDocumentSidebarOpen,
    addDocument,
  } = useUIStore()
  const formatSize = (bytes: number) => formatFileSize(bytes, t)

  const handleFilesAdded = (files: File[]) => {
    files.forEach((file) => addDocument(file))
  }

  if (!documentSidebarOpen) return null

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <span className="text-sm font-semibold">{t('document.title')}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => setDocumentSidebarOpen(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">{t('common.close')}</span>
        </Button>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden p-4">
        {documents.length > 0 && (
          <div className="mb-4 shrink-0 space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              {t('document.addedDocuments')} ({documents.length})
            </h3>
            <div className="space-y-2 overflow-y-auto">
              {documents.map((doc) => (
                <DocumentItem
                  key={doc.id}
                  document={doc}
                  formatSize={formatSize}
                  removeLabel={t('document.removeDocument')}
                />
              ))}
            </div>
          </div>
        )}

        <div
          className={cn(
            'flex min-h-0 flex-1 flex-col',
            documents.length > 0 && 'mt-4'
          )}
        >
          <h3 className="mb-2 shrink-0 text-sm font-medium text-muted-foreground">
            {t('document.uploadNew')}
          </h3>
          <Dropzone
            onFilesAdded={handleFilesAdded}
            accept=".pdf,.doc,.docx,.txt,.md"
            className="flex-1"
            labels={{
              idle: t('document.dropzoneIdle'),
              active: t('document.dropzoneActive'),
              accepted: t('document.dropzoneAccepted'),
            }}
          />
        </div>
      </div>
    </div>
  )
}
