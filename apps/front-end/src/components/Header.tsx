import { Header as UIHeader } from "@app/ui";


export function Header() {


  return (
    <UIHeader>
      <div className="h-[80px] relative flex w-full items-center px-5 py-2.5 bg-black border-b border-b-[#323b45]">
        <div className={`horizontal-logo flex justify-between items-center mr-2`}>
        </div>
      </div>
    </UIHeader>
  )
}