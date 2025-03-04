import { HSeparator } from "@app/ui";
import { ProductsRow } from "../../../../components/Market/Products/row/ProductsRow";
import { StoresRow } from "../../../../components/Market/Stores/row/StoresRow";
import { useQuery } from "@tanstack/react-query";
import { FetchStoresInsideClientRadius } from "../../../../api/geolocation/fetch-stores-inside-client-radius";
import { useEffect, useState } from "react";
import { formatStoresInsideRadius } from "../../../../formaters/stores";
import { StoresInsideRadiusType } from "../../../../types/stores";


export function Market() {
  const [nearStores, setNearStores] = useState<StoresInsideRadiusType[] | null>(null)

  const { isLoading: storesLoading, data } = useQuery({
    queryKey: ['fetch-stores-inside-client-radius'],
    queryFn: FetchStoresInsideClientRadius
  })

  useEffect(() => {
    if (!storesLoading && data) return setNearStores(formatStoresInsideRadius(data))
  }, [storesLoading, data])
  console.log(nearStores)
  return (
    <>
      <ProductsRow isOwner={false} id="1" title="Produtos Mais Vendidos" />
      <HSeparator className="mb-10 mt-10" />
      {nearStores &&
        (
          <>
            <StoresRow title="Lojas Abertas Mais Próximas" stores={nearStores} />
          </>
        )}
    </>
  )
}