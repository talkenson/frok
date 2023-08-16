import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export type GlobalSection = 'contacts' | 'messenger' | 'profile'

type UIStore = {
  page: {
    title?: string
    subtitle?: string
  }
  section: {
    active: GlobalSection
  }
  setPageTitle: (netTitle: string) => void
  setPageSubtitle: (netSubtitle: string) => void
  setActiveSection: (newSection: GlobalSection) => void
}

export const useUIStore = create<UIStore>()(
  devtools(
    persist(
      (set, get) => ({
        page: {
          title: undefined,
          subtitle: undefined,
        },
        section: {
          active: 'messenger',
        },
        setPageTitle: (newTitle: string) => {
          set(state => {
            state.page.title = newTitle
            return state
          })
        },
        setPageSubtitle: (newSubtitle: string) => {
          set(state => {
            state.page.subtitle = newSubtitle
            return state
          })
        },
        setActiveSection: (newSection: GlobalSection) => {
          set(state => {
            state.section.active = newSection
            return state
          })
        },
      }),
      {
        name: 'ui-content-store',
      },
    ),
  ),
)
