import { Button, IconPlus } from "@app/ui"
import { MarketStoreProfile } from "../../../../components/Market/Stores/profile"
import { useGetStoreProductsRows } from "../../../../hooks/products/useGetStoreProductsRows"
import { useGetStoreSocials } from "../../../../hooks/profile/useGetStoreSocials"
import useStore from "../../../../state"
import { useNavigate } from "react-router-dom"

export function StoreMarketProfile() {
  const { storeInfos } = useStore()
  const { socials } = useGetStoreSocials(storeInfos.id)
  const { isLoading, rows } = useGetStoreProductsRows()
  const navigate = useNavigate()
  return (
    <>
      {storeInfos && socials && !isLoading && rows ? (
        <>
          <div className="flex flex-col">
            <MarketStoreProfile rows={rows} isOwner={true} socials={socials} storeProfile={storeInfos} />
            <Button onClick={() => navigate('/store/market/row/edit')} className="mr-auto ml-auto mt-10 btn-primary flex flex-row gap-2"><IconPlus />Adicionar Prateleira</Button>
          </div>
        </>
      ) : ''}
    </>
  )
}