import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { formatProductsRow } from "../../formaters/products";
import { ProductsRowType } from "../../types/products";
import { GetProductsRowById } from "../../api/products/get-products-row-by-id";

export function useGetStoreProductsRowById(id: string) {
  const [row, setRows] = useState<ProductsRowType | null>()
  const { data, isLoading } = useQuery({
    queryKey: ['get-products-row'],
    queryFn: () => GetProductsRowById(id)
  })
  useEffect(() => {
    if (!isLoading && data) {
      setRows(formatProductsRow(data))
    }
  }, [isLoading, data])
  return { row, isLoading }

}