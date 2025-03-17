import { ClientHeader } from "./ClientHeader";
import { StoreHeader } from "./StoreHeader";

export function Header() {
  const isStore = localStorage.getItem('isStore')
  return (
    <>
      {isStore === 'false' ? <ClientHeader /> : <StoreHeader />}
    </>
  )
}