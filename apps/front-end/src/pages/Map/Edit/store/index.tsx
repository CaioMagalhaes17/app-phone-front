import { useMutation } from "@tanstack/react-query";
import useStore from "../../../../state";
import { AutoCompleteAdapter, MapAdapter, MarkAdapter } from "../../../../adapters/Map";
import { Button, HSeparator, IconMap, IconSave, IconStreetMap, Input, Panel, Text } from "@app/ui";
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

  return (
    <>
      <div className="max-w-[1240px] mr-auto ml-auto mt-5">
        <Text className="flex flex-row gap-2 font-bold text-dark dark:text-white items-center text-3xl" as="h1"><IconStreetMap width="50px" height="50px" />Alterar Localização</Text>
        <HSeparator className="mb-5" />
        <div className="flex relative h-full gap-5">
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
            <div className="p-4 w-full">
              <Button onClick={() => onSaveClick()} className="btn-primary flex flex-row gap-5 w-full">
                <IconSave />
                <span>Salvar</span>
              </Button>
            </div>
            <div className="border-b border-b-[#323b45] mt-5 w-[90%]" />
          </div>
          {clintLocation && isMapLoaded ? (

            <Panel className="w-full sombra h-[500px]">
              <MapAdapter mapStyle={mapStyle} initialPosition={clintLocation}>
                {
                  storeInfos && storeInfos.profileImg ? (
                    <MarkAdapter
                      position={clintLocation}
                      icon={storeInfos.profileImg}
                    />
                  ) : ''
                }
              </MapAdapter>
            </Panel>
          ) : ''}
        </div>
      </div>

    </>
  )
}