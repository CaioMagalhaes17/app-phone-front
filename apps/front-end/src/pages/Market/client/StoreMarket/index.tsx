import { useParams } from "react-router-dom"
import { useGetStoreProfileById } from "../../../../hooks/profile/useGetLocationByProfileId"
import { useGetStoreSocials } from "../../../../hooks/profile/useGetStoreSocials"
import { MarketStoreProfile } from "../../../../components/Market/Stores/profile"

export function StoreMarket() {
  const { id } = useParams() as { id: string }
  const { storeProfile, isLoading } = useGetStoreProfileById(id)
  const { socials } = useGetStoreSocials(id)
  return (
    <>
      {!isLoading && storeProfile && socials ? (
        <MarketStoreProfile isOwner={false} socials={socials} storeProfile={storeProfile} />
      ) : ''}
    </>
  )
}