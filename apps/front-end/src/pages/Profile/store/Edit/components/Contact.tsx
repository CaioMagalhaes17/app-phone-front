import ReactInputMask from 'react-input-mask'
import { Button, IconPlus, Input, Text } from "@app/ui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues, useForm } from "react-hook-form";
import { getStoreContacts } from "../../../../../api/user/store/get-contacts";
import { useEffect, useState } from "react";
import { StoreContacts } from "../../../../../types/store-profile";
import { formatStoreContacts } from "../../../../../formaters/store-profile";
import { deleteStoreContacts } from "../../../../../api/user/store/delete-contacts";
import Swal from "sweetalert2";
import { CreateStoreContacts } from "../../../../../api/user/store/create-contact";

export function StoreContact() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [contacts, setContacts] = useState<StoreContacts[] | []>([])
  const client = useQueryClient()
  const [type, setType] = useState<"email" | "telNum">("email")

  const { data, isLoading } = useQuery({
    queryKey: ['get-contacts'],
    queryFn: () => getStoreContacts()
  })

  const { mutateAsync: deleteContact } = useMutation({
    mutationFn: deleteStoreContacts,
    mutationKey: ['delete-contact']
  })

  const { mutateAsync: createContact } = useMutation({
    mutationFn: CreateStoreContacts,
    mutationKey: ['create-contact']
  })

  async function onNewContact(data: FieldValues) {
    if (type === 'telNum') {
      await createContact({ description: data.newDescription, main: false, telNum: data.newTelNum })
    } else {
      await createContact({ description: data.newDescription, main: false, email: data.newEmail })

    }
    client.refetchQueries({ queryKey: ['get-contacts'] })
  }

  async function onContactDelete(id: string) {
    Swal.fire({
      title: 'Apagar contato?',
      showCancelButton: true,
      cancelButtonText: 'Não',
      confirmButtonText: 'Sim',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteContact(id, {
          onSuccess: () => {
            client.refetchQueries({ queryKey: ['get-contacts'] })
          }
        })
      }
    })
  }

  useEffect(() => {
    if (!isLoading && data) return setContacts(formatStoreContacts(data))
  }, [data, isLoading])

  return (
    <>
      <form onSubmit={handleSubmit(onNewContact)}>
        <Text className="text-white text-left text-3xl" as="span">Contato</Text>
        <div className="flex flex-col text-lg">
          {contacts.length > 0 && (
            contacts.map((item) => {
              console.log(item)
              return (
                <>
                  <div className="flex items-center flex-row gap-5 mb-10">
                    <div className="w-full">
                      <Text as="span">{item.email ? 'Email' : 'Número de telefone'}</Text>
                      <Input value={item.telNum || item.email} />
                    </div>
                    <div className="w-full">
                      <Text as="span">Observação</Text>
                      <Input value={item.description} />
                    </div>
                    <Button type="button" onClick={() => onContactDelete(item.id)} className="btn-outline-danger">Excluir</Button>
                  </div>
                </>
              )
            })
          )}
          <div className="flex items-center flex-row gap-5 mt-10">

            <div className="w-full">
              <Text as="span">{type === 'email' ? 'Email' : 'Número de telefone'}</Text>
              {type === 'email' ? (
                <>
                  <Input type="email" {...register('newEmail', { required: true })} className="" />
                  {errors.newEmail && (<span className="text-danger">Campo Obrigatório</span>)}
                </>
              ) : (
                <>
                  <ReactInputMask
                    className="form-input-custom"
                    mask={'(99) 99999-9999'}
                    alwaysShowMask={false}
                    maskPlaceholder=""
                    type={'text'}
                    {...register('newTelNum', { required: true })}
                  />
                  {errors.newTelNum && (<span className="text-danger">Campo Obrigatório</span>)}
                </>

              )}
            </div>
            <div className="w-full">
              <Text as="span">Observação</Text>
              <Input {...register('newDescription', { required: true })} className="" />
              {errors.newDescription && (<span className="text-danger">Campo Obrigatório</span>)}
            </div>
            <Button type="submit" className="btn-primary flex flex-row"><IconPlus /> Adicionar</Button>
          </div>
          <div className="w-[40%] mt-5">
            <div className="flex items-center space-x-4 mb-4">
              <label className="flex items-center">
                <input onClick={() => setType('email')} defaultChecked className="mr-2" type="radio" name="test" />
                <span>Usar Email</span>
              </label>
              <label className="flex items-center">
                <input onClick={() => setType('telNum')} className="mr-2" type="radio" name="test" />
                <span>Usar Número de Telefone</span>
              </label>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}