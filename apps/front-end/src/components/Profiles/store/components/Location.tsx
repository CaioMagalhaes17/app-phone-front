import { IconFacebook, IconInstagram, IconWhatsApp, Panel, Text } from "@app/ui";
import { MapAdapter, MarkAdapter } from "../../../../adapters/Map";
import useStore from "../../../../state";
import { StoreContacts, StoreSocialsType } from "../../../../types/store-profile";
import { Link } from "react-router-dom";

export type StoreProfileLocationProps = {
  lat: number,
  lng: number,
  storeSocials: StoreSocialsType[] | null
  contacts: StoreContacts[] | null
  storeProfileImg: string
  address: string
}
export function StoreProfileLocation({ lat, lng, storeSocials, contacts, storeProfileImg, address }: StoreProfileLocationProps) {
  const { isMapLoaded } = useStore()

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
            <Text className="text-white text-lg" as="span">{address}</Text>
            <div className="border-b border-b-[#323b45] mt-5 mt-10 w-full" />
            <div className="mt-auto mt-10" />
            {contacts && contacts.length > 0 ? (
              contacts.map((item) => {
                return (
                  <>
                    <Text className="text-white-dark text-md" as="span">{item.email || item.telNum} - {item.description}</Text>
                  </>
                )
              })

            ) : ''}
            <div className="border-b border-b-[#323b45] mt-5 mt-10 w-full" />
            <div className="flex flex-row mt-5 gap-2">
              {
                storeSocials?.map((item) => {
                  return (
                    <>
                      <Link to={item.link} target="_blank" className="btn btn-outline-primary rounded-full">
                        {item.type === 'whatsapp' && <IconWhatsApp />}
                        {item.type === 'instagram' && <IconInstagram />}
                        {item.type === 'facebook' && <IconFacebook />}
                      </Link>
                    </>
                  )
                })
              }
            </div>
          </div>
          <div className="h-[500px] w-full p-4">{isMapLoaded ? (
            <MapAdapter mapStyle={mapStyle} initialPosition={{ lat, lng }}>
              <MarkAdapter icon={storeProfileImg}
                position={{ lat, lng }}
              />
            </MapAdapter>
          ) : (<>'Carregando...'</>)}</div>
        </div>
      </Panel>
    </>
  )
}