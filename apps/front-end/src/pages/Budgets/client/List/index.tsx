import { useState } from "react"
import { IconBill, Panel, Text } from "@app/ui"
import { BudgetRow } from "./components/BudgetRow"
import { useGetBudgetsToClient } from "../../../../hooks/budgets/useGetBudgetsToClient"

export function ClientBudgetsList() {
  const { budgets, distances, isLoading, setBudgets } = useGetBudgetsToClient()

  function onOrderChange(orderStatus: string) {
    switch (orderStatus) {
      case 'rating':
        setBudgets([...budgets].sort((a, b) => b.storeProfile.rating - a.storeProfile.rating));
        break
      case 'distance':
        setBudgets([...budgets].sort((a, b) => {
          const distanceA = distances.filter((item: { storeProfileId: string }) => {
            if (item.storeProfileId === a.storeProfile.id) {
              return item
            }
          })[0].distance
          const distanceB = distances.filter((item: { storeProfileId: string }) => {
            if (item.storeProfileId === b.storeProfile.id) {
              return item
            }
          })[0].distance
          return distanceA - distanceB
        }))
        break
      case 'descPrice':
        setBudgets([...budgets].sort((a, b) => Number(b.startValue.replace('R$', '').replace(',', '.').replace(/\./g, "")) - Number(a.startValue.replace('R$', '').replace(',', '.').replace(/\./g, ""))))
        break
      case 'ascPrice':
        setBudgets([...budgets].sort((a, b) => Number(a.startValue.replace('R$', '').replace(',', '.').replace(/\./g, "")) - Number(b.startValue.replace('R$', '').replace(',', '.').replace(/\./g, ""))))
        break
      default:
        console.log('nothing')
    }
  }

  const [selectedRow, setSelectedRow] = useState<number>()

  return <>
    {!isLoading ? (
      <>
        <div className="flex justify-center mt-10">
          <Panel className="font-bold  max-w-[1200px] w-full">
            <div className="flex flex-row">
              <Text className="text-3xl text-black dark:text-white flex flex-row gap-5 items-center" as="h1"><IconBill />Orçamentos recebidos</Text>
              <div className="ml-auto" />
              <select onClick={(e) => onOrderChange(e.currentTarget.value)} className="form-select !border-none text-dark dark:bg-black form-select-lg dark:text-white">
                <option value="rating">
                  Loja com mais notas
                </option>
                <option value="distance">
                  Loja mais próxima
                </option>
                <option value='ascPrice'>
                  Menor preço
                </option>
                <option value='descPrice'>
                  Maior preço
                </option>
              </select>
            </div>
            <div className="border-b border-b-[#323b45] mt-5 mt-10" />
            {
              budgets.length > 0 && distances.length > 0 ?
                budgets.map((budget, key) => {
                  const store = (distances.filter((distance) => distance.storeProfileId === budget.storeProfile.id))
                  return (
                    <>
                      <div onClick={() => setSelectedRow(key)} className={`hover:bg-[#5f577426] ${selectedRow === key && '!bg-[#5f577426]'}`}><BudgetRow distance={store[0].distance} budget={budget} /></div>
                    </>
                  )
                }) :
                (<div className="mt-10 h-[200px] "><Text className="text-3xl" as="span">Não foram encontrados registros</Text></div>)
            }
          </Panel>
        </div>
      </>
    ) : ''}
  </>
}