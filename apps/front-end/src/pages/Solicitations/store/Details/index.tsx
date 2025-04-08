import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { Solicitation } from "../../../../types/solicitation"
import { GetSolicitation } from "../../../../api/repair/solicitation/get-solicitation"
import { Button, Panel, Text } from "@app/ui"

import { ReturnBudget } from "./ReturnValueDialog"
import Swal from "sweetalert2"
import { CreateBudget } from "../../../../api/repair/budget/create-budget"
import { GetStoreSolicitationBudgets } from "../../../../api/repair/budget/get-by-store-solicitation"
import { DeleteBudgets } from "../../../../api/repair/budget/delete-budget"
import { SolicitationDetailsComponent } from "../../../../components/Repair/Solicitations/Details"

export function StoreSolicitationDetails() {
  const { id } = useParams() as { id: string }
  const client = useQueryClient()
  const { data: solicitationData, isLoading } = useQuery<Solicitation>({
    queryKey: ['get-solicitation', id],
    queryFn: () => GetSolicitation(id)
  })

  const { data: budgetData, isLoading: budgetLoading } = useQuery({
    queryKey: ['get-budget', id],
    queryFn: () => GetStoreSolicitationBudgets(id)
  })

  const { mutateAsync } = useMutation({
    mutationKey: ['return-budget'],
    mutationFn: CreateBudget
  })

  const { mutateAsync: deleteBudget } = useMutation({
    mutationKey: ['delete-budget'],
    mutationFn: DeleteBudgets
  })

  async function handleDeleteBudget() {
    Swal.fire({
      titleText: 'Excluir Orçamento?',
      text: 'Essa ação é irreversível',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      padding: '2em',
      customClass: {
        confirmButton: 'btn btn-primary btn-lg m-1',
        cancelButton: 'btn btn-danger btn-lg m-1',
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteBudget(budgetData[0]._id)
        if (response && response.status == 200) {
          client.refetchQueries({ queryKey: ['get-budget'] })
          client.refetchQueries({ queryKey: ['get-solicitation'] })
          client.refetchQueries({ queryKey: ['get-solicitations'] })

          Swal.fire({
            titleText: 'Orçamento excluido com sucesso!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'Sim',
            padding: '2em',
            customClass: {
              confirmButton: 'btn btn-primary btn-lg m-1',
            },
            buttonsStyling: false,
          })

        }
      }
    })
  }

  async function handleSave({ startValue, endValue, details, estimatedTime }: { startValue: string, endValue: string, estimatedTime: string, details?: string }) {
    const closeBtn = document.getElementById('closeModal')
    const openBtn = document.getElementById('openModal')
    closeBtn?.click()
    Swal.fire({
      titleText: 'Enviar orçamento?',
      text: 'Os valores não podem ser alterados.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      padding: '2em',
      customClass: {
        confirmButton: 'btn btn-primary btn-lg m-1',
        cancelButton: 'btn btn-danger btn-lg m-1'
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.isDismissed) return openBtn?.click()
      if (result.isConfirmed) {
        const response = await mutateAsync({ startValue, endValue, details, estimatedTime, solicitationId: id })
        if (response && response.status == 201) {
          client.refetchQueries({ queryKey: ['get-solicitation'] })
          client.refetchQueries({ queryKey: ['get-solicitations'] })
          client.refetchQueries({ queryKey: ['get-budget'] })
          Swal.fire({
            titleText: 'Orçamento enviado com sucesso!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'Ok',
            padding: '2em',
            customClass: {
              confirmButton: 'btn btn-primary btn-lg m-1',
            },
            buttonsStyling: false,
          })
        }
      }
    })
  }

  return (
    <>

      {!isLoading && !budgetLoading && solicitationData ? (
        <SolicitationDetailsComponent isOwner={false} isStore={true} storeBudget={budgetData.length === 0 ? (<ReturnBudget handleSave={handleSave} />) :
          <Panel className="bg-whte rounded-md p-5 sombra flex flex-col font-bold gap-2 h-full w-[500px]">
            <div className="flex flex-row">
              <Text className="text-lg  text-dark dark:text-white" as="span">Orçamento retornado</Text>
              <div className="mr-auto" />
              <Button onClick={() => handleDeleteBudget()} className="btn-danger">Excluir orçamento</Button>
            </div>
            <Text className="text-lg flex flex-row gap-5 text-green" as="span">{budgetData[0].props.startValue} <span className="text-black dark:text-white">até</span> {budgetData[0].props.endValue}</Text>
            <textarea value={budgetData[0].props.details} disabled className="placeholder:text-white-dark w-full h-full rounded-md border px-4 py-2 text-sm font-semibold !outline-none focus:border-primary focus:ring-transparent border-[#17263c] dark:bg-[#121e32] text-dark dark:text-white-dark focus:border-primary" />
          </Panel>
        }
          solicitationId={id}
          solicitationData={solicitationData}
        />

      ) : ''}
    </>
  )
}