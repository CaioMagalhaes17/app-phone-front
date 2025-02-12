import { useQuery } from "@tanstack/react-query"
import { GetBudgetsToClient } from "../../../../api/repair/budget/get-budgets-to-client"
import { useEffect, useState } from "react"
import { formatBudgetsFromApi } from "../../../../formaters/budget"
import { DataTableColumn } from "mantine-datatable"
import { BudgetType } from "../../../../types/budget"
import { formatPhoneBrand } from "../../../../formaters/solicitations"
import { batteryQuestions, displayQuestions } from "../../../../constants/solicitation-form-questions"
import { Button } from "@app/ui"
import { useNavigate } from "react-router-dom"
import { BasicTable } from "../../../../components/Datatable"

export function ClientBudgetsList() {
  const navigate = useNavigate()
  const [budgets, setBudgets] = useState<BudgetType[] | []>([])
  const { data, isLoading } = useQuery({
    queryKey: ['get-budgets'],
    queryFn: () => GetBudgetsToClient()
  })

  const columns: DataTableColumn<BudgetType>[] = [
    {
      accessor: 'phone',
      title: 'Celular',
      render: ({ solicitation }) => {
        return <span className="text-white text-lg font-extrabold">{formatPhoneBrand(solicitation.form.phoneForm.brand)} - {solicitation.form.phoneForm.model}</span>
      }
    },
    {
      accessor: 'problem',
      title: 'Defeito',
      render: ({ solicitation }) => {
        let answer: { text: string } = { text: '' }
        if ('battery-A' in solicitation.form.problemForm) {
          const questionOne = solicitation.form.problemForm['battery-A']
          answer = batteryQuestions[0].options.filter((item) => item.optionId === questionOne)[0]
        }
        if ('display-A' in solicitation.form.problemForm) {
          const questionOne = solicitation.form.problemForm['display-A']
          answer = displayQuestions[0].options.filter((item) => item.optionId === questionOne)[0]
        }
        return <span className="text-white text-md font-extrabold">{answer.text}</span>
      }
    },

    {
      accessor: 'price',
      title: 'Valor estimado',
      render: ({ startValue, endValue }) => {
        return (
          <span className="text-lg text-success font-extrabold">{startValue} - {endValue}</span>
        )

      }
    },
    {
      accessor: 'storeName',
      title: 'Nome da loja',
      cellsClassName: 'break-all whitespace-normal max-w-[350px]',
      render: ({ storeProfile }) => {
        return <span className="text-white w-full font-extrabold">{storeProfile.name}</span>
      }
    },
    {
      accessor: 'actions',
      title: 'Ações',
      render: ({ solicitation }) => {
        return (
          <div className="flex justify-center items-center">
            <Button onClick={() => navigate('/solicitation/' + solicitation.id)} className="btn-outline-primary text-lg">Acessar</Button>
          </div>
        )
      }
    }
  ]

  useEffect(() => {
    if (!isLoading) {
      return setBudgets(formatBudgetsFromApi(data))
    }
  }, [isLoading, data])
  return <>
    {!isLoading ? (
      <>
        <BasicTable columns={columns} records={budgets} title="Orçamentos recebidos">

        </BasicTable>
      </>
    ) : ''}
  </>
}