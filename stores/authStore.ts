import Cookies from 'js-cookie'
import { create } from 'zustand'

const ACCESS_TOKEN = 'thisisjustarandomstring'

interface AuthUser {
  email: string
  exp: number
  accessToken: string
}

interface AuthState {
  user: AuthUser | null
  setUser: (user: AuthUser | null) => void
  logOut: () => void
}

export const useAuthStore = create<AuthState>()((set) => {
  const cookieState = Cookies.get(ACCESS_TOKEN)
  const initToken = cookieState ? JSON.parse(cookieState) : ''
  return {
    user: null,
    setUser: (user) =>
      set((state) => ({ ...state, user })),
    logOut: () => {
      Cookies.remove(ACCESS_TOKEN)
      set((state) => ({ ...state, user: null }))
    }
  }
})

export const useAuth = () => useAuthStore((state) => state)
