import { IconMenu, Header as UIHeader, VSeparator } from "@app/ui";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, IconLogout, IconSettings } from "@app/ui"
import useStore from "../../state";
import { HeaderNotificationsBox } from "../Notifications/HeaderNotificationsBox";
import { ChooseTheme } from "./ChooseTheme";
import { SearchBar } from "./SeachBar";
import { Link, useNavigate } from "react-router-dom";
import { userImg } from "../../constants/images";

export function ClientMobileHeader() {
  const { closeSidebar, setCloseSidebar, setClientInfos } = useStore()
  function onMenuClick() {
    setCloseSidebar(!closeSidebar)
  }
  const navigate = useNavigate()
  function handleLogout() {
    setClientInfos({
      id: '',
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
      <div className="h-[80px] shadow-md relative flex w-full items-center px-2 py-2 dark:bg-black dark:border-b-[#323b45]">
        <button onClick={() => onMenuClick()} className="mr-5 text-black dark:text-[#c4c4c4]"><IconMenu /></button>
        <SearchBar />
        <div className="mr-auto" />
        <div className="flex flex-row ">
          <ChooseTheme />
          <HeaderNotificationsBox />
          <VSeparator className="ml-4 mr-4" />
          <DropdownMenu onOpenChange={(s) =>
            setCloseSidebar(!s)
          } >
            <DropdownMenuTrigger>
              <div className="flex flex-row items-center">
                <div className="w-[60px]">
                  <img width="50" height="50" src={userImg} className="sombra rounded-3xl" />
                </div>

              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#d9d9d963] dark:bg-black mt-5 font-extrabold">
              <DropdownMenuItem className="flex flex-row gap-2 text-dark dark:text-white">
                <Link to="/configurations" className=" flex flex-row gap-2">
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