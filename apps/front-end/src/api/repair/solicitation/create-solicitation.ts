import { AxiosError } from "axios"
import { Api } from "../../axios";
import { handleAxiosErrors } from "../../errors";
import { SolicitationFormProps } from "../../../types/solicitation";

export async function CreateSolicitation(solicitationPayload: SolicitationFormProps) {
  try {
    const response = await Api().post('/repair/solicitation', solicitationPayload)
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