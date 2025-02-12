import { ClientProfileFromApi, ClientProfileType } from "./client-profile"
import { StoreProfileFromApi, StoreProfileType } from "./store-profile"

export type FeedbackType = {
  id: string
  description: string,
  rating: number,
  clientProfile: ClientProfileType
  storeProfile: StoreProfileType,
  createdAt: string,
  updatedAt: string
}
export type FeedbackFromApi = {
  props: FeedbackType & {
    clientProfile: ClientProfileFromApi
    storeProfile: StoreProfileFromApi,
  },
  _id: string
} 