import { useQuery } from "@tanstack/react-query";
import { InfoWindowAdapter, MapAdapter, MarkAdapter, RadiusAdapter } from "../../../adapters/Map";
import useStore from "../../../state";
import { FetchStoresInsideClientRadius } from "../../../api/geolocation/fetch-stores-inside-client-radius";
import { Button, IconPencil, IconSearch, IconSend, Input, Text } from "@app/ui";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

type StoresInsideRadius = {
  GeoLocation: { props: { latitude: number; longitude: number; } }
  Profile: { props: { name: string, profileImg: string, email: string, telNum: string, description: string, address: string } }
  _id: string
}

export function Home() {
  const navigate = useNavigate()
  const { clientInfos, isMapLoaded } = useStore()
  const clientInitialPosition = {
    lat: clientInfos?.location?.latitude,
    lng: clientInfos?.location?.longitude,
    radius: clientInfos?.location?.radius
  }

  const { isLoading: storesLoading, data } = useQuery({
    queryKey: ['fetch-stores-inside-client-radius'],
    queryFn: FetchStoresInsideClientRadius
  })

  useEffect(() => {
    if (!storesLoading && data.status === 'geolocationNotFound') {
      Swal.fire({
        timer: 10000,
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
  }, [storesLoading, data])

  const mapStyle = {
    width: '100%',
    height: '600px',
    borderRadius: '10px'
  }

  const [selectedStore, setSelectedStore] = useState<StoresInsideRadius | null>()

  return (
    <>
      <div className="flex mt-10 justify-center ">
        <div className="min-h-[450px] max-w-[1000px] w-full">
          <div className="flex flex-row items-center gap-10 justify-center text-center ">
            <div className="flex-col">
              <h1 className="text-5xl font-extrabold text-black dark:text-white mb-4">
                Facilitando serviços de assistência a celulares
              </h1>

              <label className="text-md flex items-center gap-2 block">
                <input
                  type="checkbox"
                  className="form-checkbox rounded-full"
                  checked
                  disabled
                  style={{ backgroundColor: 'currentcolor' }}
                />
                <p className="text-lg font-extrabold max-w-2xl mb-2">
                  Envie orçamentos para todas as lojas mais próximas de você!
                </p>
              </label>

              <label className="text-md flex items-center gap-2 block">
                <input
                  type="checkbox"
                  className="form-checkbox rounded-full"
                  checked
                  disabled
                  style={{ backgroundColor: 'currentcolor' }}
                />
                <p className="text-lg font-extrabold max-w-2xl mb-2">
                  Deixe uma nota no perfil da loja para o serviço contratado!
                </p>
              </label>

              <label className="text-md flex items-center gap-2 block">
                <input
                  type="checkbox"
                  className="form-checkbox rounded-full"
                  checked
                  disabled
                  style={{ backgroundColor: 'currentcolor' }}
                />
                <p className="text-lg font-extrabold max-w-2xl mb-2">
                  Escolha o melhor preço!
                </p>
              </label>
              <div className="flex gap-5 flex-row w-full">
                <Button className="btn-primary flex flex-row gap-5 text-xl ml-auto mr-auto mt-10">
                  <IconSend />
                  Enviar orçamento
                </Button>
                <Button className="flex flex-row gap-5 btn-outline-primary text-xl ml-auto mr-auto mt-10">
                  <IconSearch />
                  Procurar lojas próximas
                </Button>
              </div>

            </div>
            <div className="flex-col">
              <img className="h-full w-full" src={'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/390.png'} />
            </div>
          </div>
          <div className="border-b border-b-[#323b45] w-[50%] ml-auto mr-auto mt-10" />
        </div>

      </div>
      <div className=" w-full flex justify-center items-center">
        <div className="flex flex-col w-full max-w-[1200px]">
          <div className="flex flex-row mb-4 gap-5">
            <div className="flex">
              <Text className="text-white text-3xl font-extrabold " as="h1">Assistências técnicas mais próximas</Text>
            </div>
            <div className="mr-auto" />
            <Button onClick={() => navigate('/map/edit')} className="btn-primary flex flex-row gap-5"><IconPencil />Editar localização de pesquisa</Button>
            <Input type="text" className="!w-[25%]" placeholder="Pesquisar por loja" />
          </div>
          <div className="w-full items-center justify-center">
            {isMapLoaded && (
              <>
                <MapAdapter mapStyle={mapStyle} initialPosition={clientInitialPosition}>
                  {!storesLoading && data && data.length > 0 ? (data.map((item: StoresInsideRadius) => {
                    return (
                      <MarkAdapter icon={item.Profile.props.profileImg} onClick={() => setSelectedStore(item)} position={{ lat: item.GeoLocation.props.latitude, lng: item.GeoLocation.props.longitude }} key={item._id} />
                    )
                  })) : ''}
                  <RadiusAdapter center={{ lat: clientInitialPosition.lat, lng: clientInitialPosition.lng }} radius={clientInitialPosition.radius} />
                  {selectedStore && (
                    <InfoWindowAdapter onClose={() => setSelectedStore(null)} position={{ lat: selectedStore.GeoLocation.props.latitude, lng: selectedStore.GeoLocation.props.longitude }} options={{ pixelOffset: new window.google.maps.Size(0, -40) }}>
                      <>
                        Loja: {selectedStore.Profile.props.name}
                      </>
                    </InfoWindowAdapter>
                  )}
                </MapAdapter>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}