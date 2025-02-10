import { AxiosError } from "axios"
import { Api } from "../../axios";
import { handleAxiosErrors } from "../../errors";
import { BudgetFormProps } from "../../../types/budget";

export async function CreateBudget(budgetPayload: BudgetFormProps) {
  try {
    const response = await Api().post('/repair/budget', budgetPayload)
    return response
  } catch (error) {
    if (error instanceof AxiosError) return handleAxiosErrors(error, {
      timer: 10000,
      showCloseButton: false,
      showCancelButton: false,
      icon: 'error',
      title: 'Erro - ' + error.code
    })
  }
}