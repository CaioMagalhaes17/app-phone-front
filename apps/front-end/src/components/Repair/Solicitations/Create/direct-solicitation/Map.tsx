import { Button, Text } from "@app/ui";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@app/ui"

import { Star } from "lucide-react";
import useStore from "../../../../../state";
import { InfoWindowAdapter, MapAdapter, MarkAdapter } from "../../../../../adapters/Map";
import { StoreProfileType } from "../../../../../types/store-profile";
import { MapPinSvg } from "../../../../../constants/svg-icons";

export default function DirectSolicitationMap({ storeProfile, setActiveTab }: {
  storeProfile: StoreProfileType & { location: { latitude: number, longitude: number } }
  setActiveTab: React.Dispatch<React.SetStateAction<number>>
}) {
  const { clientInfos, isMapLoaded } = useStore()
  const [clintLocation, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    setLocation({
      lat: clientInfos?.location.latitude,
      lng: clientInfos?.location.longitude,
    })
  }, [clientInfos])

  const mapStyle = {
    width: '100%',
    height: '670px',
    borderRadius: '10px'
  }

  const images = [
    'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/390.png',
    'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/390.png',
    'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/390.png',
  ]

  return (
    <>
      <div className="flex flex-row h-full gap-5">
        <div style={{ borderRadius: '10px' }} className="max-w-xs flex flex-col  p-4 gap-2 items-center w-[420px]">

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
              <Text className="text-white font-extrabold" as="span">{storeProfile.name}</Text>
              <div className="border-b border-b-[#323b45]" />
              <Text className="text-white-dark font-extrabold" as="span">Aberta/Fechada</Text>
              <div className="flex flex-row">{[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={index < storeProfile.rating ? "fill-yellow-500 text-yellow-500" : "fill-none text-gray-300"}
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
          </div>

        </div>
        {clintLocation && isMapLoaded ? (
          <MapAdapter mapStyle={mapStyle} initialPosition={clintLocation}>
            <MarkAdapter icon={storeProfile.profileImg} position={{ lat: storeProfile.location.latitude, lng: storeProfile.location.longitude }} />
            <MarkAdapter icon={MapPinSvg} position={{ lat: clintLocation.lat, lng: clintLocation.lng }} />

            <InfoWindowAdapter onClose={() => console.log('nigger')} position={{ lat: storeProfile.location.latitude, lng: storeProfile.location.longitude }} options={{ pixelOffset: new window.google.maps.Size(0, -40) }}>
              <>
                <div className="h-[200px] w-[200px]">
                  <img className="w-[200px] h-[100px]" src={images[0]} />
                  <Text as="span" className="font-extrabold text-dark">{storeProfile.name}</Text>
                </div>
              </>
            </InfoWindowAdapter>
          </MapAdapter>

        ) : ''}
      </div >
      <div className="flex p-6 justify-between w-full">
        <Button type="button" onClick={() => setActiveTab(3)} className="btn-primary">Voltar</Button>
        <Button type="submit" onClick={() => setActiveTab(5)} className="btn-primary">Próximo</Button>
      </div>
    </>
  )
}