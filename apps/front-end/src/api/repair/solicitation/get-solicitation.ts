import { AxiosError } from "axios"
import { Api } from "../../axios"
import { handleAxiosErrors } from "../../errors"

export async function GetSolicitation(solicitationId: string) {
  try {
    const response = await Api().get('/repair/solicitation/' + solicitationId)
    return response.data.data
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