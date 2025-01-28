import { Button, Steps, Text } from "@app/ui";
import { useState } from "react";
import { StepOne } from "./Steps/StepOne";
import { StepTwo } from "./Steps/StepTwo";
import { getTopicFormatted } from "../../../../constants/solicitation-form-questions";

export function SolicitationsCreate() {
  const [activeTab, setActiveTab] = useState(1)
  const [topic, setTopic] = useState('')

  const steps = [
    'Reconhecendo o defeito',
    'Detalhes do defeito',
    'Detalhes do aparelho',
  ]

  function handleChangeTab(tab: number) {
    setActiveTab(tab)
  }

  function isNextDisabled() {
    if (activeTab === 1 && topic === '') {
      return true
    }
    return false
  }

  return (
    <>
      <div className="flex relative h-full gap-5">
        <div style={{ borderRadius: '10px' }} className="max-w-xs flex flex-col items-center gap-2 bg-black w-[420px]">
          <Text className="mt-2 font-extrabold text-white text-xl" as="h1">Resumo da solicitação</Text>
          <div className="border-b border-b-[#323b45] mt-2 w-[90%]" />
          <div className="flex justify-between">
            <Text className="text-lg font-extrabold" as="span">Raiz do defeito:</Text>
            <Text className="ml-5 text-lg font-extrabold text-[#23d754]" as="span">{getTopicFormatted(topic)}</Text>
          </div>
        </div>
        <div style={{ borderRadius: '10px' }} className="flex flex-col  gap-2 bg-black w-full">
          <div className="w-full p-2">
            <Steps handleChangeTab={handleChangeTab} activeTab={activeTab} steps={steps} />
            <div className="border-b border-b-[#323b45] mt-2 w-full" />
            {activeTab === 1 && <StepOne topic={topic} setTopic={setTopic} />}
            {activeTab === 2 && <StepTwo topicSelected={topic} />}
            <div className="bottom-0" />
            <div className="flex p-6 relative justify-between mt-20 w-full">
              <Button disabled={activeTab === 1} onClick={() => setActiveTab(activeTab - 1)} className="btn-primary">Voltar</Button>
              <Button onClick={() => setActiveTab(activeTab + 1)} disabled={isNextDisabled()} className="btn-primary">Próximo</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}