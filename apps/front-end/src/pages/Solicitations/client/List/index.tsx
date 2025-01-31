import { DataTableColumn } from "mantine-datatable"
import { BasicTable } from "../../../../components/Datatable"
import { useQuery } from "@tanstack/react-query"
import { GetSolicitations } from "../../../../api/repair/solicitation/get-client-solicitations"
import { Solicitation } from "../../../../types/solicitation"
import { formatPhoneBrand, formatSolicitations, formatTopic, getStatusColor } from "../../../../formaters/solicitations"
import { Button } from "@app/ui"
import { useNavigate } from "react-router-dom"

export function SolicitationsList() {
  const navigate = useNavigate()
  const { data, isLoading } = useQuery({
    queryKey: ['get-solicitations'],
    queryFn: GetSolicitations
  })

  const columns: DataTableColumn<Solicitation>[] = [
    {
      accessor: 'topic',
      title: 'Raiz do problema',
      render: ({ form }) => {
        return <span className="text-white text-lg font-extrabold">{formatTopic(form.problemTopic)}</span>
      }
    },
    {
      accessor: 'phone',
      title: 'Celular',
      render: ({ form }) => {
        return <span className="text-white text-lg font-extrabold">{formatPhoneBrand(form.phoneForm.brand)} - {form.phoneForm.model}</span>
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
      accessor: 'actions',
      title: 'Ações',
      render: ({ id }) => {
        return (
          <div className="flex justify-center items-center flex-row gap-2">
            <Button onClick={() => navigate('/solicitation/' + id)} className="btn-primary">Acessar</Button>
            <Button className="btn-outline-danger">Excluir</Button>
          </div>
        )
      }
    }
  ]


  return (
    <>
      {!isLoading && (
        <>
          <BasicTable columns={columns} records={formatSolicitations(data)} title="Suas solicitações">

          </BasicTable>
        </>
      )}
    </>
  )
}