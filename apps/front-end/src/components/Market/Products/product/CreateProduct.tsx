import { Button, HSeparator, IconPencil, IconSave, Input, Panel, Text } from "@app/ui";
import { noImage } from "../../../../constants/images";
import { ProductsRow } from "../../Products/row/ProductsRow";
import { useGetStoreProductsRowById } from "../../../../hooks/products/useGetStoreProductsRowById";
import { ProductType } from "../../../../types/products";
import { useState } from "react";
import { formatCurrency } from "../../../../utils/currency-formatter";
import { FieldValues, useForm } from "react-hook-form";
import { productsCategories } from "../../../../constants/products";
import { CreateProductImgModal } from "./CreateProductImgModal";

type EditProductProps = {
  onProductSave: (data: Pick<ProductType, 'category' | 'description' | 'isActive' | 'price' | 'name' | 'productImg'>) => void
  rowId: string
}
export function CreateProduct({ rowId, onProductSave }: EditProductProps) {
  const { isLoading: isRowLoading, row } = useGetStoreProductsRowById(rowId)
  const [price, setPrice] = useState<string>('R$0,00')
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [isActive, setIsActive] = useState(true)
  const [newImage, setNewImage] = useState<string>(noImage)

  function onSubmit(data: FieldValues) {
    onProductSave({ price, category: data.category, description: data.description, name: data.name, isActive: true, productImg: newImage })
  }

  function onPhotoEditClick() {
    const open = document.getElementById('openModal')
    open?.click()
    console.log(open)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-[1500px] mr-auto ml-auto mb-10">
          <Panel className="p-4 flex flex-col items-center font-extrabold">
            <div className="flex flex-row w-[900px] justify-center">
              <div onClick={() => onPhotoEditClick()} className="relative group mr-5">
                <img width={'500px'} height={'300px'} src={newImage} className="rounded-3xl" />
                <div className="rounded-3xl absolute inset-0 bg-dark bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <span className="text-white text-3xl font-bold flex flex-row gap-2 items-center"><IconPencil /> Editar</span>
                </div>
              </div>
              <Panel className="ml-auto h-full flex flex-col w-[450px]">
                <Input maxLength={40} {...register('name', { required: true })} className="text-black dark:text-white !text-lg" />
                {errors.name && (<p className="font-bold text-danger text-left">Campo Obrigatório*</p>)}
                <Input className="mt-5 !text-green" placeholder="R$0,00" value={price} onChange={(e) => setPrice(formatCurrency(e.target.value))} type="text" />
                <HSeparator />
                <textarea {...register('description', { required: true })} placeholder="Descrição do produto" className="rounded-lg mt-5 text-dark dark:text-white dark:bg-black" />
                {errors.description && (<p className="font-bold text-danger text-left">Campo Obrigatório*</p>)}
                <select {...register('category')} className="form-select text-dark dark:bg-black form-select-lg dark:text-white mt-10">
                  {productsCategories.map((item) => (
                    <option value={item} className="text-dark dark:text-white font-extrabold">
                      {item}
                    </option>
                  ))}
                </select>
                <div className="flex flex-col ml-auto mt-5">
                  <Text className="text-dark dark:text-white text-lg font-extrabold" as="span">Produto {isActive ? 'Ativo' : 'Inativado'}</Text>
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
                <Button type="submit" className="btn-primary mt-10 flex flex-row gap-2">
                  <IconSave />
                  Criar Produto
                </Button>
              </Panel>
            </div>
          </Panel>
        </div>
      </form>
      <Text className="text-dark dark:text-white font-extrabold text-4xl mb-2" as="h1">Produtos da mesma prateleira</Text>
      {row && !isRowLoading ? (
        <ProductsRow isOwner={true} row={row} />
      ) : ''}
      <CreateProductImgModal setNewImage={setNewImage} productImg={newImage} />
    </>
  )
}