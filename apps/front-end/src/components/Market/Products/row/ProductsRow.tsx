import {
  Panel, Text, Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  IconPencil,
  Button,
} from "@app/ui";
import { ProductItem } from "./ProductsItem";

export type ProductsRowProps = {
  title: string
  isOwner: boolean
  id: string
}
export function ProductsRow({ title, isOwner, id }: ProductsRowProps) {
  return (
    <>
      <div className="flex flex-row mb-5">
        <span className="dark:text-white text-black text-3xl font-extrabold">{title}</span>
        {isOwner && (<Button className="btn-primary ml-auto flex flex-row gap-2"><IconPencil />Editar</Button>)}
      </div>
      <Panel className="p-4 flex flex-row w-full justify-center gap-5 ">
        <Carousel opts={{
          align: "start",
        }}
          className="w-full " >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/4">
                <ProductItem name="Headset NIgger stringer" price="R$320" category="Fones de ouvidos" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </Panel>
    </>
  )
}