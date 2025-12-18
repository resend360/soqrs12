import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// User Store
interface UserState {
  user: any | null
  profile: any | null
  setUser: (user: any) => void
  setProfile: (profile: any) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      profile: null,
      setUser: (user) => set({ user }),
      setProfile: (profile) => set({ profile }),
      clearUser: () => set({ user: null, profile: null }),
    }),
    {
      name: 'soqrs-user-storage',
    }
  )
)

// Location Store
interface LocationState {
  userLocation: { lat: number; lng: number } | null
  setUserLocation: (location: { lat: number; lng: number }) => void
  clearLocation: () => void
}

export const useLocationStore = create<LocationState>()((set) => ({
  userLocation: null,
  setUserLocation: (location) => set({ userLocation: location }),
  clearLocation: () => set({ userLocation: null }),
}))

// UI Store
interface UIState {
  sidebarOpen: boolean
  debugMode: boolean
  toggleSidebar: () => void
  setDebugMode: (mode: boolean) => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: false,
      debugMode: false,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setDebugMode: (mode) => set({ debugMode: mode }),
    }),
    {
      name: 'soqrs-ui-storage',
    }
  )
)

// Notification Store
interface NotificationState {
  unreadCount: number
  notifications: any[]
  setUnreadCount: (count: number) => void
  addNotification: (notification: any) => void
  markAsRead: (id: string) => void
  clearNotifications: () => void
}

export const useNotificationStore = create<NotificationState>()((set) => ({
  unreadCount: 0,
  notifications: [],
  setUnreadCount: (count) => set({ unreadCount: count }),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),
  clearNotifications: () => set({ notifications: [], unreadCount: 0 }),
}))
