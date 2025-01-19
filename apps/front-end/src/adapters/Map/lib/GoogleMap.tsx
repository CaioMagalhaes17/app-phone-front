import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api"

const apiKey = "AIzaSyBX-DSPQDqatuKFxLsROeKL6WlX_iPALmk"
const containerStyle = {
  width: '100%',
  height: '500px',
}

export type GoogleMapsProps = {
  initialPosition: {
    lat: number
    lng: number,
  }
  children?: React.ReactNode
}


export function GoogleMaps({ initialPosition, children }: GoogleMapsProps) {

  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  })

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

  return isLoaded && (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={initialPosition}
      zoom={16}
      options={{ styles: mapStyles, disableDefaultUI: true }}
    >
      {children}
    </GoogleMap>
  )
}

export type GoogleMarkerProps = {
  position: { lat: number, lng: number }
}

export function GoogleMarker({ position }: GoogleMarkerProps) {
  return <Marker position={position} onClick={() => console.log('NIGGER')} />
}