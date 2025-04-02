import { useParams } from "react-router-dom";
import { useGetStoreProfileById } from "../../../hooks/profile/useGetLocationByProfileId";
import { StoreProfileMain } from "../../../components/Profiles/store";
import { useGetStoreContacts } from "../../../hooks/profile/useGetStoreContacts";
import { StoreProfileLocation } from "../../../components/Profiles/store/components/Location";
import { useGetStoreSocials } from "../../../hooks/profile/useGetStoreSocials";
import { StoreFeedbacks } from "../../../components/Profiles/store/components/Feedbacks";
import { StoreProfileBudgets } from "../../../components/Profiles/store/components/Budgets";
import { useGetStoreFeedbacks } from "../../../hooks/profile/useGetStoreFeedbacks";
import { useGetBudgetsFromStore } from "../../../hooks/budgets/useGetBudgetsByStoreId";
import { StoreProfileServices } from "../../../components/Profiles/store/components/Services";

export function StoreProfile() {
  const { id } = useParams() as { id: string }
  const { storeProfile, distance, isLoading } = useGetStoreProfileById(id)
  const { contacts } = useGetStoreContacts(id)
  const { socials } = useGetStoreSocials(id)
  const { feedbacks } = useGetStoreFeedbacks(id)
  const { budgets } = useGetBudgetsFromStore(id, { limit: '3', page: '1' })
  return (
    <>
      {!isLoading && storeProfile && contacts ? (
        <>
          <StoreProfileMain
            distance={distance}
            workingTime={storeProfile.workingTime}
            name={storeProfile.name}
            tags={storeProfile.tags}
            rating={storeProfile.rating}
            storeProfileImg={storeProfile.profileImg}
            wppNum={contacts.wppNum}
          />
          <div className="mb-[80px]" />
          <StoreProfileServices storeProfileImg={storeProfile.profileImg} />
          <div className="max-w-[1242px] ml-auto mr-auto">
            <StoreProfileLocation
              address={storeProfile.address}
              contacts={contacts}
              lat={storeProfile.location.latitude}
              lng={storeProfile.location.longitude}
              storeProfileImg={storeProfile.profileImg}
              storeSocials={socials}
              isOwner={false}
            />
          </div>

          <div className="gap-5 flex mt-10 flex-row max-w-[1242px] ml-auto mr-auto">
            <StoreFeedbacks storeId={storeProfile.id} feedbacks={feedbacks} canShowRateStore={true} />
            <StoreProfileBudgets budgets={budgets} isOwner={false} />
          </div>
        </>
      ) : ''}
    </>
  )
}