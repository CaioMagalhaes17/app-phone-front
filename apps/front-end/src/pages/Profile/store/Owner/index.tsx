import { useQuery } from "@tanstack/react-query"
import { StoreProfileComponent } from "../../../../components/Profiles/store"
import useStore from "../../../../state"
import { GetBudgets } from "../../../../api/repair/budget/get-budgets"
import { useEffect, useState } from "react"
import { BudgetType } from "../../../../types/budget"
import { formatBudgetsFromApi } from "../../../../formaters/budget"
import { Button, IconPencil, IconShoppingBag } from "@app/ui"
import { useNavigate } from "react-router-dom"
import { FeedbackType } from "../../../../types/feedback"
import { formatFeedbacks } from "../../../../formaters/feedback"
import { GetFeedbacksFromStore } from "../../../../api/feedback/get-from-store"
import { StoreContacts, StoreSocialsType } from "../../../../types/store-profile"
import { getStoreSocials } from "../../../../api/user/store/get-socials"
import { formatStoreContacts, formatStoreSocials } from "../../../../formaters/store-profile"
import { getStoreContacts } from "../../../../api/user/store/get-contacts"

export function StoreProfileOwner() {
  const navigate = useNavigate()
  const [budgets, setBudgets] = useState<BudgetType[] | []>([])
  const [socials, setSocials] = useState<StoreSocialsType[] | null>(null)
  const { storeInfos } = useStore()
  const { data, isLoading } = useQuery({
    queryKey: ['get-budgets'],
    queryFn: () => GetBudgets({ page: '1', limit: '3' })
  })
  const { data: socialsData, isLoading: isSocialsLoading } = useQuery({
    queryKey: ['get-socials'],
    queryFn: () => getStoreSocials()
  })

  useEffect(() => {
    if (!isSocialsLoading && socialsData) {
      setSocials(formatStoreSocials(socialsData))
    }
  }, [socialsData, isSocialsLoading])

  useEffect(() => {
    if (!isLoading) {
      setBudgets(formatBudgetsFromApi(data))
    }
  }, [isLoading, data])

  const [feedbacks, setFeedbacks] = useState<FeedbackType[] | null>(null)

  const { data: feedbacksData, isLoading: isLoadingFeedback } = useQuery({
    queryKey: ['get-feedbacks'],
    queryFn: () => GetFeedbacksFromStore(storeInfos.id, { limit: '3', page: '1' })
  })

  useEffect(() => {
    if (!isLoadingFeedback && feedbacksData) return setFeedbacks(formatFeedbacks(feedbacksData))
  }, [isLoadingFeedback, feedbacksData])

  const [clintLocation, setLocation] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
  useEffect(() => {
    setLocation({
      lat: storeInfos.location.latitude,
      lng: storeInfos.location.longitude,
    })
  }, [storeInfos])

  const [contacts, setContacts] = useState<StoreContacts[] | null>(null)

  const { data: contactsData, isLoading: isLoadingContacts } = useQuery({
    queryKey: ['get-contacts'],
    queryFn: () => getStoreContacts()
  })

  useEffect(() => {
    if (!isLoadingContacts && contactsData) return setContacts(formatStoreContacts(contactsData))
  }, [contactsData, isLoadingContacts])

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
      {!isLoading && feedbacks ? (
        <StoreProfileComponent
          storeId={storeInfos.id}
          storeFeedbacksProps={{ feedbacks, canShowRateStore: false }}
          mainPanelProps={{ name: storeInfos.name, rating: storeInfos.rating, storeSocials: socials, storeProfileImg: storeInfos.profileImg }}
          storeProfileBudgets={{ budgets, isOwner: true }}
          storeProfileLocation={{ lat: clintLocation.lat, lng: clintLocation.lng, storeSocials: socials, contacts, storeProfileImg: storeInfos.profileImg, address: storeInfos.address }}
        />
      ) : ''}
    </>
  )
}