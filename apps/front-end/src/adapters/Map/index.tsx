import { GoogleAutoComplete, GoogleAutoCompleteProps, GoogleCirceProps, GoogleCircle, GoogleInfoWindow, GoogleInfoWindowProps, GoogleMaps, GoogleMapsProps, GoogleMarker, GoogleMarkerProps } from "./lib/GoogleMap";

export function MapAdapter({ onClick, initialPosition, children, mapStyle }: GoogleMapsProps) {
  return <GoogleMaps onClick={onClick} mapStyle={mapStyle} initialPosition={initialPosition}>{children}</GoogleMaps>
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

export function RadiusAdapter({ center, radius, onClick }: GoogleCirceProps) {
  return (
    <GoogleCircle onClick={onClick} center={center} radius={radius} />
  )
}

export function AutoCompleteAdapter({ children, setLocation, setSelectedAddress }: GoogleAutoCompleteProps) {
  return (
    <>
      <GoogleAutoComplete setLocation={setLocation} setSelectedAddress={setSelectedAddress}>
        {children}
      </GoogleAutoComplete>
    </>
  )
}