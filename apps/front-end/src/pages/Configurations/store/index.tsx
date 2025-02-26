import { useState } from "react";
import { HeaderMenus } from "./components/HeaderMenu";
import { BasicConfigs } from "./components/UserConfigs";
import { NotificationConfigs } from "./components/Notification";

export function UserStoreConfigurations() {
  const [active, setActive] = useState<number>(1)

  return (
    <>
      <HeaderMenus active={active} setActive={setActive} />
      {active === 1 && (<BasicConfigs />)}
      {active === 2 && (<NotificationConfigs />)}
    </>
  )
}