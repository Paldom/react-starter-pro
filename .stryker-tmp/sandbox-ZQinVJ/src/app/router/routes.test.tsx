// @ts-nocheck
import { describe, expect, it } from 'vitest'
import { router } from './routes'

describe('router configuration', () => {
  it('defines root, dashboard, and settings routes with lazy components', async () => {
    const rootRoute = router.routes[0]
    expect(rootRoute.path).toBe('/')
    expect(rootRoute.children?.length).toBeGreaterThanOrEqual(2)

    const dashboardRoute = rootRoute.children?.find((child) => child.index)
    const settingsRoute = rootRoute.children?.find((child) => child.path === 'settings')

    expect(dashboardRoute?.lazy).toBeDefined()
    expect(settingsRoute?.lazy).toBeDefined()

    const dashboardLazy = await dashboardRoute?.lazy?.()
    const settingsLazy = await settingsRoute?.lazy?.()

    expect(dashboardLazy?.Component).toBeTruthy()
    expect(settingsLazy?.Component).toBeTruthy()
  })
})
