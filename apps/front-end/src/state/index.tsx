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
  accessToken: string
  userInfos: UserInfos
}

const useStore = create<StateManager>((set) => {
  return {
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
    accessToken: localStorage.getItem('access_token') ?? '',
    setToken: (token: string) => {
      set({
        accessToken: token
      })
    },
  }
})

export default useStore