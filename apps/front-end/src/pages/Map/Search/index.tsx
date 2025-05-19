import { MapSearchDesktop } from "./components/MapDesktop";
import { MapSearchMobile } from "./components/MapMobile";
import { useMapSearchController } from "./useMapSearchController";

export default function ClientMapSearch() {
  const { isMobile } = useMapSearchController()
  return (
    <>
      {!isMobile ? <MapSearchDesktop /> : <MapSearchMobile />}

    </>
  )
}