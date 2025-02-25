import { Autocomplete, Circle, GoogleMap, InfoWindow, Marker } from "@react-google-maps/api"
import { useEffect, useState } from "react"
import { createRoundedIcon } from "../../../formaters/map"


export type GoogleMapsProps = {
  initialPosition: {
    lat: number
    lng: number,
  }
  children?: React.ReactNode
  mapStyle: React.CSSProperties
  onClick?: () => void
}


export function GoogleMaps({ initialPosition, children, mapStyle, onClick }: GoogleMapsProps) {
  const mapStyles = [
    {
      featureType: "poi", // Points of Interest
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text",
      stylers: [{ visibility: "on" }],
    },
    {
      featureType: "transit",
      elementType: "labels.icon",
      stylers: [{ visibility: "on" }],
    },
    {
      featureType: "transit",
      elementType: "labels.text",
      stylers: [{ visibility: "on" }],
    },
  ];

  return (
    <GoogleMap
      onClick={onClick}
      mapContainerStyle={mapStyle}
      center={initialPosition}
      zoom={13}
      options={{ styles: mapStyles, disableDefaultUI: true }}
    >
      {children}
    </GoogleMap>
  )
}

export type GoogleMarkerProps = {
  position: { lat: number, lng: number }
  onClick?: () => void
  icon: string
}

export function GoogleMarker({ position, onClick, icon }: GoogleMarkerProps) {
  const [roundedIcon, setRoundedIcon] = useState<string | null>(null);

  useEffect(() => {
    createRoundedIcon(icon, 50).then(setRoundedIcon)

  }, [icon]);
  if (roundedIcon) {
    return <Marker
      icon={{
        url: roundedIcon,
        scaledSize: new window.google.maps.Size(40, 40),
      }}
      position={position}
      onClick={onClick}
    />
  }

}

export type GoogleInfoWindowProps = {
  position: { lat: number, lng: number }
  options?: google.maps.InfoWindowOptions
  children: React.ReactNode
  onClose: () => void
}

export function GoogleInfoWindow({ position, options, children, onClose }: GoogleInfoWindowProps) {
  return (
    <InfoWindow onCloseClick={onClose} position={position} options={options}>
      <>{children}</>
    </InfoWindow>
  )
}

export type GoogleCirceProps = {
  center: {
    lat: number,
    lng: number
  }
  radius: number
  onClick?: () => void
}

export function GoogleCircle({ center, radius, onClick }: GoogleCirceProps) {
  return (
    <Circle onClick={onClick} center={center} radius={radius} options={{ draggable: false, editable: false }} />
  )
}

export type GoogleAutoCompleteProps = {
  children: React.ReactNode,
  setLocation: React.Dispatch<React.SetStateAction<{ lat: number; lng: number; } | null>>
  setSelectedAddress?: any
}
export function GoogleAutoComplete({ children, setLocation, setSelectedAddress }: GoogleAutoCompleteProps) {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>()
  const handleLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      setSelectedAddress(place.formatted_address || "Endereço não encontrado");
      if (place.geometry?.location?.lat() && place.geometry?.location?.lng()) return setLocation({ lat: place.geometry?.location?.lat(), lng: place.geometry?.location?.lng() })
    }
  };

  return (
    <>
      <Autocomplete className="w-full" onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
        <>
          {children}
        </>
      </Autocomplete>
    </>
  )
}