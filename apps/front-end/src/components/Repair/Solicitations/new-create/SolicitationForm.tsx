/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, HSeparator, IconBill, IconPhone, IconSend, IconSettings, IconWarning, Panel, Text } from "@app/ui";
import { TopicForm } from "./TopicForm";
import { useState } from "react";
import { ProblemForm } from "./ProblemForm";
import { getQuestionsByTopic } from "../../../../constants/solicitation-form-questions";
import { PhoneForm } from "./PhoneForm";
import { MapStep } from "./Map";
import { FinalForm } from "./FinalForm";
import { FieldValues, useForm } from "react-hook-form";
import { formatPhoneBrand, formatTimePreference, formatTopic } from "../../../../formaters/solicitations";
import { ProblemTopicType, SolicitationFormProps } from "../../../../types/solicitation";
import { useSearchParams } from "react-router-dom";

export function SolicitationForm({ createSolicitation }: { createSolicitation: (data: SolicitationFormProps) => Promise<void> }) {

  const [searchParams, setSearchParams] = useSearchParams({
    topic: '',
  })
  const questions = getQuestionsByTopic(searchParams.get('topic') || 'battery')
  const { register, watch, formState: { errors }, handleSubmit, setValue, setError } = useForm()
  const [solicitationImgs, setSolicitationImgs] = useState<string[]>([]);

  function handleSelectTopic(topic: ProblemTopicType) {
    setSearchParams((prev) => {
      prev.set('topic', topic)
      return prev
    })
  }
  async function onSubmit(data: FieldValues) {
    if (data.model === '') {
      setError('model', { type: 'required' })
    }
    let problemForm: any
    console.log()
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

  return (
    <>
      <div className="mb-5 max-w-[1400px] w-full ml-auto mr-auto font-bold ">
        <div className="flex flex-row gap-5">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[1000px] gap-10">
            <TopicForm selectedTopic={searchParams.get('topic') || ''} handleSelectTopic={handleSelectTopic} />
            <ProblemForm errors={errors} register={register} topic={searchParams.get('topic') || ''} questions={questions} />
            <PhoneForm register={register} watch={watch} errors={errors} setValue={setValue} />
            <MapStep />
            <FinalForm setSolicitationImgs={setSolicitationImgs} solicitationImgs={solicitationImgs} register={register} errors={errors} />
            <Button type="submit" className="btn-primary flex flex-row gap-5 items-center"><IconSend />Enviar solicitação de conserto</Button>
          </form>
          <Panel className="sticky top-[10px] self-start sombra bg-white dark:bg-black  text-lg p-4 rounded-xl w-[400px] h-[220px]">
            <Text className="text-3xl text-dark dark:text-white flex flex-row gap-5 items-center" as="h1"><IconBill />Resumo</Text>
            <HSeparator className="mt-2 mb-2" />
            <div className="flex text-dark dark:text-white flex-row items-center gap-2 mb-5">
              <IconSettings />
              Tipo de serviço: {searchParams.get('topic') !== '' && (<span className="font-extrabold">{formatTopic(searchParams.get('topic') as ProblemTopicType)}</span>)}
            </div>
            <div className="flex text-dark dark:text-white flex-row items-center gap-2 mb-5">
              <IconPhone />
              Celular: {<span className="font-extrabold">{formatPhoneBrand(watch('brand'))} {watch('model')} </span>}
            </div>
            <div className="flex text-dark dark:text-white flex-row items-center gap-2">
              <IconWarning />
              Prazo: {<span className="font-extrabold">{formatTimePreference(watch('timePreference'))} </span>}
            </div>
          </Panel>
        </div>
      </div>
    </>
  )
}