import {
  Panel, Text, Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  VSeparator,
} from "@app/ui";
import { StoresInsideRadiusType } from "../../../../types/stores";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

export type ProductsRowProps = {
  title: string
  stores: StoresInsideRadiusType[]
}
export function StoresRow({ title, stores }: ProductsRowProps) {
  return (
    <>
      <Panel>
        <Text as="h1" className="dark:text-white text-black text-left text-3xl font-extrabold">{title}</Text>
        <div className="w-full p-4 font-extrabold">
          <Panel className="p-4 flex flex-row w-full justify-center gap-5">
            <Carousel opts={{
              align: "start",
            }}
              className="w-full" >
              <CarouselContent>
                {stores.map((store, index) => (
                  <>
                    <CarouselItem key={index} className="basis-1/4">
                      <Link type="button" className="hover:dark:bg-[#5a505033] font-extrabold flex flex-row gap-5" to={`/market/store/${store.profile.id}`}>
                        <div className="w-[150px] max-h-[120px] ">
                          <img width="100" height="100" src={store.profile.profileImg} className="rounded-3xl" />
                        </div>
                        <div className="flex w-full flex-col">
                          <Text className="flex flex-row gap-5 items-center text-center text-black dark:text-white text-lg" as="span">
                            {store.profile.name}
                          </Text>
                          <div className="flex flex-row mb-2">
                            {[...Array(5)].map((_, index) => (
                              <Star
                                key={index}
                                className={index < store.profile.rating ? "fill-yellow-500 text-yellow-500" : "fill-none text-gray-300"}
                                size={16}
                              />
                            ))}
                          </div>
                          <div className="flex flex-row w-full">
                            <div className="w-full text-left flex flex-col gap-2">
                              <Text className="text-lg text-green" as="span">Aberto</Text>
                              <Text as="span">Distância em km: 5km</Text>
                            </div>
                          </div>
                        </div >
                      </Link >
                    </CarouselItem >
                    <VSeparator className="h-[100px]" />
                  </>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </Panel>
        </div >
      </Panel>
    </>
  )
}