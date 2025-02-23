import { AxiosError } from "axios"
import { Api } from "../../axios"
import { handleAxiosErrors } from "../../errors"

export async function deleteStoreSocial(id: string) {
  try {
    const response = await Api().delete('/profile/socials/' + id)
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