import { AxiosError } from "axios";
import Swal, { SweetAlertOptions } from "sweetalert2";

export function handleAxiosErrors(errorObject: AxiosError, popoutConfig: SweetAlertOptions) {
  if (errorObject.status === 401) {
    console.log(localStorage.getItem('isStore'))
    window.location.replace(localStorage.getItem('isStore') === 'true' ? '/store/login' : '/login')
  }

  Swal.fire({
    icon: 'error',
    title: 'Erro genérico - Um alerta foi enviado para os nosso desenvolvedores',
    text: errorObject.response?.data?.message,
    ...popoutConfig
  })
}