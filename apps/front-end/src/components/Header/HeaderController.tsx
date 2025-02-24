import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, IconLogout, IconUser, Text } from "@app/ui"
import useStore from "../../state"
import { useNavigate } from "react-router-dom"
import { HeaderNotificationsBox } from "../Notifications/HeaderNotificationsBox"

export function HeaderController() {
  const { setClientInfos, clientInfos, setStoreInfos, storeInfos } = useStore()
  const navigate = useNavigate()
  function getHeaderButtons() {
    const isStore = localStorage.getItem('isStore')
    if (isStore) {
      if (isStore === 'false') {
        return getClientHeader()
      } else {
        return getStoreHeader()
      }
    }
  }

  function getClientHeader() {
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
      <>
        <div className="flex flex-row gap-5">
          <HeaderNotificationsBox />
          <div className="w-[1px] h-[50px] bg-dark" />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex flex-row">
                <Text className="text-[#c4c4c4] font-bold text-xl" as="h1">{clientInfos?.name}</Text>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black mt-5">
              <DropdownMenuItem className="text-white">
                <IconUser className="mr-2" />
                Perfil
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
      </>
    )
  }

  function getStoreHeader() {
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
        }
      })
      localStorage.removeItem('accessToken')
      navigate('/store/login')
    }
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex flex-row">
              <Text className="text-[#c4c4c4] font-bold text-xl" as="h1">{storeInfos?.name}</Text>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-black mt-5">
            <DropdownMenuItem className="text-white">
              <IconUser className="mr-2" />
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem className="text-danger">
              <button className="flex" onClick={() => handleLogout()}>
                <IconLogout className="mr-2 rotate-90" />
                Sair
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    )
  }

  return { getHeaderButtons }
}