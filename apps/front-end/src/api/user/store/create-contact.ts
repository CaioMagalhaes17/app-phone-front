import { AxiosError } from "axios"
import { Api } from "../../axios"
import { handleAxiosErrors } from "../../errors"
import { StoreContacts } from "../../../types/store-profile"

export async function CreateStoreContacts(data: Partial<StoreContacts>) {
  try {
    const response = await Api().post('/profile/contacts', data)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) return handleAxiosErrors(error, {
      timer: 10000,
      showCloseButton: false,
      showCancelButton: false,
      icon: 'error',
      title: 'Erro!'
    })
  }
}