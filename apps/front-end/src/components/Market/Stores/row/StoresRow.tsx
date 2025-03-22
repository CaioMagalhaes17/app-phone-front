import {
  Panel, Text, Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  VSeparator,
} from "@app/ui";
import { StoresInsideRadiusType } from "../../../../types/stores";

import { StoreItem } from "./StoresItem";

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
                      <StoreItem distance={store.distance} id={store.profile.id} name={store.profile.name} profileImg={store.profile.profileImg} rating={store.profile.rating} />
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