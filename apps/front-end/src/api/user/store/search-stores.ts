import { AxiosError } from "axios"
import { Api } from "../../axios"
import { handleAxiosErrors } from "../../errors"

export async function searchStoreProfiles(query: string) {
  try {
    if (query !== '') {
      const response = await Api().get('/profile/store/search?name=' + query)
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