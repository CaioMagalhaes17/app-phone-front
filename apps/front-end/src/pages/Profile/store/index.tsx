import { useParams } from "react-router-dom";
import { useGetStoreProfileById } from "../../../hooks/profile/useGetLocationByProfileId";
import { useGetStoreContacts } from "../../../hooks/profile/useGetStoreContacts";
import { useGetStoreSocials } from "../../../hooks/profile/useGetStoreSocials";
import { useGetStoreFeedbacks } from "../../../hooks/profile/useGetStoreFeedbacks";
import { useGetBudgetsFromStore } from "../../../hooks/budgets/useGetBudgetsByStoreId";
import { StoreProfileComponent } from "../../../components/Profiles/store";
import { pokemon } from "../../../constants/images";

export function StoreProfile() {
  const { id } = useParams() as { id: string }
  const { storeProfile, distance, isLoading } = useGetStoreProfileById(id)
  const { contacts } = useGetStoreContacts(id)
  const { socials } = useGetStoreSocials(id)
  const { feedbacks } = useGetStoreFeedbacks(id)
  const { budgets } = useGetBudgetsFromStore(id, { limit: '3', page: '1' })
  const services = [
    {
      serviceImg: pokemon,
      serviceName: 'Troca de Baterias',
      topic: 'battery'
    },
    {
      serviceImg: pokemon,
      serviceName: 'Troca de Tela',
      topic: 'display'
    },
    {
      serviceImg: pokemon,
      serviceName: 'Troca de Baterias',
      topic: 'battery'
    },
    {
      serviceImg: pokemon,
      serviceName: 'Troca de Tela',
      topic: 'display'
    }
  ]
  return (
    <>
      {!isLoading && storeProfile && contacts ? (
        <StoreProfileComponent services={services} distance={distance} budgets={budgets} contacts={contacts} feedbacks={feedbacks} socials={socials} storeInfos={storeProfile} />
      ) : ''}
    </>
  )
}