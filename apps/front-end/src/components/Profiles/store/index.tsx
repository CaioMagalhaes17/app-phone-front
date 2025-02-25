import { FeedbackType } from "../../../types/feedback";
import { MainPainel, StoreMainPainelProps } from "./components/MainPanel";
import { StoreFeedbacks } from "./components/Feedbacks";
import { StoreProfileBudgetProps, StoreProfileBudgets } from "./components/Budgets";
import { StoreProfileLocation, StoreProfileLocationProps } from "./components/Location";

export interface StoreProfileComponent {
  mainPanelProps: StoreMainPainelProps
  storeProfileBudgets: StoreProfileBudgetProps
  storeFeedbacksProps: {
    feedbacks: FeedbackType[]
    canShowRateStore: boolean
  }
  storeProfileLocation: StoreProfileLocationProps
  storeId: string
}
export function StoreProfileComponent({ storeId, mainPanelProps, storeProfileLocation, storeProfileBudgets, storeFeedbacksProps }: StoreProfileComponent) {
  return (
    <>
      <MainPainel rating={mainPanelProps.rating} name={mainPanelProps.name} storeSocials={mainPanelProps.storeSocials} storeProfileImg={mainPanelProps.storeProfileImg} />
      <div className="gap-5 flex mt-5 font-extrabold flex-row">
        <StoreFeedbacks storeId={storeId} feedbacks={storeFeedbacksProps.feedbacks} canShowRateStore={storeFeedbacksProps.canShowRateStore} />
        <StoreProfileBudgets budgets={storeProfileBudgets.budgets} isOwner={storeProfileBudgets?.isOwner} />
      </div>
      <StoreProfileLocation
        lat={storeProfileLocation.lat}
        lng={storeProfileLocation.lng}
        storeSocials={storeProfileLocation.storeSocials}
        contacts={storeProfileLocation.contacts}
        storeProfileImg={storeProfileLocation.storeProfileImg}
        address={storeProfileLocation.address}
      />
    </>
  )
}