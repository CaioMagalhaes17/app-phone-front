import { AxiosError } from "axios"
import { handleAxiosErrors } from "../errors"
import { Api } from "../axios"

export async function DeleteProduct(id: string) {
  try {
    const response = await Api().delete(`/product/${id}`)
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