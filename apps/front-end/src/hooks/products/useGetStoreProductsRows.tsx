import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { GetProductsRows } from "../../api/products/get-products-rows";
import { formatProductsRows } from "../../formaters/products";
import { ProductsRowType } from "../../types/products";

export function useGetStoreProductsRows(id?: string) {
  const [rows, setRows] = useState<ProductsRowType[] | null>()
  const { data, isLoading } = useQuery({
    queryKey: ['get-products-rows'],
    queryFn: () => GetProductsRows(id)
  })
  useEffect(() => {
    if (!isLoading && data) {
      setRows(formatProductsRows(data))
    }
  }, [isLoading, data])

  return { rows, isLoading }

}