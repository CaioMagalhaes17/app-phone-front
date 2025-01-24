import { useJsApiLoader } from "@react-google-maps/api"

const apiKey = "AIzaSyBX-DSPQDqatuKFxLsROeKL6WlX_iPALmk"

export function LoadGoogleApi() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries: ['places']
  })
  return isLoaded
}