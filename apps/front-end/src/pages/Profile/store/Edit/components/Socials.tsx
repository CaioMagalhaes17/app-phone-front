import { Button, Input, Text } from "@app/ui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createStoreSocials } from "../../../../../api/user/store/create-socials";
import { FieldValues, useForm } from "react-hook-form";
import { getStoreSocials } from "../../../../../api/user/store/get-socials";
import { useEffect, useState } from "react";
import { StoreSocialsType } from "../../../../../types/store-profile";
import { formatSocialType, formatStoreSocials } from "../../../../../formaters/store-profile";
import { socials as allSocials } from "../../../../../constants/socials";
import { deleteStoreSocial } from "../../../../../api/user/store/delete-socials";
import Swal from "sweetalert2";

export function StoreSocials() {
  const client = useQueryClient()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { mutateAsync } = useMutation({
    mutationFn: createStoreSocials
  })

  const { mutateAsync: mutateDelete } = useMutation({
    mutationFn: deleteStoreSocial
  })

  const [socials, setSocials] = useState<StoreSocialsType[] | null>()

  const { data, isLoading } = useQuery({
    queryKey: ['get-socials'],
    queryFn: () => getStoreSocials()
  })

  useEffect(() => {
    if (!isLoading && data) return setSocials(formatStoreSocials(data))
  }, [data, isLoading])

  async function onAddClick(data: FieldValues) {
    await mutateAsync(data, {
      onSuccess: () => {
        client.refetchQueries({ queryKey: ['get-socials'] })
      }
    })
  }

  async function onDeleteClick(id: string) {
    Swal.fire({
      title: 'Apagar rede social?',
      showCancelButton: true,
      cancelButtonText: 'Não',
      confirmButtonText: 'Sim',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await mutateDelete(id, {
          onSuccess: () => {
            client.refetchQueries({ queryKey: ['get-socials'] })
          }
        })
      }
    })
  }

  return (
    <>
      <Text className="text-dark dark:text-white text-3xl" as="span">Redes sociais</Text>
      <div className="flex flex-col text-lg mt-5">
        {socials && socials.length > 0 ? (
          socials.map((item) => {
            return (
              <>
                <div className="flex items-center flex-row gap-5 mb-10">
                  <div className="w-full">
                    <Input value={formatSocialType(item.type)} placeholder="Link do perfil" />
                  </div>
                  <div className="w-full">
                    <Input value={item.link} placeholder="Link do perfil" />
                  </div>
                  <Button type="button" onClick={() => onDeleteClick(item.id)} className="btn-outline-danger">Excluir</Button>
                </div>
              </>
            )
          })

        ) : ''}
        <form onSubmit={handleSubmit(onAddClick)}>
          <div className="flex items-center flex-row gap-5">
            <select {...register('type')} className="form-select rounded dark:bg-black form-select-lg text-dark dark:text-white w-full">
              {allSocials.map((item) => {
                return (
                  <>
                    <option value={item.type}>
                      {item.formattedName}
                    </option>
                  </>
                )
              })}
            </select>
            <div className="w-full">
              <Input className="placeholder:text-dark placeholder:dark:text-white" {...register('link', { required: true })} placeholder='Link do perfil' />
              {errors.newTelNum && (<span className="text-danger">Campo Obrigatório</span>)}

            </div>
            <Button type="submit" className="btn-primary">Adicionar</Button>
          </div>
        </form>
      </div>
    </>
  )
}