import { Input } from "@app/ui";
import { useEffect, useState } from "react";

export function SearchModelsInput({ phoneModels, searchInputError, brand, searchModel, setSearchModel, searchedValue }: { searchedValue?: string, searchModel: string, setSearchModel: React.Dispatch<React.SetStateAction<string>>, searchInputError?: boolean, brand: string, phoneModels: string[] }) {
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
      {searchInputError && (<span className="text-danger">Campo Obrigatório</span>)}
      {searchModel && !finishSearch ? (
        <ul onClick={() => setFinishSearch(true)} className="mt-2 border border-gray-300 rounded-lg bg-black shadow">
          {filteredModels.length > 0 ? (
            filteredModels.map((model, index) => (
              <li
                key={index}
                className="p-2 text-white hover:bg-gray-100 cursor-pointer"
                onClick={() => setSearchModel(model)} // Define o modelo selecionado no input
              >
                {model}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">Utilizar "{searchModel}" como modelo?</li>
          )}
        </ul>
      ) : ''}
    </>
  )
}