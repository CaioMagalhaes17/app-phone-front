import { useQuery } from "@tanstack/react-query";

import { getStoreProfileById } from "../../api/user/store/get-profile-by-id";
import { useEffect, useState } from "react";
import { StoreProfileType } from "../../types/store-profile";

export function useGetStoreProfileById(id: string): { storeProfile: StoreProfileType & { location: { latitude: number, longitude: number } } | null, isLoading: boolean } {
  const [storeProfile, setStoreProfile] = useState<StoreProfileType & { location: { latitude: number, longitude: number } } | null>(null)

  const { data: profileData, isLoading } = useQuery({
    queryKey: ['get-profile'],
    queryFn: () => getStoreProfileById(id)
  })

  useEffect(() => {
    if (profileData && !isLoading) {
      setStoreProfile(profileData)
    }
  }, [profileData, isLoading]);

  return { storeProfile, isLoading };
}

