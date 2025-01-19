import { AxiosError } from "axios"
import { Api } from "./axios"
import { HandleAxiosErrors } from "./errors"

export async function testApi() {
  try {
    const response = await Api().get('/ping')
    return response
  } catch (error) {
    if (error instanceof AxiosError) return HandleAxiosErrors(error, {
      timer: 10000,
      showCloseButton: false,
      showCancelButton: false,
      icon: 'error',
      title: 'API desconectada - ' + error.code
    })
  }
}