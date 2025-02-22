import { AxiosError } from "axios"
import { Api } from "../../axios"
import { handleAxiosErrors } from "../../errors"

export async function getStoreSocials(storeId?: string) {
  try {
    if (storeId) {
      const response = await Api().get('/profile/socials/' + storeId)
      return response.data
    }
    const response = await Api().get('/profile/socials')
    return response.data
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