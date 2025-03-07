import { HSeparator, Text } from "@app/ui";
import { StoresRow } from "../../../../components/Market/Stores/row/StoresRow";
import { useGetStoresInsideClientRadius } from "../../../../hooks/geolocation/useGetStoresInsideClientRadius";
import { CategoriesRow } from "../../../../components/Market/categories/CategoriesRow";
import { productsCategories } from "../../../../constants/products";



export function ClientMarketHome() {
  const { stores, storesLoading } = useGetStoresInsideClientRadius()
  return (
    <>
      <Text as="h1" className="text-5xl text-black dark:text-white font-extrabold">Mercado</Text>
      <HSeparator className="mb-5" />
      <CategoriesRow categories={productsCategories} title="Categorias" />
      <HSeparator className="mb-10 mt-10" />
      {stores && !storesLoading ?
        (
          <>
            <StoresRow title="Lojas Abertas Mais Próximas" stores={stores} />
          </>
        ) : ''}
    </>
  )
}