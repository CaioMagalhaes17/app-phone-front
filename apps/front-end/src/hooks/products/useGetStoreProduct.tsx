import { useQuery } from "@tanstack/react-query";
import { GetProduct } from "../../api/products/get-product";
import { useEffect, useState } from "react";
import { ProductType } from "../../types/products";
import { formatProduct } from "../../formaters/products";

export function useGetStoreProduct(id: string) {
  const [product, setProduct] = useState<ProductType | null>(null)
  const { data, isLoading } = useQuery({
    queryKey: ['get-product', id],
    queryFn: () => GetProduct(id)
  })

  useEffect(() => {
    if (!isLoading && data) setProduct(formatProduct(data))
  }, [isLoading, data])

  return { product, isLoading }
}