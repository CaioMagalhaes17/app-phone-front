import { useQuery } from "@tanstack/react-query";
import { Button, Input, Text } from "@app/ui";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../../state";
import { FetchStoresInsideClientRadius } from "../../../api/geolocation/fetch-stores-inside-client-radius";
import { MapAdapter, MarkAdapter, RadiusAdapter } from "../../../adapters/Map";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@app/ui"

type StoresInsideRadius = {
  GeoLocation: { props: { latitude: number; longitude: number; } }
  Profile: { props: { name: string, profileImg: string, email: string, telNum: string, description: string, address: string } }
  _id: string
}

export default function ClientMapSearch() {
  const { clientInfos, isMapLoaded } = useStore()
  const [clintLocation, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [radius, setRadius] = useState<number>(0)
  const navigate = useNavigate()

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

  return (
    <>
      <div className="flex relative h-full gap-5">
        <div style={{ borderRadius: '10px' }} className="max-w-xs flex flex-col  p-4 gap-2 items-center bg-black w-[420px]">
          <h1 className="text-[#c4c4c4] mt-2 font-extrabold text-3xl text-left">Lojas mais próximas</h1>
          <div className="border-b border-b-[#323b45] mt-5 w-[90%]" />
          <div className="w-full mt-5 flex flex-col">
            <div className="items-center flex justify-center">
              <Carousel className="">
                <CarouselContent className="h-[250px]">
                  <CarouselItem><img className="h-full w-full" src={images[0]} /></CarouselItem>
                  <CarouselItem><img className="h-full w-full" src={images[0]} /></CarouselItem>
                  <CarouselItem><img className="h-full w-full" src={images[0]} /></CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </Carousel>
            </div>

            <Text className="" as="span">Nome</Text>
            <Input type="text" className="w-full" value="Nome da loja Nome da loja" disabled />
            <Text className="mt-5" as="span">Horário de funcionamento</Text>
            <div className="flex flex-row gap-5 items-center">
              <Input type="text" className="w-full" value="08:00" disabled />
              <Text className="" as="span">Até</Text>
              <Input type="text" className="w-full" value="17:00" disabled />
            </div>
            <Text className="mt-5" as="span">Endereço</Text>
            <Input type="text" className="w-full" value="Rua Resedá 248" disabled />
            <Text className="mt-5" as="span">Detalhes adicionais</Text>
            <textarea className="placeholder:text-white-dark w-full rounded-md border px-4 py-2 text-sm font-semibold !outline-none focus:border-primary focus:ring-transparent border-[#17263c] bg-[#121e32] text-white-dark focus:border-primary"></textarea>
          </div>
          <div className="border-b border-b-[#323b45] mt-5 w-[90%]" />
          <Button onClick={() => navigate('/map/edit')} className="btn-primary flex flex-row w-full">Editar localização de pesquisa</Button>
        </div>
        {clintLocation && isMapLoaded ? (
          <MapAdapter mapStyle={mapStyle} initialPosition={clintLocation}>
            {!storesLoading && data.length > 0 ? (data.map((item: StoresInsideRadius) => {
              return (
                <MarkAdapter position={{ lat: item.GeoLocation.props.latitude, lng: item.GeoLocation.props.longitude }} key={item._id} />
              )
            })) : ''}
            <RadiusAdapter center={{ lat: clintLocation.lat, lng: clintLocation.lng }} radius={radius} />
          </MapAdapter>
        ) : ''}
      </div>
    </>
  )
}