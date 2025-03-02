import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { getStoreProfileById } from "../../../api/user/store/get-profile-by-id"
import { GetBudgetsByStoreId } from "../../../api/repair/budget/get-budgets-by-store-id"
import { useEffect, useState } from "react"
import { BudgetType } from "../../../types/budget"
import { FeedbackType } from "../../../types/feedback"
import { formatBudgetsFromApi } from "../../../formaters/budget"
import { GetFeedbacksFromStore } from "../../../api/feedback/get-from-store"
import { formatFeedbacks } from "../../../formaters/feedback"
import { StoreProfileComponent } from "../../../components/Profiles/store"
import { useGetStoreSocials } from "../../../hooks/profile/useGetStoreSocials"
import { useGetStoreContacts } from "../../../hooks/profile/useGetStoreContacts"
import { Button, IconShoppingBag } from "@app/ui"

export function StoreProfile() {

  const [budgets, setBudgets] = useState<BudgetType[] | null>()
  const [feedbacks, setFeedbacks] = useState<FeedbackType[] | null>()
  const { id } = useParams() as { id: string }
  const { data: profileData, isLoading } = useQuery({
    queryKey: ['get-profile'],
    queryFn: () => getStoreProfileById(id)
  })

  const { data: budgetsData, isLoading: isLoadingBudgets } = useQuery({
    queryKey: ['get-budgets'],
    queryFn: () => GetBudgetsByStoreId(id, { limit: '3', page: '1' })
  })

  const { socials } = useGetStoreSocials(id)

  useEffect(() => {
    if (!isLoadingBudgets) {
      setBudgets(formatBudgetsFromApi(budgetsData))
    }
  }, [isLoadingBudgets, budgetsData])

  const [clintLocation, setLocation] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
  useEffect(() => {
    setLocation({
      lat: profileData?.location.latitude,
      lng: profileData?.location.longitude,
    })
  }, [budgets])


  const { data: feedbacksData, isLoading: isLoadingFeedback } = useQuery({
    queryKey: ['get-feedbacks'],
    queryFn: () => GetFeedbacksFromStore(id, { limit: '3', page: '1' })
  })

  useEffect(() => {
    if (!isLoadingFeedback && feedbacksData) return setFeedbacks(formatFeedbacks(feedbacksData))
  }, [isLoadingFeedback, feedbacksData])

  const { contacts } = useGetStoreContacts(id)
  const navigate = useNavigate()
  return (
    <>
      <Button onClick={() => navigate('/market/store/' + id)} className="btn-primary flex flex-row gap-2 mb-2 ml-auto"><IconShoppingBag />Ver Produtos</Button>
      {!isLoading && feedbacks && budgets ? (
        <StoreProfileComponent
          storeFeedbacksProps={{ feedbacks, canShowRateStore: true }}
          mainPanelProps={{ name: profileData.name, rating: profileData.rating, storeSocials: socials, storeProfileImg: profileData.profileImg }}
          storeProfileLocation={{ lat: clintLocation.lat, lng: clintLocation.lng, storeSocials: socials, contacts, storeProfileImg: profileData.profileImg, address: profileData.address }}
          storeProfileBudgets={{ budgets }}
          storeId={id}
        />
      ) : ''}
    </>
  )
}