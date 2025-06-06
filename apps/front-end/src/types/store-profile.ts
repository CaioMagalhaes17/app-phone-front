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
    tags?: string[]
    workingTime?: string
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
  tags?: string[]
  workingTime?: string
}

export type StoreContactsFromApi = {
  props: {
    wppNum: string
    createdAt: string,
    description: string,
    email?: string
    telNum?: string
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
  wppNum: string
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