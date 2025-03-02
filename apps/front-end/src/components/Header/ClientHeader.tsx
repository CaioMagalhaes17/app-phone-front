import { Button, IconMenu, IconSend, Header as UIHeader, VSeparator } from "@app/ui";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, IconLogout, IconSettings } from "@app/ui"
import useStore from "../../state";
import { Text } from "@app/ui"
import { HeaderNotificationsBox } from "../Notifications/HeaderNotificationsBox";
import { ChooseTheme } from "./ChooseTheme";
import { SearchBar } from "./SeachBar";
import { Link, useNavigate } from "react-router-dom";
import { userImg } from "../../constants/images";

export function ClientHeader() {
  const { closeSidebar, setCloseSidebar, clientInfos, setClientInfos } = useStore()
  function onMenuClick() {
    setCloseSidebar(!closeSidebar)
  }
  const navigate = useNavigate()
  function handleLogout() {
    setClientInfos({
      name: '',
      profileImg: '',
      location: {
        latitude: 0,
        longitude: 0,
        radius: 0
      }
    })
    localStorage.removeItem('accessToken')
    navigate('/login')
  }
  return (
    <UIHeader>
      <div className="h-[80px] shadow-md relative flex w-full items-center px-5 py-2.5 dark:bg-black dark:border-b-[#323b45]">
        <button onClick={() => onMenuClick()} className="mr-5 text-black dark:text-[#c4c4c4]"><IconMenu /></button>
        <VSeparator />
        <div className={`horizontal-logo flex justify-between items-center mr-2`}>
          <Text className="text-3xl text-black dark:text-[#c4c4c4] font-extrabold " as="h1">Ponto dos celulares</Text>
        </div>
        <SearchBar />
        <div className="mr-auto" />
        <div className="flex flex-row gap-5">
          <Button className="btn-outline-primary border-none flex flex-row gap-2">
            <IconSend />
            Solicitar Conserto
          </Button>
          <ChooseTheme />
          <HeaderNotificationsBox />
          <VSeparator className="ml-5" />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex flex-row items-center">
                <div className="w-[60px]">
                  <img width="50" height="50" src={userImg} className="rounded-3xl" />
                </div>
                <Text className="text-black dark:text-[#c4c4c4] font-bold text-xl" as="h1">{clientInfos?.name}</Text>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black mt-5 font-extrabold">
              <DropdownMenuItem className="flex flex-row gap-2 text-white">
                <Link to="/configurations" className="flex flex-row gap-2">
                  <IconSettings />
                  Configurações
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-danger">
                <button className="flex" onClick={() => handleLogout()}>
                  <IconLogout className="mr-2 rotate-90" />
                  Sair
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </UIHeader>
  )
}