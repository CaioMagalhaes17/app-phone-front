import { useNavigate, useParams } from "react-router-dom"
import { useGetStoreProduct } from "../../../../hooks/products/useGetStoreProduct"
import { EditProduct } from "../../../../components/Market/Products/product/EditProduct"
import { Button, IconArrowBackward, Text, VSeparator } from "@app/ui"
import { ProductType } from "../../../../types/products"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { UpdateProduct } from "../../../../api/products/update-product"
import Swal from "sweetalert2"
import { DeleteProduct } from "../../../../api/products/delete-product"

export function ProductEdit() {
  const { id } = useParams() as { id: string }
  const { isLoading, product } = useGetStoreProduct(id)
  const { mutateAsync } = useMutation({
    mutationFn: UpdateProduct
  })

  const { mutateAsync: mutateDelete } = useMutation({
    mutationFn: DeleteProduct
  })
  const client = useQueryClient()
  const navigate = useNavigate()

  async function onProductSave(data: Pick<ProductType, 'category' | 'description' | 'isActive' | 'price' | 'name'>) {
    await mutateAsync({ id, ...data }, {
      onSuccess: () => {
        Swal.fire({
          icon: 'success',
          title: 'Produto alterado com sucesso!'
        })
        client.refetchQueries({ queryKey: ['get-products-row'] })
        client.refetchQueries({ queryKey: ['get-products-rows'] })
        client.refetchQueries({ queryKey: ['get-product'] })
        client.refetchQueries({ queryKey: ['get-products'] })
      }
    })
  }

  async function onProductDelete(id: string) {
    Swal.fire({
      titleText: 'Excluir Produto?',
      text: 'Essa ação é irreversível',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      padding: '2em',
      customClass: {
        confirmButton: 'btn btn-green btn-lg m-1',
        cancelButton: 'btn btn-danger btn-lg m-1',
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await mutateDelete(id)
        console.log(response)
        if (response && response.status == 200) {
          client.refetchQueries({ queryKey: ['get-products-rows'] })
          client.refetchQueries({ queryKey: ['get-products'] })

          Swal.fire({
            titleText: 'Produto excluido com sucesso!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'Ok',
            padding: '2em',
            customClass: {
              confirmButton: 'btn btn-primary btn-lg m-1',
            },
            buttonsStyling: false,
          }).then(() => {
            navigate('/store/market/row/edit')
          })
        }
      }
    })
  }
  return (
    <>
      <div className="flex flex-row gap-5 items-center mb-5">
        <Button onClick={() => navigate('/store/market/row/edit')} className="btn-outline-primary "><IconArrowBackward /></Button>
        <VSeparator className="mr-1 ml-1" />
        <Text className="text-black dark:text-white font-extrabold text-5xl" as="h1">Edição de Produto</Text>
      </div>
      {!isLoading && product && product.id === id ? (
        <EditProduct onProductDelete={onProductDelete} product={product} onProductSave={onProductSave} />
      ) : ''}
    </>
  )
}