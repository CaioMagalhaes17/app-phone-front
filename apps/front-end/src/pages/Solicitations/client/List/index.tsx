import { DataTableColumn, DataTableSortStatus } from "mantine-datatable"
import { BasicTable } from "../../../../components/Datatable"
import { useQuery } from "@tanstack/react-query"
import { GetSolicitations } from "../../../../api/repair/solicitation/get-client-solicitations"
import { Solicitation } from "../../../../types/solicitation"
import { formatPhoneBrand, formatSolicitations, formatTopic, getStatusColor } from "../../../../formaters/solicitations"
import { Button } from "@app/ui"
import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"
import { useEffect, useState } from "react"

export function SolicitationsList() {
  const navigate = useNavigate()
  const { data, isLoading } = useQuery({
    queryKey: ['get-solicitations'],
    queryFn: GetSolicitations
  })

  const [solicitations, setSolicitations] = useState<Solicitation[] | []>([])


  useEffect(() => {
    if (!isLoading && data) return setSolicitations(formatSolicitations(data))
  }, [data, isLoading])
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'createdAt',
    direction: 'desc',
  })
  function onSortChange() {
    if (solicitations.length > 0) {
      if (sortStatus.direction === 'asc') {
        solicitations.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
      }
      if (sortStatus.direction === 'desc') {
        solicitations.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      }
    }
    return setSortStatus
  }

  const columns: DataTableColumn<Solicitation>[] = [
    {
      accessor: 'phone',
      title: 'Celular',
      render: ({ form }) => {
        return <span className="text-dark dark:text-white text-lg font-extrabold">{formatPhoneBrand(form.phoneForm.brand)} - {form.phoneForm.model}</span>
      }
    },
    {
      accessor: 'topic',
      title: 'Raiz do problema',
      render: ({ form }) => {
        return <span className="text-dark dark:text-white text-lg font-extrabold">{formatTopic(form.problemTopic)}</span>
      }
    },

    {
      accessor: 'status',
      title: 'Status da solicitação',
      cellsClassName: 'text-black dark:text-white !text-lg font-extrabold',
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
          <span className={`text-dark dark:text-white`}>{dayjs(createdAt).format("DD/MM/YYYY")}</span>
        )
      }
    },
    {
      accessor: 'actions',
      title: 'Ações',
      render: ({ id }) => {
        return (
          <div className="flex justify-center items-center">
            <Button onClick={() => navigate('/solicitation/' + id)} className="btn-outline-primary text-lg">Acessar</Button>
          </div>
        )
      }
    }
  ]


  return (
    <>
      {!isLoading && (
        <>
          <BasicTable sortStatus={sortStatus} onSortStatusChange={onSortChange()} columns={columns} records={solicitations} title="Suas solicitações">

          </BasicTable>
        </>
      )}
    </>
  )
}