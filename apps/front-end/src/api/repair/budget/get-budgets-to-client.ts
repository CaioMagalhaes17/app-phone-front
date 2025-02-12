import { AxiosError } from "axios"
import { Api } from "../../axios"
import { handleAxiosErrors } from "../../errors"

export async function GetBudgetsToClient(pagination?: { page: string, limit: string }) {
  try {
    const response = await Api().get(`/repair/budget/to-client?page=${pagination?.page}&limit=${pagination?.limit}`)
    return response.data.data
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