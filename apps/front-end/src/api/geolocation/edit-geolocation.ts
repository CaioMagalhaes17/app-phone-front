import { AxiosError } from "axios"
import { handleAxiosErrors } from "../errors"
import { Api } from "../axios"

export async function EditGeolocation(geoLocationPayload: { longitude: number; latitude: number; radius?: number }) {
  try {
    const response = await Api().put('/geolocation', geoLocationPayload)
    return response
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