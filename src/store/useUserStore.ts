import type { User } from '@/domain/model/User'
import { create } from 'zustand'

type UserStore = {
  user: User | null
  getUser: () => User | string
  setUser: (user: User) => void
  removeUser: () => void
}

export const useUserStore = create<UserStore>()((set, get) => ({
  user: null,

  getUser: () => {
    const user = get().user
    return user ? user : "No user found."
  },

  setUser: (user: User | null) => {
    set(() => { 
      return { user }
    })
  },

  removeUser: () => {
   set(() => { 
      return { user: null }
    })
  }
})
)