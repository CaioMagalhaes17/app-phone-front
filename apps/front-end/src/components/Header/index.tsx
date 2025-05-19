import useStore from "../../state";
import { ClientHeader } from "./ClientHeader";
import { ClientMobileHeader } from "./ClientMobileHeader";
import { StoreHeader } from "./StoreHeader";

export function Header() {
  const isStore = localStorage.getItem('isStore')
  const { isMobile } = useStore()
  return (
    <>
      {isStore === 'false' ? (
        <>
          {isMobile ? (
            <ClientMobileHeader />
          ) : (
            <ClientHeader />
          )}
        </>
      ) : (
        <StoreHeader />
      )}
    </>
  )
}