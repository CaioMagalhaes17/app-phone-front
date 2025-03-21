import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, IconBell, IconSettings, Text } from "@app/ui";
import { NotificationRow } from "./NotificationRow";
import useNotifications from "../../hooks/useNotifications";
import { useGetNotifications } from "../../hooks/notification/useGetNotifications";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function HeaderNotificationsBox() {
  const client = useQueryClient()
  const [eraseNewNotifications, setEraseNewNotifications] = useState(false)
  const { notifications: newNotifications } = useNotifications()
  const { notifications, isLoading } = useGetNotifications()
  useEffect(() => {
    client.refetchQueries({ queryKey: ['get-notifications'] })
    client.refetchQueries({ queryKey: ['get-budgets'] })

  }, [newNotifications])
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger onClick={() => setEraseNewNotifications(true)}>
          <div className="flex flex-row w-full">
            <IconBell />
            {newNotifications.length > 0 && !eraseNewNotifications ? (
              <span className="absolute top-2 ml-5 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {newNotifications.length}
              </span>
            ) : ''}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-2 bg-white dark:bg-black mt-5 max-h-[500px] w-[500px] mr-10 p-4 flex flex-col">
          <div className="flex dark:text-white flex-row justify-between items-center">
            <Text className="text-2xl font-extrabold" as="h1">Notificações</Text>
            <IconSettings />
          </div>
          <div className="border-b border-b-[#323b45] mt-5" />
          <div className="overflow-y-auto scrollable">
            {!isLoading && notifications.map((notification) => (
              <NotificationRow notification={notification} isNew={newNotifications.filter((item) => item.id === notification.id).length > 0} />
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu >
    </>
  )
}