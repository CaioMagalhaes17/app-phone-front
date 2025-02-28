import { StoreContactsFromApi, StoreProfileFromApi } from "./store-profile";

export type StoresInsideRadiusFromApi = {
  GeoLocation: { props: { latitude: number; longitude: number; }, _id: string }
  Profile: StoreProfileFromApi & { storeProfileContacts: StoreContactsFromApi[], _id: string }
  _id: string
}

export type StoresInsideRadiusType = {
  geolocation: { latitude: number; longitude: number; }
  profile: any
}