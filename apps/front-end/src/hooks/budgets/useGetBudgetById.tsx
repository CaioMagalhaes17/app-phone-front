import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { formatBudgetfromApi } from "../../formaters/budget";
import { BudgetType } from "../../types/budget";
import { GetBudget } from "../../api/repair/budget/get-budget";

export function useGetBudgetById(id: string): { distance: number, budget: BudgetType | null, isBudgetLoading: boolean } {
  const [budget, setBudget] = useState<BudgetType | null>(null);
  const [distance, setDistance] = useState(0)

  const { data: budgetData, isLoading: isBudgetLoading } = useQuery({
    queryKey: ["get-budget", id],
    queryFn: () => GetBudget(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (!isBudgetLoading && budgetData) {
      setBudget(formatBudgetfromApi(budgetData.budget));
      setDistance(budgetData.distance)
    }
  }, [budgetData, isBudgetLoading]);

  return { budget, distance, isBudgetLoading };
}

