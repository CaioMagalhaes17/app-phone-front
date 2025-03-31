import { create } from 'zustand'

type ClientInfos = {
  id: string,
  name: string,
  profileImg: string,
  location: {
    latitude: number,
    longitude: number,
    radius: number
  }
}

type UserInfos = {
  isStore: boolean
}

type StateManager = {
  clientInfos: ClientInfos
  setClientInfos: (clientInfos: ClientInfos) => void
  setStoreInfos: (storeInfos: StoreInfos) => void
  accessToken: string
  userInfos: UserInfos
  storeInfos: StoreInfos
  isMapLoaded: boolean
  closeSidebar: boolean
  setCloseSidebar: (closeSidebar: boolean) => void
  setIsMapLoaded: (isMapLoaded: boolean) => void
  theme: 'dark' | 'light'
  setTheme: (theme: 'dark' | 'light') => void
  load: () => Promise<void>
  baseBackendUrl: string,
  setBaseBackendUrl: (baseUrl: string) => void
}

type StoreInfos = {
  id: string
  address: string,
  description: string
  email: string,
  name: string
  profileImg: string,
  telNum: string,
  createdAt: string
  updatedAt: string
  userId: string
  rating: number
  tags: string[]
  workingTime: string
  subscriptionPlanId: string
  location: {
    latitude: number,
    longitude: number
  }
}


const useStore = create<StateManager>((set, get) => {
  return {
    theme: (localStorage.getItem('theme') as 'dark' | 'light') || 'light',
    setTheme: (theme: 'dark' | 'light') => {
      const stateTheme = theme || get().theme
      localStorage.setItem('theme', stateTheme)
      set({
        theme,
      })
      if (theme === 'dark') {
        document.querySelector('body')?.classList.add('dark')
      } else if (theme === 'light') {
        document.querySelector('body')?.classList.remove('dark')
      }
    },
    closeSidebar: false,
    setCloseSidebar: (closeSidebar: boolean) => {
      set({
        closeSidebar
      })
    },
    userInfos: {
      isStore: false
    },
    setUserInfos: (userInfos: UserInfos) => {
      set({
        userInfos
      })
    },
    clientInfos: {
      id: '',
      name: '',
      profileImg: '',
      location: {
        latitude: 0,
        longitude: 0,
        radius: 0
      }
    },
    setClientInfos: (clientInfos: ClientInfos) => {
      set({
        clientInfos
      })
    },
    storeInfos: {
      id: '',
      address: '',
      description: '',
      email: '',
      name: '',
      profileImg: '',
      telNum: '',
      createdAt: '',
      updatedAt: '',
      userId: '',
      rating: 0,
      tags: [],
      workingTime: '',
      subscriptionPlanId: '',
      location: {
        latitude: 0,
        longitude: 0,
      }
    },
    setStoreInfos: (storeInfos: StoreInfos) => {
      set({
        storeInfos
      })
    },
    accessToken: localStorage.getItem('access_token') ?? '',
    setToken: (token: string) => {
      set({
        accessToken: token
      })
    },
    isMapLoaded: false,
    setIsMapLoaded: (isMapLoaded: boolean) => {
      set({
        isMapLoaded
      })
    },
    load: async () => {
      const theme = get().theme
      if (theme) {
        if (theme === 'dark') {
          document.querySelector('body')?.classList.add('dark')
        } else if (theme === 'light') {

          document.querySelector('body')?.classList.remove('dark')
        }
      }
    },
    baseBackendUrl: 'https://nest-domain-driven-design.fly.dev/',
    setBaseBackendUrl: (baseBackendUrl: string) => {
      set({
        baseBackendUrl
      })
    }
  }
})

export default useStore