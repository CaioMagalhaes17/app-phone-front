import { useEffect, useState } from "react";
import { useDebounce } from "../useDebounce";
import { ProductType } from "../../types/products";
import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../../api/products/search-products";
import { formatProducts } from "../../formaters/products";

export function useSearchProducts(query: string) {
  const debouncedQuery = useDebounce<string>(query, 500); // 2 segundos de debounce
  const [products, setProducts] = useState<ProductType[] | []>([])

  const { data, isLoading: isProductsLoading } = useQuery({
    queryKey: ['search-products', debouncedQuery],
    queryFn: () => searchProducts(debouncedQuery),
    enabled: !!debouncedQuery
  })

  useEffect(() => {
    console.log('cai aqui?', data)
    if (!isProductsLoading && data) {
      console.log(data)
      setProducts(formatProducts(data))
    }
  }, [data, isProductsLoading])

  return { products, isProductsLoading }
}