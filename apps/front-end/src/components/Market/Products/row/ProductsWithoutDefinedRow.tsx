import {
  Panel, Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@app/ui";
import { ProductItem } from "./ProductsItem";
import { ProductType } from "../../../../types/products";

export type ProductsRowProps = {
  products: ProductType[]
  title?: string
}
export function ProductsWithoutDefinedRow({ products, title }: ProductsRowProps) {
  return (
    <>
      <Panel>
        <div className="flex flex-row mb-5">
          <span className="dark:text-white text-black text-3xl font-extrabold">{title}</span>
        </div>
        <Panel className="p-4 flex flex-row w-full justify-center gap-5 ">
          <Carousel opts={{
            align: "start",
          }}
            className="w-full " >
            <CarouselContent>
              {products.map((product, index) => {
                return (
                  <>
                    <CarouselItem key={index} className="basis-1/4">
                      <ProductItem isOwner={false} product={product} />
                    </CarouselItem>
                  </>
                )
              })}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </Panel>
      </Panel>
    </>
  )
}