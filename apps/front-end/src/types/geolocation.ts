export type GeolocationFromApi = {
  props: {
    latitude: number,
    longitude: number,
    radius?: number
  }
  _id: string
}

export type GeolocationType = {
  id?: string
  latitude: number,
  longitude: number,
  radius?: number
}