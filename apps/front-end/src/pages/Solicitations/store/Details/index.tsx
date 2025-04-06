import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { Solicitation } from "../../../../types/solicitation"
import { GetSolicitation } from "../../../../api/repair/solicitation/get-solicitation"
import { Button, HSeparator, IconArrowBackward, IconSmartphone, Panel, Text } from "@app/ui"
import { formatPhoneBrand, formatTopic, getStatusColor } from "../../../../formaters/solicitations"
import { ProblemForm } from "./ProblemForm"
import { PhoneForm } from "./PhoneForm"
import { FinalForm } from "./FinalForm"
import { ReturnBudget } from "./ReturnValueDialog"
import Swal from "sweetalert2"
import { CreateBudget } from "../../../../api/repair/budget/create-budget"
import { GetStoreSolicitationBudgets } from "../../../../api/repair/budget/get-by-store-solicitation"
import { DeleteBudgets } from "../../../../api/repair/budget/delete-budget"
import { SolicitationImages } from "../../../../components/Repair/Solicitations/Details/SolicitationImages"

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
  console.log(budgetData)
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
  const navigate = useNavigate()
  return (
    <>
      <Button onClick={() => navigate(-1)} className="btn-outline-primary flex flex-row gap-2"><IconArrowBackward /> </Button>
      {!isLoading && !budgetLoading && solicitationData ? (
        <div className="max-w-[1200px] mx-auto">
          <Panel className="sombra p-4 rounded-xl">
            <Text className="text-dark dark:text-white font-bold text-3xl flex flex-row gap-5 items-center" as="h1"><IconSmartphone />Formulário do problema</Text>
            <HSeparator className="mb-10" />
            <div className="flex flex-row">
              <div className="flex flex-col gap-2">
                <Text className="text-dark dark:text-white font-bold text-3xl" as="h1">Defeito em <span className="">{formatTopic(solicitationData?.form.problemTopic)}</span></Text>
                <div>
                  <Text className="font-bold text-xl" as="h1">{formatPhoneBrand(solicitationData.form.phoneForm.brand)} - {solicitationData.form.phoneForm.model}</Text>
                  {budgetData.length === 0 && (<Text className={`font-bold text-md mt-2 text-${getStatusColor(solicitationData.status)}`} as="h1">{solicitationData.status}</Text>)}
                </div>
              </div>
              <div className="mr-auto" />
              {budgetData.length === 0 ? (<ReturnBudget handleSave={handleSave} />) :
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
            </div>
            <div className="mt-10 flex flex-row gap-6 w-full">
              <ProblemForm solicitationId={solicitationData.id} topic={solicitationData.form.problemTopic} problemForm={solicitationData.form.problemForm} />
              <PhoneForm solicitationId={solicitationData.id} phoneForm={solicitationData.form.phoneForm} />
            </div>
            <FinalForm solicitationId={solicitationData.id} deliveryPreference={solicitationData.form.deliveryPreference} timePreference={solicitationData.form.timePreference} details={solicitationData.form.details} />
            <HSeparator />
            {solicitationData.form.solicitationImgs.length > 0 && (
              <SolicitationImages images={solicitationData.form.solicitationImgs} />
            )}
          </Panel>
        </div>

      ) : ''}
    </>
  )
}