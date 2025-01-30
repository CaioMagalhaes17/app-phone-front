import { Input } from "@app/ui";
import { useState } from "react";

export function SearchModelsInput({ phoneModels, brand }: { brand: string, phoneModels: string[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [finishSearch, setFinishSearch] = useState(false)
  const [filteredModels, setFilteredModels] = useState<string[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFinishSearch(false)
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = phoneModels.filter((model: string) =>
      model.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredModels(filtered);
  }
  console.log(searchTerm)
  return (
    <>
      <Input
        type="text" placeholder={`Pesquise por modelos ${brand}`} value={searchTerm}
        onSubmit={(e) => e.preventDefault()}
        onChange={handleSearch}
      />
      {searchTerm && !finishSearch ? (
        <ul onClick={() => setFinishSearch(true)} className="mt-2 border border-gray-300 rounded-lg bg-black shadow">
          {filteredModels.length > 0 ? (
            filteredModels.map((model, index) => (
              <li
                key={index}
                className="p-2 text-white hover:bg-gray-100 cursor-pointer"
                onClick={() => setSearchTerm(model)} // Define o modelo selecionado no input
              >
                {model}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">Utilizar "{searchTerm}" como modelo?</li>
          )}
        </ul>
      ) : ''}
    </>
  )
}