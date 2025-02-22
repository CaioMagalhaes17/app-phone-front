import { Button, Input, Text } from "@app/ui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createStoreSocials } from "../../../../../api/user/store/create-socials";
import { useForm } from "react-hook-form";
import { getStoreSocials } from "../../../../../api/user/store/get-socials";
import { useEffect, useState } from "react";
import { StoreSocialsType } from "../../../../../types/store-profile";
import { formatSocialType, formatStoreSocials } from "../../../../../formaters/store-profile";
import { socials as allSocials } from "../../../../../constants/socials";

export function StoreSocials() {
  const client = useQueryClient()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { mutateAsync } = useMutation({
    mutationFn: createStoreSocials
  })

  const [socials, setSocials] = useState<StoreSocialsType[] | null>()

  const { data, isLoading } = useQuery({
    queryKey: ['get-socials'],
    queryFn: getStoreSocials
  })

  useEffect(() => {
    if (!isLoading && data) return setSocials(formatStoreSocials(data))
  }, [data, isLoading])

  async function onAddClick(data) {
    await mutateAsync(data, {
      onSuccess: () => {
        client.refetchQueries({ queryKey: ['get-socials'] })
      }
    })
  }

  return (
    <>
      <Text className="text-white text-3xl" as="span">Redes sociais</Text>
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
                  <Button type="button" onClick={() => onDeleteClick()} className="btn-outline-danger">Excluir</Button>
                </div>
              </>
            )
          })

        ) : ''}
        <form onSubmit={handleSubmit(onAddClick)}>
          <div className="flex items-center flex-row gap-5">
            <select {...register('type')} className="form-select rounded bg-black form-select-lg text-white w-full">
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
              <Input {...register('link')} placeholder="Link do perfil" />
            </div>
            <Button type="submit" className="btn-primary">Adicionar</Button>
          </div>
        </form>
      </div>
    </>
  )
}