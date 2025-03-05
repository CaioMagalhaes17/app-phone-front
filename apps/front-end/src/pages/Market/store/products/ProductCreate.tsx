import { useParams } from "react-router-dom"
import { CreateProduct } from "../../../../components/Market/Products/product/CreateProduct"
import { ProductType } from "../../../../types/products"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateProduct as PostCreateProduct } from "../../../../api/products/create-product"
import Swal from "sweetalert2"

export function ProductCreate() {
  const { id } = useParams() as { id: string }
  const { mutateAsync } = useMutation({
    mutationFn: PostCreateProduct
  })
  const client = useQueryClient()
  async function onProductSave(data: Pick<ProductType, 'category' | 'description' | 'isActive' | 'price' | 'name'>) {
    const response = await mutateAsync({ rowId: id, ...data })
    if (response && response.status === 201) {
      Swal.fire({
        icon: 'success',
        title: 'Produto criado com sucesso!'
      })
      client.refetchQueries({ queryKey: ['get-products-row'] })
      client.refetchQueries({ queryKey: ['get-products'] })
    }
  }
  return (
    <>
      <CreateProduct rowId={id} onProductSave={onProductSave} />
    </>
  )
}