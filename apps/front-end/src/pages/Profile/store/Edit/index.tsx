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
import { TagsModal } from "./components/TagsModal";
import { storeTags } from "../../../../constants/store-tags";
import { FieldValues, useForm } from "react-hook-form";


export function EditStoreProfile() {
  const { handleSubmit, register, formState: { errors } } = useForm()
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
  }

  async function handleSave(data: FieldValues) {
    if (selectedAddress !== "") {
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
    await editProfile({ name: data.name, workingTime: `${data.startTime} - ${data.endTime}` }, {
      onSuccess: async () => {
        Swal.fire({
          icon: 'success',
          title: 'Perfil atualizado com sucesso!'
        })
        if (clintLocation) {
          setStoreInfos({
            ...storeInfos,
            name: data.name,
            workingTime: `${data.startTime} - ${data.endTime}`
          })

        }
      }
    })
  }

  const workTimes = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
  ]

  const [inicio, fim] = storeInfos.workingTime.split(" - ");
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
              <form onSubmit={handleSubmit(handleSave)} className="text-dark dark:text-white w-full flex flex-col text-lg">
                <div className="w-full  gap-5 flex-row flex">
                  <div className="w-full">
                    <Text as="span">Nome</Text>
                    <Input type="text" placeholder="Nome" {...register('name', { required: true })} defaultValue={storeInfos.name} />
                    {errors.name && (<p className="font-bold text-danger text-sm text-left">Campo Obrigatório*</p>)}
                  </div>
                  <div className="w-full">
                    <Text as="span">Horário de funcionamento</Text>
                    <div className="flex flex-row items-center gap-5">
                      <select defaultValue={inicio} {...register('startTime', { required: true })} className="w-full">
                        {workTimes.map((item) => (
                          <option value={item}>{item}</option>
                        ))}
                      </select>
                      até
                      <select defaultValue={fim} {...register('endTime', { required: true })} className="w-full">
                        {workTimes.map((item) => (
                          <option value={item}>{item}</option>
                        ))}
                      </select>
                    </div>
                    {errors.startTime || errors.endTime ? (<p className="font-bold text-danger text-sm text-left">Campo Obrigatório*</p>) : ''}
                  </div>
                </div>
                <div className="mt-10 mb-10">
                  Características
                  <div className="flex mt-2 text-sm flex-row flex-wrap gap-2 text-white">
                    {storeInfos.tags.map((tag) => {
                      const tagName = storeTags.filter((item) => item.id === tag)[0]
                      return (
                        <button className={`text-dark dark:text-white border rounded-xl p-1`}>{tagName.name}</button>
                      )
                    })}
                  </div>
                  <Button type="button" onClick={() => document.getElementById('openTagModal')?.click()} className="btn-primary mt-5">Alterar Caracteristicas</Button>
                </div>
                <div className="mt-auto" />
                <div className="mb-10 flex flex-col">
                  <Text className="text-center" as="span">Endereço</Text>
                  {isMapLoaded && (
                    <AutoCompleteAdapter setLocation={setLocation} setSelectedAddress={setSelectedAddress}>
                      <Input type="text" defaultValue={storeInfos.address} placeholder="Endereço" />
                    </AutoCompleteAdapter>
                  )}
                  <Button type="submit" className="ml-auto btn-outline-primary flex flex-row gap-2 mt-2"><IconSave />Salvar</Button>
                </div>

              </form>


            </div>


            <div className="border-b border-b-[#323b45] mt-10 mb-5" />
            <StoreContact />
            <div className="border-b border-b-[#323b45] mt-10 mb-5" />
            <StoreSocials />
          </div>
        </Panel >
        <TagsModal tags={storeInfos.tags} />
        <UploadProfile />
      </div >
    </>
  )
}