import { AxiosError } from "axios"
import { Api } from "../../axios"
import { handleAxiosErrors } from "../../errors"
import { StoreProfileType } from "../../../types/store-profile"

export async function updateStore(data: Partial<StoreProfileType>) {
  try {
    const response = await Api().put('/profile/store', data)
    return response
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