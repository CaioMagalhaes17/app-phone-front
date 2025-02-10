import { useQuery } from "@tanstack/react-query"
import { StoreProfileComponent } from "../../../components/Repair/store"
import useStore from "../../../state"
import { GetBudgets } from "../../../api/repair/budget/get-budgets"
import { useEffect, useState } from "react"
import { BudgetType } from "../../../types/budget"
import { formatBudgetsFromApi } from "../../../formaters/budget"

export function StoreProfile() {
  const [budgets, setBudgets] = useState<BudgetType[] | []>([])

  const { storeInfos } = useStore()
  const { data, isLoading } = useQuery({
    queryKey: ['get-budgets'],
    queryFn: GetBudgets
  })
  useEffect(() => {
    if (!isLoading) {
      setBudgets(formatBudgetsFromApi(data))
    }
  }, [isLoading, data])
  return (
    <>
      {!isLoading && (
        <StoreProfileComponent name={storeInfos.name} rating={storeInfos.rating} budgets={budgets} />
      )}
    </>
  )
}