import { useEffect, useState } from "react"
import { formatBudgetsFromApi } from "../../formaters/budget"
import { BudgetType } from "../../types/budget"
import { GetBudgetsbySolicitation } from "../../api/repair/budget/get-budget-by-solicitation"
import { useQuery } from "@tanstack/react-query"

export function useGetBudgetBySolicitationId(solicitationId: string) {
  const [budgets, setBudgets] = useState<BudgetType[] | []>([])

  const { data: budgetsData, isLoading: budgetsLoading } = useQuery({
    queryKey: ['get-budgets'],
    queryFn: () => GetBudgetsbySolicitation(solicitationId)
  })

  useEffect(() => {
    if (budgetsData && budgetsData.length > 0 && !budgetsLoading) return setBudgets(formatBudgetsFromApi(budgetsData))
  }, [budgetsLoading, budgetsData])

  return { budgets, budgetsLoading }
}