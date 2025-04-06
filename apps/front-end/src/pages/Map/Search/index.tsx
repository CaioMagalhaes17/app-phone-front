import { Button, HSeparator, IconMail, IconPencil, IconPhone, IconStore, IconStreetMap, IconWhatsApp, Panel, Text } from "@app/ui";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../../../state";
import { InfoWindowAdapter, MapAdapter, MarkAdapter, RadiusAdapter } from "../../../adapters/Map";
import { Star } from "lucide-react";
import { MapPinSvg } from "../../../constants/svg-icons";
import { getWppLink } from "../../../utils/get-wpp-link";
import { StoresInsideRadiusType } from "../../../types/stores";
import { useGetStoresInsideClientRadius } from "../../../hooks/geolocation/useGetStoresInsideClientRadius";
import { StoreItem } from "../../../components/Market/Stores/row/StoresItem";



export default function ClientMapSearch() {
  const { clientInfos, isMapLoaded } = useStore()
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
  return (
    <>
      <div className="p-4 max-h-[750px] rounded-xl sombra max-w-[1350px] mr-auto font-bold ml-auto mt-10">
        <div className="flex flex-row">
          <Text className="text-4xl font-bold flex flex-row gap-5 text-dark dark:text-white items-center " as="h1"><IconStreetMap width="40px" height="40px" />Lojas Próximas</Text>
          <Button onClick={() => navigate('/map/edit')} className="btn-outline-primary flex flex-row gap-2 ml-auto"><IconPencil />Editar Localização</Button>
        </div>
        <HSeparator className="mb-5" />
        <Panel className="p-2 rounded-xl  flex relative max-h-[650px] h-full gap-5 ">
          <Panel className="flex flex-col gap-2 p-4 items-center w-[540px] overflow-y-auto scrollable">
            {selectedStore ? (
              <>
                <div className="w-full flex flex-col">
                  <div className="items-center flex justify-center">
                    <img className="h-full w-full" src={selectedStore.profile.profileImg} />
                  </div>
                  <div className="p-2 flex w-full text-left font-bold text-white gap-2 flex-col">
                    <Text className="text-lg text-black dark:text-white" as="span">{selectedStore.profile.name}</Text>
                    <HSeparator className="mt-1" />
                    <Text className="text-white-dark flex flex-row justify-between items-center" as="span">
                      Aberta/Fechada
                      <Text className="text-dark dark:text-white ml-auto" as="span">Distância: {Math.floor(selectedStore.distance) >= 1000 ? `${Math.floor(Math.floor(selectedStore.distance) / 1000)} km` : `${Math.floor(selectedStore.distance)} m`}</Text>
                    </Text>
                    <div className="flex flex-row">{[...Array(5)].map((_, index) => (
                      <Star
                        absoluteStrokeWidth={true}
                        key={index}
                        className={index < selectedStore.profile.rating ? "fill-yellow-500 text-yellow-500" : "fill-none text-gray-300"}
                        size={20}
                      />
                    ))}</div>
                    <HSeparator className="mt-1" />
                    <div className="flex flex-row text-dark dark:text-white gap-5">
                      <label className=" flex items-center gap-2 block">
                        <input
                          type="checkbox"
                          className="form-checkbox rounded-full"
                          checked
                          disabled
                          style={{ backgroundColor: 'currentcolor' }}
                        />
                        <span className="text-md ">Possui entregas</span>
                      </label>
                      <label className="text-md flex items-center gap-2 block">
                        <input
                          type="checkbox"
                          className="form-checkbox rounded-full"
                          checked
                          disabled
                          style={{ backgroundColor: 'currentcolor' }}
                        />
                        <span className="">Rápidos orçamentos</span>
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
                        <span className="">Rápidos orçamentos</span>
                      </label>
                      <label className="text-md flex items-center gap-2 block">
                        <input
                          type="checkbox"
                          className="form-checkbox rounded-full"
                          checked
                          disabled
                          style={{ backgroundColor: 'currentcolor' }}
                        />
                        <span className="">Rápidos orçamentos</span>
                      </label>
                    </div>
                  </div>
                  <HSeparator className="mt-5" />


                  <Link target="_blank" rel="noopener noreferrer" to={`/store-profile/${selectedStore.profile.id}`} className="btn btn-primary flex flex-row w-full gap-5 mt-5">
                    <IconStore />
                    Ir para o perfil da loja
                  </Link>
                  <HSeparator className="mt-5" />


                  <div className="flex flex-col  items-center mt-5">
                    <Text className="text-dark dark:text-white text-center text-lg mb-5" as="span">{selectedStore.profile.address}</Text>
                    <Link target="_blank" to={getWppLink('storeProfile', selectedStore.contacts.wppNum)} className="btn btn-green flex flex-row gap-2 mb-5"><IconWhatsApp />Chamar no Whatsapp</Link>
                    <Text className="text-dark dark:text-white text-xl flex flex-row gap-2 items-center" as="span"><IconPhone />{selectedStore.contacts.telNum}</Text>
                    <Text className="text-dark dark:text-white text-xl mb-10 flex flex-row gap-2 items-center" as="span"><IconMail />{selectedStore.contacts.email}</Text>
                  </div>
                </div>


              </>
            ) :
              (
                <div className="mt-[300px]">
                  <Text as="span" className="text-3xl  mt-10 mb-10">Selecione uma Loja</Text>
                </div>
              )
            }
          </Panel>
          <Panel className="w-[900px] sombra rounded-xl">
            {clintLocation && isMapLoaded ? (
              <MapAdapter onClick={() => setSelectedStore(null)} mapStyle={mapStyle} initialPosition={clintLocation}>
                {!storesLoading && stores && stores.length > 0 ? (stores.map((item, i) => {
                  return (
                    <MarkAdapter
                      onClick={() => setSelectedStore(item)}
                      position={{ lat: item.location.latitude, lng: item.location.longitude }}
                      key={i}
                      icon={item.profile.profileImg}
                    />
                  )
                })) : ''}

                <RadiusAdapter onClick={() => setSelectedStore(null)} center={{ lat: clintLocation.lat, lng: clintLocation.lng }} radius={radius} />
                <MarkAdapter
                  position={clintLocation}
                  icon={MapPinSvg}
                />
                {selectedStore && (
                  <InfoWindowAdapter onClose={() => setSelectedStore(null)} position={{ lat: selectedStore.location.latitude, lng: selectedStore.location.longitude }} options={{ pixelOffset: new window.google.maps.Size(0, -40) }}>
                    <>
                      <div className="h-[200px] w-[200px]">
                        <img className="w-[200px] h-[100px]" src={selectedStore.profile.profileImg} />
                        <Text as="span" className=" text-dark">{selectedStore.profile.name}</Text>
                      </div>
                    </>
                  </InfoWindowAdapter>
                )}
              </MapAdapter>
            ) : ''}
          </Panel>
          <Panel className="flex flex-col gap-2 items-center  w-[540px] overflow-y-auto scrollable">
            {
              stores && stores.length > 0 ? (
                <>
                  <div className="font-bold flex flex-col gap-5">
                    <select onClick={(e) => onOrderChange(e.currentTarget.value)} className="form-select ml-auto bg-transparent !border-none text-dark form-select-lg dark:text-white">
                      <option value="rating">
                        Loja com mais notas
                      </option>
                      <option value="distance">
                        Loja mais próxima
                      </option>
                      <option value='ascPrice'>
                        Menor preço
                      </option>
                      <option value='descPrice'>
                        Maior preço
                      </option>
                    </select>
                    {stores.map((store) => (
                      <StoreItem onClick={() => setSelectedStore(store)} distance={store.distance} name={store.profile.name} profileImg={store.profile.profileImg} rating={store.profile.rating} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="mt-[250px] flex flex-col justify-center items-center">
                  <Text as="span" className="text-3xl text-center  mt-10 mb-10">Nenhuma loja encontrada</Text>
                  <Button onClick={() => navigate('/map/edit')} className="btn-primary flex flex-row w-full gap-5">
                    <IconPencil />
                    Editar localização de pesquisa
                  </Button>
                </div>
              )
            }
          </Panel>
        </Panel>
      </div>

    </>
  )
}