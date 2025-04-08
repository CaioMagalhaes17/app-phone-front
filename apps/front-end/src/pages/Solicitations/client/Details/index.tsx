import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import Swal from "sweetalert2";
import { EditSolicitation } from "../../../../api/repair/solicitation/edit-solicitation";

import { useEffect, useState } from "react";
import { CANCELED_SOLICITATION_STATUS } from "../../../../constants/solicitation-status";
import { Solicitation } from "../../../../types/solicitation";
import { useGetSolicitationById } from "../../../../hooks/solicitation/useGetSolicitationById";
import { useGetBudgetBySolicitationId } from "../../../../hooks/budgets/useGetBudgetBySolicitationId";
import { SolicitationDetailsComponent } from "../../../../components/Repair/Solicitations/Details";
import useStore from "../../../../state";

export function SolicitationDetails() {
  const { clientInfos } = useStore()
  const [canEdit, setCanEdit] = useState<boolean>(true)
  const { id } = useParams() as { id: string }
  const { isLoading, solicitationData } = useGetSolicitationById(id)
  const { budgets, budgetsLoading } = useGetBudgetBySolicitationId(id)
  useEffect(() => {
    if (!budgetsLoading) {
      if (budgets.length > 0) {
        return setCanEdit(false)
      }
      return setCanEdit(true)
    }
  }, [budgets, budgetsLoading])

  useEffect(() => {

  },)

  const { mutateAsync } = useMutation({
    mutationKey: ['edit-solicitation'],
    mutationFn: ({ data, id }: { data: Partial<Solicitation>; id: string }) =>
      EditSolicitation(data, id)
  });

  const client = useQueryClient()

  async function handleDeleteSolicitation() {
    Swal.fire({
      titleText: 'Cancelar solicitação?',
      text: 'Sua solicitação será cancelada e ficará marcada para exclusão permanente em 15 dias.',
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
        const response = await mutateAsync({ data: { status: CANCELED_SOLICITATION_STATUS }, id })
        if (response && response.status == 200) {
          client.refetchQueries({ queryKey: ['get-solicitation'] })
          client.refetchQueries({ queryKey: ['get-solicitations'] })
          Swal.fire({
            titleText: 'Solicitação cancelada com sucesso!',
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

  function canCancelSolicitation() {
    if (solicitationData && solicitationData.status !== CANCELED_SOLICITATION_STATUS) {
      return true
    }
    return false
  }

  return (
    <>
      {!isLoading && solicitationData && solicitationData.form ? (
        <>
          <SolicitationDetailsComponent
            canCancelSolicitation={canCancelSolicitation()}
            budgets={budgets}
            budgetsLoading={budgetsLoading}
            canEdit={canEdit}
            handleDeleteSolicitation={handleDeleteSolicitation}
            isOwner={solicitationData.clientProfile.id === clientInfos.id}
            solicitationData={solicitationData}
            isStore={false}
            solicitationId={id}
          />
        </>
      ) : ''}
    </>
  )
}