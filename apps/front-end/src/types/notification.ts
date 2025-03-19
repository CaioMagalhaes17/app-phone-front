export type NotificationType = {
  id: string
  type: SingleNotificationType
  message: string
  senderName: string
  profileId: string
  createdAt: string
  opts?: {
    budgetId?: string,
    storeProfileImg?: string,
    solicitationId?: string
  }
}

export type SingleNotificationType = "newSolicitation" | "newBudget"