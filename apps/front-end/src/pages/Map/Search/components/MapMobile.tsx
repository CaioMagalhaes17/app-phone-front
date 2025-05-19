import { Button, HSeparator, IconPencil, Panel, Text } from "@app/ui";
import { useMapSearchController } from "../useMapSearchController";
import { InfoWindowAdapter, MapAdapter, MarkAdapter, RadiusAdapter } from "../../../../adapters/Map";
import { MapPinSvg } from "../../../../constants/svg-icons";
import { StoreItem } from "../../../../components/Market/Stores/row/StoresItem";
import { StoreSheet } from "./AbaTeste";

export function MapSearchMobile() {
  const { navigate, clintLocation, isMapLoaded, setSelectedStore, mapStyle, stores, storesLoading, selectedStore, radius, onOrderChange } = useMapSearchController()
  return (
    <>
      <div className="max-w-[1350px] min-h-screen mr-auto ml-auto">
        <Text className="text-xl font-bold flex flex-row gap-5 text-dark dark:text-white mt-5 ml-5 " as="h1">Lojas Próximas</Text>
        <HSeparator className="w-[90%] mt-1 mb-1 ml-auto mr-auto" />
        <Panel className="h-[500px] mt-5 ml-2 mr-2 sombra rounded-xl">
          {clintLocation && isMapLoaded ? (
            <MapAdapter zoom={12} onClick={() => setSelectedStore(null)} mapStyle={mapStyle} initialPosition={clintLocation}>
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

                  </>
                </InfoWindowAdapter>
              )}
            </MapAdapter>
          ) : ''}
        </Panel>
        <HSeparator />
        <Panel className="flex flex-col gap-2 mt-5 items-center overflow-y-auto scrollable">
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
              <div className="flex flex-col justify-center items-center">
                <Text as="span" className="text-3xl text-center  mt-10 mb-10">Nenhuma loja encontrada</Text>
                <Button onClick={() => navigate('/map/edit')} className="btn-primary flex flex-row w-full gap-5">
                  <IconPencil />
                  Editar localização de pesquisa
                </Button>
              </div>
            )
          }
        </Panel>
        <StoreSheet selectedStore={selectedStore} />
      </div>
    </>
  )
}