import { AxiosError } from "axios"
import { Api } from "../axios"
import { handleAxiosErrors } from "../errors"
import { ProductType } from "../../types/products"

export async function UpdateProduct(data: Pick<ProductType, 'category' | 'description' | 'isActive' | 'price' | 'name' | 'id'>) {
  try {
    const response = await Api().put(`/product/${data.id}`, data)
    return response.data
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