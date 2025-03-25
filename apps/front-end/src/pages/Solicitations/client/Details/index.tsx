import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, IconArrowBackward, IconDollarSignCircle, IconStore, IconX, Panel, Text } from "@app/ui";
import { formatPhoneBrand, formatTopic, getStatusColor } from "../../../../formaters/solicitations";
import Swal from "sweetalert2";
import { EditSolicitation } from "../../../../api/repair/solicitation/edit-solicitation";
import { ProblemForm } from "./ProblemForm";
import { PhoneForm } from "./PhoneForm";
import { FinalForm } from "./FinalForm";
import { useEffect, useState } from "react";
import { CANCELED_SOLICITATION_STATUS } from "../../../../constants/solicitation-status";
import { Solicitation } from "../../../../types/solicitation";
import { SolicitationImages } from "../../../../components/Repair/Solicitations/Details/SolicitationImages";
import { useGetSolicitationById } from "../../../../hooks/solicitation/useGetSolicitationById";
import { useGetBudgetBySolicitationId } from "../../../../hooks/budgets/useGetBudgetBySolicitationId";

export function SolicitationDetails() {
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

  const navigate = useNavigate()
  return (
    <>
      {!isLoading && solicitationData ? (
        <>
          <Button onClick={() => navigate(-1)} className="btn-outline-primary flex flex-row gap-2"><IconArrowBackward /> </Button>
          <div className="max-w-[1200px] mx-auto">
            <div className="flex gap-5 flex-row">
              <Text className="text-black dark:text-white font-extrabold text-5xl" as="h1">Defeito em <span className="underline">{formatTopic(solicitationData?.form.problemTopic)}</span></Text>
              <div className="mr-auto" />
              {canCancelSolicitation() && (
                <Button onClick={() => handleDeleteSolicitation()} className="btn-danger flex flex-row gap-2"><IconX />Cancelar solicitação de conserto</Button>
              )}
            </div>
            <Text className="font-extrabold text-xl" as="h1">{formatPhoneBrand(solicitationData.form.phoneForm.brand)} - {solicitationData.form.phoneForm.model}</Text>
            <Text className={`font-extrabold text-md mt-2 text-${getStatusColor(solicitationData.status)}`} as="h1">{solicitationData.status}</Text>
            <div className="mt-10 flex flex-row gap-6 w-full">
              <ProblemForm canEdit={canEdit} solicitationId={id} topic={solicitationData.form.problemTopic} problemForm={solicitationData.form.problemForm} />
              <PhoneForm canEdit={canEdit} solicitationId={id} phoneForm={solicitationData.form.phoneForm} />
            </div>
            <FinalForm canEdit={canEdit} solicitationId={id} deliveryPreference={solicitationData.form.deliveryPreference} timePreference={solicitationData.form.timePreference} details={solicitationData.form.details} />
            <SolicitationImages images={solicitationData.form.solicitationImgs} />
            {budgets.length > 0 && !budgetsLoading ?
              (
                <Panel className="font-extrabold mt-6 max-w-[1200px] w-full">
                  <div className="flex flex-row">
                    <Text className="text-3xl text-black dark:text-white" as="h1">Orçamentos</Text>
                    <div className="ml-auto" />
                  </div>
                  <div className="border-b border-b-[#323b45] mt-5 mt-10" />
                  {budgets.map((budget) => {
                    return (
                      <>
                        <div className="flex flex-row items-center gap-5">
                          <div className="flex flex-col gap-2 mt-5 ">
                            <img width={'100px'} height={'100px'} src={budget.storeProfile.profileImg} className="rounded-3xl" />
                          </div>
                          <div className="flex flex-col">
                            <Text className="text-dark dark:text-white text-lg" as="span">{budget.storeProfile.name}</Text>
                            <Text className="text-green" as="span">{budget.startValue} - {budget.endValue}</Text>
                          </div>
                          <div className="ml-auto">
                            <Link target="_blank" rel="noopener noreferrer" to={`/store-profile/${budget.storeProfile.id}`} className="btn-primary btn flex flex-row gap-2"><IconStore />Acessar perfil da loja</Link>
                          </div>
                          <div className="">
                            <Button className="btn-outline-green flex flex-row gap-2"><IconDollarSignCircle />Escolher orçamento</Button>
                          </div>
                        </div>
                        <div className="border-b border-b-[#323b45] mt-5 mt-10" />
                      </>
                    )
                  })}
                </Panel>
              )
              : ''}
          </div>
        </>
      ) : ''}
    </>
  )
}