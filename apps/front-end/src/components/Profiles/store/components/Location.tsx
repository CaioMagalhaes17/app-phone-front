import { Button, Panel, Text } from "@app/ui";
import { MapAdapter, MarkAdapter } from "../../../../adapters/Map";
import useStore from "../../../../state";
import { useEffect, useState } from "react";

export function StoreProfileLocation() {
  const { isMapLoaded, storeInfos } = useStore()
  const [clintLocation, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  useEffect(() => {
    setLocation({
      lat: storeInfos?.location.latitude,
      lng: storeInfos?.location.longitude,
    })
  }, [storeInfos])

  const mapStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '10px'
  }
  return (
    <>
      <Panel className="mt-5 font-extrabold">
        <Text className="text-3xl text-white" as="h1">Localização e Contato</Text>
        <div className="border-b border-b-[#323b45] mt-5 mt-10" />
        <div className="flex flex-row relative h-full gap-5">

          <div style={{ borderRadius: '10px' }} className="max-w-xs flex flex-col  p-4 gap-2 items-center  w-[420px]">
            <Text className="text-white text-lg " as="span">Rua Resedá 248 - Santa Efigênia</Text>
            <Text className="text-white text-lg " as="span">Belo Horizonte</Text>
            <div className="border-b border-b-[#323b45] mt-5 mt-10 w-full" />
            <div className="mt-auto" />
            <Text className="text-white-dark text-md mt-10" as="span">(31) 9 99585-3806 - (descrição)</Text>
            <Text className="text-white-dark text-md " as="span">caiomagalhaesdefaria@hotmail.com</Text>
            <div className="border-b border-b-[#323b45] mt-5 mt-10 w-full" />
            <div className="flex flex-row mt-5 gap-2">
              <Button className="btn-outline-primary">WPP</Button>
              <Button className="btn-outline-primary">INSTA</Button>
              <Button className="btn-outline-primary">FCB</Button>
            </div>
          </div>
          <div className="h-[500px] w-full p-4">{clintLocation && isMapLoaded ? (
            <MapAdapter mapStyle={mapStyle} initialPosition={clintLocation}>
              <MarkAdapter position={clintLocation} />
            </MapAdapter>
          ) : (<>'Carregando...'</>)}</div>
        </div>
      </Panel>
    </>
  )
}