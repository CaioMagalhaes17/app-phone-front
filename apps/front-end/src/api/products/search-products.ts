import { AxiosError } from "axios"
import { Api } from "../axios"
import { handleAxiosErrors } from "../errors"

export async function searchProducts(query: string) {
  try {
    if (query !== '') {
      const response = await Api().get('/product/search?name=' + query)
      return response.data
    }
  } catch (error) {
    if (error instanceof AxiosError) return handleAxiosErrors(error, {
      timer: 10000,
      showCloseButton: false,
      showCancelButton: false,
      icon: 'error',
      title: 'Erro da api - ' + error.code
    })
  }
}