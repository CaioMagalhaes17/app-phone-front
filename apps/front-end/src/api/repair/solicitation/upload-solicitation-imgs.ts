/* eslint-disable @typescript-eslint/no-explicit-any */

import { Api } from "../../axios"

export async function UploadSolicitationImg(formData: any) {
  try {
    const reponse = await Api().post('/solicitation/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return reponse
  } catch (error) {
    console.log(error)
  }
}