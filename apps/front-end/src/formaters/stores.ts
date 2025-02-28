import { GeolocationFromApi, GeolocationType } from "../types/geolocation";
import { StoresInsideRadiusFromApi, StoresInsideRadiusType } from "../types/stores";
import { formatStoreProfile } from "./store-profile";

export function formatStoresInsideRadius(stores: StoresInsideRadiusFromApi[]): StoresInsideRadiusType[] {
  return stores.map((store) => formatStoreInsideRadius(store));
}
export function formatStoreInsideRadius(store: StoresInsideRadiusFromApi): StoresInsideRadiusType {
  return {
    geolocation: formatGeolocation(store.GeoLocation),
    profile: formatStoreProfile(store.Profile)
  }
}


export function formatGeolocation(geolocation: GeolocationFromApi): GeolocationType {
  return {
    id: geolocation._id,
    latitude: geolocation.props.latitude,
    longitude: geolocation.props.longitude,
    radius: geolocation.props.radius
  }
}