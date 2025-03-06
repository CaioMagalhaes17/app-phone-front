import { HSeparator } from "@app/ui";
import { StoresRow } from "../../../../components/Market/Stores/row/StoresRow";
import { useGetStoresInsideClientRadius } from "../../../../hooks/geolocation/useGetStoresInsideClientRadius";



export function ClientMarketHome() {
  const { stores, storesLoading } = useGetStoresInsideClientRadius()
  return (
    <>
      {/* <ProductsRow isOwner={false} id="1" title="Produtos Mais Vendidos" /> */}
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