import { useNavigate, useParams } from "react-router-dom";
import { Button, IconArrowBackward } from "@app/ui";
import { DetailsProduct } from "../../../../components/Market/Products/product/DetailsProducts";
import { useGetStoreProduct } from "../../../../hooks/products/useGetStoreProduct";

export function ClientMarketProduct() {
  const { id } = useParams() as { id: string }
  const { product } = useGetStoreProduct(id)
  const navigate = useNavigate()
  return (
    <>
      <Button onClick={() => navigate(-1)} className="btn-outline-primary flex flex-row gap-2 mb-5"><IconArrowBackward /></Button>
      {product && (
        <DetailsProduct product={product} />
      )}
    </>
  )
}