import { AxiosError } from "axios"
import { Api } from "../axios"
import { handleAxiosErrors } from "../errors"

export async function login(data: { login: string, password: string }, isStore: boolean) {
  try {
    const response = await Api().post('/user/login', { isStore, ...data })
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.status === 400 && error.response?.data.message.includes('inválidos.')) {
        return handleAxiosErrors(error, {
          timer: 3000,
          showCloseButton: false,
          showCancelButton: false,
          icon: 'error',
          title: 'Erro ao logar',
          text: error.response?.data.message
        })
      }
      return handleAxiosErrors(error, {
        timer: 10000,
        showCloseButton: false,
        showCancelButton: false,
        icon: 'error',
        title: 'Erro ao logar - ' + error.code,
        text: error.response?.data.message
      })

    }
    console.log(error)
  }
}