import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { GetSolicitation } from "../../../../api/repair/solicitation/get-solicitation";
import { Button, Text } from "@app/ui";
import { CANCELED_SOLICITATION_STATUS, Solicitation } from "../../../../types/solicitation";
import { formatPhoneBrand, formatTopic, getStatusColor } from "../../../../formaters/solicitations";
import Swal from "sweetalert2";
import { EditSolicitation } from "../../../../api/repair/solicitation/edit-solicitation";
import { ProblemForm } from "./ProblemForm";
import { PhoneForm } from "./PhoneForm";
import { FinalForm } from "./FinalForm";

export function SolicitationDetails() {
  const { id } = useParams() as { id: string }
  const { data: solicitationData, isLoading } = useQuery<Solicitation>({
    queryKey: ['get-solicitation'],
    queryFn: () => GetSolicitation(id)
  })


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
            <ProblemForm solicitationId={id} topic={solicitationData.form.problemTopic} problemForm={solicitationData.form.problemForm} />
            <PhoneForm solicitationId={id} phoneForm={solicitationData.form.phoneForm} />
          </div>
          <FinalForm solicitationId={id} deliveryPreference={solicitationData.form.deliveryPreference} timePreference={solicitationData.form.timePreference} details={solicitationData.form.details} />
        </div>
      ) : ''}
    </>
  )
}