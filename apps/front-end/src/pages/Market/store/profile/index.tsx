import { MarketStoreProfile } from "../../../../components/Market/Stores/profile"
import { useGetStoreProductsRows } from "../../../../hooks/products/useGetStoreProductsRows"
import { useGetStoreSocials } from "../../../../hooks/profile/useGetStoreSocials"
import useStore from "../../../../state"

export function StoreMarketProfile() {
  const { storeInfos } = useStore()
  const { socials } = useGetStoreSocials(storeInfos.id)
  const { isLoading, rows } = useGetStoreProductsRows()
  console.log(rows)
  return (
    <>
      {storeInfos && socials && !isLoading && rows ? (
        <MarketStoreProfile rows={rows} isOwner={true} socials={socials} storeProfile={storeInfos} />
      ) : ''}
    </>
  )
}