import {
  Panel, Text, Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  VSeparator,
  IconStore,
  HSeparator,
} from "@app/ui";
import { StoresInsideRadiusType } from "../../../../types/stores";

import { StoreItem } from "./StoresItem";
import { useNavigate } from "react-router-dom";

export type ProductsRowProps = {
  title: string
  stores: StoresInsideRadiusType[]
}
export function StoresRow({ title, stores }: ProductsRowProps) {
  const navigate = useNavigate()
  return (
    <>
      <Panel>
        <Text as="h1" className="dark:text-white text-dark text-left text-2xl font-bold flex flex-row items-center gap-5 "><IconStore />{title}</Text>
        <HSeparator className="" />
        <div className="w-full p-4 font-extrabold">
          <Panel className="p-4 flex flex-row w-full justify-center gap-5">
            <Carousel opts={{
              align: "start",
            }}
              className="w-full" >
              <CarouselContent>
                {stores.map((store, index) => (
                  <>
                    <CarouselItem key={index} className="basis-1/3">
                      <StoreItem onClick={() => navigate('/store/' + store.profile.id)} distance={store.distance} name={store.profile.name} profileImg={store.profile.profileImg} rating={store.profile.rating} />
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