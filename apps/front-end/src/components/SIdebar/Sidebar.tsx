import { Sidebar as UISidebar } from "@app/ui";
import { SidebarController } from "./SidebarController";

export function Sidebar() {
  const { getSidebarItems } = SidebarController()

  return (
    <>
      <UISidebar>
        {getSidebarItems()}
      </UISidebar>
    </>

  )
}