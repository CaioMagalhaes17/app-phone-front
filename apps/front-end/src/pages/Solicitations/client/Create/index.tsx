import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateSolicitation } from "../../../../api/repair/solicitation/create-solicitation";
import { BatteryFormType, DisplayFormType, PhoneFormType, ProblemTopicType, SolicitationFormProps } from "../../../../types/solicitation";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { SolicitationForm } from "../../../../components/Repair/Solicitations/Create";

export function SolicitationsCreate() {

  const client = useQueryClient()
  const navigate = useNavigate()
  const { mutateAsync } = useMutation({
    mutationFn: CreateSolicitation,
    mutationKey: ['create-solicitation']
  })


  async function handleSendForm(data: Pick<SolicitationFormProps, 'deliveryPreference' | 'timePreference' | 'details' | 'solicitationImgs'> & {
    problemForm: BatteryFormType | DisplayFormType,
    topic: ProblemTopicType,
    phoneForm: PhoneFormType
  }) {
    Swal.fire({
      titleText: 'Enviar formulário?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
      padding: '2em',
      customClass: {
        confirmButton: 'btn btn-primary btn-lg m-1',
        cancelButton: 'btn btn-danger btn-lg m-1',
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await mutateAsync({
          problemForm: data.problemForm,
          phoneForm: data.phoneForm,
          problemTopic: data.topic,
          deliveryPreference: data.deliveryPreference,
          details: data.details,
          timePreference: data.timePreference,
          solicitationImgs: data.solicitationImgs
        })
        if (response && response.status === 201 || response && response.status === 200) {
          client.refetchQueries({ queryKey: ['get-solicitations'] })
          Swal.fire({
            titleText: 'Solicitação de orçamento criado com sucesso!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'Sim',
            padding: '2em',
            customClass: {
              confirmButton: 'btn btn-primary btn-lg m-1',
            },
            buttonsStyling: false,
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/solicitations')
            }
          })
        }
      }
    })
  }

  const steps = [
    'Reconhecendo o defeito',
    'Detalhes do defeito',
    'Detalhes do aparelho',
    'Mapa',
    'Considerações finais',
  ]

  return (
    <>
      <SolicitationForm steps={steps} handleSendForm={handleSendForm} />
    </>
  )
}