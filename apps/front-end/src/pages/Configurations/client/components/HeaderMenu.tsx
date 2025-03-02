import { Text } from "@app/ui";
import { SetStateAction } from "react";

export function HeaderMenus({ active, setActive }: { active: number, setActive: React.Dispatch<SetStateAction<number>> }) {
  return (
    <>
      <div className="">
        <ul className="flex font-semibold border-b-2 text-xl border-white-dark dark:border-[#191e3a] flex-row mb-5 gap-10 whitespace-nowrap overflow-y-auto">
          <li className="inline-block">
            <Text as="span" onClick={() => setActive(1)} className={`dark:text-white-dark ${active === 1 ? 'text-black dark:text-primary border-b border-black dark:border-primary' : ''} font-extrabold cursor-pointer`}>Configurações de usuário</Text>
          </li>
          <li className="inline-block">
            <Text as="span" onClick={() => setActive(2)} className={`dark:text-white-dark ${active === 2 ? 'text-black dark:text-primary border-b border-black dark:border-primary' : ''} font-extrabold cursor-pointer`}>Configurações de notificação</Text>
          </li>
        </ul>
      </div>
    </>
  )
}