import {
  Button, IconFacebook, IconInstagram, IconMap, IconWhatsApp, Text
} from "@app/ui"
import { Star } from "lucide-react"
import { Link } from "react-router-dom"
import { getWppLink } from "../../../../../utils/get-wpp-link"
import { storeTags } from "../../../../../constants/store-tags"
import { formatSocialColor } from "../../../../../formaters/store-profile"
import { StoreSocialsType } from "../../../../../types/store-profile"


export function MobileStoreProfileMain({ name, workingTime, distance, rating, storeProfileImg, wppNum, tags, storeSocials }: {
  name: string,
  distance?: number,
  rating: number,
  tags?: string[]
  storeProfileImg: string
  workingTime?: string
  wppNum: string
  storeSocials: StoreSocialsType[] | null
}) {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex flex-col p-2 ">
          <img className="sombra  rounded-xl" src="https://static.ifood-static.com.br/image/upload//capa/bb23fc4b-f872-44cf-b3da-caf4b8bce4d4/202408251237_WKJY@2x.png" />
          <div className="mt-3 flex flex-col items-center font-bold gap-5">
            <img width={'200px'} src={storeProfileImg} className="rounded-3xl sombra" />
            <div className="flex flex-col">
              <Text className="text-4xl text-dark dark:text-white" as="h1">{name}</Text>
              <Text className="text-xl text-white-dark" as="h1"><span className="text-green">Aberto</span> ({workingTime})</Text>
              <div className="flex flex-row gap-10">
                {distance && (
                  <Text className="text-white-dark" as="span">Distância: {Math.floor(distance) >= 1000 ? `${Math.floor(Math.floor(distance) / 1000)} km` : `${Math.floor(distance)} m`}</Text>
                )}
                <div className="flex flex-row">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      width={'20'}
                      key={index}
                      className={index < rating ? "fill-yellow-500 text-yellow-500" : "fill-none text-gray-300"}
                      size={16}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="ml-auto" />
            <div className="flex flex-col">

              <div className="ml-auto" />
              <div className="flex flex-row gap-5 justify-center">
                <Button onClick={() => document.getElementById('location')?.scrollIntoView({ behavior: "smooth" })} className="btn-outline-primary flex flex-row gap-2"><IconMap />Localização</Button>
                <Link target="_blank" to={getWppLink('storeProfile', wppNum)} className="btn btn-green flex flex-row gap-2"><IconWhatsApp />Whatsapp</Link>
              </div>
              <div className="flex flex-row gap-2  mt-5 justify-center">
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
        </div>
      </div>
    </>
  )
}