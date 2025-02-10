import { AxiosError } from "axios"
import { Api } from "../../axios";
import { handleAxiosErrors } from "../../errors";

export async function DeleteBudgets(budgetId: string) {
  try {
    const response = await Api().delete('/repair/budget/' + budgetId)
    return response
  } catch (error) {
    if (error instanceof AxiosError) return handleAxiosErrors(error, {
      timer: 10000,
      showCloseButton: false,
      showCancelButton: false,
      icon: 'error',
      title: 'API desconectada - ' + error.code
    })
  }
}