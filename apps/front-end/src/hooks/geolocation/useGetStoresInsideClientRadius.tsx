import { useEffect, useState } from "react"
import { StoresInsideRadiusType } from "../../types/stores"
import { useQuery } from "@tanstack/react-query"
import { FetchStoresInsideClientRadius } from "../../api/geolocation/fetch-stores-inside-client-radius"
import { formatStoresInsideRadius } from "../../formaters/stores"
import Swal from "sweetalert2"
import { useLocation, useNavigate } from "react-router-dom"

export function useGetStoresInsideClientRadius() {
  const [stores, setNearStores] = useState<StoresInsideRadiusType[] | []>([])
  const navigate = useNavigate()
  const { isLoading: storesLoading, data, refetch } = useQuery({
    queryKey: ['fetch-stores-inside-client-radius'],
    queryFn: FetchStoresInsideClientRadius,
  })
  const location = useLocation()
  useEffect(() => {
    if (!storesLoading && data) {
      console.log(data)
      if (data.status === 'geolocationNotFound' && location.pathname !== '/solicitations/create') {
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
      }
      if (data.length > 0) {
        setNearStores([...formatStoresInsideRadius(data)].sort((a, b) => b.profile.rating - a.profile.rating))
      }
    }
  }, [storesLoading, data])

  return { storesLoading, stores, setNearStores, refetch }
}