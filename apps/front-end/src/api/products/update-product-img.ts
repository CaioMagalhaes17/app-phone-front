/* eslint-disable @typescript-eslint/no-explicit-any */

import { Api } from "../axios"


export async function UploadProductImg(id: string, formData: any) {
  try {
    const reponse = await Api().post('/product/img/' + id, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return reponse
  } catch (error) {
    console.log(error)
  }
}