import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { NotificationType } from "../../types/notification";
import { getNotification } from "../../api/notification/fetch-notification";

export function useGetNotifications() {
  const [notifications, setNotifications] = useState<NotificationType[]>([])
  const { data, isLoading } = useQuery({
    queryKey: ['get-notifications'],
    queryFn: () => getNotification()
  })

  useEffect(() => {
    if (!isLoading && data) setNotifications(data)
  }, [isLoading, data])
  return { notifications, isLoading }
}