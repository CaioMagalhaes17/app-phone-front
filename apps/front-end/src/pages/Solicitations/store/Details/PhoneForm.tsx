import { Panel, Text } from "@app/ui";
import { formatOriginalHardwareAnswer, formatPhoneBrand, formatPreviousRepair, formatUsageTime, getAnswerColor } from "../../../../formaters/solicitations";
import { PhoneFormType } from "../../../../types/solicitation";
import { phoneQuestions } from "../../../../constants/solicitation-form-questions";

export function PhoneForm({ phoneForm }: { phoneForm: PhoneFormType }) {
  return (
    <Panel className="w-full">
      <div className="flex flex-row">
        <Text className="text-white font-extrabold text-2xl" as="h1">Questionário do celular:</Text>
        <div className="mr-auto" />
      </div>
      <div className="flex flex-col mt-6 gap-1 mb-5">
        <Text className="font-extrabold text-lg" as="h1">Marca - <span className="text-white">{formatPhoneBrand(phoneForm.brand)}</span></Text>
        <Text className="font-extrabold text-lg" as="h1">Modelo - <span className="text-white">{phoneForm.model}</span></Text>
        <Text className="font-extrabold text-lg" as="h1">{phoneQuestions[2].question} - <span className={getAnswerColor(phoneForm.previousRepair)}>{formatPreviousRepair(phoneForm.previousRepair)}</span></Text>
        <Text className="font-extrabold text-lg" as="h1">{phoneQuestions[3].question} - <span className={getAnswerColor(phoneForm.originalHardware)}>{formatOriginalHardwareAnswer(phoneForm.originalHardware)}</span></Text>
        <Text className="font-extrabold text-lg" as="h1">{phoneQuestions[4].question} - <span className="text-dark dark:text-white">{formatUsageTime(phoneForm.usageTime)}</span></Text>
      </div>
    </Panel>
  )
}