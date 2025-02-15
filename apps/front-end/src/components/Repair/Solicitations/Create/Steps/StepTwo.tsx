import { FieldValues } from "react-hook-form";
import { DefaultForm } from "../Problem-Forms";
import { DisplayForm } from "../Problem-Forms/Display";

export function ProblemFormStep({ onSubmit, topicSelected, setActiveTab, stepTwoInfos }: { stepTwoInfos?: FieldValues, onSubmit: (data: FieldValues) => void, topicSelected: string, setActiveTab: React.Dispatch<React.SetStateAction<number>> }) {
  return (
    <>
      {topicSelected === 'display' && (<DisplayForm onSubmit={onSubmit} stepTwoInfos={stepTwoInfos} setActiveTab={setActiveTab} />)}
      {topicSelected === 'battery' && (<DefaultForm onSubmit={onSubmit} stepTwoInfos={stepTwoInfos} setActiveTab={setActiveTab} topicSelected={'battery'} />)}
    </>
  )
}