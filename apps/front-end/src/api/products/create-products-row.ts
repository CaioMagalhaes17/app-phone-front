import { AxiosError } from "axios"
import { Api } from "../axios"
import { handleAxiosErrors } from "../errors"
import { ProductsRowType } from "../../types/products"

export async function CreateProductsRows(data: Pick<ProductsRowType, 'isActive' | 'name'>) {
  try {
    const response = await Api().post(`/product/row/`, data)
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