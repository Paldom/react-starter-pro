import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'

type Theme = 'light' | 'dark'

type UIState = {
  sidebarCollapsed: boolean
  theme: Theme
  toggleSidebar: () => void
  setTheme: (theme: Theme) => void
}

export const useUIStore = create<UIState>()(
  devtools(
    subscribeWithSelector((set) => ({
      sidebarCollapsed: false,
      theme: 'light',
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setTheme: (theme) => set({ theme }),
    })),
    { name: 'UIStore' }
  )
)