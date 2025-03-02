import { IconSearch, Input } from "@app/ui";

export function SearchBar() {
  return (
    <div className="ml-10 relative">
      <Input type="text" placeholder="Procure por lojas, produtos...." className="!w-[400px] !ps-10 bg-[#c4c4c4] dark:bg-[#c4c4c4] border-none placeholder:text-black placeholder:dark:text-white-dark" />
      <span className="absolute start-4 top-1/2 -translate-y-1/2">
        <IconSearch className="text-black dark:text-white" />
      </span>
    </div>

  )
}