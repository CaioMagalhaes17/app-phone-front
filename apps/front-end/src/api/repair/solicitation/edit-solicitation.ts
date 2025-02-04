import { AxiosError } from "axios"
import { Api } from "../../axios";
import { handleAxiosErrors } from "../../errors";
import { Solicitation } from "../../../types/solicitation";

export async function EditSolicitation(solicitationPayload: Partial<Solicitation>, solicitationId: string) {
  try {
    const response = await Api().put('/repair/solicitation/' + solicitationId, solicitationPayload)
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