import { AxiosError } from "axios"
import { handleAxiosErrors } from "../errors"
import { Api } from "../axios"

export async function FetchStoresInsideClientRadius() {
  try {
    const response = await Api().get('/geolocation/stores/in-range')
    return response.data.value
  } catch (error) {

    if (error instanceof AxiosError) {
      if (error.response?.data.statusCode === 404) {
        return { status: 'geolocationNotFound' }
      }
      return handleAxiosErrors(error, {
        timer: 10000,
        showCloseButton: false,
        showCancelButton: false,
        icon: 'error',
        title: error.code
      })
    }
  }
}