import { useEffect, useState } from "react";
import { useGetStoresInsideClientRadius } from "../../../hooks/geolocation/useGetStoresInsideClientRadius";
import { StoresInsideRadiusType } from "../../../types/stores";
import useStore from "../../../state";
import { useNavigate } from "react-router-dom";

export function useMapSearchController() {
  const { clientInfos, isMapLoaded, isMobile } = useStore()
  const [clintLocation, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [radius, setRadius] = useState<number>(0)
  const navigate = useNavigate()
  const [selectedStore, setSelectedStore] = useState<StoresInsideRadiusType | null>()
  const { stores, storesLoading, setNearStores } = useGetStoresInsideClientRadius()

  useEffect(() => {
    setLocation({
      lat: clientInfos?.location.latitude,
      lng: clientInfos?.location.longitude,
    })
    setRadius(
      (clientInfos?.location.radius)
    )
  }, [clientInfos])

  useEffect(() => {
    if (stores.length > 0) {
      console.log(stores)
    }
  }, [storesLoading])


  const mapStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '10px'
  }

  function onOrderChange(orderStatus: string) {
    switch (orderStatus) {
      case 'rating':
        setNearStores([...stores].sort((a, b) => b.profile.rating - a.profile.rating));
        break
      case 'distance':
        setNearStores([...stores].sort((a, b) =>
          a.distance - b.distance
        ))
        break

      default:
        console.log('nothing')
    }
  }

  return { onOrderChange, mapStyle, isMapLoaded, clintLocation, radius, navigate, selectedStore, setSelectedStore, isMobile, storesLoading, stores }
}