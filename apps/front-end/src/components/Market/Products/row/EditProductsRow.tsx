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
  IconPlus,
  VSeparator,
  IconTrash,
} from "@app/ui";
import { EditProductItem } from "./EditProductItem";
import { useState } from "react";
import { ProductsRowType } from "../../../../types/products";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export type ProductsRowProps = {
  title: string
  isOwner: boolean
  id: string
}

type EditProductsRowProps = {
  setUpdateRowData: React.Dispatch<React.SetStateAction<{ id: string, name: string, isActive: boolean }>>,
  row: ProductsRowType,
  onRowDelete: (id: string) => void
}
export function EditProductsRow({ row, setUpdateRowData, onRowDelete }: EditProductsRowProps) {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [isActive, setIsActive] = useState(row.isActive)
  const navigate = useNavigate()

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
              <Input maxLength={50} {...register('name', { required: true })} defaultValue={row.name} className="!w-[500px] !text-lg" type="text" />
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
              <Button type="button" onClick={() => onRowDelete(row.id)} className="btn-danger ml-auto flex flex-row gap-2"><IconTrash />Excluir Prateleira</Button>
              <Button type="submit" className="btn-primary ml-auto flex flex-row gap-2"><IconSave />Salvar</Button>
            </div>
          </div>
          <Panel className="p-4 flex flex-row w-full justify-center gap-5 ">
            <Carousel opts={{
              align: "start",
            }}
              className="w-full " >
              <CarouselContent className="p-4">
                {row.products.map((product, index) => {
                  return (
                    <>
                      <CarouselItem key={index} className="hover:bg-[#c4c4c4] basis-1/3">
                        <EditProductItem product={product} />
                      </CarouselItem>
                      <VSeparator className="ml-2 h-[100px]" />
                    </>
                  )
                })}
                <div className="flex flex-row items-center justify-center ml-10">
                  <Button onClick={() => navigate('/store/market/product/create/' + row.id)} type="button" className="btn-primary"><IconPlus />Adicionar Produto</Button>
                </div>
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