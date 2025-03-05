import { useNavigate, useParams } from "react-router-dom"
import { CreateProduct } from "../../../../components/Market/Products/product/CreateProduct"
import { ProductType } from "../../../../types/products"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateProduct as PostCreateProduct } from "../../../../api/products/create-product"
import Swal from "sweetalert2"
import { Button, IconArrowBackward, Text, VSeparator } from "@app/ui"

export function ProductCreate() {
  const { id } = useParams() as { id: string }
  const { mutateAsync } = useMutation({
    mutationFn: PostCreateProduct
  })
  const client = useQueryClient()
  async function onProductSave(data: Pick<ProductType, 'category' | 'description' | 'isActive' | 'price' | 'name' | 'productImg'>) {
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
  const navigate = useNavigate()
  return (
    <>
      <div className="flex flex-row gap-5 items-center mb-5">
        <Button onClick={() => navigate('/store/market/row/edit')} className="btn-outline-primary "><IconArrowBackward /></Button>
        <VSeparator className="mr-1 ml-1" />
        <Text className="text-black dark:text-white font-extrabold text-5xl" as="h1">Criar Produto</Text>
      </div>
      <CreateProduct rowId={id} onProductSave={onProductSave} />
    </>
  )
}