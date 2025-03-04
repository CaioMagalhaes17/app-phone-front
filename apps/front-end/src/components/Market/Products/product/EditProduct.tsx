import { Button, HSeparator, IconSave, Panel, Text } from "@app/ui";
import { pokemon } from "../../../../constants/images";
import { ProductsRow } from "../../Products/row/ProductsRow";
import { useGetStoreProductsRowById } from "../../../../hooks/products/useGetStoreProductsRowById";
import { ProductType } from "../../../../types/products";

export function EditProduct({ product }: { product: ProductType }) {
  const { isLoading: isRowLoading, row } = useGetStoreProductsRowById(product.rowId)

  return (
    <>
      <div className="w-[1500px] mr-auto ml-auto mb-10">
        <Panel className="p-4 flex flex-col items-center font-extrabold">
          <div className="flex flex-row w-[900px] justify-center">
            <div className="w-[350px]">
              <img src={pokemon} />
            </div>
            <Panel className="ml-auto flex flex-col max-w-[410px]">
              <Text className="text-black dark:text-white text-2xl" as="h1">{product.name}</Text>
              <Text className="text-success text-lg" as="h1">{product.price}</Text>
              <HSeparator />
              <Text className="mt-5" as="h1">{product.description}</Text>
              <Button className="btn-primary mt-auto flex flex-row gap-2">
                <IconSave />
                Salvar
              </Button>
            </Panel>
          </div>
        </Panel>
      </div>
      <Text className="text-black dark:text-white font-extrabold text-4xl mb-2" as="h1">Produtos mesma prateleira</Text>
      {row && !isRowLoading ? (
        <ProductsRow isOwner={true} row={row} />
      ) : ''}
    </>
  )
}