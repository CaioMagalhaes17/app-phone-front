import { Button, HSeparator, IconWhatsApp, Panel, Text } from "@app/ui";
import { ProductsRow } from "../../Products/row/ProductsRow";
import { useGetStoreProductsRowById } from "../../../../hooks/products/useGetStoreProductsRowById";
import { ProductType } from "../../../../types/products";
import { noImage } from "../../../../constants/images";

type DetailsProductProps = {
  product: ProductType,
}
export function DetailsProduct({ product }: DetailsProductProps) {
  const { isLoading: isRowLoading, row } = useGetStoreProductsRowById(product.rowId)

  return (
    <>
      <div className="w-[1500px] mr-auto ml-auto mb-10">
        <Panel className="p-4 flex flex-col items-center font-extrabold">
          <div className="flex flex-row w-[900px] justify-center">
            <div className="relative group mr-5">
              <img width={'500px'} height={'300px'} src={product.productImg || noImage} className="rounded-3xl" />
            </div>
            <Panel className="ml-auto flex flex-col w-[410px]">
              <Text className="text-black dark:text-white text-2xl" as="h1">{product.name} </Text>
              <Text className="text-green text-lg" as="h1">{product.price}</Text>
              <Text className="mt-5 text-lg" as="h1">Loja Aberta</Text>
              <HSeparator />
              <Text className="mt-5" as="h1">{product.description}</Text>
              <Button className="btn-green mt-auto flex flex-row gap-2">
                <IconWhatsApp />
                Reservar
              </Button>
            </Panel>
          </div>
        </Panel>
      </div>
      {
        row && !isRowLoading ? (
          <ProductsRow isOwner={false} row={row} />
        ) : ''
      }
    </>
  )
}