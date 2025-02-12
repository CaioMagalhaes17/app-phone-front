import { AxiosError } from "axios"
import { handleAxiosErrors } from "../errors"
import { Api } from "../axios"


export async function GetFeedbacksFromStore(storeProfileId: string, pagination?: { page: string, limit: string }) {
  try {
    const response = await Api().get(`/feedback/by-store/${storeProfileId}?page=${pagination?.page}&limit=${pagination?.limit}`)
    return response.data
  } catch (error) {
    console.log(error)
    if (error instanceof AxiosError) return handleAxiosErrors(error, {
      timer: 10000,
      showCloseButton: false,
      showCancelButton: false,
      icon: 'error',
      title: 'API desconectada - ' + error.code
    })
  }
}