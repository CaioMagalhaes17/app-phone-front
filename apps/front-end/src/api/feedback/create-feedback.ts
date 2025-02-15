import { AxiosError } from "axios"
import { Api } from "../axios"
import { handleAxiosErrors } from "../errors"
import { FeedbackType } from "../../types/feedback"


export async function PostFeedback(feedbackPayload: Pick<FeedbackType, 'rating' | 'description'>, storeProfileId: string) {
  try {
    const response = await Api().post('/feedback', { storeProfileId, ...feedbackPayload })
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