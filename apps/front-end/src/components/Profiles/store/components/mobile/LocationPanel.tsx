import { HSeparator, IconFacebook, IconInstagram, IconMail, IconOldPhone, IconPencil, IconStreetMap, IconWhatsApp, Panel, Text } from "@app/ui";
import { MapAdapter, MarkAdapter } from "../../../../../adapters/Map";
import useStore from "../../../../../state";
import { StoreContacts, StoreSocialsType } from "../../../../../types/store-profile";
import { Link } from "react-router-dom";
import { formatSocialColor } from "../../../../../formaters/store-profile";
import { getWppLink } from "../../../../../utils/get-wpp-link";

export type StoreProfileLocationProps = {
  lat: number,
  lng: number,
  storeSocials: StoreSocialsType[] | null
  contacts: StoreContacts
  storeProfileImg: string
  address: string
  isOwner?: boolean
}
export function MobileStoreProfileLocation({ lat, lng, storeSocials, contacts, storeProfileImg, address, isOwner }: StoreProfileLocationProps) {
  const { isMapLoaded } = useStore()
  const mapStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '10px'
  }
  console.log(lat, lng)
  return (
    <>
      <Panel id="location" className="mt-5 font-bold p-2">
        <div className="flex flex-row">
          <Text className="text-xl text-dark dark:text-white flex flex-row gap-5 items-center " as="h1"><IconStreetMap height="30px" width="40px" /> Localização e Contato</Text>
          {isOwner && (
            <Link to="/store/map/edit" className="btn-primary btn ml-auto"><IconPencil className="mr-2" />Alterar Localização</Link>
          )}
        </div>
        <HSeparator className="mt-2 w-[90%] ml-auto mr-auto" />
        <div className="flex flex-col relative h-full gap-5">
          <Text className="text-dark dark:text-white mt-5" as="span">{address}</Text>
          <div className="h-[450px] sombra rounded-xl w-full">
            {isMapLoaded ? (
              <MapAdapter mapStyle={mapStyle} initialPosition={{ lat, lng }}>
                <MarkAdapter icon={storeProfileImg}
                  position={{ lat, lng }}
                />
              </MapAdapter>
            ) : (<>'Carregando...'</>)}
          </div>
          <div className="flex flex-row gap-10 mt-5">
            <Text className="text-dark dark:text-white mt-auto flex flex-row gap-2 items-center" as="span"><IconOldPhone />{contacts.telNum}</Text>
            <Text className="text-dark dark:text-white flex flex-row gap-2 items-center" as="span"><IconMail />{contacts.email}</Text>
          </div>
          <div className="flex flex-row gap-2">
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
          <Link target="_blank" to={getWppLink('storeProfile', contacts.wppNum)} className="btn btn-green flex flex-row gap-2 "><IconWhatsApp />Chamar no Whatsapp</Link>
        </div>
      </Panel >
      <div className="mb-10" />
    </>
  )
}