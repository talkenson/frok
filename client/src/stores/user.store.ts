import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type UIStore = {
  nick: string
  setNick: (newNick: string) => void
}

export const useUserStore = create<UIStore>()(
  devtools(
    persist(
      (set, get) => ({
        nick: '',
        setNick: (newNick: string) => {
          set(state => {
            return { ...state, nick: newNick }
          })
        },
      }),
      {
        name: 'user-config-store',
      },
    ),
  ),
)
