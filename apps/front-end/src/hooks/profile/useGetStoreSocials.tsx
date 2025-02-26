import { useEffect, useState } from "react"
import { StoreSocialsType } from "../../types/store-profile"
import { useQuery } from "@tanstack/react-query"
import { getStoreSocials } from "../../api/user/store/get-socials"
import { formatStoreSocials } from "../../formaters/store-profile"

export function useGetStoreSocials(id?: string) {
  const [socials, setSocials] = useState<StoreSocialsType[] | null>(null)

  const { data: socialsData, isLoading: isSocialsLoading } = useQuery({
    queryKey: ['get-socials'],
    queryFn: () => getStoreSocials(id)
  })

  useEffect(() => {
    if (!isSocialsLoading && socialsData) {
      setSocials(formatStoreSocials(socialsData))
    }
  }, [socialsData, isSocialsLoading])

  return { socials, isSocialsLoading }
}