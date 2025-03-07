import { Button, HSeparator, IconArrowBackward, IconMap, IconStreetMap, Text, VSeparator } from "@app/ui";
import { useGetNearProductsByCategory } from "../../../../hooks/products/useGetNearProductsByCategory";
import { useNavigate, useParams } from "react-router-dom";
import { ProductsWithoutDefinedRow } from "../../../../components/Market/Products/row/ProductsWithoutDefinedRow";
import { productsCategories } from "../../../../constants/products";
import { divideArray } from "../../../../utils/divide-array";
import { useEffect, useState } from "react";
import { ProductType } from "../../../../types/products";

export function ClientMarketCategoryProducts() {
  const { category } = useParams() as { category: string }
  const { products, isLoading } = useGetNearProductsByCategory(category)
  const [allProducts, setAllProducts] = useState<ProductType[][]>()

  const navigate = useNavigate()

  useEffect(() => {
    console.log('dsadasd')
    if (products && products.length > 0) {
      setAllProducts(divideArray(products, 10))
    } else {
      setAllProducts([])
    }
  }, [products, isLoading])

  return (
    <>
      <div className="flex flex-row gap-5 items-center mb-5">
        <Button onClick={() => navigate('/market')} className="btn-outline-primary "><IconArrowBackward /></Button>
        <VSeparator className="mr-1 ml-1" />
        <Text className="text-black dark:text-white font-extrabold text-5xl" as="h1">{category} perto de você</Text>
      </div>
      <HSeparator className="mb-5" />
      <div className="flex flex-row gap-5 mb-5">
        {productsCategories.map((Pcategory) => (
          <Button onClick={() => navigate('/market/by-category/' + Pcategory)} className={` ${category === Pcategory ? 'btn-primary' : 'btn-outline-primary'}`}>{Pcategory}</Button>
        ))}
      </div>
      {!isLoading && allProducts && allProducts.length > 0 ? (
        allProducts.map((products) => {
          return (
            <>
              <div className="mb-5">
                <ProductsWithoutDefinedRow products={products} />
              </div>
            </>
          )
        })
      ) : (
        <div className="font-extrabold flex flex-col gap-5 mt-10">
          <Text className="text-center text-3xl" as="h1">Nenhum Produto Encontrado</Text>
          <Text as="h2" className="text-xl ml-auto mr-auto flex flex-row">Tente alterar o raio de pesquisa pelo menu
            <span className="flex flex-row gap-2 ml-5">
              <IconStreetMap /> Mapa
            </span>
          </Text>
        </div>
      )}
    </>
  )
}