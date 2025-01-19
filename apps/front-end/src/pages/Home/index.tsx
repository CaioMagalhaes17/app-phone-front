import { useQuery } from "@tanstack/react-query";
import { MapAdapter, MarkAdapter } from "../../adapters/Map";
import useStore from "../../state";
import { FetchStoresInsideClientRadius } from "../../api/geolocation/fetch-stores-inside-client-radius";

export function Home() {
  const { clientInfos } = useStore()
  const clientInitialPosition = {
    lat: clientInfos.location.latitude,
    lng: clientInfos.location.longitude
  }

  const { isLoading: storesLoading, data } = useQuery({
    queryKey: ['fetch-stores-inside-client-radius'],
    queryFn: FetchStoresInsideClientRadius
  })

  return (
    <>
      <div className="flex items-center flex-col">
        <MapAdapter initialPosition={clientInitialPosition}>
          {!storesLoading && data.length > 0 ? (data.map((item: { props: { latitude: number; longitude: number; }; _id: string }) => {
            return (
              <MarkAdapter position={{ lat: item.props.latitude, lng: item.props.longitude }} key={item._id} />
            )
          })) : ''}
        </MapAdapter>
      </div>
    </>
  )
}