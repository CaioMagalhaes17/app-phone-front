import { AxiosError } from "axios"
import { handleAxiosErrors } from "../errors"
import { Api } from "../axios"

export async function DeleteProductsRow(id: string) {
  try {
    const response = await Api().delete(`/product/row/${id}`)
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