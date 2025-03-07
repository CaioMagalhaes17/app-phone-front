import { Text } from "@app/ui";
import { Link } from "react-router-dom";
import { ProductType } from "../../../../types/products";
import { noImage } from "../../../../constants/images";

export function ProductItem({ product, isOwner }: { product: ProductType, isOwner: boolean }) {
  return (
    <>
      <Link to={isOwner ? `/store/market/product/edit/${product.id}` : `/market/store/product/${product.id}`} className="max-h-[140px] mt-5 flex flex-row items-start gap-5">
        <div className="w-[120px]">
          <img width="150" src={product.productImg || noImage} className="rounded-3xl" />
        </div>
        <div className="font-extrabold flex w-full flex-col">
          <Text className="flex flex-row gap-5 items-center text-center text-black dark:text-white text-lg" as="span">
            {product.name}
          </Text>
          <div className="flex w-full flex-row">
            <div className="w-full text-left flex flex-col gap-2">
              <Text className="text-green" as="span">{product.price} {!product.isActive && isOwner ? (
                <Text className="text-danger ml-2" as="span">INATIVADO</Text>
              ) : ''}</Text>
              <Text className="text-black dark:text-white" as="span">{product.category}</Text>
            </div>
          </div>
        </div >
      </Link >
    </>
  )
}