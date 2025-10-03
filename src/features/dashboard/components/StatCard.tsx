import { memo } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Card } from '@/shared/components/Card'

export type StatCardProps = {
  title: string
  value: string
  icon: LucideIcon
}

export const StatCard = memo(({ title, value, icon: Icon }: StatCardProps) => (
  <Card className="flex items-center justify-between p-6">
    <div>
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
    <Icon className="h-8 w-8 text-primary" aria-hidden />
  </Card>
))

StatCard.displayName = 'StatCard'