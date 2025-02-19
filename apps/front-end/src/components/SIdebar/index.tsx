import { Sidebar as UISidebar } from "@app/ui";
import { ClientSidebar } from "./ClientSidebar";
import { StoreSidebar } from "./StoreSidebar";
import useStore from "../../state";

export function Sidebar() {
  const { closeSidebar } = useStore()

  return (
    <>
      <UISidebar style={{ left: closeSidebar ? '-305px' : '0px' }}>
        {localStorage.getItem('isStore') === 'true' ? <StoreSidebar /> : <ClientSidebar />}
      </UISidebar>
    </>

  )
}