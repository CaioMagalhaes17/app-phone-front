import { Text } from "@app/ui";
import { userImg } from "../../constants/images";
import { NotificationType } from "../../types/notification";
import { getNotificationTitleByType } from "../../formaters/notification";
import JSXParser from "react-jsx-parser";
import { useNavigate } from "react-router-dom";

export function NotificationRow({ notification, isNew }: { isNew: boolean, notification: NotificationType }) {
  const navigate = useNavigate()
  function handleClick() {
    if (notification.opts?.budgetId) {
      navigate('/budget/' + notification.opts?.budgetId)
    }
    if (notification.opts?.solicitationId) {
      navigate('/store/solicitation/' + notification.opts?.solicitationId)
    }
  }
  return (
    <>
      <div onClick={() => handleClick()} className="mt-2 flex flex-row items-center gap-5 cursor-pointer hover:bg-[#c4c4c480]">
        <div className="w-[50px]">
          <img width="50" height="50" src={notification.opts?.storeProfileImg || userImg} className="rounded-3xl" />
        </div>
        <div className="flex flex-col max-w-[80%]">
          <Text className="flex flex-row gap-5 items-center text-center text-dark dark:text-white text-lg" as="span">
            <span className="font-bold">{getNotificationTitleByType(notification.type)}</span>
            <Text className="text-white-dark text-sm mt-1" as="span">
              {notification.createdAt}
            </Text>
            {isNew && (
              <span className="text-sm text-danger">Novo!</span>
            )}
          </Text>
          <div className="text-gray-500 flex flex-row mb-2">
            {<JSXParser jsx={notification.message} />}
          </div>
        </div>
      </div>
      <div className="border-b border-b-[#323b45]" />
    </>
  )
}