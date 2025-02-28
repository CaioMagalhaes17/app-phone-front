import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, IconBell, IconSettings, Text } from "@app/ui";
import { NotificationRow } from "./NotificationRow";

export function HeaderNotificationsBox() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex flex-row w-full dark:text-[#c4c4c4] text-black">
            <IconBell />
            <span className="absolute top-2 ml-5 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              5
            </span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-black mt-5 max-h-[500px] w-[500px] mr-10 p-4 flex flex-col">
          <div className="flex text-white flex-row justify-between items-center">
            <Text className="text-2xl font-extrabold" as="h1">Notificações</Text>
            <IconSettings />
          </div>
          <div className="border-b border-b-[#323b45] mt-5" />
          <div className="overflow-y-auto scrollable">
            <NotificationRow />
            <NotificationRow />
            <NotificationRow />
            <NotificationRow />
            <NotificationRow />
            <NotificationRow />
            <NotificationRow />
            <NotificationRow />
            <NotificationRow />
          </div>
        </DropdownMenuContent>
      </DropdownMenu >
    </>
  )
}