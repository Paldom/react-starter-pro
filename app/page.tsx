'use client'

import { BarChart3, User, DollarSign, ShoppingCart } from 'lucide-react'
import { useTranslation } from '@/i18n/client'
import { StatCard } from '@/features/dashboard/components/StatCard'
import { DashboardSkeleton } from '@/features/dashboard/components/DashboardSkeleton'
import { useDashboardStatsQuery, useDashboardChartQuery } from '@/features/dashboard/hooks/use-dashboard-data'
import { formatCurrency, formatNumber } from '@/shared/lib/utils'
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/Card'

export default function DashboardPage() {
  const { t, i18n } = useTranslation()
  const locale = i18n.resolvedLanguage ?? i18n.language ?? 'en-US'
  const statsQuery = useDashboardStatsQuery()
  const chartQuery = useDashboardChartQuery()

  if (statsQuery.isPending || chartQuery.isPending) {
    return (
      <section className="p-8" aria-busy>
        <p className="sr-only">{t('dashboard.loading')}</p>
        <DashboardSkeleton />
      </section>
    )
  }

  if (statsQuery.isError || chartQuery.isError) {
    return (
      <section className="p-8">
        <div role="alert" className="rounded-md border border-destructive bg-destructive/10 p-4 text-destructive">
          {t('dashboard.error')}
        </div>
      </section>
    )
  }

  const stats = statsQuery.data
  const chartData = chartQuery.data || []

  return (
    <section className="p-8">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold">{t('dashboard.title')}</h1>
        <p className="text-muted-foreground">
          {t('dashboard.subtitle')}
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={t('dashboard.totalRevenue')}
          value={formatCurrency(stats.totalRevenue, locale)}
          icon={DollarSign}
        />
        <StatCard
          title={t('dashboard.subscriptions')}
          value={formatNumber(stats.subscriptions, locale)}
          icon={User}
        />
        <StatCard
          title={t('dashboard.sales')}
          value={formatNumber(stats.sales, locale)}
          icon={ShoppingCart}
        />
        <StatCard
          title={t('dashboard.activeUsers')}
          value={formatNumber(stats.activeUsers, locale)}
          icon={BarChart3}
        />
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.monthlyOverview')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {chartData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between border-b py-2 last:border-0"
                >
                  <span className="font-medium">{item.name}</span>
                  <span className="text-muted-foreground">
                    {formatNumber(item.value, locale)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
