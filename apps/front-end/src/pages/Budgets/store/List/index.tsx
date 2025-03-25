import { Button } from "@app/ui"
import { DataTableColumn } from "mantine-datatable"
import { useNavigate } from "react-router-dom"
import { formatPhoneBrand } from "../../../../formaters/solicitations"
import { batteryQuestions, displayQuestions } from "../../../../constants/solicitation-form-questions"
import { useQuery } from "@tanstack/react-query"
import { GetBudgets } from "../../../../api/repair/budget/get-budgets"
import { useEffect, useState } from "react"
import { formatBudgetsFromApi } from "../../../../formaters/budget"
import { BudgetType } from "../../../../types/budget"
import { BasicTable } from "../../../../components/Datatable"
import dayjs from "dayjs"

export function StoreBudgetList() {
  const [budgets, setBudgets] = useState<BudgetType[] | []>([])
  const navigate = useNavigate()
  const { data, isLoading } = useQuery({
    queryKey: ['get-budgets'],
    queryFn: () => GetBudgets({ page: '1', limit: '10' })
  })
  useEffect(() => {
    if (!isLoading) {
      setBudgets(formatBudgetsFromApi(data))
    }
  }, [isLoading, data])
  const columns: DataTableColumn<BudgetType>[] = [
    {
      accessor: 'phone',
      title: 'Celular',
      render: ({ solicitation }) => {
        return <span className="text-dark dark:text-white text-lg font-bold">{formatPhoneBrand(solicitation.form.phoneForm.brand)} - {solicitation.form.phoneForm.model}</span>
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
        return <span className="text-dark dark:text-white text-lg font-bold">{answer.text}</span>
      }
    },

    {
      accessor: 'price',
      title: 'Valor estimado',
      render: ({ startValue, endValue }) => {
        return (
          <span className="text-lg text-green font-bold">{startValue} - {endValue}</span>
        )

      }
    },
    {
      accessor: 'createdAt',
      title: 'Criado em',
      cellsClassName: 'text-dark dark:text-white font-extrabold',
      render: ({ createdAt }) => {
        return (
          <span>{dayjs(createdAt).format("DD/MM/YYYY")}</span>
        )
      }
    },

    {
      accessor: 'actions',
      title: 'Ações',
      render: ({ solicitation }) => {
        return (
          <div className="flex justify-center items-center">
            <Button onClick={() => navigate('/store/solicitation/' + solicitation.id)} className="btn-outline-primary text-lg">Acessar</Button>
          </div>
        )
      }
    }
  ]

  return (
    <>
      {!isLoading ? (
        <>
          <BasicTable columns={columns} records={budgets} title="Histórico de orçamentos">

          </BasicTable>
        </>
      ) : ''}
    </>
  )
}