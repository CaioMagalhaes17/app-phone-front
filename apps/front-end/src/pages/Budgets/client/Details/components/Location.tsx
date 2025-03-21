import { BudgetType } from "../../../../../types/budget";
import { useGetStoreProfileById } from "../../../../../hooks/profile/useGetLocationByProfileId";
import { useGetStoreSocials } from "../../../../../hooks/profile/useGetStoreSocials";
import { useGetStoreContacts } from "../../../../../hooks/profile/useGetStoreContacts";
import { StoreProfileLocation } from "../../../../../components/Profiles/store/components/Location";

export function BudgetDetailsLocation({ budget }: { budget: BudgetType }) {
  const { storeProfile } = useGetStoreProfileById(budget.storeProfile.id)
  const { socials } = useGetStoreSocials(budget.storeProfile.id)
  const { contacts } = useGetStoreContacts(budget.storeProfile.id)

  return (
    <>
      {storeProfile && contacts ? (
        <>
          <div className="w-[1340px] ml-auto mr-auto">
            <StoreProfileLocation
              lat={storeProfile.location.latitude}
              lng={storeProfile.location.longitude}
              storeSocials={socials}
              contacts={contacts}
              storeProfileImg={storeProfile.profileImg}
              address={storeProfile.address}
              isOwner={false}
            />
          </div>
        </>
      ) : ''}
    </>
  )
}