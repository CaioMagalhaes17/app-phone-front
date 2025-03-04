import { useNavigate, useParams } from "react-router-dom"
import { useGetStoreProduct } from "../../../../hooks/products/useGetStoreProduct"
import { EditProduct } from "../../../../components/Market/Products/product/EditProduct"
import { Button, IconArrowBackward, Text, VSeparator } from "@app/ui"

export function ProductEdit() {
  const { id } = useParams() as { id: string }
  const { isLoading, product } = useGetStoreProduct(id)
  const navigate = useNavigate()
  return (
    <>
      <div className="flex flex-row gap-5 items-center mb-5">
        <Button onClick={() => navigate(-1)} className="btn-outline-primary "><IconArrowBackward /></Button>
        <VSeparator className="mr-1 ml-1" />
        <Text className="text-black dark:text-white font-extrabold text-5xl" as="h1">Edição de Prateleiras</Text>
      </div>
      {!isLoading && product ? (
        <EditProduct product={product} />
      ) : ''}
    </>
  )
}