import { useQuery } from "@tanstack/react-query"
import { StoreProfileComponent } from "../../../components/Profiles/store"
import useStore from "../../../state"
import { GetBudgets } from "../../../api/repair/budget/get-budgets"
import { useEffect, useState } from "react"
import { BudgetType } from "../../../types/budget"
import { formatBudgetsFromApi } from "../../../formaters/budget"
import { Button, IconPencil } from "@app/ui"
import { useNavigate } from "react-router-dom"
import { FeedbackType } from "../../../types/feedback"
import { formatFeedbacks } from "../../../formaters/feedback"
import { GetFeedbacksFromStore } from "../../../api/feedback/get-from-store"

export function StoreProfile() {
  const navigate = useNavigate()
  const [budgets, setBudgets] = useState<BudgetType[] | []>([])
  const { storeInfos } = useStore()
  const { data, isLoading } = useQuery({
    queryKey: ['get-budgets'],
    queryFn: () => GetBudgets({ page: '1', limit: '3' })
  })
  useEffect(() => {
    if (!isLoading) {
      setBudgets(formatBudgetsFromApi(data))
    }
  }, [isLoading, data])

  const [feedbacks, setFeedbacks] = useState<FeedbackType[] | null>()

  const { data: feedbacksData } = useQuery({
    queryKey: ['get-feedbacks'],
    queryFn: () => GetFeedbacksFromStore(storeInfos.id, { limit: '3', page: '1' })
  })

  useEffect(() => {
    if (!isLoading && data) return setFeedbacks(formatFeedbacks(feedbacksData))
  }, [isLoading, data])

  return (
    <>
      <div className="">
        <ul className="flex font-semibold border-b border-[#191e3a] flex-row mb-5 whitespace-nowrap overflow-y-auto">
          <li className="inline-block p-4">
            <Button className="btn-outline-primary">Contato/Endereço</Button>
          </li>
          <li className="inline-block p-4">
            <Button className="btn-outline-primary">Feedbacks</Button>
          </li>
          <div className="ml-auto" />
          <li className="inline-block p-4">
            <Button className="btn-primary flex flex-row gap-2" onClick={() => navigate('/store/profile/edit')}><IconPencil />Editar Perfil</Button>
          </li>
        </ul>
      </div>
      {!isLoading && feedbacks ? (
        <StoreProfileComponent feedbacks={feedbacks} name={storeInfos.name} rating={storeInfos.rating} budgets={budgets} />
      ) : ''}
    </>
  )
}