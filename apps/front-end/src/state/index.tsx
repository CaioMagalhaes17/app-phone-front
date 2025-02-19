import { create } from 'zustand'

type ClientInfos = {
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
}

type StoreInfos = {
  id: string
  name: string,
  profileImg: string,
  rating: number,
  email: string,
  telNum: string,
  address: string,
  location: {
    latitude: number,
    longitude: number
  }
}

const useStore = create<StateManager>((set) => {
  return {
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
      profileId: '',
      name: '',
      profileImg: '',
      address: '',
      email: '',
      telNum: '',
      rating: 0,
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
  }
})

export default useStore