import { Steps, Text } from "@app/ui";
import { useState } from "react";
import { StepOne } from "./Steps/StepOne";
import { StepTwo } from "./Steps/StepTwo";
import { getStepTwoAnswersByForm, getTopicFormatted } from "../../../../constants/solicitation-form-questions";
import { StepThree } from "./Steps/StepThree";
import { StepFor } from "./Steps/StepFor";
import { FieldValues } from "react-hook-form";
import { StepFive } from "./Steps/StepFive";

export function SolicitationsCreate() {
  const [activeTab, setActiveTab] = useState(1)
  const [topic, setTopic] = useState('')
  const [stepTwoInfos, setStepTwoInfos] = useState<FieldValues>()
  const [stepThreeInfos, setStepThreeInfos] = useState<FieldValues>()
  const [stepFourInfos, setStepFourInfos] = useState<FieldValues>()

  const stepTwoAnswersFormatted = getStepTwoAnswersByForm('battery', stepTwoInfos)

  const handleStepTwoSubmit = (data: FieldValues) => {
    setStepTwoInfos(data);
  };

  const handleStepThreeSubmit = (data: FieldValues) => {
    setStepThreeInfos(data);
  };

  const handleStepFourSubmit = (data: FieldValues) => {
    setStepFourInfos(data);
  };

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
      <div className="flex relative h-full gap-5">
        <div style={{ borderRadius: '10px' }} className="flex flex-col  gap-2 bg-black w-full h-full">
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