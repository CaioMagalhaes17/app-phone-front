import { IconPlus, Panel, Text } from "@app/ui";
import { FeedbackRow } from "../../../Feedbacks/row";
import { FeedbackType } from "../../../../types/feedback";
import { Link } from "react-router-dom";
import { CreateFeedback } from "../../../Feedbacks/create-modal";

export function StoreFeedbacks({ feedbacks, storeId, canShowRateStore }: { canShowRateStore?: boolean, storeId: string, feedbacks: FeedbackType[] }) {
  return (
    <Panel className="w-full">
      <div className="flex flex-row">
        <Text className="text-3xl text-black dark:text-white" as="h1">Avaliações</Text>
        <div className="ml-auto" />
        <Link to={`/store-feedbacks/${storeId}`} className="btn mr-5 btn-primary flex flex-row gap-2"><IconPlus /> Ver todas</Link>
        {canShowRateStore && (<CreateFeedback storeName="teste" storeId={storeId} />)}

      </div>
      <div className="border-b border-b-[#323b45] mt-5 mt-10" />
      {feedbacks.length > 0 ?
        feedbacks.map((feedback) => <FeedbackRow feedback={feedback} />) :
        (<div className="mt-10 h-[200px]"><Text className="text-3xl" as="span">Não foram encontrados registros</Text></div>)
      }
    </Panel>
  )
}