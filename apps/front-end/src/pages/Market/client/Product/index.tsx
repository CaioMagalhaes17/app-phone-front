import { useNavigate, useParams } from "react-router-dom";
import { MarketProduct } from "../../../../components/Market/Stores/product";
import { Button, IconArrowBackward } from "@app/ui";

export function ClientMarketProduct() {
  const { id } = useParams() as { id: string }
  const navigate = useNavigate()
  return (
    <>
      <Button onClick={() => navigate(-1)} className="btn-outline-primary flex flex-row gap-2 mb-5"><IconArrowBackward /></Button>
      <MarketProduct />
    </>
  )
}