import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, IconLogout, IconSettings, Text } from "@app/ui"
import useStore from "../../state"
import { Link, useNavigate } from "react-router-dom"
import { userImg } from "../../constants/images"

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
            <div className="flex flex-row items-center">
              <div className="w-[60px]">
                <img width="50" height="50" src={storeInfos.profileImg} className="rounded-3xl" />
              </div>
              <Text className="text-[#c4c4c4] font-bold text-xl" as="h1">{storeInfos?.name}</Text>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-black mt-5">
            <DropdownMenuItem className="flex flex-row gap-2 text-white">
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
      </>
    )
  }

  return { getHeaderButtons }
}