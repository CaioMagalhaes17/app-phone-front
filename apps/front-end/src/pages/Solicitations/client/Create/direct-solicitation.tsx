import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BatteryFormType, DisplayFormType, PhoneFormType, ProblemTopicType, SolicitationFormProps } from "../../../../types/solicitation";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { SolicitationForm } from "../../../../components/Repair/Solicitations/Create";
import { CreateDirectSolicitation } from "../../../../api/repair/solicitation/create-direct-solicitation";
import { getStoreProfileById } from "../../../../api/user/store/get-profile-by-id";
import { useEffect, useState } from "react";
import { StoreProfileType } from "../../../../types/store-profile";

export function DirectSolicitationsCreate() {
  const { id } = useParams() as { id: string }
  const client = useQueryClient()
  const navigate = useNavigate()
  const [storeInfos, setStoreInfos] = useState<StoreProfileType & { location: { latitude: number, longitude: number } }>()
  const { mutateAsync } = useMutation({
    mutationFn: ({ id, props }: { id: string, props: SolicitationFormProps }) => CreateDirectSolicitation(id, props),
    mutationKey: ['create-solicitation']
  })

  console.log('NIGGERNIGGER',)

  const { data: profileData, isLoading } = useQuery({
    queryKey: ['get-profile'],
    queryFn: () => getStoreProfileById(id)
  })
  console.log(profileData)
  useEffect(() => {
    if (!isLoading) return setStoreInfos(profileData)
  }, [isLoading, profileData])


  async function handleSendForm(data: Pick<SolicitationFormProps, 'deliveryPreference' | 'timePreference' | 'details'> & {
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
          id,
          props: {
            problemForm: data.problemForm,
            phoneForm: data.phoneForm,
            problemTopic: data.topic,
            deliveryPreference: data.deliveryPreference,
            details: data.details,
            timePreference: data.timePreference
          }
        }
        )
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
      {!isLoading && storeInfos ? (
        <SolicitationForm steps={steps} handleSendForm={handleSendForm} customMap={true} storeProfile={storeInfos} />
      ) : ''}
    </>
  )
}