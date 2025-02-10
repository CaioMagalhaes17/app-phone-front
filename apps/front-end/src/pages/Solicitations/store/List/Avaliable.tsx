
import { DataTableColumn, DataTableSortStatus } from "mantine-datatable"
import { Solicitation } from "../../../../types/solicitation"
import { useQuery } from "@tanstack/react-query"
import { GetAvaliableSolicitationsForStore } from "../../../../api/repair/solicitation/avaliable-for-store"
import { useEffect, useState } from "react"
import { formatPhoneBrand, formatSolicitations, formatTopic, getStatusColor } from "../../../../formaters/solicitations"
import { useNavigate } from "react-router-dom"
import { Button } from "@app/ui"
import { BasicTable } from "../../../../components/Datatable"
import { batteryQuestions, displayQuestions } from "../../../../constants/solicitation-form-questions"
import dayjs from 'dayjs'

export function AvaliableSolicitations() {
  const [avaliableSolicitations, setAvaliableSolicitations] = useState<Solicitation[]>([])
  const navigate = useNavigate()
  const { data, isLoading } = useQuery({
    queryKey: ['get-solicitations'],
    queryFn: GetAvaliableSolicitationsForStore
  })
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'initialDate',
    direction: 'asc',
  })

  useEffect(() => {
    if (!isLoading) {
      setAvaliableSolicitations(formatSolicitations(data))
    }
  }, [isLoading, data])

  const columns: DataTableColumn<Solicitation>[] = [
    {
      accessor: 'phone',
      title: 'Celular',
      render: ({ form }) => {
        return <span className="text-white text-lg font-extrabold">{formatPhoneBrand(form.phoneForm.brand)} - {form.phoneForm.model}</span>
      }
    },
    {
      accessor: 'topic',
      title: 'Raiz do defeito',
      render: ({ form }) => {
        return <span className="text-white text-lg font-extrabold">{formatTopic(form.problemTopic)}</span>
      }
    },
    {
      accessor: 'problem',
      title: 'Defeito',
      render: ({ form }) => {
        let answer: { text: string } = { text: '' }
        if ('battery-A' in form.problemForm) {
          const questionOne = form.problemForm['battery-A']
          answer = batteryQuestions[0].options.filter((item) => item.optionId === questionOne)[0]
        }
        if ('display-A' in form.problemForm) {
          const questionOne = form.problemForm['display-A']
          answer = displayQuestions[0].options.filter((item) => item.optionId === questionOne)[0]
        }
        return <span className="text-white text-lg font-extrabold">{answer.text}</span>
      }
    },

    {
      accessor: 'status',
      title: 'Status da solicitação',
      cellsClassName: 'text-white !text-lg font-extrabold',
      render: ({ status }) => {
        return (
          <span className={`text-${getStatusColor(status)}`}>{status}</span>
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
      render: ({ id }) => {
        return (
          <div className="flex justify-center items-center">
            <Button onClick={() => navigate('/store/solicitation/' + id)} className="btn-outline-primary text-lg">Acessar</Button>
          </div>
        )
      }
    }
  ]

  function onSortChange() {
    if (avaliableSolicitations.length > 0) {
      if (sortStatus.direction === 'asc') {
        avaliableSolicitations.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
      }
      if (sortStatus.direction === 'desc') {
        avaliableSolicitations.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      }
    }
    return setSortStatus
  }

  return (
    <>
      {!isLoading && avaliableSolicitations ? (
        <>
          <BasicTable sortStatus={sortStatus} onSortStatusChange={onSortChange()} columns={columns} records={avaliableSolicitations} title="Problemas para retorno de orçamento">

          </BasicTable>
        </>
      ) : ''}
    </>
  )
}