import {
  Panel, Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Button,
  Input,
  IconSave,
  Text,
} from "@app/ui";
import { EditProductItem } from "./EditProductItem";
import { useState } from "react";
import { ProductsRowType } from "../../../../types/products";
import { FieldValues, useForm } from "react-hook-form";

export type ProductsRowProps = {
  title: string
  isOwner: boolean
  id: string
}
export function EditProductsRow({ row, setUpdateRowData }: { setUpdateRowData: React.Dispatch<React.SetStateAction<{ id: string, name: string, isActive: boolean }>>, row: ProductsRowType }) {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [isActive, setIsActive] = useState(row.isActive)

  function onSubmit(data: FieldValues) {
    setUpdateRowData({ id: row.id, name: data.name, isActive })
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Panel className="mb-10">
          <div className="flex flex-row mb-5">
            <div className="flex flex-col">
              {errors.name && (<p className="font-bold text-danger text-left">Campo Obrigatório*</p>)}
              <Input {...register('name', { required: true })} defaultValue={row.name} className="!w-[500px] !text-lg" type="text" />
            </div>
            <div className="flex flex-col ml-10">
              <Text className="text-dark dark:text-white text-lg font-extrabold" as="span">Prateleira ativa</Text>
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
              <Button type="submit" className="btn-primary ml-auto flex flex-row gap-2"><IconSave />Salvar</Button>
            </div>
          </div>
          <Panel className="p-4 flex flex-row w-full justify-center gap-5 ">
            <Carousel opts={{
              align: "start",
            }}
              className="w-full " >
              <CarouselContent>
                {row.products.map((product, index) => (
                  <CarouselItem key={index} className="basis-1/3">
                    <EditProductItem product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </Panel>
        </Panel>
      </form>
    </>
  )
}