import { useQuery } from "@tanstack/react-query";
import { InfoWindowAdapter, MapAdapter, MarkAdapter, RadiusAdapter } from "../../../adapters/Map";
import useStore from "../../../state";
import { FetchStoresInsideClientRadius } from "../../../api/geolocation/fetch-stores-inside-client-radius";
import { Button, Input, Text } from "@app/ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type StoresInsideRadius = {
  GeoLocation: { props: { latitude: number; longitude: number; } }
  Profile: { props: { name: string, profileImg: string, email: string, telNum: string, description: string, address: string } }
  _id: string
}

export function Home() {
  const { clientInfos, isMapLoaded } = useStore()

  const clientInitialPosition = {
    lat: clientInfos?.location?.latitude,
    lng: clientInfos?.location?.longitude,
    radius: clientInfos?.location?.radius
  }

  const { isLoading: storesLoading, data } = useQuery({
    queryKey: ['fetch-stores-inside-client-radius'],
    queryFn: FetchStoresInsideClientRadius
  })

  const mapStyle = {
    width: '100%',
    height: '600px',
    borderRadius: '10px'
  }

  const [selectedStore, setSelectedStore] = useState<StoresInsideRadius | null>()
  const navigate = useNavigate()

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-center mb-10">
          <Text className="text-white text-3xl font-extrabold " as="h1">Assistências técnicas mais próximas</Text>
        </div>
        <div className="flex flex-row mb-2 gap-5">
          <div className="mr-auto" />
          <Button onClick={() => navigate('/map/edit')} className="btn-primary">Editar localização de pesquisa</Button>
          <Input type="text" className="!w-[15%]" placeholder="Pesquisar por loja" />
        </div>
        <div className="w-full">
          {isMapLoaded && (
            <>
              <MapAdapter mapStyle={mapStyle} initialPosition={clientInitialPosition}>
                {!storesLoading && data.length > 0 ? (data.map((item: StoresInsideRadius) => {
                  return (
                    <MarkAdapter onClick={() => setSelectedStore(item)} position={{ lat: item.GeoLocation.props.latitude, lng: item.GeoLocation.props.longitude }} key={item._id} />
                  )
                })) : ''}
                <RadiusAdapter center={{ lat: clientInitialPosition.lat, lng: clientInitialPosition.lng }} radius={clientInitialPosition.radius} />
                {selectedStore && (
                  <InfoWindowAdapter onClose={() => setSelectedStore(null)} position={{ lat: selectedStore.GeoLocation.props.latitude, lng: selectedStore.GeoLocation.props.longitude }} options={{ pixelOffset: new window.google.maps.Size(0, -40) }}>
                    <>
                      Loja: {selectedStore.Profile.props.name}
                    </>
                  </InfoWindowAdapter>
                )}
              </MapAdapter>
            </>
          )}
        </div>
      </div >
    </>
  )
}