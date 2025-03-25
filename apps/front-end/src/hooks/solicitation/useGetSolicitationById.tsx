import { useQuery } from "@tanstack/react-query";
import { Solicitation } from "../../types/solicitation";
import { GetSolicitation } from "../../api/repair/solicitation/get-solicitation";

export function useGetSolicitationById(id: string) {

  const { data: solicitationData, isLoading } = useQuery<Solicitation>({
    queryKey: ['get-solicitation'],
    queryFn: () => GetSolicitation(id)
  })

  return { isLoading, solicitationData }
}