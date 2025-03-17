import { useEffect, useState } from "react"
import { StoreProfileType } from "../../types/store-profile"
import { useQuery } from "@tanstack/react-query"
import { searchStoreProfiles } from "../../api/user/store/search-stores"
import { useDebounce } from "../useDebounce";

export function useSearchStoreProfiles(query: string) {
  const debouncedQuery = useDebounce<string>(query, 500); // 2 segundos de debounce
  const [profiles, setProfiles] = useState<StoreProfileType[] | []>([])

  const { data, isLoading: isStoreLoading } = useQuery({
    queryKey: ['search-stores', debouncedQuery],
    queryFn: () => searchStoreProfiles(debouncedQuery),
    enabled: !!debouncedQuery
  })

  useEffect(() => {
    if (!isStoreLoading && data) {
      console.log('bundabunda', data)
      setProfiles(data)
    }
  }, [data, isStoreLoading])

  return { profiles, isStoreLoading }
}