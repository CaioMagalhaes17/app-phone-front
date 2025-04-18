import { AxiosError } from "axios"
import { Api } from "../../axios"
import { handleAxiosErrors } from "../../errors"

export async function getStoreContacts(storeId?: string) {
  try {
    if (storeId) {
      const response = await Api().get('/profile/contacts/' + storeId)
      return response.data
    }
    const response = await Api().get('/profile/contacts')
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