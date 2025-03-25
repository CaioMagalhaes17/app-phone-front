import { Button, IconPencil, Panel, Text } from "@app/ui";
import { formatOriginalHardwareAnswer, formatPhoneBrand, formatPreviousRepair, formatUsageTime, getAnswerColor } from "../../../../formaters/solicitations";
import { PhoneFormType } from "../../../../types/solicitation";
import { phoneQuestions } from "../../../../constants/solicitation-form-questions";
import { useState } from "react";
import { EditPhoneForm } from "./EditPhoneForm";

export function PhoneFormComponent({ solicitationId, phoneForm, isOwner, canEdit }: { solicitationId: string, phoneForm: PhoneFormType, isOwner: boolean, canEdit?: boolean }) {
  const [editMode, setEditMode] = useState<boolean>(false)
  return (
    <>
      {!editMode ? (
        <Panel className="w-full font-bold">
          <div className="flex flex-row">
            <Text className="text-black dark:text-white text-2xl" as="h1">Sobre o celular:</Text>
            <div className="mr-auto" />
            {canEdit && isOwner ? (<Button onClick={() => setEditMode(true)} className="btn-primary"><IconPencil /></Button>) : ''}
          </div>
          <div className="flex flex-col mt-6 gap-1 mb-5">
            <Text className="text-dark dark:text-white text-lg" as="h1">Marca - <span className="text-white-dark">{formatPhoneBrand(phoneForm.brand)}</span></Text>
            <Text className="text-dark dark:text-white text-lg" as="h1">Modelo - <span className="text-white-dark">{phoneForm.model}</span></Text>
            <Text className="text-dark dark:text-white text-lg" as="h1">{phoneQuestions[2].question} - <span className={getAnswerColor(phoneForm.previousRepair)}>{formatPreviousRepair(phoneForm.previousRepair)}</span></Text>
            <Text className="text-dark dark:text-white text-lg" as="h1">{phoneQuestions[3].question} - <span className={getAnswerColor(phoneForm.originalHardware)}>{formatOriginalHardwareAnswer(phoneForm.originalHardware)}</span></Text>
            <Text className="text-dark dark:text-white text-lg" as="h1">{phoneQuestions[4].question} - <span className="text-white-dark">{formatUsageTime(phoneForm.usageTime)}</span></Text>
          </div>
        </Panel>
      ) : <EditPhoneForm setEditMode={setEditMode} solicitationId={solicitationId} />}
    </>

  )
}