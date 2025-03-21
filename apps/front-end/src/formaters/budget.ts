import { BudgetFromApiType, BudgetType } from "../types/budget";
import { formatSolicitation } from "./solicitations";
import { formatStoreProfile } from "./store-profile";

export function formatBudgetsFromApi(budgets: BudgetFromApiType[]): BudgetType[] {
  return budgets.map((budget) => formatBudgetfromApi(budget))
}
export function formatBudgetfromApi(budget: BudgetFromApiType): BudgetType {
  return {
    id: budget._id,
    startValue: budget.props.startValue,
    endValue: budget.props.endValue,
    details: budget.props.details,
    solicitation: formatSolicitation(budget.props.solicitation),
    storeProfile: formatStoreProfile(budget.props.storeProfile),
    updatedAt: budget.props.updatedAt,
    createdAt: budget.props.createdAt,
    estimatedTime: budget.props.estimatedTime
  }
}