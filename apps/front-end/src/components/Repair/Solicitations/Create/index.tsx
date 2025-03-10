import { Button, IconArrowBackward, Panel, Steps } from "@app/ui";
import { useState } from "react";
import { TopicFormStep } from "./Steps/StepOne";
import { ProblemFormStep, } from "./Steps/StepTwo";
import { PhoneFormStep, } from "./Steps/StepThree";
import { FinalsQuestions, } from "./Steps/StepFor";
import { FieldValues } from "react-hook-form";
import { MapStep, } from "./Steps/StepFive";

import { BatteryFormType, DisplayFormType, PhoneFormType, ProblemTopicType, SolicitationFormProps } from "../../../../types/solicitation";
import { StoreProfileType } from "../../../../types/store-profile";
import DirectSolicitationMap from "./direct-solicitation/Map";
import { useNavigate } from "react-router-dom";

export interface SolicitationsCreateProps {
  steps: string[]
  handleSendForm: (data: Pick<SolicitationFormProps, 'deliveryPreference' | 'timePreference' | 'details' | 'solicitationImages'> & {
    problemForm: BatteryFormType | DisplayFormType,
    topic: ProblemTopicType,
    phoneForm: PhoneFormType
  }) => void
  customMap?: boolean
  storeProfile?: StoreProfileType & { location: { latitude: number, longitude: number } }

}
export function SolicitationForm({ steps, handleSendForm, customMap, storeProfile }: SolicitationsCreateProps) {
  const [activeTab, setActiveTab] = useState(1)
  const [topic, setTopic] = useState<'battery' | 'display'>('battery')
  const [stepTwoInfos, setStepTwoInfos] = useState<DisplayFormType | BatteryFormType>()
  const [stepThreeInfos, setStepThreeInfos] = useState<PhoneFormType>()
  const [stepFourInfos, setStepFourInfos] = useState<Pick<SolicitationFormProps, 'deliveryPreference' | 'timePreference' | 'details'>>()

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

  const handleStepFourSubmit = async (data: FieldValues, images: string[]) => {
    setStepFourInfos({
      deliveryPreference: data.deliveryPreference,
      details: data.details,
      timePreference: data.timePreference
    });
    if (stepTwoInfos && stepThreeInfos && topic)
      await handleSendForm({
        problemForm: stepTwoInfos,
        phoneForm: stepThreeInfos,
        topic: topic,
        deliveryPreference: data.deliveryPreference,
        details: data.details,
        timePreference: data.timePreference,
        solicitationImages: images
      })
  };

  function handleChangeTab(tab: number) {
    return tab
  }

  const navigate = useNavigate()
  return (
    <>
      <Button onClick={() => navigate(-1)} className="btn-outline-primary flex flex-row gap-2"><IconArrowBackward /></Button>
      <div className="flex relative h-full gap-5 max-w-[1200px] mx-auto">
        <Panel style={{ borderRadius: '10px' }} className="flex flex-col gap-2 w-full h-full">
          <div className="w-full p-2 h-full">
            <Steps handleChangeTab={handleChangeTab} activeTab={activeTab} steps={steps} />
            <div className="border-b border-b-[#323b45] mt-2 w-full" />
            {activeTab === 1 && <TopicFormStep setActiveTab={setActiveTab} topic={topic} setTopic={setTopic} />}
            {activeTab === 2 && <ProblemFormStep stepTwoInfos={stepTwoInfos} onSubmit={handleStepTwoSubmit} setActiveTab={setActiveTab} topicSelected={topic} />}
            {activeTab === 3 && <PhoneFormStep stepThreeInfos={stepThreeInfos} onSubmit={handleStepThreeSubmit} setActiveTab={setActiveTab} />}
            {activeTab === 4 && (
              customMap && storeProfile ? (<DirectSolicitationMap setActiveTab={setActiveTab} storeProfile={storeProfile} />) : (<MapStep setActiveTab={setActiveTab} />)
            )}
            {activeTab === 5 && <FinalsQuestions onSubmit={handleStepFourSubmit} stepFourInfos={stepFourInfos} setActiveTab={setActiveTab} />}
          </div>
        </Panel>
      </div>
    </>
  )
}