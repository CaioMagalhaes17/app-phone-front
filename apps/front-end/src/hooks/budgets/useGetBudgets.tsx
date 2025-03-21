import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { formatBudgetsFromApi } from "../../formaters/budget";
import { BudgetType } from "../../types/budget";
import { GetBudgets } from "../../api/repair/budget/get-budgets";

export function useGetBudgets(pagination: { page: string, limit: string }) {
  const [budgets, setBudgets] = useState<BudgetType[] | []>([]);

  const { data, isLoading } = useQuery({
    queryKey: ['get-budgets'],
    queryFn: () => GetBudgets(pagination)
  })

  useEffect(() => {
    if (!isLoading && data) {
      setBudgets(formatBudgetsFromApi(data));
    }
  }, [data, isLoading]);

  return { budgets, isLoading };
}