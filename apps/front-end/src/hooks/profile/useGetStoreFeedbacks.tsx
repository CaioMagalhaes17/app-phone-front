import { useEffect, useState } from "react"
import { FeedbackType } from "../../types/feedback"
import { useQuery } from "@tanstack/react-query"
import { GetFeedbacksFromStore } from "../../api/feedback/get-from-store"
import { formatFeedbacks } from "../../formaters/feedback"

export function useGetStoreFeedbacks(id: string, pagination?: { limit: string, page: string }) {
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>()

  const { data: feedbacksData, isLoading: isLoadingFeedback } = useQuery({
    queryKey: ['get-feedbacks'],
    queryFn: () => GetFeedbacksFromStore(id, pagination)
  })

  useEffect(() => {
    if (!isLoadingFeedback && feedbacksData) return setFeedbacks(formatFeedbacks(feedbacksData))
  }, [isLoadingFeedback, feedbacksData])

  return { feedbacks, isLoadingFeedback }
}