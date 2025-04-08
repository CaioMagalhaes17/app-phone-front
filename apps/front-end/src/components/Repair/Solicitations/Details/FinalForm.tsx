import { Button, IconPencil, Panel, Text } from "@app/ui";
import { finalQuestions } from "../../../../constants/solicitation-form-questions";
import { formatDeliveryPreference, formatTimePreference, getDeliveryPreferenceColor, getTimePreferenceColor } from "../../../../formaters/solicitations";
import { useState } from "react";
import { EditFinalForm } from "./EditFinalForm";

export function FinalFormComponent({ deliveryPreference, timePreference, details, canEdit, solicitationId }: {
  deliveryPreference: string
  timePreference: string
  details: string
  canEdit?: boolean
  solicitationId: string
}) {
  const [editMode, setEditMode] = useState(false)
  return (
    <>
      {!editMode ? (
        <Panel className="w-full font-bold mt-6">
          <div className="flex flex-row">
            <Text className="text-dark dark:text-white  text-2xl" as="h1">Considerações finais:</Text>
            <div className="mr-auto" />
            {canEdit && (<Button onClick={() => setEditMode(true)} className="btn-primary"><IconPencil /></Button>)}
          </div>
          <div className="flex flex-col mt-6 gap-1 mb-5">
            <Text className="text-dark dark:text-white text-lg" as="h1">{finalQuestions[0].question} - <span className={`text-${getTimePreferenceColor(timePreference)}`}>{formatTimePreference(timePreference)}</span></Text>
            <Text className="text-dark dark:text-white text-lg" as="h1">{finalQuestions[1].question} - <span className={`text-${getDeliveryPreferenceColor(deliveryPreference)}`}>{formatDeliveryPreference(deliveryPreference)}</span></Text>
            <Text className="text-dark dark:text-white text-lg mt-2" as="h1">{finalQuestions[2].question}:</Text>
            <textarea value={details} disabled className="rounded-md border px-4 py-2 text-sm font-semibold !outline-none focus:border-primary focus:ring-transparent border-[#17263c] dark:bg-[#121e32] text-black dark:text-white-dark focus:border-primary" />
          </div>
        </Panel>
      ) : (
        <EditFinalForm setEditMode={setEditMode} details={details} solicitationId={solicitationId} />
      )}
    </>
  )
}