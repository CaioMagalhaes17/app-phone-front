import { Button, IconPlus, Panel, Text } from "@app/ui";
import { FeedbackRow } from "../../../Feedbacks/row";
import { FeedbackType } from "../../../../types/feedback";

export function StoreFeedbacks({ feedbacks }: { feedbacks: FeedbackType[] }) {
  return (
    <Panel className="w-full">
      <div className="flex flex-row">
        <Text className="text-3xl text-white" as="h1">Avaliações</Text>
        <Button className="ml-auto btn-primary flex flex-row gap-2"><IconPlus /> Ver todas</Button>
      </div>
      <div className="border-b border-b-[#323b45] mt-5 mt-10" />
      {feedbacks.length > 0 ?
        feedbacks.map((feedback) => <FeedbackRow feedback={feedback} />) :
        (<div className="mt-10 h-[200px]"><Text className="text-3xl" as="span">Não foram encontrados registros</Text></div>)
      }
    </Panel>
  )
}