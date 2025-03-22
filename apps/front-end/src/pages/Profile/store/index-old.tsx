import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { StoreProfileComponent } from "../../../components/Profiles/store"
import { useGetStoreSocials } from "../../../hooks/profile/useGetStoreSocials"
import { useGetStoreContacts } from "../../../hooks/profile/useGetStoreContacts"
import { Button, IconShoppingBag } from "@app/ui"
import { useGetStoreProfileById } from "../../../hooks/profile/useGetLocationByProfileId"
import { useGetBudgetsFromStore } from "../../../hooks/budgets/useGetBudgetsByStoreId"
import { useGetStoreFeedbacks } from "../../../hooks/profile/useGetStoreFeedbacks"

export function StoreProfile() {
  const { id } = useParams() as { id: string }
  const { storeProfile, distance, isLoading } = useGetStoreProfileById(id)
  const { budgets } = useGetBudgetsFromStore(id, { limit: '3', page: '1' })
  const { socials } = useGetStoreSocials(id)
  const { contacts } = useGetStoreContacts(id)
  const { feedbacks } = useGetStoreFeedbacks(id, { limit: '3', page: '1' })
  const [clintLocation, setLocation] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
  useEffect(() => {
    if (storeProfile) {
      setLocation({
        lat: storeProfile.location.latitude,
        lng: storeProfile.location.longitude,
      })
    }
  }, [storeProfile, isLoading])

  const navigate = useNavigate()
  console.log(storeProfile)
  return (
    <>
      <Button onClick={() => navigate('/market/store/' + id)} className="btn-primary flex flex-row gap-2 mb-2 ml-auto"><IconShoppingBag />Ver Produtos</Button>
      {!isLoading && feedbacks && budgets && contacts && storeProfile ? (
        <StoreProfileComponent
          storeFeedbacksProps={{ feedbacks, canShowRateStore: true }}
          mainPanelProps={{ distance: distance, name: storeProfile.name, rating: storeProfile.rating, storeSocials: socials, storeProfileImg: storeProfile.profileImg }}
          storeProfileLocation={{ lat: clintLocation.lat, lng: clintLocation.lng, storeSocials: socials, contacts, storeProfileImg: storeProfile.profileImg, address: storeProfile.address }}
          storeProfileBudgets={{ budgets }}
          storeId={id}
        />
      ) : ''}
    </>
  )
}