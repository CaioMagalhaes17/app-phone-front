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
import { formatStoreProfile } from "../../../formaters/store-profile";
import { StoreProfileFromApi, StoreProfileType } from "../../../types/store-profile";
import { Star } from "lucide-react";
import { MapPinSvg, StoreSvg } from "../../../constants/svg-icons";

type StoresInsideRadius = {
  GeoLocation: { props: { latitude: number; longitude: number; } }
  Profile: StoreProfileFromApi
  _id: string
}

export default function ClientMapSearch() {
  const { clientInfos, isMapLoaded } = useStore()
  const [clintLocation, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [radius, setRadius] = useState<number>(0)
  const navigate = useNavigate()
  const [selectedStore, setSelectedStore] = useState<{
    geoLocation: { props: { latitude: number; longitude: number; } },
    storeProfile: StoreProfileType
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

  const mapStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '10px'
  }

  const images = [
    'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/390.png',
    'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/390.png',
    'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/390.png',
  ]

  function onStorePinClick(item: StoresInsideRadius) {
    const teste = {
      geoLocation: item.GeoLocation,
      storeProfile: formatStoreProfile(item.Profile)
    }
    setSelectedStore(teste)
  }

  return (
    <>
      <div className="flex relative h-full gap-5">
        <div style={{ borderRadius: '10px' }} className="max-w-xs flex flex-col  p-4 gap-2 items-center bg-black w-[420px]">
          {selectedStore ? (
            <>
              <div className="w-full mt-5 flex flex-col">
                <div className="items-center flex justify-center">
                  <Carousel className="">
                    <CarouselContent className="h-[220px]">
                      <CarouselItem><img className="h-full w-full" src={images[0]} /></CarouselItem>
                      <CarouselItem><img className="h-full w-full" src={images[0]} /></CarouselItem>
                      <CarouselItem><img className="h-full w-full" src={images[0]} /></CarouselItem>
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
                  <div className="flex flex-row gap-5">
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
                  <div className="flex flex-row gap-5">
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
                  <Text className="text-white" as="span">Rua Resedá 248 - Santa Efigênia</Text>
                  <Text className="text-white " as="span">Belo Horizonte</Text>
                  <Text className="text-white-dark text-md mt-5" as="span">(31) 9 99585-3806 - (descrição)</Text>
                  <Text className="text-white-dark text-md " as="span">caiomagalhaesdefaria@hotmail.com</Text>
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
                  icon={StoreSvg}
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
                    <img className="w-[200px] h-[100px]" src={images[0]} />
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