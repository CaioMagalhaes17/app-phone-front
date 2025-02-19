import { IconMenu, Text, Header as UIHeader } from "@app/ui";
import { HeaderController } from "./HeaderController";
import useStore from "../../state";


export function Header() {
  const { getHeaderButtons } = HeaderController()
  const { closeSidebar, setCloseSidebar } = useStore()
  function onMenuClick() {
    setCloseSidebar(!closeSidebar)
  }
  return (
    <UIHeader>
      <div className="h-[80px] relative flex w-full items-center px-5 py-2.5 bg-black border-b border-b-[#323b45]">
        <button onClick={() => onMenuClick()} className="mr-10"><IconMenu /></button>
        <div className={`horizontal-logo flex justify-between items-center mr-2`}>
          <Text className="text-3xl text-[#c4c4c4] font-extrabold " as="h1">Ponto dos celulares</Text>
        </div>
        <div className="mr-auto" />
        {getHeaderButtons()}
      </div>
    </UIHeader>
  )
}