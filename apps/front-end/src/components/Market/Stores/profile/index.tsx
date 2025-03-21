import { Button, IconArrowBackward, IconStore } from "@app/ui";
import { MainPainel } from "../../../Profiles/store/components/MainPanel";
import { ProductsRow } from "../../Products/row/ProductsRow";
import { StoreProfileType, StoreSocialsType } from "../../../../types/store-profile";
import { useNavigate } from "react-router-dom";
import { ProductsRowType } from "../../../../types/products";

export type MarketStoreProfileProps = {
  storeProfile: (StoreProfileType & {
    location?: {
      latitude: number;
      longitude: number;
    };
  }),
  socials: StoreSocialsType[]
  isOwner: boolean
  rows: ProductsRowType[]
  distance?: number
}
export function MarketStoreProfile({ distance, storeProfile, socials, isOwner, rows }: MarketStoreProfileProps) {
  const navigate = useNavigate()
  return (
    <>
      <div className="w-[1500px] mr-auto ml-auto">
        <div className="flex flex-row">
          <Button onClick={() => navigate(-1)} className="btn-outline-primary h-[30px]"><IconArrowBackward /></Button>
          {isOwner ? (<Button onClick={() => navigate('/store/profile')} className=" ml-auto btn-primary mb-2 flex flex-row gap-2"><IconStore />Ver Perfil da loja</Button>) :
            (<Button onClick={() => navigate('/store-profile/' + storeProfile.id)} className=" ml-auto btn-primary mb-2 flex flex-row gap-2"><IconStore />Ver Perfil da loja</Button>)}

        </div>
        <MainPainel
          distance={distance}
          name={storeProfile.name}
          rating={storeProfile.rating}
          storeProfileImg={storeProfile.profileImg}
          storeSocials={socials}
        />
        {rows.map((row, index) => {
          return (
            <>
              <div key={index} className="mt-10">
                <ProductsRow row={row} isOwner={isOwner} />
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}