import { useMutation } from "@tanstack/react-query";
import useStore from "../../../../state";
import { AutoCompleteAdapter, MapAdapter, RadiusAdapter } from "../../../../adapters/Map";
import { Button, IconMap, IconSave, Input, Text } from "@app/ui";
import { useEffect, useState } from "react";
import { EditGeolocation } from "../../../../api/geolocation/edit-geolocation";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function ClientMapEdit() {
  const { clientInfos, setClientInfos, isMapLoaded } = useStore()
  const [clintLocation, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [radius, setRadius] = useState<number>(0)
  const navigate = useNavigate()

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
      <div className="flex relative h-full gap-5">
        <div style={{ borderRadius: '10px' }} className="max-w-xs flex flex-col  gap-2 items-center bg-black w-[420px]">
          <h1 className="text-[#c4c4c4] font-extrabold text-xl mt-5">Definir localização de pesquisa</h1>
          <div className="border-b border-b-[#323b45] mt-5 w-[90%]" />
          <div className="text-left p-4">
            <Button onClick={() => getBrowserLocation()} className="btn-primary w-full"><IconMap />Usar localização exata do dispositivo</Button>
          </div>
          <Text className="text-lg font-extrabold " as="span">OU</Text>
          <div className="text-left p-4 w-full mb-5">
            <Text className="font-extrabold" as="span">Endereço desejado</Text>
            <div className="flex gap-2 flex-row w-full">
              {isMapLoaded && (
                <AutoCompleteAdapter setLocation={setLocation}>
                  <Input type="text w-full" placeholder="Endereço" />
                </AutoCompleteAdapter>
              )}
            </div>
          </div>
          <div className="text-left p-6 w-full">
            <Text className="font-extrabold" as="span">Alterar tamanho do raio de pesquisa</Text>
            <div className="flex gap-2 flex-row">
              <input type="range" className="w-full" value={radius} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setRadius(Number(event.target.value))} min="600" max="3500" placeholder="Endereço" />
            </div>
          </div>
          <div className="p-4 w-full">
            <Button onClick={() => onSaveClick()} className="btn-primary flex flex-row gap-5 w-full">
              <IconSave />
              <span>Salvar</span>
            </Button>
          </div>
          <div className="border-b border-b-[#323b45] mt-5 w-[90%]" />
          <div className="mt-5">
            <Button onClick={() => navigate('/map')} className="btn-primary w-full flex gap-5 flex-row">
              <IconMap />
              <span>Procurar por lojas próximas</span>
            </Button>
          </div>
        </div>
        {clintLocation && isMapLoaded ? (
          <MapAdapter mapStyle={mapStyle} initialPosition={clintLocation}>
            <RadiusAdapter center={{ lat: clintLocation.lat, lng: clintLocation.lng }} radius={radius} />
          </MapAdapter>
        ) : ''}
      </div>
    </>
  )
}