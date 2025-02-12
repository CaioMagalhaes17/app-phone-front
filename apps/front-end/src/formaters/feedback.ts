import { FeedbackFromApi, FeedbackType } from "../types/feedback";
import { formatClientProfile } from "./client-profile";
import { formatStoreProfile } from "./store-profile";

export function formatFeedbacks(budgets: FeedbackFromApi[]): FeedbackType[] {
  return budgets.map((budget) => formatFeedback(budget))
}
export function formatFeedback(feedback: FeedbackFromApi): FeedbackType {
  return {
    id: feedback._id,
    description: feedback.props.description,
    rating: feedback.props.rating,
    clientProfile: formatClientProfile(feedback.props.clientProfile),
    storeProfile: formatStoreProfile(feedback.props.storeProfile),
    createdAt: feedback.props.createdAt,
    updatedAt: feedback.props.updatedAt
  }
}