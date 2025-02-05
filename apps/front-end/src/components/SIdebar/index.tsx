import { Sidebar as UISidebar } from "@app/ui";
import { ClientSidebar } from "./ClientSidebar";
import { StoreSidebar } from "./StoreSidebar";

export function Sidebar() {

  return (
    <>
      <UISidebar>
        {localStorage.getItem('isStore') === 'true' ? <StoreSidebar /> : <ClientSidebar />}
      </UISidebar>
    </>

  )
}