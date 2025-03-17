import { HSeparator, IconSearch, Input, Text } from "@app/ui";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchStoreProfiles } from "../../hooks/profile/useSearchStoreProfile";
import { useSearchProducts } from "../../hooks/products/useSearchProducts";

export function SearchBar() {

  const [finishSearch, setFinishSearch] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams({
    search: '',
  })
  const { profiles, isStoreLoading } = useSearchStoreProfiles(searchParams.get('search') || '')
  const { products, isProductsLoading } = useSearchProducts(searchParams.get('search') || '')


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFinishSearch(false)
    const value = e.target.value;
    setSearchParams((prev) => {
      prev.set('search', value)
      return prev
    })
  }

  return (
    <>
      <div className="ml-10 flex flex-col ">
        <div className=" relative">
          <Input value={searchParams.get('search') || ''} onChange={handleSearch} type="text" placeholder="Procure por lojas, produtos...." className="!w-[400px] !ps-10 bg-[#c4c4c4] dark:bg-[#c4c4c4] border-white-dark placeholder:text-black placeholder:dark:text-white-dark" />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <IconSearch className="text-black dark:text-white" />
          </span>
        </div>
        {!finishSearch && !isStoreLoading && !isProductsLoading && searchParams.get('search') ? (
          <ul onClick={() => setFinishSearch(true)} className="top-[85px] p-2 sombra fixed rounded-lg bg-[#ffffff] dark:bg-black w-[400px]">
            {profiles.length > 0 && (
              profiles.map((profile) => (
                <>
                  <li
                    className="p-2 hover:bg-[#e7e7e7] dark:hover:bg-[#e7e7e717] flex flex-row gap-5 cursor-pointer"
                    onClick={() => ''}
                  >
                    <Text className="text-lg text-black dark:text-white font-extrabold" as="span">Loja:</Text>
                    <Text className="text-lg text-dark dark:text-white" as="span">{profile.name}</Text>
                  </li>
                  <HSeparator className="mt-[0px]" />
                </>
              ))
            )}
            {products.length > 0 && (
              products.map((product) => (
                <>
                  <li
                    className="p-2 hover:bg-[#e7e7e7] dark:hover:bg-[#e7e7e717] flex flex-row gap-5 cursor-pointer"
                    onClick={() => ''}
                  >
                    <Text className="text-lg text-black dark:text-white font-extrabold" as="span">Produto:</Text>
                    <Text className="text-lg text-dark dark:text-white" as="span">{product.name}</Text>
                  </li>
                  <HSeparator className="mt-[0px]" />
                </>
              ))
            )}
            {profiles.length === 0 && products.length === 0 ? (<Text className="p-2" as="span">Nenhum Registro encontrado</Text>) : ''}
          </ul>
        ) : ''}
      </div>
    </>
  )
}