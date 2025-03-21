import { AxiosError } from "axios"
import { Api } from "../axios"
import { handleAxiosErrors } from "../errors"

export type UserClientSignup = { login: string, password: string, isStore: boolean, name: string, permission?: string }
export type UserStoreSignup = {
  name: string,
  login: string,
  password: string,
  isStore: boolean,
  telNum: string,
  address: string,
  location: {
    lat: number,
    lng: number
  },
  permission?: string
  useTelNumAsWpp: boolean
}

export async function signup(data: UserClientSignup | UserStoreSignup) {
  try {
    const response = await Api().post('/user', data)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data.message.includes('Login já existe')) {
        return handleAxiosErrors(error, {
          timer: 5000,
          showCloseButton: false,
          showCancelButton: false,
          icon: 'error',
          title: 'O Login já existe',
          text: 'Esse email já está sendo utilizado como login'
        })
      }
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