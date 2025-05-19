import {
  Button, IconFacebook, IconInstagram, IconMap, IconSearch, IconWhatsApp, Input, Text
} from "@app/ui"
import { Star } from "lucide-react"
import { Link } from "react-router-dom"
import { getWppLink } from "../../../../utils/get-wpp-link"
import { storeTags } from "../../../../constants/store-tags"
import { formatSocialColor } from "../../../../formaters/store-profile"
import { StoreSocialsType } from "../../../../types/store-profile"
import useStore from "../../../../state"
import { MobileStoreProfileMain } from "./mobile/MainPanel"


export function StoreProfileMain({ name, workingTime, distance, rating, storeProfileImg, wppNum, tags, storeSocials }: {
  name: string,
  distance?: number,
  rating: number,
  tags?: string[]
  storeProfileImg: string
  workingTime?: string
  wppNum: string
  storeSocials: StoreSocialsType[] | null
}) {
  const { isMobile } = useStore()
  return (
    <>
      {isMobile ? (
        <MobileStoreProfileMain
          distance={distance}
          workingTime={workingTime}
          name={name}
          tags={tags}
          rating={rating}
          storeProfileImg={storeProfileImg}
          wppNum={wppNum}
          storeSocials={storeSocials}
        />
      ) : (
        <div className="flex items-center justify-center">
          <div className="flex flex-col">
            <img className="sombra rounded-xl" src="https://static.ifood-static.com.br/image/upload//capa/bb23fc4b-f872-44cf-b3da-caf4b8bce4d4/202408251237_WKJY@2x.png" />
            <div className="mt-7 flex flex-row items-center font-bold gap-5">
              <img width={'130px'} height={'130px'} src={storeProfileImg} className="rounded-3xl sombra" />
              <div className="flex flex-col">
                <Text className="text-4xl text-dark dark:text-white" as="h1">{name}</Text>
                <Text className="text-xl text-white-dark" as="h1"><span className="text-green">Aberto</span> ({workingTime})</Text>
                {distance && (
                  <Text className="text-white-dark" as="span">Distância: {Math.floor(distance) >= 1000 ? `${Math.floor(Math.floor(distance) / 1000)} km` : `${Math.floor(distance)} m`}</Text>
                )}
              </div>
              <div className="flex flex-row mb-[30px]">
                {[...Array(5)].map((_, index) => (
                  <Star
                    width={'20'}
                    key={index}
                    className={index < rating ? "fill-yellow-500 text-yellow-500" : "fill-none text-gray-300"}
                    size={16}
                  />
                ))}
              </div>
              <div className="ml-auto" />
              <div className="flex flex-col">
                <div className="flex gap-5 items-center flex-row">
                  <div className="ml-auto" />
                  <Button onClick={() => document.getElementById('location')?.scrollIntoView({ behavior: "smooth" })} className="btn-outline-primary flex flex-row gap-2"><IconMap />Localização</Button>
                  <Link target="_blank" to={getWppLink('storeProfile', wppNum)} className="btn btn-green flex flex-row gap-2"><IconWhatsApp />Chamar no Whatsapp</Link>
                  <div className="flex flex-row gap-2">
                    {
                      storeSocials && storeSocials?.map((item) => {
                        return (
                          <>
                            <Link to={item.link} target="_blank" className={`btn w-[100px] btn-${formatSocialColor(item.type)} ${item.type === 'instagram' && 'bg-[linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)]'} rounded-full`}>
                              {item.type === 'instagram' && <IconInstagram />}
                              {item.type === 'facebook' && <IconFacebook />}
                            </Link >
                          </>
                        )
                      })
                    }
                  </div>
                </div>
                <div className="flex text-sm flex-row flex-wrap gap-2 mt-5 text-white max-w-[500px]">
                  {tags && tags.map((tag) => {
                    const tagName = storeTags.filter((item) => item.id === tag)[0]
                    return (
                      <button className={`text-dark dark:text-white border rounded-xl p-1`}>{tagName.name}</button>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className=" mt-5 relative">
              <Input value={''} type="text" placeholder="Procure por acessórios, celulares, serviços..." className="w-full !ps-10 bg-[#c4c4c4] dark:bg-[#c4c4c4] border-white-dark placeholder:text-black placeholder:dark:text-white-dark" />
              <span className="absolute start-4 top-1/2 -translate-y-1/2">
                <IconSearch className="text-black dark:text-white" />
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}