import { useEffect, useState } from "react";
import { BudgetType } from "../../types/budget";
import { useQuery } from "@tanstack/react-query";
import { GetBudgetsToClient } from "../../api/repair/budget/get-budgets-to-client";
import { formatBudgetsFromApi } from "../../formaters/budget";

export function useGetBudgetsToClient() {
  const [budgets, setBudgets] = useState<BudgetType[] | []>([])
  const [distances, setDistances] = useState<{ storeProfileId: string, distance: number }[] | []>([])
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['get-budgets'],
    queryFn: () => GetBudgetsToClient()
  })

  useEffect(() => {
    if (!isFetching && data) {
      console.log(data)
      const budgetsFormatted = formatBudgetsFromApi(data.budgets)
      setDistances(data.distances)
      setBudgets([...budgetsFormatted].sort((a, b) => b.storeProfile.rating - a.storeProfile.rating));

    }
  }, [isFetching, data])

  return { budgets, setBudgets, isFetching, isLoading, distances }
}