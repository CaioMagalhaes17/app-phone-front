import {
  Panel, Text, Carousel,
  CarouselContent,
  CarouselItem,
} from "@app/ui";
import { pokemon } from "../../../constants/images";
import { useNavigate } from "react-router-dom";

export type ProductsRowProps = {
  title?: string
  categories: string[]
}
export function CategoriesRow({ title, categories }: ProductsRowProps) {
  const navigate = useNavigate()
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
                {categories.map((category, index) => (
                  <>
                    <CarouselItem onClick={() => navigate('/market/by-category/' + category)} key={index} className="basis-1/6 flex flex-col items-center justify-center hover:bg-[#c4c4c4] hover:dark:bg-[#5a505033] cursor-pointer">
                      <div className="">
                        <img width="100" height="100" src={pokemon} className="rounded-3xl" />
                      </div>
                      <div className="flex w-full flex-col text-center">
                        <Text className="flex flex-row gap-5 justify-center items-center text-center text-dark dark:text-white text-lg" as="span">
                          {category}
                        </Text>
                      </div >
                    </CarouselItem >
                  </>
                ))}
              </CarouselContent>
            </Carousel>
          </Panel>
        </div >
      </Panel>
    </>
  )
}