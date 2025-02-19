import { useMutation } from "@tanstack/react-query";
import useStore from "../../../../state";
import { AutoCompleteAdapter, MapAdapter, MarkAdapter } from "../../../../adapters/Map";
import { Button, IconMap, IconSave, Input, Text } from "@app/ui";
import { useEffect, useState } from "react";
import { EditGeolocation } from "../../../../api/geolocation/edit-geolocation";
import Swal from "sweetalert2";
import { CreateGeolocation } from "../../../../api/geolocation/create-geolocation";
import { StoreSvg } from "../../../../constants/svg-icons";

export default function StoreMapEdit() {
  const { storeInfos, setStoreInfos, isMapLoaded } = useStore()
  const [clintLocation, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const { mutateAsync } = useMutation({
    mutationFn: !storeInfos.location.latitude ? CreateGeolocation : EditGeolocation
  })

  useEffect(() => {
    setLocation({
      lat: storeInfos?.location.latitude,
      lng: storeInfos?.location.longitude,
    })

  }, [storeInfos])

  const mapStyle = {
    width: '100%',
    height: '100%',
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
        { longitude: clintLocation?.lng, latitude: clintLocation?.lat },
        {
          onSuccess: () => {
            Swal.fire({
              icon: 'success',
              title: 'Localização alterada com sucesso!'
            })
            setStoreInfos({
              ...storeInfos,
              location: {
                latitude: clintLocation.lat,
                longitude: clintLocation.lng,
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
          <h1 className="text-[#c4c4c4] font-extrabold text-xl mt-5">Definir localização da loja</h1>
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
          <div className="p-4 w-full">
            <Button onClick={() => onSaveClick()} className="btn-primary flex flex-row gap-5 w-full">
              <IconSave />
              <span>Salvar</span>
            </Button>
          </div>
          <div className="border-b border-b-[#323b45] mt-5 w-[90%]" />

        </div>
        {clintLocation && isMapLoaded ? (
          <MapAdapter mapStyle={mapStyle} initialPosition={clintLocation}>
            <MarkAdapter
              position={clintLocation}
              icon={StoreSvg}
            />
          </MapAdapter>
        ) : ''}
      </div>
    </>
  )
}