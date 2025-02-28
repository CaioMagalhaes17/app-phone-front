import { Button, IconStore, Panel } from "@app/ui";
import { MainPainel } from "../../../Profiles/store/components/MainPanel";
import { ProductsRow } from "../../Products/row/ProductsRow";
import { StoreProfileType, StoreSocialsType } from "../../../../types/store-profile";

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
  return (
    <>
      <div className="w-[1500px] mr-auto ml-auto">
        <Button className="ml-auto btn-primary mb-5 flex flex-row gap-2"><IconStore />Ver Perfil da loja</Button>
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