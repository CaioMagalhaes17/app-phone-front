import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { ProductType } from "../../types/products"
import { GetProductsByCategory } from "../../api/products/get-products-by-category"
import { formatProducts } from "../../formaters/products"

export function useGetNearProductsByCategory(category: string) {
  const [products, setProducts] = useState<ProductType[] | null>(null)
  const { data, isLoading } = useQuery({
    queryKey: ['get-products-by-category', category],
    queryFn: () => GetProductsByCategory(category),
    enabled: !!category
  })

  useEffect(() => {
    console.log(data)
    if (!isLoading && data) setProducts(formatProducts(data))
  }, [isLoading, data])

  return { products, isLoading }
}