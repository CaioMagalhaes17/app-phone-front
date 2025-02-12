import { BudgetType } from "../../../types/budget";
import { FeedbackType } from "../../../types/feedback";
import { MainPainel } from "./components/MainPanel";
import { StoreFeedbacks } from "./components/Feedbacks";
import { StoreProfileBudgets } from "./components/Budgets";
import { StoreProfileLocation } from "./components/Location";


export function StoreProfileComponent({ feedbacks, name, rating, budgets }: { feedbacks: FeedbackType[], name: string, rating: number, budgets: BudgetType[] }) {
  return (
    <>
      <MainPainel rating={rating} name={name} />
      <div className="gap-5 flex mt-5 font-extrabold flex-row">
        <StoreFeedbacks feedbacks={feedbacks} />
        <StoreProfileBudgets budgets={budgets} />
      </div>
      {/*Localização Loja*/}
      <StoreProfileLocation />
    </>
  )
}