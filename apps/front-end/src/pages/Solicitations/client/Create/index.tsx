import { Steps } from "@app/ui";
import { useState } from "react";
import { StepOne } from "./Steps/StepOne";
import { StepTwo } from "./Steps/StepTwo";
import { StepThree } from "./Steps/StepThree";
import { StepFor } from "./Steps/StepFor";
import { FieldValues } from "react-hook-form";
import { StepFive } from "./Steps/StepFive";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateSolicitation } from "../../../../api/repair/solicitation/create-solicitation";
import { BatteryFormType, DisplayFormType, PhoneFormType, SolicitationFormProps } from "../../../../types/solicitation";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export function SolicitationsCreate() {
  const [activeTab, setActiveTab] = useState(1)
  const [topic, setTopic] = useState<'battery' | 'display'>('battery')
  const [stepTwoInfos, setStepTwoInfos] = useState<DisplayFormType | BatteryFormType>()
  const [stepThreeInfos, setStepThreeInfos] = useState<PhoneFormType>()
  const [stepFourInfos, setStepFourInfos] = useState<Pick<SolicitationFormProps, 'deliveryPreference' | 'timePreference' | 'details'>>()
  const client = useQueryClient()
  const navigate = useNavigate()
  const { mutateAsync } = useMutation({
    mutationFn: CreateSolicitation,
    mutationKey: ['create-solicitation']
  })
  const handleStepTwoSubmit = (data: FieldValues) => {
    if (topic === 'display') {
      setStepTwoInfos({
        "display-A": data['display-A'],
        "display-B": data['display-B'],
        "display-C": data['display-C'],
        "display-D": data['display-D'],
        "display-E": data['display-E'],
        "display-F": data['display-F'],
      });
    }
    if (topic === 'battery') {
      setStepTwoInfos({
        "battery-A": data['battery-A'],
        "battery-B": data['battery-B'],
        "battery-C": data['battery-C'],
        "battery-D": data['battery-D'],
        "battery-E": data['battery-E'],
        "battery-F": data['battery-F'],
      });
    }

  };

  const handleStepThreeSubmit = (data: FieldValues) => {
    setStepThreeInfos({
      brand: data.brand,
      model: data.model,
      originalHardware: data.originalHardware,
      previousRepair: data.previousRepair,
      usageTime: data.usageTime
    });
  };

  const handleStepFourSubmit = async (data: FieldValues) => {
    setStepFourInfos({
      deliveryPreference: data.deliveryPreference,
      details: data.details,
      timePreference: data.timePreference
    });
    await handleSendForm({
      deliveryPreference: data.deliveryPreference,
      details: data.details,
      timePreference: data.timePreference
    })
  };

  async function handleSendForm(data: Pick<SolicitationFormProps, 'deliveryPreference' | 'timePreference' | 'details'>) {
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
      if (result.isConfirmed && stepThreeInfos && stepTwoInfos && topic) {
        const response = await mutateAsync({
          problemForm: stepTwoInfos,
          phoneForm: stepThreeInfos,
          problemTopic: topic,
          deliveryPreference: data.deliveryPreference,
          details: data.details,
          timePreference: data.timePreference
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

  function handleChangeTab(tab: number) {
    return tab
  }

  return (
    <>
      <div className="flex relative h-full gap-5 max-w-[1200px] mx-auto">
        <div style={{ borderRadius: '10px' }} className="flex flex-col gap-2 bg-black w-full h-full">
          <div className="w-full p-2 h-full">
            <Steps handleChangeTab={handleChangeTab} activeTab={activeTab} steps={steps} />
            <div className="border-b border-b-[#323b45] mt-2 w-full" />
            {activeTab === 1 && <StepOne setActiveTab={setActiveTab} topic={topic} setTopic={setTopic} />}
            {activeTab === 2 && <StepTwo stepTwoInfos={stepTwoInfos} onSubmit={handleStepTwoSubmit} setActiveTab={setActiveTab} topicSelected={topic} />}
            {activeTab === 3 && <StepThree stepThreeInfos={stepThreeInfos} onSubmit={handleStepThreeSubmit} setActiveTab={setActiveTab} />}
            {activeTab === 4 && <StepFive setActiveTab={setActiveTab} />}
            {activeTab === 5 && <StepFor onSubmit={handleStepFourSubmit} stepFourInfos={stepFourInfos} setActiveTab={setActiveTab} />}
          </div>
        </div>
      </div>
    </>
  )
}