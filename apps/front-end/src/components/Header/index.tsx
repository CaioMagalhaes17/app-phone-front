import { IconMenu, Header as UIHeader } from "@app/ui";
import { HeaderController } from "./HeaderController";
import useStore from "../../state";
import { Text } from "@app/ui"
import { HeaderNotificationsBox } from "../Notifications/HeaderNotificationsBox";
import { ChooseTheme } from "./ChooseTheme";

export function Header() {
  const { getHeaderButtons } = HeaderController()
  const { closeSidebar, setCloseSidebar } = useStore()
  function onMenuClick() {
    setCloseSidebar(!closeSidebar)
  }

  return (
    <UIHeader>
      <div className="h-[80px] relative flex w-full items-center px-5 py-2.5 dark:bg-black border-b border-b-black dark:border-b-[#323b45]">
        <button onClick={() => onMenuClick()} className="mr-5 text-black dark:text-[#c4c4c4]"><IconMenu /></button>
        <div className="w-[1px] h-[50px] bg-dark mr-5" />
        <div className={`horizontal-logo flex justify-between items-center mr-2`}>
          <Text className="text-3xl text-black dark:text-[#c4c4c4] font-extrabold " as="h1">Ponto dos celulares</Text>
        </div>
        <div className="mr-auto" />
        <div className="flex flex-row gap-5">
          <ChooseTheme />
          <HeaderNotificationsBox />
          <div className="w-[1px] h-[50px] ml-5 bg-dark" />
          {getHeaderButtons()}
        </div>
      </div>
    </UIHeader>
  )
}