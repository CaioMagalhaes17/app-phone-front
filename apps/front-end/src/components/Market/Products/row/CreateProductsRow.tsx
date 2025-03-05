import { Button, IconSave, Input, Panel, Text } from "@app/ui";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

export function CreateProductsRow({ onNewRowSubmit }: { onNewRowSubmit: (data: { name: string, isActive: boolean }) => void }) {
  const [isActive, setIsActive] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  function onSubmit(data: FieldValues) {
    onNewRowSubmit({ name: data.name, isActive })
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Panel className="mb-10">
          <div className="flex flex-row mb-5">
            <div className="flex flex-col">
              {errors.name && (<p className="font-bold text-danger text-left">Campo Obrigatório*</p>)}
              <Input maxLength={50} {...register('name', { required: true })} className="!w-[500px] !text-lg" type="text" />
            </div>
            <div className="flex flex-col ml-10">
              <Text className="text-dark dark:text-white text-lg font-extrabold" as="span">Prateleira {isActive ? 'Ativa' : 'Inativada'}</Text>
              <button
                type="button"
                onClick={() => setIsActive(!isActive)}
                className={`relative inline-flex h-6 w-12 items-center rounded-full transition ${isActive ? "bg-primary" : "bg-gray-300"
                  }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${isActive ? "translate-x-6" : "translate-x-1"
                    }`}
                />
              </button>
            </div>
            <div className="flex flex-row gap-2 ml-auto">
              <Button type="submit" className="btn-primary ml-auto flex flex-row gap-2"><IconSave />Criar Prateleira</Button>
            </div>
          </div>
          <Panel className="p-4 flex flex-row w-full justify-center gap-5 ">
            Crie a prateleira antes de adicionar produtos
          </Panel>
        </Panel>
      </form>
    </>
  )
}