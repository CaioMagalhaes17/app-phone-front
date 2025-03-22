import { HSeparator, IconFacebook, IconInstagram, IconMail, IconPencil, IconPhone, IconStreetMap, IconWhatsApp, Panel, Text } from "@app/ui";
import { MapAdapter, MarkAdapter } from "../../../../adapters/Map";
import useStore from "../../../../state";
import { StoreContacts, StoreSocialsType } from "../../../../types/store-profile";
import { Link } from "react-router-dom";
import { formatSocialColor } from "../../../../formaters/store-profile";
import { getWppLink } from "../../../../utils/get-wpp-link";

export type StoreProfileLocationProps = {
  lat: number,
  lng: number,
  storeSocials: StoreSocialsType[] | null
  contacts: StoreContacts
  storeProfileImg: string
  address: string
  isOwner?: boolean
}
export function StoreProfileLocation({ lat, lng, storeSocials, contacts, storeProfileImg, address, isOwner }: StoreProfileLocationProps) {
  const { isMapLoaded } = useStore()
  const mapStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '10px'
  }
  console.log(lat, lng)
  return (
    <>
      <Panel id="location" className="mt-5 font-bold">
        <div className="flex flex-row">
          <Text className="text-3xl text-black dark:text-white flex flex-row gap-5 items-center " as="h1"><IconStreetMap height="50px" width="40px" /> Localização e Contato</Text>
          {isOwner && (
            <Link to="/store/map/edit" className="btn-primary btn ml-auto"><IconPencil className="mr-2" />Alterar Localização</Link>
          )}
        </div>
        <HSeparator className="mt-2" />
        <div className="flex flex-row relative h-full gap-5">
          <div style={{ borderRadius: '10px' }} className="max-w-xs flex flex-col p-4 gap-2 items-center  w-[420px]">
            <Text className="text-black dark:text-white text-lg" as="span">{address}</Text>

            <Text className="text-black dark:text-white mt-auto text-xl flex flex-row gap-2 items-center" as="span"><IconPhone />{contacts.telNum}</Text>
            <Text className="text-black dark:text-white text-xl flex flex-row gap-2 items-center" as="span"><IconMail />{contacts.email}</Text>

            <Link target="_blank" to={getWppLink('storeProfile', contacts.wppNum)} className="btn btn-green flex flex-row gap-2 "><IconWhatsApp />Chamar no Whatsapp</Link>
            <div className="flex flex-row mt-5 gap-2">
              {
                storeSocials?.map((item) => {
                  return (
                    <>
                      <Link to={item.link} target="_blank" className={`btn btn-${formatSocialColor(item.type)} ${item.type === 'instagram' && 'bg-[linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)]'} rounded-full`}>
                        {item.type === 'instagram' && <IconInstagram />}
                        {item.type === 'facebook' && <IconFacebook />}
                      </Link >
                    </>
                  )
                })
              }
            </div>
          </div>
          <div className="h-[500px] w-full p-4">
            {isMapLoaded ? (
              <MapAdapter mapStyle={mapStyle} initialPosition={{ lat, lng }}>
                <MarkAdapter icon={storeProfileImg}
                  position={{ lat, lng }}
                />
              </MapAdapter>
            ) : (<>'Carregando...'</>)}
          </div>
        </div>
      </Panel >
    </>
  )
}