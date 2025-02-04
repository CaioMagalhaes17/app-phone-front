import { Button, IconMap, IconSave, Input, Text } from "@app/ui";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EditGeolocation } from "../../../../../api/geolocation/edit-geolocation";
import useStore from "../../../../../state";
import { AutoCompleteAdapter, MapAdapter, MarkAdapter, RadiusAdapter } from "../../../../../adapters/Map";
import Swal from "sweetalert2";
import { FetchStoresInsideClientRadius } from "../../../../../api/geolocation/fetch-stores-inside-client-radius";

export function StepFive({ setActiveTab }: { setActiveTab: React.Dispatch<React.SetStateAction<number>> }) {
  const { clientInfos, setClientInfos, isMapLoaded } = useStore()
  const [clintLocation, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [radius, setRadius] = useState<number>(0)
  const client = useQueryClient()
  type StoresInsideRadius = {
    GeoLocation: { props: { latitude: number; longitude: number; } }
    Profile: { props: { name: string, profileImg: string, email: string, telNum: string, description: string, address: string } }
    _id: string
  }

  const { mutateAsync } = useMutation({
    mutationFn: EditGeolocation
  })

  useEffect(() => {
    setLocation({
      lat: clientInfos?.location.latitude,
      lng: clientInfos?.location.longitude,
    })
    setRadius(
      (clientInfos?.location.radius)
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

  const { isLoading: storesLoading, data } = useQuery({
    queryKey: ['fetch-stores-inside-client-radius'],
    queryFn: FetchStoresInsideClientRadius
  })

  console.log(data)
  return (
    <>
      <div className="flex relative w-full h-full mt-5">
        <div className="flex flex-col items-center w-[530px]">
          <h1 className="text-[#c4c4c4] font-extrabold text-white text-xl">Definir Localização para envio de orçamento</h1>
          <div className="border-b border-b-[#323b45] mt-5 w-[90%]" />
          <div className="text-left p-4">
            <Button onClick={() => getBrowserLocation()} className="btn-primary w-full"><IconMap />Usar localização exata do dispositivo</Button>
          </div>
          <Text className="text-lg font-extrabold " as="span">OU</Text>
          <div className="text-left p-2 w-full ">
            <Text className="font-extrabold" as="span">Endereço desejado</Text>
            <div className="flex gap-2 flex-row w-full">
              {isMapLoaded && (
                <AutoCompleteAdapter setLocation={setLocation}>
                  <Input type="text w-full" placeholder="Endereço" />
                </AutoCompleteAdapter>
              )}
            </div>
          </div>
          <div className="text-left p-6 mt-10 w-full">
            <Text className="font-extrabold" as="span">Alterar tamanho do raio de pesquisa</Text>
            <div className="flex gap-2 flex-row">
              <input type="range" className="w-full" value={radius} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setRadius(Number(event.target.value))} min="600" max="3500" placeholder="Endereço" />
            </div>
          </div>
          <div className="p-4 w-full mt-10">
            <Button onClick={() => onSaveClick()} className="btn-primary flex flex-row gap-5 w-full">
              <IconSave />
              <span>Salvar Localização</span>
            </Button>
          </div>
          <div className="border-b border-b-[#323b45] mt-5 w-[90%]" />
          <Text className="mt-10 p-1" as="span">Obs: É possível editar a localização após o envio da solicitação</Text>
        </div>
        {clintLocation && isMapLoaded ? (
          <MapAdapter mapStyle={mapStyle} initialPosition={clintLocation}>
            {!storesLoading && data.length > 0 ? (data.map((item: StoresInsideRadius) => {
              return (
                <MarkAdapter position={{ lat: item.GeoLocation.props.latitude, lng: item.GeoLocation.props.longitude }} key={item._id} />
              )
            })) : ''}
            <RadiusAdapter center={{ lat: clintLocation.lat, lng: clintLocation.lng }} radius={radius} />
          </MapAdapter>
        ) : ''}
      </div>
      <div className="flex p-6 relative justify-between w-full">
        <Button type="button" onClick={() => setActiveTab(3)} className="btn-primary">Voltar</Button>
        <Button type="submit" onClick={() => setActiveTab(5)} className="btn-primary">Próximo</Button>
      </div>
    </>
  )
}