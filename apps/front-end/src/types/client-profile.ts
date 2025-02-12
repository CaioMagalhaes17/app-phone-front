export type ClientProfileType = {
  id?: string
  createdAt?: string,
  updatedAt?: string,
  email: string,
  name: string,
  telNum: string,
  userId: string
}

export type ClientProfileFromApi = {
  props: ClientProfileType,
  _id: string
}