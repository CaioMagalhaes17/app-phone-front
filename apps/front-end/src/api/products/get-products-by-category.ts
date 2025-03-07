import { AxiosError } from "axios"
import { Api } from "../axios"
import { handleAxiosErrors } from "../errors"

export async function GetProductsByCategory(category: string) {
  try {
    const response = await Api().get(`/product/by-category/${category}`)
    return response.data
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