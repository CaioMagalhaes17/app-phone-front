import { AxiosError } from "axios";
import Swal, { SweetAlertOptions } from "sweetalert2";

export function handleAxiosErrors(errorObject: AxiosError, popoutConfig: SweetAlertOptions) {
  if (errorObject.status === 401 && window.location.pathname !== '/') {
    window.location.replace('/')
  }
  const apiResponse: { message: string } = errorObject.response?.data as { message: string }
  if (window.location.pathname !== '/') {
    Swal.fire({
      icon: 'error',
      title: 'Erro genérico - Um alerta foi enviado para os nosso desenvolvedores',
      text: apiResponse.message,
      ...popoutConfig
    })
  }

}