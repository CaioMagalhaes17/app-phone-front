import { useMutation, useQueryClient } from "@tanstack/react-query";
import useStore from "../../../../state";
import { AutoCompleteAdapter, MapAdapter, MarkAdapter, RadiusAdapter } from "../../../../adapters/Map";
import { Button, IconMap, IconSave, IconSend, Input, Text } from "@app/ui";
import { useEffect, useState } from "react";
import { EditGeolocation } from "../../../../api/geolocation/edit-geolocation";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { MapPinSvg } from "../../../../constants/svg-icons";

export default function ClientMapEdit() {
  const { clientInfos, setClientInfos, isMapLoaded } = useStore()
  const [clintLocation, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string>("")
  console.log(selectedAddress)
  const [radius, setRadius] = useState<number>(0)
  const navigate = useNavigate()
  const client = useQueryClient()
  const { mutateAsync } = useMutation({
    mutationFn: EditGeolocation
  })
  useEffect(() => {
    setRadius(
      (clientInfos?.location.radius || 2500)
    )
    if (!clientInfos?.location.latitude) return getBrowserLocation()

    setLocation({
      lat: clientInfos?.location.latitude,
      lng: clientInfos?.location.longitude,
    })

  }, [clientInfos])

  const mapStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    borderRadius: '10px',
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
    if (clintLocation && clintLocation.lat && clintLocation?.lng) {
      console.log(clintLocation)
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

  return (
    <>
      <div className="flex relative h-full gap-5 p-4 max-w-[1240px] mr-auto ml-auto ">
        <div style={{ borderRadius: '10px' }} className="max-w-xs flex flex-col  gap-2 items-center sombra dark:bg-black w-[420px]">
          <div className="text-left p-4 mt-10">
            <Button onClick={() => getBrowserLocation()} className="btn-primary w-full"><IconMap />Usar localização exata do dispositivo</Button>
          </div>
          <Text className="text-lg font-extrabold " as="span">OU</Text>
          <div className="text-left p-4 w-full mb-5">
            <Text className="font-extrabold text-lg text-dark dark:text-white" as="span">Endereço desejado</Text>
            <div className="flex gap-2 flex-row w-full">
              {isMapLoaded && (
                <AutoCompleteAdapter setLocation={setLocation} setSelectedAddress={setSelectedAddress}>
                  <Input type="text" placeholder="Endereço" />
                </AutoCompleteAdapter>
              )}
            </div>
          </div>
          <div className="text-left p-6 w-full">
            <Text className="font-extrabold" as="span">Alterar tamanho do raio de pesquisa</Text>
            <div className="flex gap-2 flex-row">
              <input type="range" className="w-full" value={radius} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setRadius(Number(event.target.value))} min="600" max="6000" placeholder="Endereço" />
            </div>
          </div>
          <div className="p-4 w-full">
            <Button onClick={() => onSaveClick()} className="btn-primary flex flex-row gap-5 w-full">
              <IconSave />
              <span>Salvar</span>
            </Button>
          </div>
          <div className="border-b border-b-[#323b45] mt-5 w-[90%]" />
          <div className="mt-[220px]">
            <Button onClick={() => navigate('/solicitations/create')} className="btn-primary mb-5 w-full flex gap-5 flex-row">
              <IconSend />
              <span>Solicitar conserto de celular</span>
            </Button>
            <Button onClick={() => navigate('/map')} className="btn-outline-primary w-full flex gap-5 flex-row">
              <IconMap />
              <span>Procurar por lojas próximas</span>
            </Button>
          </div>
        </div>
        {clintLocation && isMapLoaded ? (
          <div className="shadow-[0_10px_20px_-10px_rgba(13,15,24)] w-full h-full">
            <MapAdapter mapStyle={mapStyle} initialPosition={clintLocation}>
              <MarkAdapter
                position={clintLocation}
                icon={MapPinSvg}
              />
              <RadiusAdapter center={{ lat: clintLocation.lat, lng: clintLocation.lng }} radius={radius} />
            </MapAdapter>
          </div>
        ) : ''}
      </div>
    </>
  )
}