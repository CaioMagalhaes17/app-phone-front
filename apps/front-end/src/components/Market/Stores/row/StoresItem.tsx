import { Text } from "@app/ui";
import { Star } from "lucide-react";
import useStore from "../../../../state";

export function StoreItem({ profileImg, name, rating, distance, onClick }: { onClick: () => void, profileImg: string, name: string, rating: number, distance: number }) {
  const { isMobile } = useStore()
  return (
    <>
      <div onClick={() => onClick()} className="cursor-pointer hover:bg-[#5a505033] font-bold flex flex-row gap-5" >
        <div className={`${isMobile ? 'w-[120px]' : 'w-[150px]'} max-h-[120px] `}>
          <img width="100" height="100" src={profileImg} className="rounded-3xl" />
        </div>
        <div className="flex w-full flex-col">
          <Text className="flex text-ellipsis gap-5 items-center text-center text-dark dark:text-white text-lg" as="span">
            {name.length > 23 ? (name.slice(0, -(name.length - 20)) + '...') : name}
          </Text>
          <div className="flex flex-row mb-2">
            {[...Array(5)].map((_, index) => (
              <Star
                strokeWidth={'3'}
                key={index}
                className={index < rating ? "fill-yellow-500 text-yellow-500" : "fill-none text-gray-300"}
                size={16}
              />
            ))}
          </div>
          <div className="w-full text-left flex flex-row items-center gap-5">
            <Text className={`${isMobile ? '' : 'text-lg'} text-green`} as="span">Aberto</Text>
            <Text className="text-dark dark:text-white ml-auto" as="span">Distância: {Math.floor(distance) >= 1000 ? `${Math.floor(Math.floor(distance) / 1000)} km` : `${Math.floor(distance)} m`}</Text>
          </div>
        </div >
      </div >
    </>
  )
}