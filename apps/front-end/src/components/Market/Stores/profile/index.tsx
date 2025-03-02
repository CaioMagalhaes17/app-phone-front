import { Button, IconArrowBackward, IconStore, Panel } from "@app/ui";
import { MainPainel } from "../../../Profiles/store/components/MainPanel";
import { ProductsRow } from "../../Products/row/ProductsRow";
import { StoreProfileType, StoreSocialsType } from "../../../../types/store-profile";
import { useNavigate } from "react-router-dom";

export type MarketStoreProfileProps = {
  storeProfile: (StoreProfileType & {
    location: {
      latitude: number;
      longitude: number;
    };
  }),
  socials: StoreSocialsType[]
  isOwner: boolean
}
export function MarketStoreProfile({ storeProfile, socials, isOwner }: MarketStoreProfileProps) {
  const navigate = useNavigate()
  return (
    <>
      <div className="w-[1500px] mr-auto ml-auto">
        <div className="flex flex-row">
          <Button onClick={() => navigate(-1)} className="btn-outline-primary h-[30px]"><IconArrowBackward /></Button>
          <Button onClick={() => navigate('/store-profile/' + storeProfile.id)} className=" ml-auto btn-primary mb-2 flex flex-row gap-2"><IconStore />Ver Perfil da loja</Button>
        </div>
        <MainPainel
          name={storeProfile.name}
          rating={storeProfile.rating}
          storeProfileImg={storeProfile.profileImg}
          storeSocials={socials}
        />
        <Panel className="mt-10">
          <ProductsRow title="Produtos em destaque" isOwner={isOwner} id="1" />
        </Panel>
      </div>
    </>
  )
}