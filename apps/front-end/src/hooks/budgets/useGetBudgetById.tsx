import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { formatBudgetfromApi } from "../../formaters/budget";
import { BudgetType } from "../../types/budget";
import { GetBudget } from "../../api/repair/budget/get-budget";

export function useGetBudgetById(id: string): { budget: BudgetType | null, isBudgetLoading: boolean } {
  const [budget, setBudget] = useState<BudgetType | null>(null);

  const { data: budgetData, isLoading: isBudgetLoading } = useQuery({
    queryKey: ["get-budget", id], // Inclua o ID para evitar cache global errado
    queryFn: () => GetBudget(id),
    enabled: !!id, // Evita executar se o ID for inválido
  });

  useEffect(() => {
    if (!isBudgetLoading && budgetData) {
      setBudget(formatBudgetfromApi(budgetData));
    }
  }, [budgetData, isBudgetLoading]);

  return { budget, isBudgetLoading };
}

