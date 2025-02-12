import { AxiosError } from "axios";
import { Api } from "../axios";
import { handleAxiosErrors } from "../errors";

export async function CreateGeolocation(geoLocationPayload: { longitude: number; latitude: number }) {
  try {
    const response = await Api().post('/geolocation', geoLocationPayload)
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