import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { GetSolicitation } from "../../../../api/repair/solicitation/get-solicitation";
import { Button, IconDollarSignCircle, Panel, Text } from "@app/ui";
import { CANCELED_SOLICITATION_STATUS, Solicitation } from "../../../../types/solicitation";
import { formatPhoneBrand, formatTopic, getStatusColor } from "../../../../formaters/solicitations";
import Swal from "sweetalert2";
import { EditSolicitation } from "../../../../api/repair/solicitation/edit-solicitation";
import { ProblemForm } from "./ProblemForm";
import { PhoneForm } from "./PhoneForm";
import { FinalForm } from "./FinalForm";
import { GetBudgetsbySolicitation } from "../../../../api/repair/budget/get-budget-by-solicitation";
import { useEffect, useState } from "react";
import { BudgetType } from "../../../../types/budget";
import { formatBudgetsFromApi } from "../../../../formaters/budget";

export function SolicitationDetails() {
  const [budgets, setBudgets] = useState<BudgetType[] | []>([])
  const [canEdit, setCanEdit] = useState<boolean>(true)
  const { id } = useParams() as { id: string }
  const { data: solicitationData, isLoading } = useQuery<Solicitation>({
    queryKey: ['get-solicitation'],
    queryFn: () => GetSolicitation(id)
  })

  const { data: budgetsData, isLoading: budgetsLoading } = useQuery({
    queryKey: ['get-budgets'],
    queryFn: () => GetBudgetsbySolicitation(id)
  })

  useEffect(() => {
    if (!budgetsLoading) {
      setBudgets(formatBudgetsFromApi(budgetsData))
      if (budgetsData.length > 0) {
        return setCanEdit(false)
      }
      return setCanEdit(true)
    }
  }, [budgetsData, budgetsLoading])

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
      {!isLoading && solicitationData ? (
        <>
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-row">
              <Text className="text-white font-extrabold text-5xl" as="h1">Defeito em <span className="underline">{formatTopic(solicitationData?.form.problemTopic)}</span></Text>
              <div className="mr-auto" />
              {canCancelSolicitation() && (
                <Button onClick={() => handleDeleteSolicitation()} className="btn-danger">Cancelar solicitação de conserto</Button>
              )}
            </div>
            <Text className="font-extrabold text-xl" as="h1">{formatPhoneBrand(solicitationData.form.phoneForm.brand)} - {solicitationData.form.phoneForm.model}</Text>
            <Text className={`font-extrabold text-md mt-2 text-${getStatusColor(solicitationData.status)}`} as="h1">{solicitationData.status}</Text>
            <div className="mt-10 flex flex-row gap-6 w-full">
              <ProblemForm canEdit={canEdit} solicitationId={id} topic={solicitationData.form.problemTopic} problemForm={solicitationData.form.problemForm} />
              <PhoneForm canEdit={canEdit} solicitationId={id} phoneForm={solicitationData.form.phoneForm} />
            </div>
            <FinalForm canEdit={canEdit} solicitationId={id} deliveryPreference={solicitationData.form.deliveryPreference} timePreference={solicitationData.form.timePreference} details={solicitationData.form.details} />
            {budgets.length > 0 && !budgetsLoading ?
              (
                <Panel className="font-extrabold mt-6 max-w-[1200px] w-full">
                  <div className="flex flex-row">
                    <Text className="text-3xl text-white" as="h1">Orçamentos</Text>
                    <div className="ml-auto" />
                  </div>
                  <div className="border-b border-b-[#323b45] mt-5 mt-10" />
                  {budgets.map((budget) => {
                    return (
                      <>
                        <div className="flex flex-row items-center gap-5">
                          <div className="flex flex-col gap-2 mt-5 ">
                            <img width={'100px'} height={'100px'} src="https://avatars.githubusercontent.com/u/73131798?v=4" className="rounded-3xl" />
                          </div>
                          <div className="flex flex-col">
                            <Text className="text-white text-lg" as="span">{budget.storeProfile.name}</Text>
                            <Text className="text-success" as="span">{budget.startValue} - {budget.endValue}</Text>
                          </div>
                          <div className="ml-auto">
                            <Link to={`/store/profile/${budget.storeProfile.id}`} className="btn-outline-primary btn">Acessar perfil da loja</Link>
                          </div>
                          <div className="">
                            <Button className="btn-outline-success flex flex-row gap-2"><IconDollarSignCircle />Escolher orçamento</Button>
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