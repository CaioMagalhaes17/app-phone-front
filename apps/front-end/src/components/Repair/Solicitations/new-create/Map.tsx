import { Button, HSeparator, IconMap, IconSave, IconStreetMap, Input, Panel, Text } from "@app/ui";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useStore from "../../../../state";
import { StoresInsideRadiusType } from "../../../../types/stores";
import { EditGeolocation } from "../../../../api/geolocation/edit-geolocation";
import { useGetStoresInsideClientRadius } from "../../../../hooks/geolocation/useGetStoresInsideClientRadius";
import { AutoCompleteAdapter, InfoWindowAdapter, MapAdapter, MarkAdapter, RadiusAdapter } from "../../../../adapters/Map";
import { MapPinSvg } from "../../../../constants/svg-icons";

export function MapStep() {
  const { clientInfos, setClientInfos, isMapLoaded } = useStore()
  const [clintLocation, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [radius, setRadius] = useState<number>(0)
  const [selectedAddress, setSelectedAddress] = useState<string>("")
  console.log(selectedAddress)
  const client = useQueryClient()
  const [selectedStore, setSelectedStore] = useState<StoresInsideRadiusType | null>()



  const { mutateAsync } = useMutation({
    mutationFn: EditGeolocation
  })

  const { stores, storesLoading } = useGetStoresInsideClientRadius()

  useEffect(() => {
    setLocation({
      lat: clientInfos?.location.latitude,
      lng: clientInfos?.location.longitude,
    })
    setRadius(
      (clientInfos?.location.radius || 2500)
    )
  }, [clientInfos])

  const mapStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '10px'
  }

  function getBrowserLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
      },
      (err) => {
        console.error(err);
      }
    );
  }

  async function onSaveClick() {
    if (clintLocation) {
      await mutateAsync(
        { longitude: clintLocation?.lng, latitude: clintLocation?.lat, radius: radius },
        {
          onSuccess: () => {
            Swal.fire({
              icon: 'success',
              title: 'Localização alterada com sucesso!'
            })
            setClientInfos({
              ...clientInfos,
              location: {
                latitude: clintLocation.lat,
                longitude: clintLocation.lng,
                radius: radius
              },
            })
            client.refetchQueries({ queryKey: ['fetch-stores-inside-client-radius'] })
            client.refetchQueries({ queryKey: ['get-solicitation'] })
            client.refetchQueries({ queryKey: ['get-solicitations'] })
          }
          , onError: () => Swal.fire({
            icon: 'error',
            title: 'Erro ao alterar localização!',
            text: 'Tente novamente.'
          })
        },
      )
    }
  }


  const images = [
    'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/390.png',
    'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/390.png',
    'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/390.png',
  ]

  return (
    <>
      <Panel className="sombra p-4 rounded-xl flex relative w-full h-[500px] gap-10">
        <div className="flex flex-col items-center w-[530px]">
          <h1 className="font-bold text-dark dark:text-white text-xl flex flex-row mr-auto gap-2 items-center"><IconStreetMap width="40px" height="40px" />Procurar por lojas próximas</h1>
          <HSeparator className="w-full mt-2 mb-2 " />
          <div className="text-left p-4">
            <Button onClick={() => getBrowserLocation()} className="btn-primary w-full"><IconMap />Usar localização exata do dispositivo</Button>
          </div>
          <Text className="text-lg font-bold " as="span">OU</Text>
          <div className="text-left p-2 w-full ">
            <Text className="font-bold text-xl" as="span">Escrever endereço</Text>
            <div className="flex gap-2 flex-row w-full">
              {isMapLoaded && (
                <AutoCompleteAdapter setSelectedAddress={setSelectedAddress} setLocation={setLocation}>
                  <Input type="text" className="w-full" placeholder="Endereço" />
                </AutoCompleteAdapter>
              )}
            </div>
          </div>
          <div className="text-left mt-5 mb-5 w-full">
            <Text className="text-lg font-bold" as="span">Alterar tamanho do raio de pesquisa</Text>
            <div className="flex gap-2 flex-row">
              <input type="range" className="w-full" value={radius} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setRadius(Number(event.target.value))} min="600" max="6000" placeholder="Endereço" />
            </div>
          </div>
          <div className="p-4 w-full">
            <Button onClick={() => onSaveClick()} className="btn-primary flex flex-row gap-5 w-full">
              <IconSave />
              <span>Salvar Localização</span>
            </Button>
          </div>
          <HSeparator className="w-full mt-2 mb-2" />
          <Text className=" p-1" as="span">Obs: É possível editar a localização após o envio da solicitação</Text>
        </div>
        {clintLocation && isMapLoaded ? (
          <Panel className="w-full sombra rounded-xl">
            <MapAdapter zoom={12} onClick={() => setSelectedStore(null)} mapStyle={mapStyle} initialPosition={clintLocation}>
              {!storesLoading && stores.length > 0 ? (stores.map((item, i) => {
                return (
                  <MarkAdapter
                    onClick={() => setSelectedStore(item)}
                    icon={item.profile.profileImg}
                    position={{ lat: item.location.latitude, lng: item.location.longitude }}
                    key={i}
                  />
                )
              })) : ''}
              <MarkAdapter
                position={clintLocation}
                icon={MapPinSvg}
              />
              {selectedStore && (
                <InfoWindowAdapter onClose={() => setSelectedStore(null)} position={{ lat: selectedStore.location.latitude, lng: selectedStore.location.longitude }} options={{ pixelOffset: new window.google.maps.Size(0, -40) }}>
                  <>
                    <div className="h-[200px] w-[200px]">
                      <img className="w-[200px] h-[100px]" src={images[0]} />
                      <Text as="span" className="font-bold text-dark">{selectedStore.profile.name}</Text>
                    </div>
                  </>
                </InfoWindowAdapter>
              )}
              <RadiusAdapter onClick={() => setSelectedStore(null)} center={{ lat: clintLocation.lat, lng: clintLocation.lng }} radius={radius} />
            </MapAdapter>
          </Panel>
        ) : ''}
      </Panel>

    </>
  )
}