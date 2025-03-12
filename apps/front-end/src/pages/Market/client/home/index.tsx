import { HSeparator, IconStreetMap, Text } from "@app/ui";
import { StoresRow } from "../../../../components/Market/Stores/row/StoresRow";
import { useGetStoresInsideClientRadius } from "../../../../hooks/geolocation/useGetStoresInsideClientRadius";
import { CategoriesRow } from "../../../../components/Market/categories/CategoriesRow";
import { productsCategories } from "../../../../constants/products";
import { useNavigate } from "react-router-dom";



export function ClientMarketHome() {
  const { stores, storesLoading } = useGetStoresInsideClientRadius()
  console.log(stores)
  const navigate = useNavigate()
  return (
    <>
      <Text as="h1" className="text-5xl text-black dark:text-white font-extrabold">Mercado</Text>
      <HSeparator className="mb-5" />
      <CategoriesRow categories={productsCategories} title="Categorias" />
      <HSeparator className="mb-10 mt-10" />
      {stores && stores.length > 0 && !storesLoading ?
        (
          <>
            <StoresRow title="Lojas Abertas Mais Próximas" stores={stores} />
          </>
        ) : (
          <div className="font-extrabold flex flex-col gap-5 mt-10">
            <Text className="text-center text-3xl" as="h1">Nenhuma Loja Próxima Encontrada</Text>
            <Text as="h2" onClick={() => navigate('/map')} className="cursor-pointer hover:underline text-xl ml-auto mr-auto flex flex-row">Tente alterar o raio de pesquisa pelo menu
              <span className="flex flex-row gap-2 ml-5">
                <IconStreetMap /> Mapa
              </span>
            </Text>
          </div>
        )
      }
    </>
  )
}