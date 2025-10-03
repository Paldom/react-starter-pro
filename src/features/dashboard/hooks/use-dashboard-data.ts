import {
  useGetDashboardStats,
  useGetDashboardChart,
} from '@/shared/api/generated/dashboard/dashboard'

export function useDashboardStatsQuery() {
  return useGetDashboardStats()
}

export function useDashboardChartQuery() {
  return useGetDashboardChart()
}