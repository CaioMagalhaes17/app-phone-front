import {
  Panel, Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  IconPencil,
  Button,
} from "@app/ui";
import { ProductItem } from "./ProductsItem";
import { useNavigate } from "react-router-dom";
import { ProductsRowType } from "../../../../types/products";

export type ProductsRowProps = {
  isOwner: boolean
  row: ProductsRowType
}
export function ProductsRow({ isOwner, row }: ProductsRowProps) {
  const navigate = useNavigate()
  return (
    <>
      <Panel>
        <div className="flex flex-row mb-5">
          <span className="dark:text-white text-black text-3xl font-extrabold">{row.name}</span>
          {isOwner && (
            <>
              <div className="flex flex-row gap-2 ml-auto">
                <Button onClick={() => navigate('/store/market/row/edit')} className="btn-primary ml-auto flex flex-row gap-2"><IconPencil />Editar Prateleira</Button>
              </div>
            </>
          )}
        </div>
        <Panel className="p-4 flex flex-row w-full justify-center gap-5 ">
          <Carousel opts={{
            align: "start",
          }}
            className="w-full " >
            <CarouselContent>
              {row.products.map((product, index) => {
                return (
                  <>
                    <CarouselItem key={index} className="basis-1/4">
                      <ProductItem product={product} />
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