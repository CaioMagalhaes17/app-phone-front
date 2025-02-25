import { useMutation } from "@tanstack/react-query";
import useStore from "../../../../state";
import { AutoCompleteAdapter, MapAdapter, MarkAdapter } from "../../../../adapters/Map";
import { Button, IconSave, Input, Text } from "@app/ui";
import { useEffect, useState } from "react";
import { EditGeolocation } from "../../../../api/geolocation/edit-geolocation";
import Swal from "sweetalert2";
import { CreateGeolocation } from "../../../../api/geolocation/create-geolocation";
import { updateStore } from "../../../../api/user/store/update-profile";

export default function StoreMapEdit() {
  const { storeInfos, setStoreInfos, isMapLoaded } = useStore()
  const [clintLocation, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string>("")

  const { mutateAsync } = useMutation({
    mutationFn: !storeInfos.location.latitude ? CreateGeolocation : EditGeolocation
  })

  const { mutateAsync: editProfile } = useMutation({
    mutationFn: updateStore
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
    borderRadius: '10px'
  }



  async function onSaveClick() {
    if (clintLocation) {
      await mutateAsync(
        { longitude: clintLocation?.lng, latitude: clintLocation?.lat },
        {
          onSuccess: async () => {
            Swal.fire({
              icon: 'success',
              title: 'Localização alterada com sucesso!'
            })
            setStoreInfos({
              ...storeInfos,
              address: selectedAddress,
              location: {
                latitude: clintLocation.lat,
                longitude: clintLocation.lng,
              },
            })
            await editProfile({ address: selectedAddress })
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

          <div className="text-left p-4 w-full mb-5">
            <Text className="font-extrabold" as="span">Endereço desejado</Text>
            <div className="flex gap-2 flex-row w-full">
              {isMapLoaded && (
                <AutoCompleteAdapter setSelectedAddress={setSelectedAddress} setLocation={setLocation}>
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
              icon={storeInfos.profileImg}
            />
          </MapAdapter>
        ) : ''}
      </div>
    </>
  )
}