import { AxiosError } from "axios"
import { handleAxiosErrors } from "../errors"
import { Api } from "../axios"

export async function GetGeolocationByProfileId() {
  try {
    const response = await Api().get('/geolocation')
    console.log(response)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) return handleAxiosErrors(error, {
      timer: 10000,
      showCloseButton: false,
      showCancelButton: false,
      icon: 'error',
      title: error.code
    })
  }
}