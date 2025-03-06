import { useParams } from "react-router-dom"
import { useGetStoreProfileById } from "../../../../hooks/profile/useGetLocationByProfileId"
import { useGetStoreSocials } from "../../../../hooks/profile/useGetStoreSocials"
import { MarketStoreProfile } from "../../../../components/Market/Stores/profile"
import { useGetStoreProductsRows } from "../../../../hooks/products/useGetStoreProductsRows"

export function StoreMarket() {
  const { id } = useParams() as { id: string }
  const { storeProfile, isLoading } = useGetStoreProfileById(id)
  const { isLoading: isRowsLoading, rows } = useGetStoreProductsRows(id)
  const { socials } = useGetStoreSocials(id)
  console.log('111', rows)
  return (
    <>
      {!isLoading && storeProfile && socials && !isRowsLoading && rows ? (
        <MarketStoreProfile isOwner={false} socials={socials} storeProfile={storeProfile} rows={rows} />
      ) : ''}
    </>
  )
}