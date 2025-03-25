import { Button, IconSave, Input, Panel, Text, IconPencil, IconUser } from "@app/ui";
import { StoreContact } from "./components/Contact";
import { StoreSocials } from "./components/Socials";
import useStore from "../../../../state";
import { UploadProfile } from "./components/UploadProfile";
import { AutoCompleteAdapter } from "../../../../adapters/Map";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStore } from "../../../../api/user/store/update-profile";
import Swal from "sweetalert2";
import { EditGeolocation } from "../../../../api/geolocation/edit-geolocation";


export function EditStoreProfile() {
  const { storeInfos, isMapLoaded, setStoreInfos } = useStore()
  const [clintLocation, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string>("")
  const client = useQueryClient()

  const { mutateAsync: editGeoLocation } = useMutation({
    mutationFn: EditGeolocation
  })

  const { mutateAsync: editProfile } = useMutation({
    mutationFn: updateStore
  })

  function onPhotoEdit() {
    const open = document.getElementById('openModal')
    open?.click()
    console.log(open)
  }

  async function saveAddress() {
    await editProfile({ address: selectedAddress }, {
      onSuccess: async () => {
        Swal.fire({
          icon: 'success',
          title: 'Endereço alterado com sucesso!'
        })
        if (clintLocation) {
          setStoreInfos({
            ...storeInfos,
            address: selectedAddress,
            location: {
              latitude: clintLocation.lat,
              longitude: clintLocation.lng,
            },
          })
          await editGeoLocation({ longitude: clintLocation?.lng, latitude: clintLocation?.lat })
        }

        client.refetchQueries({ queryKey: ['get-solicitations'] })
        client.refetchQueries({ queryKey: ['get-geolocation'] })
      }
    })
  }

  return (
    <>
      <ul className="flex font-semibold p-2 border-b border-[#191e3a] flex-row mb-5 whitespace-nowrap overflow-y-auto">
        <li className="inline-block mr-5">
          <Button className="btn-outline-primary">Preferências de Notificações</Button>
        </li>
        <li className="inline-block ">
          <Button className="btn-outline-primary">Alterar login/senha</Button>
        </li>
      </ul>
      <div className=" flex justify-center ">
        <Panel className="font-bold max-w-[1200px] mt-10 w-full">
          <div className="flex flex-row justify-center items-center">
            <Text className="text-3xl text-black dark:text-white flex flex-row gap-5 items-center" as="h1"><IconUser className="w-[40px] h-[40px]" />Editar perfil</Text>
            <div className="mr-auto" />
          </div>
          <div className="border-b border-b-[#323b45] mt-5 mt-10" />
          <div className="flex flex-col mt-10">
            <div className="flex flex-row gap-5 ">
              <div onClick={() => onPhotoEdit()} className="relative group">
                <img width={'500px'} height={'300px'} src={storeInfos.profileImg} className="rounded-3xl" />
                <div className="rounded-3xl absolute inset-0 bg-dark bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <span className="text-white text-lg font-bold flex flex-row gap-2 items-center"><IconPencil /> Editar</span>
                </div>
              </div>
              <div className="text-dark dark:text-white w-full flex flex-col text-lg">
                <div className="w-full  gap-5 flex-row flex">
                  <div className="w-full">
                    <Text as="span">Nome</Text>
                    <Input type="text" placeholder="Nome" />
                  </div>
                  <div className="w-full">
                    <Text as="span">Horário de funcionamento</Text>
                    <div className="flex flex-row items-center gap-5">
                      <Input placeholder="dasdas" />
                      até
                      <Input placeholder="dasdas" />
                    </div>
                  </div>
                </div>
                <div className="mt-auto" />
                <div className="mb-10 flex flex-col">
                  <Text className="text-center" as="span">Endereço</Text>
                  {isMapLoaded && (
                    <AutoCompleteAdapter setLocation={setLocation} setSelectedAddress={setSelectedAddress}>
                      <Input type="text" defaultValue={storeInfos.address} placeholder="Endereço" />
                    </AutoCompleteAdapter>
                  )}
                  <Button onClick={() => saveAddress()} className="ml-auto btn-outline-primary flex flex-row gap-2 mt-2"><IconSave />Salvar Endereço</Button>
                </div>
              </div>

            </div>

            <div className="border-b border-b-[#323b45] mt-10 mb-5" />
            <StoreContact />
            <div className="border-b border-b-[#323b45] mt-10 mb-5" />
            <StoreSocials />
          </div>
        </Panel >
        <UploadProfile />
      </div >
    </>
  )
}