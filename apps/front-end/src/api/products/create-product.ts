import { AxiosError } from "axios"
import { Api } from "../axios"
import { handleAxiosErrors } from "../errors"
import { ProductType } from "../../types/products"

export async function CreateProduct(data: Pick<ProductType, 'category' | 'description' | 'isActive' | 'price' | 'name' | 'rowId'>) {
  try {
    const response = await Api().post(`/product`, data)
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