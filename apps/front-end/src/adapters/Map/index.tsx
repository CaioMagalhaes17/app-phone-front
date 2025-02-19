import { GoogleAutoComplete, GoogleAutoCompleteProps, GoogleCirceProps, GoogleCircle, GoogleInfoWindow, GoogleInfoWindowProps, GoogleMaps, GoogleMapsProps, GoogleMarker, GoogleMarkerProps } from "./lib/GoogleMap";

export function MapAdapter({ initialPosition, children, mapStyle }: GoogleMapsProps) {
  return <GoogleMaps mapStyle={mapStyle} initialPosition={initialPosition}>{children}</GoogleMaps>
}

export function MarkAdapter({ position, onClick, icon }: GoogleMarkerProps) {
  return <GoogleMarker position={position} icon={icon} onClick={onClick} />
}

export function InfoWindowAdapter({ position, options, children, onClose }: GoogleInfoWindowProps) {
  return (
    <GoogleInfoWindow position={position} options={options} onClose={onClose} >
      <>
        {children}
      </>
    </GoogleInfoWindow>
  )
}

export function RadiusAdapter({ center, radius }: GoogleCirceProps) {
  return (
    <GoogleCircle center={center} radius={radius} />
  )
}

export function AutoCompleteAdapter({ children, setLocation }: GoogleAutoCompleteProps) {
  return (
    <>
      <GoogleAutoComplete setLocation={setLocation}>
        {children}
      </GoogleAutoComplete>
    </>
  )
}