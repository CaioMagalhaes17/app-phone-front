import { GeolocationFromApi, GeolocationType } from "./geolocation";
import { StoreContacts, StoreContactsFromApi, StoreProfileFromApi, StoreProfileType } from "./store-profile";

export type StoresInsideRadiusFromApi = {
  location: GeolocationFromApi
  profile: StoreProfileFromApi
  contacts: StoreContactsFromApi
  distance: number
  _id: string
}

export type StoresInsideRadiusType = {
  id: string,
  location: GeolocationType
  profile: StoreProfileType
  contacts: StoreContacts
  distance: number
}