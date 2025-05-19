import { HSeparator } from "@app/ui";
import { StoreProfileBudgets } from "./components/Budgets";
import { StoreFeedbacks } from "./components/Feedbacks";
import { StoreProfileLocation } from "./components/Location";
import { StoreServicesGrid } from "./components/Services";
import { StoreProfileMain } from "./components/MainPanel";
import { StoreContacts, StoreProfileType, StoreSocialsType } from "../../../types/store-profile";
import { FeedbackType } from "../../../types/feedback";
import { BudgetType } from "../../../types/budget";
import { useNavigate } from "react-router-dom";
import { ProblemTopicType } from "../../../types/solicitation";
import useStore from "../../../state";
import { MobileStoreProfileLocation } from "./components/mobile/LocationPanel";

export function StoreProfileComponent({ storeInfos, contacts, socials, budgets, feedbacks, distance, services }: {
  distance?: number,
  storeInfos: StoreProfileType & {
    location: { latitude: number, longitude: number }
  },
  feedbacks: FeedbackType[]
  budgets: [] | BudgetType[]
  contacts: StoreContacts
  socials: StoreSocialsType[] | null
  services: {
    topicImg: string;
    topicName: string;
    topicId: ProblemTopicType;
  }[]
}) {
  const navigate = useNavigate()
  const { isMobile } = useStore()
  return (
    <>

      <StoreProfileMain
        distance={distance}
        workingTime={storeInfos.workingTime}
        name={storeInfos.name}
        tags={storeInfos.tags}
        rating={storeInfos.rating}
        storeProfileImg={storeInfos.profileImg}
        wppNum={contacts.wppNum}
        storeSocials={socials}
      />
      {!isMobile && (
        <div className="mb-[80px]" />
      )}
      <StoreServicesGrid services={services} title="Contratar serviço" onServiceClick={(topic) => navigate('/solicitations/create?topic=' + topic)} />
      {!isMobile && (
        <HSeparator />
      )}
      {isMobile ? (
        <MobileStoreProfileLocation
          address={storeInfos.address}
          contacts={contacts}
          lat={storeInfos.location.latitude}
          lng={storeInfos.location.longitude}
          storeProfileImg={storeInfos.profileImg}
          storeSocials={socials}
          isOwner={false}
        />
      ) : (
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
      )}

      {!isMobile && (
        <HSeparator />
      )}

      {!isMobile ? (
        <div className="gap-5 flex mt-10 flex-row max-w-[1242px] ml-auto mr-auto  p-4 dark:bg-black rounded-xl">
          <StoreFeedbacks storeId={storeInfos.id} feedbacks={feedbacks} canShowRateStore={true} />
          <StoreProfileBudgets budgets={budgets} isOwner={false} />
        </div>
      ) : (
        <div className="gap-5 flex flex-col ml-auto mr-auto  p-4 dark:bg-black rounded-xl">
          <StoreFeedbacks storeId={storeInfos.id} feedbacks={feedbacks} canShowRateStore={true} />
          <StoreProfileBudgets budgets={budgets} isOwner={false} />
        </div>
      )}


    </>
  )
}