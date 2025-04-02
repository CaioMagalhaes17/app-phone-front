import { Input } from "@app/ui";
import { useEffect, useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";

export function SearchModelsInput({ phoneModels, searchInputError, brand, searchModel, setSearchModel, searchedValue, setValue, errors }: { setValue: UseFormSetValue<FieldValues>, errors: FieldErrors<FieldValues>, register: UseFormRegister<FieldValues>, searchedValue?: string, searchModel: string, setSearchModel: React.Dispatch<React.SetStateAction<string>>, searchInputError?: boolean, brand: string, phoneModels: string[] }) {
  const [finishSearch, setFinishSearch] = useState(false)
  const [filteredModels, setFilteredModels] = useState<string[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFinishSearch(false)
    const value = e.target.value;
    setSearchModel(value);

    const filtered = phoneModels.filter((model: string) =>
      model.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredModels(filtered);
  }

  useEffect(() => {
    if (searchedValue) return setSearchModel(searchedValue)
  }, [searchedValue])

  return (
    <>
      <Input
        type="text" placeholder={`Pesquise por modelos ${brand}`} value={searchModel}
        onSubmit={(e) => e.preventDefault()}
        onChange={handleSearch}
      />
      {errors.model && (<p className="font-bold text-danger text-left">Campo Obrigatório*</p>)}

      {searchInputError && (<span className="text-danger">Campo Obrigatório</span>)}
      {searchModel && !finishSearch ? (
        <ul onClick={() => setFinishSearch(true)} className="mt-2 border border-gray-300 rounded-lg bg-[#ffffff] dark:bg-black shadow">
          {filteredModels.length > 0 ? (
            filteredModels.map((model, index) => (
              <li
                key={index}
                className="p-2 text-dark hover:bg-[#c4c4c4] dark:text-white dark:hover:bg-gray-100 cursor-pointer"
                onClick={() => { setSearchModel(model); setValue('model', model) }} // Define o modelo selecionado no 
              >
                {model}
              </li>
            ))
          ) : (
            <li onClick={() => { setSearchModel(searchModel); setValue('model', searchModel) }} className="p-2 text-gray-500 hover:bg-[#c4c4c4] dark:text-white dark:hover:bg-gray-100 cursor-pointer">Utilizar "{searchModel}" como modelo?</li>
          )}
        </ul>
      ) : ''}
    </>
  )
}