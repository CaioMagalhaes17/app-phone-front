import { Button, IconPencil, Text } from "@app/ui";
import { pokemon } from "../../../../constants/images";
import { ProductType } from "../../../../types/products";
import { useNavigate } from "react-router-dom";

export type ProductItemProps = {
  name: string,
  price: string,
  category: string
}

export function EditProductItem({ product }: { product: ProductType }) {
  const navigate = useNavigate()
  return (
    <>
      <div className="max-h-[140px] mt-5 flex flex-row items-start gap-5">
        <div className="w-[120px]">
          <img width="150" src={pokemon} className="rounded-3xl" />
        </div>
        <div className="font-extrabold flex w-full flex-col">
          <Text className="flex flex-row gap-5 items-center text-center text-black dark:text-white text-lg" as="span">
            {product.name}
          </Text>
          <div className="flex w-full flex-row">
            <div className="w-full text-left flex flex-col gap-2">
              <Text className="text-success flex flex-row" as="span">{product.price} {!product.isActive && (
                <Text className="text-danger ml-2" as="span">INATIVADO</Text>
              )}</Text>
              <div className="flex flex-row">
                <Text className="text-black dark:text-white" as="span">{product.category}</Text>
                <Button onClick={() => navigate('/store/market/product/edit/' + product.id)} type="button" className="btn-primary ml-auto flex flex-row gap-2"><IconPencil />Editar Produto</Button>
              </div>
            </div>
          </div>
        </div >
      </div >
    </>
  )
}