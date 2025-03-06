import { AxiosError } from "axios"
import { Api } from "../axios"
import { handleAxiosErrors } from "../errors"

export async function GetProductsRows(id?: string) {
  try {
    if (id) {
      const response = await Api().get(`/product/rows/${id}`)
      return response.data
    }
    const response = await Api().get(`/product/rows`)
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