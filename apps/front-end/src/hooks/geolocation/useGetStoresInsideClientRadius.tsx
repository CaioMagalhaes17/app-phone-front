import { useEffect, useState } from "react"
import { StoresInsideRadiusType } from "../../types/stores"
import { useQuery } from "@tanstack/react-query"
import { FetchStoresInsideClientRadius } from "../../api/geolocation/fetch-stores-inside-client-radius"
import { formatStoresInsideRadius } from "../../formaters/stores"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

export function useGetStoresInsideClientRadius() {
  const [stores, setNearStores] = useState<StoresInsideRadiusType[] | null>(null)
  const navigate = useNavigate()
  const { isLoading: storesLoading, data } = useQuery({
    queryKey: ['fetch-stores-inside-client-radius'],
    queryFn: FetchStoresInsideClientRadius,
  })

  useEffect(() => {
    if (!storesLoading && data) {
      if (data.status === 'geolocationNotFound') {
        Swal.fire({
          timer: 6000,
          showCloseButton: false,
          showCancelButton: false,
          confirmButtonText: 'Configurar Localização',
          icon: 'info',
          title: 'Antes de tudo...',
          text: 'Vamos configurar sua localização para encontrar lojas próximas'
        }).then(() => {
          return navigate('/map/edit')
        })
      } else {
        setNearStores(formatStoresInsideRadius(data))
      }
    }
  }, [storesLoading, data])

  return { storesLoading, stores }
}