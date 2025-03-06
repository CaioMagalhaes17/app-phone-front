import { useEffect, useState } from "react"
import { StoresInsideRadiusType } from "../../types/stores"
import { useQuery } from "@tanstack/react-query"
import { FetchStoresInsideClientRadius } from "../../api/geolocation/fetch-stores-inside-client-radius"
import { formatStoresInsideRadius } from "../../formaters/stores"

export function useGetStoresInsideClientRadius() {
  const [stores, setNearStores] = useState<StoresInsideRadiusType[] | null>(null)

  const { isLoading: storesLoading, data } = useQuery({
    queryKey: ['fetch-stores-inside-client-radius'],
    queryFn: FetchStoresInsideClientRadius
  })

  useEffect(() => {
    if (!storesLoading && data) return setNearStores(formatStoresInsideRadius(data))
  }, [storesLoading, data])

  return { storesLoading, stores }
}