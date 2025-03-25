import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom"
import { GetFeedbacksFromStore } from "../../../../api/feedback/get-from-store";
import { useEffect, useState } from "react";
import { FeedbackType } from "../../../../types/feedback";
import { formatFeedbacks } from "../../../../formaters/feedback";
import { FeedbackRow } from "../../../../components/Feedbacks/row";
import { Button, IconArrowBackward, IconChat, Panel, Text } from "@app/ui";
import { CreateFeedback } from "../../../../components/Feedbacks/create-modal";
import useStore from "../../../../state";

export function StoreFeedbacksList() {
  const { storeInfos } = useStore()
  const { id } = useParams() as { id: string }
  const [feedbacks, setFeedbacks] = useState<FeedbackType[] | null>()
  const { data, isLoading } = useQuery({
    queryKey: ['get-feedbacks'],
    queryFn: () => GetFeedbacksFromStore(id)
  })

  useEffect(() => {
    if (!isLoading && data) return setFeedbacks(formatFeedbacks(data))
  }, [isLoading, data])

  const navigate = useNavigate()
  return (
    <>
      <Button onClick={() => navigate(-1)} className="btn-outline-primary flex flex-row gap-2"><IconArrowBackward /> </Button>

      {!isLoading && feedbacks ? (<div className="flex justify-center">
        <Panel className="font-bold  max-w-[1200px] w-full">
          <div className="flex flex-row">

            <Text className="text-3xl text-black dark:text-white flex flex-row gap-5 items-center" as="h1"><IconChat />Avaliações</Text>
            <div className="ml-auto" />
            {storeInfos.id !== id ? (
              <CreateFeedback storeName="teste" storeId={id} />
            ) : ''}
          </div>
          <div className="border-b border-b-[#323b45] mt-5 mt-10" />
          {feedbacks.length > 0 ?
            feedbacks.map((feedback) => <FeedbackRow feedback={feedback} />) :
            (<div className="mt-10 h-[200px]"><Text className="text-3xl" as="span">Não foram encontrados registros</Text></div>)
          }
        </Panel>
      </div>) : ''}
    </>
  )
}