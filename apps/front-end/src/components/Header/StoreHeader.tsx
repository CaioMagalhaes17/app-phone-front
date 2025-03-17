import { IconMenu, Text, Header as UIHeader, VSeparator } from "@app/ui";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, IconLogout, IconSettings } from "@app/ui"

import useStore from "../../state";
import { ChooseTheme } from "./ChooseTheme";
import { HeaderNotificationsBox } from "../Notifications/HeaderNotificationsBox";
import { Link, useNavigate } from "react-router-dom";

export function StoreHeader() {
  const { closeSidebar, setCloseSidebar, setStoreInfos, storeInfos } = useStore()
  function onMenuClick() {
    setCloseSidebar(!closeSidebar)
  }
  const navigate = useNavigate()
  function handleLogout() {
    setStoreInfos({
      id: '',
      name: '',
      profileImg: '',
      address: '',
      email: '',
      telNum: '',
      rating: 0,
      location: {
        latitude: 0,
        longitude: 0,
      },
      description: "",
      createdAt: "",
      updatedAt: "",
      userId: ""
    })
    localStorage.removeItem('accessToken')
    navigate('/store/login')
  }
  return (
    <>
      <UIHeader>
        <div className="h-[80px] shadow-md relative flex w-full items-center px-5 py-2.5 dark:bg-black dark:border-b-[#323b45]">
          <button onClick={() => onMenuClick()} className="mr-5 text-black dark:text-[#c4c4c4]"><IconMenu /></button>
          <VSeparator />
          <div className={`horizontal-logo flex justify-between items-center mr-2`}>
            <img className="h-[40px]" src="/phone.png" />
            <Text className="text-3xl text-black dark:text-[#c4c4c4] font-extrabold " as="h1">Ponto dos celulares</Text>
          </div>
          <div className="mr-auto" />
          <div className="flex flex-row gap-5">
            <ChooseTheme />
            <HeaderNotificationsBox />
            <VSeparator className="ml-5" />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex flex-row items-center">
                  <div className="w-[60px]">
                    <img width="50" height="50" src={storeInfos.profileImg} className="rounded-3xl" />
                  </div>
                  <Text className="text-dark dark:text-white font-bold text-xl" as="h1">{storeInfos?.name}</Text>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="font-extrabold bg-white dark:bg-black mt-5">
                <DropdownMenuItem className="flex flex-row gap-2 text-dark dark:text-white">
                  <Link to="/store/configurations" className="flex flex-row gap-2">
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
    </>
  )
}