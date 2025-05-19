/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, HSeparator, IconBill, IconPhone, IconSend, IconSettings, IconUser, IconWarning, Panel, Text } from "@app/ui";
import { TopicForm } from "./TopicForm";
import { useState } from "react";
import { ProblemForm } from "./ProblemForm";
import { PhoneForm } from "./PhoneForm";
import { MapStep } from "./Map";
import { FinalForm } from "./FinalForm";
import { FieldValues, useForm } from "react-hook-form";
import { formatPhoneBrand, formatTimePreference, formatTopic } from "../../../../formaters/solicitations";
import { ProblemTopicType, SolicitationFormProps } from "../../../../types/solicitation";
import { useNavigate, useSearchParams } from "react-router-dom";
import useStore from "../../../../state";

export function SolicitationForm({ createSolicitation, isAuthenticated }: { isAuthenticated: boolean, createSolicitation?: (data: SolicitationFormProps) => Promise<void> }) {
  const stored = localStorage.getItem('partialForm');
  let partialProblemForm
  if (stored) {
    partialProblemForm = JSON.parse(stored)
  }
  console.log(partialProblemForm)
  const [searchParams, setSearchParams] = useSearchParams({
    topic: '',
    directSolicitation: ''
  })
  const { register, watch, formState: { errors }, handleSubmit, setValue, setError } = useForm()
  const [solicitationImgs, setSolicitationImgs] = useState<string[]>([]);
  const navigate = useNavigate()
  function handleSelectTopic(topic: ProblemTopicType) {
    setSearchParams((prev) => {
      prev.set('topic', topic)
      return prev
    })
  }

  async function onSubmit(data: FieldValues) {
    let problemForm: any
    if (searchParams.get('topic') === 'display') {
      problemForm = {
        "display-A": data["display-A"],
        "display-B": data["display-B"],
        "display-C": data["display-C"],
        "display-D": data["display-D"],
        "display-E": data["display-E"],
        "display-F": data["display-F"]
      }
    }
    if (searchParams.get('topic') === 'battery') {
      problemForm = {
        "battery-A": data['battery-A'],
        "battery-B": data['battery-B'],
        "battery-C": data['battery-C'],
        "battery-D": data['battery-D'],
        "battery-E": data['battery-E'],
        "battery-F": data['battery-F'],
      }
    }
    if (searchParams.get('topic') === 'glass') {
      problemForm = {
        "glass-A": data['glass-A'],
        "glass-B": data['glass-B'],
        "glass-C": data['glass-C'],
        "glass-D": data['glass-D'],
        "glass-E": data['glass-E'],
        "glass-F": data['glass-F'],
      }
    }
    if (searchParams.get('topic') === 'button') {
      problemForm = {
        "button-A": data['button-A'],
        "button-B": data['button-B'],
        "button-C": data['button-C'],
        "button-D": data['button-D'],
        "button-E": data['button-E'],
      }
    }
    if (searchParams.get('topic') === 'connectors') {
      problemForm = {
        "connectors-A": data['connectors-A'],
        "connectors-B": data['connectors-B'],
        "connectors-C": data['connectors-C'],
        "connectors-D": data['connectors-D'],
        "connectors-E": data['connectors-E'],
      }
    }
    if (searchParams.get('topic') === 'cam') {
      problemForm = {
        "cam-A": data['cam-A'],
        "cam-B": data['cam-B'],
        "cam-C": data['cam-C'],
        "cam-D": data['cam-D'],
        "cam-E": data['cam-E'],
      }
    }
    if (searchParams.get('topic') === 'water') {
      problemForm = {
        "water-A": data['water-A'],
        "water-B": data['water-B'],
        "water-C": data['water-C'],
        "water-D": data['water-D'],
        "water-E": data['water-E'],
      }
    }
    if (!isAuthenticated) {
      const formData = {
        phoneForm: {
          brand: data.brand,
          model: data.model,
          previousRepair: data.previousRepair,
          originalHardware: data.originalHardware,
          usageTime: data.usageTime
        },
        problemTopic: searchParams.get('topic') as ProblemTopicType,
        problemForm
      };

      localStorage.setItem('partialForm', JSON.stringify(formData));
      navigate('/login?redirect=/solicitations/create?topic=' + searchParams.get('topic') as ProblemTopicType)
    }
    if (createSolicitation) {
      if (data.model === '') {
        setError('model', { type: 'required' })
      }

      await createSolicitation({
        deliveryPreference: data.deliveryPreference,
        details: data.details,
        phoneForm: {
          brand: data.brand,
          model: data.model,
          previousRepair: data.previousRepair,
          originalHardware: data.originalHardware,
          usageTime: data.usageTime
        },
        problemForm,
        problemTopic: searchParams.get('topic') as ProblemTopicType,
        solicitationImgs: solicitationImgs,
        timePreference: data.timePreference,
      })
    }
  }
  const { isMobile } = useStore()
  return (
    <>
      <div className="mb-5 max-w-[1400px] w-full ml-auto mr-auto font-bold ">
        <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-5`}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col max-w-[1000px] gap-10">
            <TopicForm selectedTopic={searchParams.get('topic') || partialProblemForm?.problemTopic} handleSelectTopic={handleSelectTopic} />
            <ProblemForm errors={errors} register={register} topic={searchParams.get('topic') || ''} defaultValue={partialProblemForm?.problemForm} />
            <PhoneForm register={register} watch={watch} errors={errors} setValue={setValue} defaultValue={partialProblemForm?.phoneForm} />
            {
              isAuthenticated ? (
                <>
                  <MapStep />
                  <FinalForm setSolicitationImgs={setSolicitationImgs} solicitationImgs={solicitationImgs} register={register} errors={errors} />
                  <Button type="submit" className="btn-primary flex flex-row gap-5 items-center"><IconSend />Enviar solicitação de conserto</Button>
                </>
              ) : (
                <>
                  <Button type="submit" className="btn-primary flex flex-row gap-5 items-center"><IconUser />Login/Cadastro para continuar</Button>
                </>
              )
            }
          </form>
          <Panel className="sticky top-[10px] self-start sombra bg-white dark:bg-black  text-lg p-4 rounded-xl w-[342px] h-[320px]">
            <Text className="text-3xl text-dark dark:text-white flex flex-row gap-5 items-center" as="h1"><IconBill />Resumo</Text>
            <HSeparator className="mt-2 mb-2" />
            <div className="flex text-dark dark:text-white flex-row items-center gap-2 mb-5">
              <IconSettings />
              Tipo de serviço: {searchParams.get('topic') !== '' && (<span className="font-extrabold">{formatTopic(searchParams.get('topic') as ProblemTopicType)}</span>)}
            </div>
            <div className="flex text-dark dark:text-white flex-row items-center gap-2 mb-5">
              <IconPhone />
              Celular: {<span className="font-extrabold">{partialProblemForm ? formatPhoneBrand(partialProblemForm?.phoneForm.brand) : formatPhoneBrand(watch('brand'))} {partialProblemForm ? partialProblemForm?.phoneForm.model : watch('model')} </span>}
            </div>
            <div className="flex text-dark dark:text-white flex-row items-center gap-2 mb-5">
              <IconWarning />
              Prazo: {<span className="font-extrabold">{formatTimePreference(watch('timePreference'))} </span>}
            </div>
            <div className="flex text-dark dark:text-white flex-row items-center gap-2">
              <IconSend />
              Para: {searchParams.get('directSolicitation') !== '' ? 'Todas as Lojas mais próximas' : 'Nome da loja'}
            </div>
          </Panel>
        </div>
      </div>
    </>
  )
}