import { useQuery } from "@tanstack/react-query";
import { GetProducts } from "../../api/products/get-products";
import { useEffect } from "react";

export function useGetStoreProducts() {
  const { data, isLoading } = useQuery({
    queryKey: ['get-products'],
    queryFn: GetProducts
  })

  useEffect(() => {
    if (!isLoading) {
      console.log(data)
    }
  }, [isLoading, data])
}