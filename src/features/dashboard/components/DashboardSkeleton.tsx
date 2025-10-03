import { memo } from 'react'
import { Card } from '@/shared/components/Card'

export const DashboardSkeleton = memo(() => (
  <div className="space-y-6">
    <div className="h-8 w-1/4 animate-pulse rounded bg-muted" />
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }, (_, index) => (
        <Card key={`skeleton-${index}`} className="h-32 animate-pulse bg-muted" aria-hidden />
      ))}
    </div>
    <Card className="h-64 animate-pulse bg-muted" aria-hidden />
  </div>
))

DashboardSkeleton.displayName = 'DashboardSkeleton'