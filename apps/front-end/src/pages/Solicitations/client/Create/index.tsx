import Swal from "sweetalert2";
import { SolicitationForm } from "../../../../components/Repair/Solicitations/new-create/SolicitationForm";
import { useCreateSolicitation } from "../../../../hooks/solicitation/useCreateSolicitation";
import { SolicitationFormProps } from "../../../../types/solicitation";
import { useState } from "react";
import { HSeparator, IconSend, Text } from "@app/ui";
import { AfterCreated } from "../../../../components/Repair/Solicitations/new-create/AfterCreated";

export function CreateSolicitation() {
  const { mutateAsync } = useCreateSolicitation()
  const [isFinished, setIsFinished] = useState(false)
  const [solicitationId, setSolicitationId] = useState('')

  async function createSolicitation(data: SolicitationFormProps) {
    const response = await mutateAsync(data)
    if (response && response.status == 201) {
      setSolicitationId(response.data.id)
      setIsFinished(true)
      Swal.fire({
        titleText: 'Solicitação criada com sucesso!',
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'OK!',
        padding: '2em',
        customClass: {
          confirmButton: 'btn btn-primary btn-lg m-1',
        },
        buttonsStyling: false,
      })

    }
  }

  return (
    <>

      <div className="p-4">

        {isFinished ? (
          <AfterCreated solicitationId={solicitationId} />
        ) : (
          <>
            <div className="max-w-[1400px] mr-auto ml-auto">
              <Text className="text-3xl text-dark dark:text-white flex flex-row gap-5 items-center font-bold" as="h1"><IconSend />Solicitar Conserto</Text>
              <HSeparator className="mb-5 mt-2" />
            </div>
            <SolicitationForm isAuthenticated={true} createSolicitation={createSolicitation} />
          </>
        )}
      </div>
    </>

  )
}