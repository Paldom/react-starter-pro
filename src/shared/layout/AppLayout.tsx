import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { SideNav } from './SideNav'

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <SideNav />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}