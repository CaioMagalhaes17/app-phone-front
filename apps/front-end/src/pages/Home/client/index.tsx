import { InfoWindowAdapter, MapAdapter, MarkAdapter, RadiusAdapter } from "../../../adapters/Map";
import useStore from "../../../state";
import { Button, IconPencil, IconSearch, IconSend, Input, Text } from "@app/ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPinSvg } from "../../../constants/svg-icons";
import { useGetStoresInsideClientRadius } from "../../../hooks/geolocation/useGetStoresInsideClientRadius";
import { StoresInsideRadiusType } from "../../../types/stores";
import { StoreServicesGrid } from "../../../components/Profiles/store/components/Services";
import { pokemon } from "../../../constants/images";

export function Home() {
  const navigate = useNavigate()
  const { clientInfos, isMapLoaded } = useStore()
  const clientInitialPosition = {
    lat: clientInfos?.location?.latitude,
    lng: clientInfos?.location?.longitude,
    radius: clientInfos?.location?.radius
  }

  const { stores, storesLoading } = useGetStoresInsideClientRadius()

  const mapStyle = {
    width: '100%',
    height: '600px',
    borderRadius: '10px'
  }

  const [selectedStore, setSelectedStore] = useState<StoresInsideRadiusType>()
  const services = [
    {
      serviceImg: pokemon,
      serviceName: 'Troca de Baterias',
      topic: 'battery'
    },
    {
      serviceImg: pokemon,
      serviceName: 'Troca de Tela',
      topic: 'display'
    },
    {
      serviceImg: pokemon,
      serviceName: 'Troca de Baterias',
      topic: 'battery'
    },
    {
      serviceImg: pokemon,
      serviceName: 'Troca de Tela',
      topic: 'display'
    }
  ]
  return (
    <>
      <div className="flex mt-10 justify-center ">
        <div className="min-h-[360px] max-w-[1100px] w-full">
          <div className="mb-5 w-full">
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
                  <p className="text-lg text-dark dark:text-white-dark font-extrabold mb-2">
                    Solicite orçamentos para todas as lojas mais próximas de você, sem sair de casa!
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
                  <p className="text-lg text-dark dark:text-white-dark font-extrabold max-w-2xl mb-2">
                    Procure por produtos e acessórios de celulares!
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
                  <p className="text-lg text-dark dark:text-white-dark font-extrabold max-w-2xl mb-2">
                    Escolha o melhor preço!
                  </p>
                </label>

                <div className="flex gap-5 flex-row w-full">
                  <Button onClick={() => navigate('/signup')} className="btn-primary flex flex-row gap-5 text-xl ml-auto mr-auto mt-10">
                    <IconSend />
                    Solicitar orçamento
                  </Button>
                  <Button onClick={() => navigate('/signup')} className="flex flex-row gap-5 btn-outline-primary text-xl ml-auto mr-auto mt-10">
                    <IconSearch />
                    Procurar lojas próximas
                  </Button>
                </div>

              </div>
              <div className="flex-col">
                <img className="h-full w-full" src={'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/390.png'} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <StoreServicesGrid services={services} title="Manutenção em celulares" onServiceClick={(topic) => navigate('/solicitations/create?topic=' + topic)} />
      <div className=" w-full flex justify-center items-center">
        <div className="flex flex-col w-full max-w-[1200px]">
          <div className="flex flex-row mb-4 gap-5">
            <div className="flex">
              <Text className="text-dark dark:text-white text-3xl font-extrabold " as="h1">Assistências técnicas mais próximas</Text>
            </div>
            <div className="mr-auto" />
            <Button onClick={() => navigate('/map/edit')} className="btn-primary flex flex-row gap-5"><IconPencil />Editar localização de pesquisa</Button>
            <Input type="text" className="!w-[25%]" placeholder="Pesquisar por loja" />
          </div>
          <div className="w-full items-center justify-center">
            {isMapLoaded && (
              <>
                <MapAdapter mapStyle={mapStyle} initialPosition={clientInitialPosition}>
                  {!storesLoading && stores && stores.length > 0 ? (stores.map((item) => {
                    return (
                      <MarkAdapter icon={item.profile.profileImg} onClick={() => setSelectedStore(item)} position={{ lat: item.location.latitude, lng: item.location.longitude }} key={item.id} />

                    )
                  })) : ''}
                  <MarkAdapter
                    position={clientInitialPosition}
                    icon={MapPinSvg}
                  />
                  <RadiusAdapter center={{ lat: clientInitialPosition.lat, lng: clientInitialPosition.lng }} radius={clientInitialPosition.radius} />
                  {selectedStore && (
                    <InfoWindowAdapter onClose={() => setSelectedStore(undefined)} position={{ lat: selectedStore.location.latitude, lng: selectedStore.location.longitude }} options={{ pixelOffset: new window.google.maps.Size(0, -40) }}>
                      <>
                        Loja: {selectedStore.profile.name}
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