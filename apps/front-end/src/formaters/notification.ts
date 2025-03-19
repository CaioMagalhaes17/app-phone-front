import { SingleNotificationType } from "../types/notification";

export function getNotificationTitleByType(type: SingleNotificationType): string {
  if (type === 'newSolicitation') return 'Novo Defeito recebido'
  if (type === 'newBudget') return 'Novo orçamento recebido'
  return ''
}