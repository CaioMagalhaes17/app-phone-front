import { Text } from "@app/ui";
import { userImg } from "../../constants/images";

export function NotificationRow() {
  return (
    <>
      <div className="mt-2 flex font-extrabold flex-row items-start gap-5">
        <div className="w-[50px]">
          <img width="50" height="50" src={userImg} className="rounded-3xl" />
        </div>
        <div className="flex flex-col max-w-[80%]">
          <Text className="flex flex-row gap-5 items-center text-center text-dark dark:text-white text-lg" as="span">
            Orçamento recebido
            <Text className="text-white-dark text-sm mt-1" as="span">
              01/04/2003
            </Text>
          </Text>
          <div className="text-white-dark flex flex-row mb-2">
            Teste caraioo
          </div>
        </div>
      </div>
      <div className="border-b border-b-[#323b45]" />
    </>
  )
}