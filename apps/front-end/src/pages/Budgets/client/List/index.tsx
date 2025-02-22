import { useQuery } from "@tanstack/react-query"
import { GetBudgetsToClient } from "../../../../api/repair/budget/get-budgets-to-client"
import { useEffect, useState } from "react"
import { formatBudgetsFromApi } from "../../../../formaters/budget"
import { BudgetType } from "../../../../types/budget"
import { Panel, Text } from "@app/ui"
import { BudgetRow } from "./components/BudgetRow"

export function ClientBudgetsList() {
  const [budgets, setBudgets] = useState<BudgetType[] | []>([])
  // const [uniqueModels, setUniqueModels] = useState<string[]>()
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['get-budgets'],
    queryFn: () => GetBudgetsToClient()
  })

  useEffect(() => {
    if (!isFetching && data) {
      const budgetsFormatted = formatBudgetsFromApi(data)
      setBudgets([...budgetsFormatted].sort((a, b) => b.storeProfile.rating - a.storeProfile.rating));
      // const uniqueModelsD = [...new Set(data.map((item: any) => item.props.solicitation.props.form.props.phoneForm.model).filter((model: any) => typeof model === "string")
      // )] as string[];
      // setUniqueModels(uniqueModelsD)
    }
  }, [isFetching, data])

  function onOrderChange(orderStatus: string) {
    switch (orderStatus) {
      case 'rating':
        setBudgets([...budgets].sort((a, b) => b.storeProfile.rating - a.storeProfile.rating));
        break
      case 'distance':

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

  // function onFilterChange(filter: string) {
  //   if (filter !== 'default') return setBudgets([...budgets].filter((item) => item.solicitation.form.phoneForm.model === filter));
  //   return refetch()
  // }
  return <>
    {!isLoading ? (
      <>
        <div className="flex justify-center">
          <Panel className="font-extrabold  max-w-[1200px] w-full">
            <div className="flex flex-row">
              <Text className="text-3xl text-white" as="h1">Orçamentos recebidos</Text>
              <div className="ml-auto" />
              {/* <select onClick={(e) => onFilterChange(e.currentTarget.value)} className="form-select !border-none bg-black form-select-lg text-white mr-5">
                <option value="default">
                  Filtrar por celular
                </option>
                {uniqueModels && uniqueModels.length > 0 ? uniqueModels.map((item) => {
                  return (
                    <option value={item}>
                      {item}
                    </option>
                  )
                }) : ''}
              </select> */}
              <select onClick={(e) => onOrderChange(e.currentTarget.value)} className="form-select !border-none bg-black form-select-lg text-white">
                <option value="rating">
                  Loja com mais notas
                </option>
                <option value="distance">
                  Loja mais próxima
                </option>
                <option value='descPrice'>
                  Maior preço
                </option>
                <option value='ascPrice'>
                  Menor preço
                </option>
              </select>
            </div>
            <div className="border-b border-b-[#323b45] mt-5 mt-10" />
            {budgets.length > 0 ?
              budgets.map((budget) => <BudgetRow budget={budget} />) :
              (<div className="mt-10 h-[200px] "><Text className="text-3xl" as="span">Não foram encontrados registros</Text></div>)
            }
          </Panel>
        </div>
      </>
    ) : ''}
  </>
}