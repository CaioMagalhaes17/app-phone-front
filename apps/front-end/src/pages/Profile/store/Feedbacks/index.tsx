import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom"
import { GetFeedbacksFromStore } from "../../../../api/feedback/get-from-store";
import { useEffect, useState } from "react";
import { FeedbackType } from "../../../../types/feedback";
import { formatFeedbacks } from "../../../../formaters/feedback";
import { FeedbackRow } from "../../../../components/Feedbacks/row";
import { Button, IconChat, Panel, Text } from "@app/ui";

export function StoreFeedbacksList() {
  const { id } = useParams() as { id: string }
  const [feedbacks, setFeedbacks] = useState<FeedbackType[] | null>()
  const { data, isLoading } = useQuery({
    queryKey: ['get-feedbacks'],
    queryFn: () => GetFeedbacksFromStore(id)
  })

  useEffect(() => {
    if (!isLoading && data) return setFeedbacks(formatFeedbacks(data))
  }, [isLoading, data])
  return (
    <>
      {!isLoading && feedbacks ? (<div className="flex justify-center">
        <Panel className="font-extrabold  max-w-[1200px] w-full">
          <div className="flex flex-row">
            <Text className="text-3xl text-white" as="h1">Avaliações</Text>
            <div className="ml-auto" />
            <Link to={`/store/feedbacks/${id}`} className="btn btn-primary mr-5 flex flex-row gap-2"><IconChat /> Avaliar loja</Link>
            <Button className="btn-outline-primary mr-5">Filtrar</Button>
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