export type StoreProfileFromApi = {
  props: {
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
  },
  _id: string
}

export type StoreProfileType = {
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
}

export type StoreContactsFromApi = {
  props: {
    createdAt: string,
    description: string,
    email?: string
    telNum?: string
    main: boolean
    storeProfileId: string
    updatedAt: string
  },
  _id: string
}

export type StoreContacts = {
  id: string,
  createdAt: string,
  description: string,
  email?: string
  telNum?: string
  main: boolean
  storeProfileId: string
  updatedAt: string
}

export type StoreSocialsFromApi = {
  props: {
    type: string,
    createdAt: string,
    link: string,
    storeProfileId: string
  },
  _id: string
}

export type StoreSocialsType = {
  id: string,
  type: string,
  createdAt: string,
  link: string,
  storeProfileId: string
}