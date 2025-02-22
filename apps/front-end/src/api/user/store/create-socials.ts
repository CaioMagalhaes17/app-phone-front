import { AxiosError } from "axios"
import { Api } from "../../axios"
import { handleAxiosErrors } from "../../errors"
import { StoreSocialsType } from "../../../types/store-profile"

export async function createStoreSocials(data: Partial<StoreSocialsType>) {
  try {
    const response = await Api().post('/profile/socials', data)
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