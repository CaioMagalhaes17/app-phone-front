import { useQuery } from "@tanstack/react-query";
import { Button, IconPencil, IconStore, Text } from "@app/ui";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../../../state";
import { FetchStoresInsideClientRadius } from "../../../api/geolocation/fetch-stores-inside-client-radius";
import { InfoWindowAdapter, MapAdapter, MarkAdapter, RadiusAdapter } from "../../../adapters/Map";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@app/ui"
import { formatStoreContacts, formatStoreProfile } from "../../../formaters/store-profile";
import { StoreContacts, StoreContactsFromApi, StoreProfileFromApi, StoreProfileType } from "../../../types/store-profile";
import { Star } from "lucide-react";
import { MapPinSvg } from "../../../constants/svg-icons";

type StoresInsideRadius = {
  GeoLocation: { props: { latitude: number; longitude: number; } }
  Profile: StoreProfileFromApi & { storeProfileContacts: StoreContactsFromApi[] }
  contacts: StoreContactsFromApi[]
  _id: string
}

export default function ClientMapSearch() {
  const { clientInfos, isMapLoaded } = useStore()
  const [clintLocation, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [radius, setRadius] = useState<number>(0)
  const navigate = useNavigate()
  const [selectedStore, setSelectedStore] = useState<{
    geoLocation: { props: { latitude: number; longitude: number; } },
    storeProfile: StoreProfileType,
    storeContacts: StoreContacts[]
  } | null>()

  useEffect(() => {
    setLocation({
      lat: clientInfos?.location.latitude,
      lng: clientInfos?.location.longitude,
    })
    setRadius(
      (clientInfos?.location.radius)
    )
  }, [clientInfos])

  const { isLoading: storesLoading, data } = useQuery({
    queryKey: ['fetch-stores-inside-client-radius'],
    queryFn: FetchStoresInsideClientRadius
  })
  console.log(data)
  const mapStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '10px'
  }

  function onStorePinClick(item: StoresInsideRadius) {
    const teste = {
      geoLocation: item.GeoLocation,
      storeProfile: formatStoreProfile(item.Profile),
      storeContacts: formatStoreContacts(item.contacts)
    }
    setSelectedStore(teste)
  }

  return (
    <>
      <div className="flex relative h-full gap-5">
        <div style={{ borderRadius: '10px' }} className="max-w-xs flex flex-col  p-4 gap-2 items-center bg-white dark:bg-black w-[420px] overflow-y-auto scrollable">
          {selectedStore ? (
            <>
              <div className="w-full mt-5 flex flex-col">
                <div className="items-center flex justify-center">
                  <Carousel className="">
                    <CarouselContent className="h-[220px]">
                      <CarouselItem><img className="h-full w-full" src={selectedStore.storeProfile.profileImg} /></CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="left-0" />
                    <CarouselNext className="right-0" />
                  </Carousel>
                </div>
                <div className="p-2 flex w-full text-left font-extrabold text-white gap-2 flex-col">
                  <Text className="text-white font-extrabold" as="span">{selectedStore.storeProfile.name}</Text>
                  <div className="border-b border-b-[#323b45]" />
                  <Text className="text-white-dark font-extrabold" as="span">Aberta/Fechada</Text>
                  <div className="flex flex-row">{[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={index < selectedStore.storeProfile.rating ? "fill-yellow-500 text-yellow-500" : "fill-none text-gray-300"}
                      size={20}
                    />
                  ))}</div>
                  <div className="border-b border-b-[#323b45] " />
                  <div className="flex flex-row text-dark dark:text-white gap-5">
                    <label className=" flex items-center gap-2 block">
                      <input
                        type="checkbox"
                        className="form-checkbox rounded-full"
                        checked
                        disabled
                        style={{ backgroundColor: 'currentcolor' }}
                      />
                      <span className="text-md font-extrabold">Possui entregas</span>
                    </label>
                    <label className="text-md flex items-center gap-2 block">
                      <input
                        type="checkbox"
                        className="form-checkbox rounded-full"
                        checked
                        disabled
                        style={{ backgroundColor: 'currentcolor' }}
                      />
                      <span className="font-extrabold">Rápidos orçamentos</span>
                    </label>

                  </div>
                  <div className="flex flex-row text-dark dark:text-white gap-5">
                    <label className="text-md flex items-center gap-2 block">
                      <input
                        type="checkbox"
                        className="form-checkbox rounded-full"
                        checked
                        disabled
                        style={{ backgroundColor: 'currentcolor' }}
                      />
                      <span className="font-extrabold">Rápidos orçamentos</span>
                    </label>
                    <label className="text-md flex items-center gap-2 block">
                      <input
                        type="checkbox"
                        className="form-checkbox rounded-full"
                        checked
                        disabled
                        style={{ backgroundColor: 'currentcolor' }}
                      />
                      <span className="font-extrabold">Rápidos orçamentos</span>
                    </label>
                  </div>
                </div>
                <div className="border-b border-b-[#323b45] mt-5 w-[100%]" />

                <Link target="_blank" rel="noopener noreferrer" to={`/store-profile/${selectedStore.storeProfile.id}`} className="btn btn-primary flex flex-row w-full gap-5 mt-5">
                  <IconStore />
                  Ir para o perfil da loja
                </Link>
                <div className="border-b border-b-[#323b45] mt-5 w-[100%]" />

                <div className="flex flex-col font-extrabold items-center mt-5">
                  <Text className="text-dark dark:text-white text-center" as="span">{selectedStore.storeProfile.address}</Text>
                  {selectedStore.storeContacts.map((item) => {
                    return (
                      <>
                        <Text className="text-white-dark text-md mt-5" as="span">{item.email || item.telNum} - {item.description}</Text>
                      </>
                    )
                  })}
                </div>
              </div>
              <div className="border-b border-b-[#323b45] w-[100%]" />
            </>
          ) :
            (
              <div className="mt-[300px]">
                <Text as="span" className="text-3xl font-extrabold mt-10 mb-10">Selecione uma Loja</Text>
              </div>
            )
          }

          <div className="mt-auto" />
          <Button onClick={() => navigate('/map/edit')} className="btn-primary flex flex-row w-full gap-5">
            <IconPencil />
            Editar localização de pesquisa
          </Button>
        </div>
        {clintLocation && isMapLoaded ? (
          <MapAdapter onClick={() => setSelectedStore(null)} mapStyle={mapStyle} initialPosition={clintLocation}>
            {!storesLoading && data.length > 0 ? (data.map((item: StoresInsideRadius) => {
              return (
                <MarkAdapter
                  onClick={() => onStorePinClick(item)}
                  position={{ lat: item.GeoLocation.props.latitude, lng: item.GeoLocation.props.longitude }}
                  key={item._id}
                  icon={item.Profile.props.profileImg}
                />
              )
            })) : ''}
            <MarkAdapter
              position={clintLocation}
              icon={MapPinSvg}
            />
            <RadiusAdapter onClick={() => setSelectedStore(null)} center={{ lat: clintLocation.lat, lng: clintLocation.lng }} radius={radius} />
            {selectedStore && (
              <InfoWindowAdapter onClose={() => setSelectedStore(null)} position={{ lat: selectedStore.geoLocation.props.latitude, lng: selectedStore.geoLocation.props.longitude }} options={{ pixelOffset: new window.google.maps.Size(0, -40) }}>
                <>
                  <div className="h-[200px] w-[200px]">
                    <img className="w-[200px] h-[100px]" src={selectedStore.storeProfile.profileImg} />
                    <Text as="span" className="font-extrabold text-dark">{selectedStore.storeProfile.name}</Text>
                  </div>
                </>
              </InfoWindowAdapter>
            )}
          </MapAdapter>
        ) : ''}
      </div>
    </>
  )
}