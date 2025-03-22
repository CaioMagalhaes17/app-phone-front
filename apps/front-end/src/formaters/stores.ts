import { GeolocationFromApi, GeolocationType } from "../types/geolocation";
import { StoresInsideRadiusFromApi, StoresInsideRadiusType } from "../types/stores";
import { formatStoreContact, formatStoreProfile } from "./store-profile";

export function formatStoresInsideRadius(stores: StoresInsideRadiusFromApi[]): StoresInsideRadiusType[] {
  return stores.map((store) => formatStoreInsideRadius(store));
}
export function formatStoreInsideRadius(item: StoresInsideRadiusFromApi): StoresInsideRadiusType {
  return {
    id: item._id,
    contacts: formatStoreContact(item.contacts),
    location: formatGeolocation(item.location),
    profile: formatStoreProfile(item.profile),
    distance: item.distance
  }
}


export function formatGeolocation(geolocation: GeolocationFromApi): GeolocationType {
  return {
    id: geolocation._id,
    latitude: geolocation.props.latitude,
    longitude: geolocation.props.longitude,
    radius: geolocation.props.radius,
  }
}