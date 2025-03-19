import { Button, IconPencil, Panel, Text } from "@app/ui";
import { useEffect, useState } from "react";
import { BatteryFormType, DisplayFormType } from "../../../../types/solicitation";
import { getStepTwoAnswersByForm } from "../../../../constants/solicitation-form-questions";
import { getAnswerColor } from "../../../../formaters/solicitations";
import { EditProblemForm } from "./EditProblemForm";

export function ProblemFormComponent({ topic, problemForm, canEdit, solicitationId }: { solicitationId: string, canEdit: boolean, problemForm: BatteryFormType | DisplayFormType, topic: string }) {
  const [formattedProblem, setFormattedProblem] = useState<{ question: string, answer: string }[]>([])
  const [editMode, setEditMode] = useState(false)
  useEffect(() => {
    setFormattedProblem(getStepTwoAnswersByForm(topic, problemForm))
  }, [problemForm])
  console.log(formattedProblem)
  return (
    <>
      {formattedProblem.length > 0 && (
        !editMode ? (
          <Panel className="w-full">
            <div className="flex flex-row">
              <Text className="text-dark dark:text-white font-extrabold text-2xl" as="h1">Questionário do problema:</Text>
              <div className="mr-auto" />
              {canEdit && (<Button onClick={() => setEditMode(true)} className="btn-primary"><IconPencil /></Button>)}
            </div>
            <div className="flex flex-col mt-6 gap-1 mb-5 mt-10">
              <Text className="font-extrabold text-lg" as="h1">Defeito - <span className="text-dark dark:text-white">{formattedProblem[0].answer}</span></Text>
              <Text className="font-extrabold text-lg" as="h1">{formattedProblem[1].question} - <span className={`text-dark dark:text-white`}>{formattedProblem[1].answer}</span></Text>
              <Text className="font-extrabold text-lg" as="h1">{formattedProblem[2].question} - <span className={getAnswerColor(formattedProblem[2].answer)}>{formattedProblem[2].answer}</span></Text>
              <Text className="font-extrabold text-lg" as="h1">{formattedProblem[3].question} - <span className={getAnswerColor(formattedProblem[3].answer)}>{formattedProblem[3].answer}</span></Text>
              <Text className="font-extrabold text-lg" as="h1">{formattedProblem[4].question} - <span className={getAnswerColor(formattedProblem[4].answer)}>{formattedProblem[4].answer}</span></Text>
              <Text className="font-extrabold text-lg" as="h1">{formattedProblem[5].question} - <span className={getAnswerColor(formattedProblem[5].answer)}>{formattedProblem[5].answer}</span></Text>
            </div>
          </Panel>
        ) : (
          <EditProblemForm problemForm={problemForm} setEditMode={setEditMode} solicitationId={solicitationId} topic={topic} />
        )
      )}
    </>
  )
}