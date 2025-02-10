import { Panel, Text } from "@app/ui";
import { finalQuestions } from "../../../../constants/solicitation-form-questions";
import { formatDeliveryPreference, formatTimePreference, getDeliveryPreferenceColor, getTimePreferenceColor } from "../../../../formaters/solicitations";

export function FinalForm({ deliveryPreference, timePreference, details }: {
  deliveryPreference: string
  timePreference: string
  details: string
}) {
  return (
    <>
      <Panel className="w-full mt-6">
        <div className="flex flex-row">
          <Text className="text-white font-extrabold text-2xl" as="h1">Considerações finais:</Text>
          <div className="mr-auto" />
        </div>
        <div className="flex flex-col mt-6 gap-1 mb-5">
          <Text className="font-extrabold text-lg" as="h1">{finalQuestions[0].question} - <span className={`text-${getTimePreferenceColor(timePreference)}`}>{formatTimePreference(timePreference)}</span></Text>
          <Text className="font-extrabold text-lg" as="h1">{finalQuestions[1].question} - <span className={`text-${getDeliveryPreferenceColor(deliveryPreference)}`}>{formatDeliveryPreference(deliveryPreference)}</span></Text>
          <Text className="font-extrabold text-lg text-white mt-2" as="h1">{finalQuestions[2].question}:</Text>
          <textarea value={details} disabled className="placeholder:text-white-dark w-full rounded-md border px-4 py-2 text-sm font-semibold !outline-none focus:border-primary focus:ring-transparent border-[#17263c] bg-[#121e32] text-white-dark focus:border-primary" />
        </div>
      </Panel>
    </>
  )
}