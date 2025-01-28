import { DefaultForm } from "../Forms";
import { DisplayForm } from "../Forms/Display";

export function StepTwo({ topicSelected }: { topicSelected: string }) {
  return (
    <>
      {topicSelected === 'display' && (<DisplayForm />)}
      {topicSelected === 'battery' && (<DefaultForm topicSelected={'battery'} />)}
    </>
  )
}