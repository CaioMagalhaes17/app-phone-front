import { GoogleMaps, GoogleMapsProps, GoogleMarker, GoogleMarkerProps } from "./lib/GoogleMap";

export function MapAdapter({ initialPosition, children }: GoogleMapsProps) {
  return <GoogleMaps initialPosition={initialPosition}>{children}</GoogleMaps>
}

export function MarkAdapter({ position }: GoogleMarkerProps) {
  return <GoogleMarker position={position} />
}