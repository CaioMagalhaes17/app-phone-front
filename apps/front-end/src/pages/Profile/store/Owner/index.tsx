import useStore from "../../../../state"
import { Button, HSeparator, IconPencil, IconShoppingBag } from "@app/ui"
import { useNavigate } from "react-router-dom"
import { useGetStoreContacts } from "../../../../hooks/profile/useGetStoreContacts"
import { useGetStoreSocials } from "../../../../hooks/profile/useGetStoreSocials"
import { useGetStoreFeedbacks } from "../../../../hooks/profile/useGetStoreFeedbacks"
import { useGetBudgets } from "../../../../hooks/budgets/useGetBudgets"
import { StoreProfileMain } from "../../../../components/Profiles/store"
import { StoreProfileServices } from "../../../../components/Profiles/store/components/Services"
import { StoreProfileLocation } from "../../../../components/Profiles/store/components/Location"
import { StoreFeedbacks } from "../../../../components/Profiles/store/components/Feedbacks"
import { StoreProfileBudgets } from "../../../../components/Profiles/store/components/Budgets"

export function StoreProfileOwner() {
  const navigate = useNavigate()
  const { storeInfos } = useStore()

  const { contacts } = useGetStoreContacts()
  const { socials } = useGetStoreSocials()
  const { feedbacks } = useGetStoreFeedbacks(storeInfos.id, { page: '1', limit: '1' })
  const { budgets, isLoading } = useGetBudgets({ page: '1', limit: '3' })

  return (
    <>
      <ul className="flex font-semibold flex-row whitespace-nowrap overflow-y-auto">
        <div className="ml-auto" />
        <li className="p-4 flex flex-row gap-5">
          <Button className="btn-primary flex flex-row gap-2" onClick={() => navigate('/store/profile/edit')}><IconPencil />Editar Perfil</Button>
          <Button className="btn-primary flex flex-row gap-2" onClick={() => navigate('/store/market')}><IconShoppingBag />Acessar Mercado</Button>
        </li>
      </ul>
      {!isLoading && feedbacks && contacts ? (
        <>
          <StoreProfileMain
            workingTime={storeInfos.workingTime}
            name={storeInfos.name}
            tags={storeInfos.tags}
            rating={storeInfos.rating}
            storeProfileImg={storeInfos.profileImg}
            wppNum={contacts.wppNum}
          />
          <StoreProfileServices storeProfileImg={storeInfos.profileImg} />
          <HSeparator />

          <div className="max-w-[1242px] ml-auto mr-auto">
            <StoreProfileLocation
              address={storeInfos.address}
              contacts={contacts}
              lat={storeInfos.location.latitude}
              lng={storeInfos.location.longitude}
              storeProfileImg={storeInfos.profileImg}
              storeSocials={socials}
              isOwner={false}
            />
          </div>
          <HSeparator />

          <div className="gap-5 flex mt-10 flex-row max-w-[1242px] ml-auto mr-auto">
            <StoreFeedbacks storeId={storeInfos.id} feedbacks={feedbacks} canShowRateStore={true} />
            <StoreProfileBudgets budgets={budgets} isOwner={false} />
          </div>
        </>
      ) : ''}
    </>
  )
}