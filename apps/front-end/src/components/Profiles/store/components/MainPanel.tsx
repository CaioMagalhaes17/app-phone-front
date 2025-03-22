import { IconFacebook, IconInstagram, IconWhatsApp, Panel, Text } from "@app/ui";
import { Star } from "lucide-react";
import { StoreSocialsType } from "../../../../types/store-profile";
import { Link } from "react-router-dom";
import { formatSocialColor } from "../../../../formaters/store-profile";

export interface StoreMainPainelProps {
  rating: number,
  name: string,
  storeSocials: StoreSocialsType[] | null
  storeProfileImg: string
  distance?: number
}

export function MainPainel({ rating, name, storeSocials, storeProfileImg, distance }: StoreMainPainelProps) {
  return (
    <>
      <Panel className="">
        <div className="max-w-[1200px] mr-auto ml-auto flex flex-row gap-5">
          <div className="w-[350px] flex flex-col gap-2 ">
            <img width={'260px'} height={'260px'} src={storeProfileImg} className="rounded-3xl" />
          </div>
          <div className="p-2 flex w-full text-left text-lg font-extrabold text-white gap-5 flex-col">
            <div className="flex flex-row gap-5">
              <Text className="text-black dark:text-white font-extrabold text-3xl" as="span">{name}</Text>
              <div className="flex flex-row gap-2">
                {
                  storeSocials?.map((item) => {
                    return (
                      <>
                        <Link to={item.link} target="_blank" className={`btn btn-${formatSocialColor(item.type)} ${item.type === 'instagram' && 'bg-[linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)]'} rounded-full`}>
                          {item.type === 'whatsapp' && <IconWhatsApp />}
                          {item.type === 'instagram' && <IconInstagram />}
                          {item.type === 'facebook' && <IconFacebook />}
                        </Link >
                      </>
                    )
                  })
                }
              </div>
              {distance && (
                <Text className="text-dark dark:text-white ml-auto" as="span">Distância: {Math.floor(distance) >= 1000 ? `${Math.floor(Math.floor(distance) / 1000)} km` : `${Math.floor(distance)} m`}</Text>
              )}
            </div>
            <div className="border-b border-b-[#323b45] " />
            <Text className="text-white-dark font-extrabold text-xl" as="span">Aberta/Fechada</Text>
            <div className="flex flex-row">{[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={index < rating ? "fill-yellow-500 text-yellow-500" : "fill-none text-gray-300"}
                size={32}
              />
            ))}</div>
            <div className="border-b border-b-[#323b45] " />
            <div className="flex flex-row gap-5 text-dark dark:text-white">
              <label className="text-md flex items-center gap-2 block">
                <input
                  type="checkbox"
                  className="form-checkbox rounded-full"
                  checked
                  disabled
                  style={{ backgroundColor: 'currentcolor' }}
                />
                <span className="font-extrabold">Possui entregas</span>
              </label>
              <label className="text-md flex items-center gap-2 block">
                <input
                  type="checkbox"
                  className="form-checkbox rounded-full"
                  checked
                  disabled
                  style={{ backgroundColor: 'currentcolor' }}
                />
                <span className="font-extrabold">Rápidos orçamentos</span>
              </label>
              <label className="text-md flex items-center gap-2 block">
                <input
                  type="checkbox"
                  className="form-checkbox rounded-full"
                  checked
                  disabled
                  style={{ backgroundColor: 'currentcolor' }}
                />
                <span className="font-extrabold">Rápidos orçamentos</span>
              </label>
              <label className="text-md flex items-center gap-2 block">
                <input
                  type="checkbox"
                  className="form-checkbox rounded-full"
                  checked
                  disabled
                  style={{ backgroundColor: 'currentcolor' }}
                />
                <span className="font-extrabold">Rápidos orçamentos</span>
              </label>
            </div>
            <div className="flex flex-row gap-5">

            </div>
          </div>

        </div>
      </Panel>
    </>
  )
}