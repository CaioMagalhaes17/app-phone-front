
import { Solicitation } from "../../../../types/solicitation"
import { useQuery } from "@tanstack/react-query"
import { GetAvaliableSolicitationsForStore } from "../../../../api/repair/solicitation/avaliable-for-store"
import { useEffect, useState } from "react"
import { formatSolicitations } from "../../../../formaters/solicitations"
import { Panel, Text } from "@app/ui"
import { SolicitationRow } from "./components/SolicitationRow"

export function AvaliableSolicitations() {
  const [avaliableSolicitations, setAvaliableSolicitations] = useState<Solicitation[]>([])
  const { data, isLoading } = useQuery({
    queryKey: ['get-solicitations'],
    queryFn: GetAvaliableSolicitationsForStore
  })

  useEffect(() => {
    if (!isLoading && data) {
      const formattedSolicitation = formatSolicitations(data)
      setAvaliableSolicitations([...formattedSolicitation].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ))
    }
  }, [isLoading, data])

  function onOrderChange(value: string) {
    if (value === 'asc') {
      setAvaliableSolicitations([...avaliableSolicitations].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      ))
    }
    if (value === 'desc') {
      setAvaliableSolicitations([...avaliableSolicitations].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ))
    }
  }

  return (
    <>
      {!isLoading && avaliableSolicitations ? (
        <>
          <div className="flex justify-center">
            <Panel className="font-extrabold  max-w-[1200px] w-full">
              <div className="flex flex-row">
                <Text className="text-3xl text-dark dark:text-white" as="h1">Defeitos esperando retorno</Text>
                <div className="ml-auto" />
                <select onClick={(e) => onOrderChange(e.currentTarget.value)} className="form-select !border-none dark:bg-black form-select-lg text-dark dark:text-white">
                  <option value="desc">
                    Mais recentes
                  </option>
                  <option value="asc">
                    Mais antigos
                  </option>
                </select>
              </div>
              <div className="border-b border-b-[#323b45] mt-5 mt-10" />
              {avaliableSolicitations.length > 0 ?
                avaliableSolicitations.map((solicitation) => <SolicitationRow solicitation={solicitation} />) :
                (<div className="mt-10 h-[200px] "><Text className="text-3xl" as="span">Não foram encontrados registros</Text></div>)
              }
            </Panel>
          </div>
        </>
      ) : ''}
    </>
  )
}