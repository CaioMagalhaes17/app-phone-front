import { Button, HSeparator, IconWhatsApp, Panel, Text } from "@app/ui";
import { ProductsRow } from "../../Products/row/ProductsRow";
import { useGetStoreProductsRowById } from "../../../../hooks/products/useGetStoreProductsRowById";
import { ProductsRowType, ProductType } from "../../../../types/products";
import { noImage } from "../../../../constants/images";
import { StoreResume } from "../../../Profiles/store/resume";
import { useGetStoreProfileById } from "../../../../hooks/profile/useGetLocationByProfileId";
import { useGetStoreProductsRows } from "../../../../hooks/products/useGetStoreProductsRows";
import { useEffect, useState } from "react";

type DetailsProductProps = {
  product: ProductType,
}
export function DetailsProduct({ product }: DetailsProductProps) {
  const [otherRows, setOtherRows] = useState<ProductsRowType[]>()
  const { isLoading: isRowLoading, row: productRow } = useGetStoreProductsRowById(product.rowId)
  const { isLoading, storeProfile, distance } = useGetStoreProfileById(product.storeProfileId)
  const { isLoading: isAllRowsLoading, rows: allRows } = useGetStoreProductsRows(product.storeProfileId)

  useEffect(() => {
    if (!isAllRowsLoading && !isRowLoading && productRow && allRows) {
      setOtherRows(allRows.filter((row) => row.id !== productRow.id))
    }
  }, [isAllRowsLoading, isRowLoading, productRow, allRows])
  return (
    <>
      <div className="flex justify-center gap-5 flex-row mb-10">
        <Panel className="p-4 flex flex-col items-center font-extrabold">
          <div className="flex flex-row w-[1100px] justify-center">
            <div className="relative group mr-5">
              <img width={'500px'} height={'300px'} src={product.productImg || noImage} className="rounded-3xl" />
            </div>
            <Panel className="flex flex-col w-[410px]">
              <Text className="mb-5 text-black dark:text-white text-2xl" as="h1">{product.name}  </Text>
              <Text className="mb-5 text-green text-lg" as="h1">{product.price}</Text>
              <Text as="span" className="text-dark dark:text-white text-xl">{product.category}</Text>
              <HSeparator />
              <Text className="mt-5" as="h1">{product.description}</Text>
              <Button className="btn-green mt-auto flex flex-row gap-2">
                <IconWhatsApp />
                Reservar Produto
              </Button>
            </Panel>
          </div>

        </Panel>
        {!isLoading && storeProfile ? (
          <StoreResume distance={distance} showMarket={true} storeProfile={storeProfile} />
        ) : ''}
      </div>
      <div className="mb-10">
        {
          productRow && !isRowLoading ? (
            <>
              <Text as="h1" className="mb-2 text-dark dark:text-white text-2xl font-extrabold">Da mesma prateleira...</Text>
              <ProductsRow isOwner={false} row={productRow} />
            </>
          ) : ''
        }
      </div>

      {
        otherRows && otherRows.length > 0 && !isAllRowsLoading ? (
          <>
            <Text as="h1" className="mb-2 text-dark dark:text-white text-2xl font-extrabold">Outras Prateleiras...</Text>
            {otherRows.map((row) => (
              <ProductsRow isOwner={false} row={row} />
            ))}
          </>
        ) : ''
      }
    </>
  )
}