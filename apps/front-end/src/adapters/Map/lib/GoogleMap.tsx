import { Autocomplete, Circle, GoogleMap, InfoWindow, Marker } from "@react-google-maps/api"
import { useState } from "react"


export type GoogleMapsProps = {
  initialPosition: {
    lat: number
    lng: number,
  }
  children?: React.ReactNode
  mapStyle: React.CSSProperties
}


export function GoogleMaps({ initialPosition, children, mapStyle }: GoogleMapsProps) {
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
  return <Marker icon={icon} position={position} onClick={onClick} />
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
}

export function GoogleCircle({ center, radius }: GoogleCirceProps) {
  return (
    <Circle center={center} radius={radius} options={{ draggable: false, editable: false }} />
  )
}

export type GoogleAutoCompleteProps = {
  children: React.ReactNode,
  setLocation: React.Dispatch<React.SetStateAction<{ lat: number; lng: number; } | null>>
}
export function GoogleAutoComplete({ children, setLocation }: GoogleAutoCompleteProps) {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>()
  const [selectedAddress, setSelectedAddress] = useState<string>("")
  const handleLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };
  console.log(selectedAddress)


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