import { useQuery } from "@tanstack/react-query"
import { GetBudgetsToClient } from "../../../../api/repair/budget/get-budgets-to-client"
import { useEffect, useState } from "react"
import { formatBudgetsFromApi } from "../../../../formaters/budget"
import { DataTableColumn, DataTableSortStatus } from "mantine-datatable"
import { BudgetType } from "../../../../types/budget"
import { formatPhoneBrand } from "../../../../formaters/solicitations"
import { batteryQuestions, displayQuestions } from "../../../../constants/solicitation-form-questions"
import { Button } from "@app/ui"
import { useNavigate } from "react-router-dom"
import { BasicTable } from "../../../../components/Datatable"
import dayjs from "dayjs"

export function ClientBudgetsList() {
  const navigate = useNavigate()
  const [budgets, setBudgets] = useState<BudgetType[] | []>([])
  const { data, isLoading } = useQuery({
    queryKey: ['get-budgets'],
    queryFn: () => GetBudgetsToClient()
  })
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'createdAt',
    direction: 'desc',
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
      accessor: 'storeName',
      title: 'Nome da loja',
      cellsClassName: 'break-all whitespace-normal max-w-[350px]',
      render: ({ storeProfile }) => {
        return <span className="text-white w-full font-extrabold">{storeProfile.name}</span>
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
      accessor: 'createdAt',
      title: 'Criado em',
      cellsClassName: 'text-white font-extrabold',
      sortable: true,
      render: ({ createdAt }) => {
        return (
          <span className={`text-white`}>{dayjs(createdAt).format("DD/MM/YYYY")}</span>
        )
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
    },
  ]

  function onSortChange() {
    if (budgets.length > 0) {
      if (sortStatus.direction === 'asc') {
        budgets.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
      }
      if (sortStatus.direction === 'desc') {
        budgets.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      }
    }
    return setSortStatus
  }

  useEffect(() => {
    if (!isLoading) {
      return setBudgets(formatBudgetsFromApi(data))
    }
  }, [isLoading, data])
  return <>
    {!isLoading ? (
      <>
        <BasicTable sortStatus={sortStatus} onSortStatusChange={onSortChange()} columns={columns} records={budgets} title="Orçamentos recebidos">

        </BasicTable>
      </>
    ) : ''}
  </>
}