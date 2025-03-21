import { StoreProfileComponent } from "../../../../components/Profiles/store"
import useStore from "../../../../state"
import { useEffect, useState } from "react"
import { Button, IconPencil, IconShoppingBag } from "@app/ui"
import { useNavigate } from "react-router-dom"
import { useGetStoreContacts } from "../../../../hooks/profile/useGetStoreContacts"
import { useGetStoreSocials } from "../../../../hooks/profile/useGetStoreSocials"
import { useGetStoreFeedbacks } from "../../../../hooks/profile/useGetStoreFeedbacks"
import { useGetBudgets } from "../../../../hooks/budgets/useGetBudgets"

export function StoreProfileOwner() {
  const navigate = useNavigate()
  const { storeInfos } = useStore()

  const { contacts } = useGetStoreContacts()
  const { socials } = useGetStoreSocials()
  const { feedbacks } = useGetStoreFeedbacks(storeInfos.id, { page: '1', limit: '1' })
  const { budgets, isLoading } = useGetBudgets({ page: '1', limit: '3' })

  const [clintLocation, setLocation] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
  useEffect(() => {
    setLocation({
      lat: storeInfos.location.latitude,
      lng: storeInfos.location.longitude,
    })
  }, [storeInfos])


  return (
    <>
      <div className="">
        <ul className="flex font-semibold border-b border-[#191e3a] flex-row mb-5 whitespace-nowrap overflow-y-auto">
          <div className="ml-auto" />
          <li className="p-4 flex flex-row gap-5">
            <Button className="btn-primary flex flex-row gap-2" onClick={() => navigate('/store/profile/edit')}><IconPencil />Editar Perfil</Button>
            <Button className="btn-primary flex flex-row gap-2" onClick={() => navigate('/store/market')}><IconShoppingBag />Acessar Mercado</Button>
          </li>
        </ul>
      </div>
      {!isLoading && feedbacks && contacts ? (
        <StoreProfileComponent
          storeId={storeInfos.id}
          storeFeedbacksProps={{ feedbacks, canShowRateStore: false }}
          mainPanelProps={{ name: storeInfos.name, rating: storeInfos.rating, storeSocials: socials, storeProfileImg: storeInfos.profileImg }}
          storeProfileBudgets={{ budgets, isOwner: true }}
          storeProfileLocation={{ isOwner: true, lat: clintLocation.lat, lng: clintLocation.lng, storeSocials: socials, contacts, storeProfileImg: storeInfos.profileImg, address: storeInfos.address }}
        />
      ) : ''}
    </>
  )
}