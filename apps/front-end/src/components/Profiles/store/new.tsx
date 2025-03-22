import {
  Button, IconMap, IconSearch, IconWhatsApp, Input, Text
} from "@app/ui"
import { Star } from "lucide-react"
import { Link } from "react-router-dom"
import { getWppLink } from "../../../utils/get-wpp-link"


export function StoreProfileMain({ name, startWorkTime, endWorkTime, distance, rating, storeProfileImg, wppNum, qualities }: {
  name: string,
  startWorkTime: string,
  endWorkTime: string,
  distance: number,
  rating: number,
  qualities: string[]
  storeProfileImg: string
  wppNum: string
}) {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex flex-col">
          <img className="rounded-xl" src="https://static.ifood-static.com.br/image/upload//capa/bb23fc4b-f872-44cf-b3da-caf4b8bce4d4/202408251237_WKJY@2x.png" />
          <div className="mt-5 flex flex-row items-center font-bold gap-5">
            <img width={'130px'} height={'130px'} src={storeProfileImg} className="rounded-3xl" />
            <div className="flex flex-col">
              <Text className="text-5xl text-black dark:text-white" as="h1">{name}</Text>
              <Text className="text-xl text-white-dark" as="h1">{startWorkTime} - {endWorkTime}</Text>
              <Text className="text-white-dark" as="span">Distância: {Math.floor(distance) >= 1000 ? `${Math.floor(Math.floor(distance) / 1000)} km` : `${Math.floor(distance)} m`}</Text>
            </div>
            <div className="flex flex-row mb-[50px]">
              {[...Array(5)].map((_, index) => (
                <Star
                  height={'100px'}
                  width={'25'}
                  key={index}
                  className={index < rating ? "fill-yellow-500 text-yellow-500" : "fill-none text-gray-300"}
                  size={16}
                />
              ))}
            </div>
            <div className="ml-auto" />
            <div className="flex flex-col">
              <div className="flex gap-5 flex-row">
                <div className="ml-auto" />
                <Button onClick={() => document.getElementById('location')?.scrollIntoView({ behavior: "smooth" })} className="btn-outline-primary flex flex-row gap-2"><IconMap />Localização</Button>
                <Link target="_blank" to={getWppLink('storeProfile', wppNum)} className="btn btn-green flex flex-row gap-2"><IconWhatsApp />Chamar no Whatsapp</Link>
              </div>
              <div className="mt-5 flex flex-row gap-5 text-dark dark:text-white">
                {qualities.map((quality) => {
                  return (
                    <>
                      <label className="text-md flex items-center gap-2 block">
                        <input
                          type="checkbox"
                          className="form-checkbox rounded-full"
                          checked
                          disabled
                          style={{ backgroundColor: 'currentcolor' }}
                        />
                        <span className="font-extrabold">{quality}</span>
                      </label>
                    </>
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
    </>
  )
}