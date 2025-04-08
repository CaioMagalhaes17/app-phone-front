import useStore from "../../../../state"
import { Button, IconPencil, IconShoppingBag } from "@app/ui"
import { useNavigate } from "react-router-dom"
import { useGetStoreContacts } from "../../../../hooks/profile/useGetStoreContacts"
import { useGetStoreSocials } from "../../../../hooks/profile/useGetStoreSocials"
import { useGetStoreFeedbacks } from "../../../../hooks/profile/useGetStoreFeedbacks"
import { useGetBudgets } from "../../../../hooks/budgets/useGetBudgets"

import { StoreProfileComponent } from "../../../../components/Profiles/store"
import { services } from "../../../../constants/services"

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
        <StoreProfileComponent services={services} budgets={budgets} contacts={contacts} feedbacks={feedbacks} socials={socials} storeInfos={storeInfos} />
      ) : ''}
    </>
  )
}