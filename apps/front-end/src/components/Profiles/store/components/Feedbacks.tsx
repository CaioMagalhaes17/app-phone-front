import { HSeparator, IconChat, Panel, Text } from "@app/ui";
import { FeedbackRow } from "../../../Feedbacks/row";
import { FeedbackType } from "../../../../types/feedback";
import { Link } from "react-router-dom";
import { CreateFeedback } from "../../../Feedbacks/create-modal";

export function StoreFeedbacks({ feedbacks, storeId, canShowRateStore }: { canShowRateStore?: boolean, storeId: string, feedbacks: FeedbackType[] }) {
  return (
    <Panel className="w-full font-bold">
      <div className="flex flex-row">
        <Text className="text-2xl text-dark  flex flex-row gap-2 dark:text-white items-center" as="h1"><IconChat />Avaliações</Text>
        <div className="ml-auto" />
        <Link to={`/store-feedbacks/${storeId}`} className="btn mr-5 btn-outline-primary">Ver todas</Link>
        {canShowRateStore && (<CreateFeedback storeName="teste" storeId={storeId} />)}

      </div>
      <HSeparator />
      {feedbacks.length > 0 ?
        feedbacks.map((feedback) => <FeedbackRow feedback={feedback} />) :
        (<div className="mt-10 h-[200px]"><Text className="text-3xl" as="span">Não foram encontrados registros</Text></div>)
      }
    </Panel>
  )
}