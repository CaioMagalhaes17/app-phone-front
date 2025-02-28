import { Text } from "@app/ui";
import { pokemon } from "../../../../constants/images";
import { Link } from "react-router-dom";

export type ProductItemProps = {
  name: string,
  price: string,
  category: string
}

export function ProductItem({ category, name, price }: ProductItemProps) {
  return (
    <>
      <Link to={`/market/store/product/1}`} className="max-h-[140px] mt-5 flex flex-row items-start gap-5">
        <div className="w-[120px]">
          <img width="150" src={pokemon} className="rounded-3xl" />
        </div>
        <div className="font-extrabold flex w-full flex-col">
          <Text className="flex flex-row gap-5 items-center text-center text-black dark:text-white text-lg" as="span">
            {name}
          </Text>
          <div className="flex w-full flex-row">
            <div className="w-full text-left flex flex-col gap-2">
              <Text className="text-success" as="span">{price}</Text>
              <Text className="text-black dark:text-white" as="span">{category}</Text>
            </div>
          </div>
        </div >
      </Link >
    </>
  )
}