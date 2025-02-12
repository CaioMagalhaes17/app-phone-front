import { Button, IconPencil, IconSave, Panel, Text } from "@app/ui";
import { finalQuestions } from "../../../../constants/solicitation-form-questions";
import { formatDeliveryPreference, formatTimePreference, getDeliveryPreferenceColor, getTimePreferenceColor } from "../../../../formaters/solicitations";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { EditSolicitation } from "../../../../api/repair/solicitation/edit-solicitation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

export function FinalForm({ deliveryPreference, timePreference, details, solicitationId, canEdit }: {
  deliveryPreference: string
  timePreference: string
  details: string
  solicitationId: string
  canEdit: boolean
}) {
  const [editMode, setEditMode] = useState(false)
  const { register, handleSubmit } = useForm()
  const { mutateAsync } = useMutation({
    mutationKey: ['edit-solicitation'],
    mutationFn: ({ data, solicitationId }: {
      data: Partial<{
        deliveryPreference: string
        timePreference: string
        details: string
      }>; solicitationId: string
    }) =>
      EditSolicitation({ form: data }, solicitationId)
  });
  const client = useQueryClient()

  function onSave(data: FieldValues) {
    Swal.fire({
      titleText: 'Editar solicitação?',
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
        const response = await mutateAsync({ data: data, solicitationId })
        if (response && response.status == 200) {
          client.refetchQueries({ queryKey: ['get-solicitation'] })
          client.refetchQueries({ queryKey: ['get-solicitations'] })
          Swal.fire({
            titleText: 'Solicitação editada com sucesso!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'Sim',
            padding: '2em',
            customClass: {
              confirmButton: 'btn btn-primary btn-lg m-1',
            },
            buttonsStyling: false,
          })
          setEditMode(false)
        }
      }
    })
  }
  return (
    <>
      {!editMode ? (
        <Panel className="w-full mt-6">
          <div className="flex flex-row">
            <Text className="text-white font-extrabold text-2xl" as="h1">Considerações finais:</Text>
            <div className="mr-auto" />
            {canEdit && (<Button onClick={() => setEditMode(true)} className="btn-primary"><IconPencil /></Button>)}

          </div>
          <div className="flex flex-col mt-6 gap-1 mb-5">
            <Text className="font-extrabold text-lg" as="h1">{finalQuestions[0].question} - <span className={`text-${getTimePreferenceColor(timePreference)}`}>{formatTimePreference(timePreference)}</span></Text>
            <Text className="font-extrabold text-lg" as="h1">{finalQuestions[1].question} - <span className={`text-${getDeliveryPreferenceColor(deliveryPreference)}`}>{formatDeliveryPreference(deliveryPreference)}</span></Text>
            <Text className="font-extrabold text-lg text-white mt-2" as="h1">{finalQuestions[2].question}:</Text>
            <textarea value={details} disabled className="placeholder:text-white-dark w-full rounded-md border px-4 py-2 text-sm font-semibold !outline-none focus:border-primary focus:ring-transparent border-[#17263c] bg-[#121e32] text-white-dark focus:border-primary" />
          </div>
        </Panel>
      ) : (
        <Panel className="w-full mt-6 border border-primary">
          <form onSubmit={handleSubmit(onSave)}>
            <div className="flex flex-row">
              <Text className="text-white font-extrabold text-2xl" as="h1">Considerações finais:</Text>
              <div className="mr-auto" />
              <Button className="btn-primary flex flex-row gap-2"><IconSave />Salvar</Button>
            </div>
            <div className="flex flex-col mt-6 gap-1 mb-5">
              <Text className="font-extrabold text-lg" as="h1">{finalQuestions[0].question} - <select className="form-select rounded bg-black form-select-lg text-white" {...register(finalQuestions[0].questionId)}>{finalQuestions[0].options.map((item) => <option value={item.optionId}>{item.text}</option>)} </select></Text>
              <Text className="font-extrabold text-lg" as="h1">{finalQuestions[1].question} - <select className="form-select rounded bg-black form-select-lg text-white" {...register(finalQuestions[1].questionId)}>{finalQuestions[1].options.map((item) => <option value={item.optionId}>{item.text}</option>)} </select></Text>
              <Text className="font-extrabold text-lg text-white mt-2" as="h1">{finalQuestions[2].question}:</Text>
              <textarea {...register(finalQuestions[2].questionId)} defaultValue={details} className="placeholder:text-white-dark w-full rounded-md border px-4 py-2 text-sm font-semibold !outline-none focus:border-primary focus:ring-transparent border-[#17263c] bg-[#121e32] text-white-dark focus:border-primary" />
            </div>
          </form>
        </Panel>
      )}

    </>
  )
}